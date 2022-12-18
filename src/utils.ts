import * as core from '@actions/core'
import axios from 'axios'
import JSSoup from 'jssoup'

export async function getLatestVersion(): Promise<string> {
  const html = await getHtml()

  return readVersion(html)
}

export async function getHtml(): Promise<string> {
  try {
    const response = await axios.get(
      'https://www.jetbrains.com/resharper/whatsnew/'
    )

    return response.data
  } catch (error) {
    core.error(
      'An error occurred while retrieving the latest ReSharper CTL version'
    )

    process.exit(1)
  }
}

export async function readVersion(html: string): Promise<string> {
  let version = ''

  try {
    const soup = new JSSoup(html)
    // select title containing version
    const versionText = soup.find('h1', 'f-title')?.text
    // split string on space and take last element (version)
    version = versionText?.split(' ').pop() ?? ''
  } catch (error) {
    core.error(
      'An error occurred while retrieving the latest ReSharper CTL version'
    )

    process.exit(1)
  }

  return version
}
