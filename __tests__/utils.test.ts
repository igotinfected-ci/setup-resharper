import * as sut from '../src/utils'
import {expect, test} from '@jest/globals'

test('returns the version given an HTML snippet', async () => {
  const version = '2022.3'
  const html = `<div class="test"><h1 class="f-title">What's new in Release ${version}</h1></div>`

  expect(await sut.readVersion(html)).toBe(version)
})

test('retrieves HTML from ReSharper site and is able to retrieve that version', async () => {
  const html = (await sut.getHtml()) ?? ''
  expect

  expect(await sut.readVersion(html)).toMatch(
    /[0-9]{4}[.][0-9]{1}([.][0-9]{1})?/i
  )
})
