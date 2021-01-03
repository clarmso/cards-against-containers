# Cards Against Containers

You can now get a random question and a random answer from [Cards Against Containers](https://github.com/cardsagainstcontainers/deck) deck of cards!

## REST API Server

The [rest_api](https://github.com/clarmso/cards-against-containers/tree/master/rest-api) directory contains the code and the configuration files to test, build and deploy the REST API server the Google Cloud Platform.

The currently supported enpoints are the following. As of v1, the endpoints return a random question and a random answer.

- GET `/api/v1/question`
- GET `/api/v1/answer`

## Web Application

The [ui](https://github.com/clarmso/cards-against-containers/tree/master/ui) directory contains the web application code, tests and the configuration files to accompany the REST API server. The web application displays a random question and a random answer from Cards Against Containers.

![Alt Text](ui/src/images/webapp.gif)

See the deplolyed web application here: https://cards-against-containers.web.app/.
