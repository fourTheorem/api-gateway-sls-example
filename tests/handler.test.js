const { readFile } = require('fs/promises')
const path = require('path')
const { test } = require('uvu')
const assert = require('uvu/assert')
const nock = require('nock')
// makes sure we don't access S3 for real during the unit tests, but uses a mock instead
process.env.BUCKET_NAME = 'test-bucket'
const proxyquire = require('proxyquire')
const { S3Client } = require('@aws-sdk/client-s3')
const { mockClient } = require('aws-sdk-client-mock')
const s3ClientMock = mockClient(S3Client)
const { getNews } = proxyquire('../handler', {
  S3Client: s3ClientMock
})

test('getNews', async () => {
  const mockHtml = await readFile(path.join(__dirname, '__mocks__', 'nytimes.html'))

  // mocks the return from the http request for
  // consistent test results
  const scope = nock('https://www.nytimes.com')
    .get('/')
    .reply(200, mockHtml)

  const result = await getNews({})
  const body = JSON.parse(result.body)

  assert.ok(scope.isDone())
  assert.is(result.statusCode, 200)
  assert.is(body.length, 88)
  assert.equal(body[0], {
    title: 'FIGHTING RAGES AS SANCTIONS HIT RUSSIA',
    link: 'https://www.nytimes.com/live/2022/02/28/world/ukraine-russia-war'
  })
  assert.equal(body[87], {
    title: 'VertexConnect the dots to reveal the hidden picture.',
    link: 'https://www.nytimes.com/puzzles/vertex'
  })
})

test.run()
