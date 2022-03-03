const axios = require('axios')
const cheerio = require('cheerio')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const s3 = new S3Client()
const { BUCKET_NAME } = process.env

module.exports.getNews = async function getNews (event) {
  // logs the event (good practice for debugging)
  console.log('Triggered with event', event)

  // fetches the HTML code of the NY Times home page
  const { data: html } = await axios.get('https://www.nytimes.com')

  // parses the HTML using cheerio
  const $ = cheerio.load(html)

  // extrapolate the news using various cheerio utilities
  const news = []
  $('a[data-story^="nyt://"]').each((i, entry) => {
    news[i] = {
      title: $(entry).text().trim(),
      link: $(entry).attr('href').trim()
    }
  })

  // save the data to S3
  await s3.send(new PutObjectCommand({
    Key: `${Date.now()}.json`,
    Body: JSON.stringify(news, null, 2),
    Bucket: BUCKET_NAME
  }))

  // returns an HTTP response using the format expected
  // by API Gateway (Lambda proxy integraiton)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(news)
  }
}
