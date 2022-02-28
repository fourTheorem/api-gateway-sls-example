const { readFile } = require('fs/promises')
const path = require('path')
const { test } = require('uvu')
const assert = require('uvu/assert')
const nock = require('nock')
const { getNews } = require('../handler')

test('getNews', async () => {
  const mockHtml = await readFile(path.join(__dirname, '__mocks__', 'nytimes.html'))

  // mocks the return from the http request for
  // consistent test results
  nock('https://www.nytimes.com')
    .get('/')
    .reply(200, mockHtml)

  const result = await getNews({})
  const body = JSON.parse(result.body)

  assert.is(result.statusCode, 200)
  assert.equal(body[1], {
    title: 'FIGHTING RAGES AS SANCTIONS HIT RUSSIA',
    link: 'https://www.nytimes.com/live/2022/02/28/world/ukraine-russia-war'
  })
})

test.run()
