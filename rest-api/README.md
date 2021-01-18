# REST API Server for Cards Against Containers

This directory contains the source files for the REST API server and the configuration files for deploying the server to Google Cloud Platform.

## 🚀 Quick Start

### Run and test the server locally

[Go](https://golang.org/) should be installed and configured.

1. `go build`
2. `go test`
3. `./cards-against-containers-rest-api`
4. On a separate terminal: `curl http://localhost:8080/api/v1/answer` and `curl http://localhost:8080/api/v1/question`

### With Docker (Optional)

[Docker](https://docs.docker.com/get-docker/) (community edition) is required. [Go](https://golang.org/) installation is not required.

Build and run Docker container locally:

1. `docker build -t cards-against-containers .`
2. `docker run -p 8080:8080 cards-against-containers`
3. On a separate terminal: `curl http://localhost:8080/api/v1/answer` and `curl http://localhost:8080/api/v1/question`

### Deploy to Google Cloud Platform

1. Create project on [Google Cloud Platform](https://console.cloud.google.com).
2. Enable [Cloud Build](https://cloud.google.com/cloud-build),
   [Container Registry](https://cloud.google.com/container-registry) and
   [Cloud Run](https://cloud.google.com/run) for the project
3. Deploy the REST API. (Change the `REGION` to your desired [region]([https://cloud.google.com/compute/docs/regions-zones))

```
cd ..
gcloud builds submit --config rest-api/cloudbuild.yaml --substitutions=_REGION="us-central1"
```

After the deployment is successful, you should be able to invoke the microservices using a utility such as `curl`. Please refer to Cloud Run's service details for the exact URL of the deployment.

```
curl https://<url>.run.app/api/v1/answer
curl https://<url>.run.app/api/v1/question
```

## REST API Endpoints

### GET /api/v1/question

Return one random question.

Try me: https://cards-against-containers.web.app/api/v1/question

#### Parameters

None.

#### Response

A JSON object containting the index of the question and the question.

#### Sample Response

```
{"index":52,"question":"I got 99 problems, but ________ ain't one","numAnswer":1}
```

### GET /api/v1/answer

Return one random answer.

Try me: https://cards-against-containers.web.app/api/v1/answer

#### Parameters

None.

#### Response

A JSON object containing the index of the answer and the answer.

#### Sample Response

```
{"index":62,"answer":"Crippling technical debt"}
```
