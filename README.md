# api-gateway-sls-example

An example of how to build a simple API with:

- API Gateway
- Lambda
- The serverless framework

Using Node.js


This API will fetch the current home page of the New York Times and scrape the latest articles which will be returned
as a JSON array of titles and links.


## Requirements

Requires Node.js 14 (or newer) and `npm`.


## Dependencies

Install dependencies with:

```bash
npm install
```


## Test locally

Run:

```bash
node_modules/.bin/sls invoke local -f getNews
```


## Deploy

Run:

```bash
node_modules/.bin/sls deploy
```


This should output the url of the deployed API (something like: `https://xyz.execute-api.eu-west-1.amazonaws.com/dev/news`).

You can then run:

```bash
curl https://xyz.execute-api.eu-west-1.amazonaws.com/dev/news | jq .
```

To see the API in action.

🎉


## Cleanup

To remove all the resources created by this project run:

```bash
node_modules/.bin/sls remove
```
