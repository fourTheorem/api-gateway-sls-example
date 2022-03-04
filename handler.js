const axios = require('axios')
const cheerio = require('cheerio')

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
