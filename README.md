# api-gateway-sls-example

An example of how to build a simple API with:

- API Gateway
- Lambda
- [The serverless framework](https://www.serverless.com/)

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

To execute the function locally, you can run:

```bash
npx serverless invoke local -f getNews
```

To run the unit tests, you can run:

```bash
npm test
```


## Deploy

Run:

```bash
npx serverless deploy
```

The first deployment will take 2-3 minutes.


This should output the url of the deployed API (something like: `https://xyz.execute-api.eu-west-1.amazonaws.com/dev/news`) and the API key (something like `abcdefghijklmnopqrstuvwxyz0123456789abcd`).

You can then run:

```bash
curl -H 'X-Api-Key: abcdefghijklmnopqrstuvwxyz0123456789abcd' https://xyz.execute-api.eu-west-1.amazonaws.com/dev/news | jq .
```

To see the API in action.

🎉


## Cleanup

To remove all the resources created by this project run:

```bash
npx serverless remove
```


## Notes

A quick way to scaffold a new Node.js project with Serverless framework is by using the following command:

```bash
npx serverless create --template aws-nodejs --path nameOfYourService
```
