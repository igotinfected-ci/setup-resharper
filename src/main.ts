import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import {getLatestVersion} from './utils'

const RESHAPER_CLT_CACHE_NAME = 'resharper-clt'

async function run(): Promise<void> {
  try {
    let version = core.getInput('version')

    if (!version?.trim()) {
      version = await getLatestVersion()
    }
    core.info(`Preparing ReSharper Command Line Tools version '${version}'...`)

    core.info('Checking whether this version is already installed...')
    let toolsPath = tc.find(RESHAPER_CLT_CACHE_NAME, version)

    if (!toolsPath?.trim()) {
      toolsPath = await installTools(version)
    } else {
      core.info(
        `Version '${version}' already exists in cache. Using the already installed tools.`
      )
    }

    registerTools(toolsPath, version)

    core.info(
      `Successfully installed ReSharper Command Line Tools version '${version}' at '${toolsPath}'!`
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

/**
 * Installs and caches the ReSharper Command Line Tools.
 *
 * @param version - The version of the tools. Will be used for caching purposes.
 * @returns The path to the cached tool.
 */
async function installTools(version: string): Promise<string> {
  const url = `https://download.jetbrains.com/resharper/dotUltimate.${version}/JetBrains.ReSharper.CommandLineTools.${version}.zip`
  core.info(`Downloading ReSharper Command Line Tools from '${url}'...`)

  const downloadPath = await tc.downloadTool(url)
  core.info(`Extracting tools to '${downloadPath}'...`)

  const extPath: string = await tc.extractZip(downloadPath)

  core.info('Caching newly installed tools...')
  const cachedDir = await tc.cacheDir(extPath, RESHAPER_CLT_CACHE_NAME, version)

  return cachedDir
}

/**
 * Registers the tools by setting ReSharper variables and adding the binary location to PATH.
 *
 * @param toolsPath - The path the tools have been installed to.
 * @param version - The installed version of the tools.
 */
function registerTools(toolsPath: string, version: string): void {
  core.exportVariable('RESHARPER_ROOT', toolsPath)
  core.addPath(toolsPath)

  core.info(`Registered ReSharper Command Line Tool wiht version ${version}`)
}

run()
