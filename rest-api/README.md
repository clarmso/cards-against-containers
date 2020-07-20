# REST API Server

This directory contains the source files for the REST API server and the configuration files associated with it.

## Quick Start

### Run and test the server locally

[Go](https://golang.org/) should be installed and configured.

1. `go build`
2. `go test`
3. `./card-against-containers-rest-api`
4. On a separate terminal: `curl http://localhost:8080/api/v1/answer` and `curl http://localhost:8080/api/v1/question`

### With Docker

[Docker](https://docs.docker.com/get-docker/) (community edition) is required. [Go](https://golang.org/) installation is not required.

Build and run Docker container locally:
1. `docker build -t cards-against-containers .`
2. `docker run -p 8080:8080 cards-against-containers`
3. On a separate terminal: `curl http://localhost:8080/api/v1/answer` and `curl http://localhost:8080/api/v1/question`

Pull Docker container from the [Docker Hub](https://hub.docker.com/repository/docker/clarmso/cards-against-containers) repository and run container:
1. `docker pull clarmso/cards-against-containers`
2. `docker run -p 8080:8080 cards-against-containers`
3. On a separate terminal: `curl http://localhost:8080/api/v1/answer` and `curl http://localhost:8080/api/v1/question`

### Google Cloud Platform

This repository's`cloudbuild.yaml` contains a sample configuration for the Google Cloud Platform.  This configuration allows us to test locally, build a Docker image using [Cloud Build](https://cloud.google.com/cloud-build), push the container to the [Container Registry](https://cloud.google.com/container-registry) and finally deploy microservices automatically using [Cloud Run](https://cloud.google.com/run). Please see the documentation on how to enable the services on Google Cloud and set up the project.

In `cloudbuild.yaml`, the `$PROJECT_ID` is an unique identifier for the project. It is known when the project is initialized on the Google Cloud Platform.  The `${_REGION}` is one of the predefined [regions]([https://cloud.google.com/compute/docs/regions-zones) from Google Cloud.

If your Google Cloud project is set up correctly, you should be able to test, build and deploy the instance of the microservices in the `northamerica-northeast1` (Montreal, Quebec, Canada) region automatically using the following command:
```
cd .. 
gcloud builds submit --config rest-api/cloudbuild.yaml --substitutions=_REGION="northamerica-northeast1"
```

After the deployment is successful, you should be able to invoke the microservices using a utility such as `curl`.  Please refer to Cloud Run's service details for the exact URL of the deployment.

```
curl https://<url>.run.app/api/v1/answer
curl https://<url>.run.app/api/v1/question
```

## REST API Endpoints

### GET /api/v1/question

Return one random question.

#### Parameters

None.

#### Response

A JSON object containting the index of the question and the question.

#### Sample Response

```
{"index":10,"question":"I drink to forget ________."}
```

### GET /api/v1/answer

Return one random answer.

#### Parameters

None.

#### Response

A JSON object containing the index of the answer and the answer.

#### Sample Response

```
{"index":62,"answer":"Crippling technical debt"}
```