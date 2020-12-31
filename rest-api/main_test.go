package main

import (
	"bytes"
	"card-against-containers-rest-api/answer"
	"card-against-containers-rest-api/question"
	"encoding/json"
	"math/rand"
	"testing"

	"github.com/stretchr/testify/assert"
)

func convertBodyToQuestion(body string) question.ResponseQuestion {
	var mesg question.ResponseQuestion
	r := bytes.NewReader([]byte(body))
	json.NewDecoder(r).Decode(&mesg)
	return mesg
}

func convertBodyToAnswer(body string) answer.ResponseAnswer {
	var mesg answer.ResponseAnswer
	r := bytes.NewReader([]byte(body))
	json.NewDecoder(r).Decode(&mesg)
	return mesg
}

func TestGetRandomQuestion(t *testing.T) {
	body := assert.HTTPBody(question.GetRandomQuestionV1, "GET", "/api/v1/question", nil)
	assert.NotNil(t, body)
	mesg := convertBodyToQuestion(body)
	assert.IsType(t, "I am a string!", mesg.Question)
	assert.IsType(t, rand.Int(), mesg.Index)
	assert.IsType(t, rand.Int(), mesg.NumAnswer)
	assert.GreaterOrEqual(t, mesg.NumAnswer, 1)
}

func TestGetRandomAnswer(t *testing.T) {
	body := assert.HTTPBody(answer.GetRandomAnswerV1, "GET", "/api/v1/answer", nil)
	assert.NotNil(t, body)
	mesg := convertBodyToAnswer(body)
	assert.IsType(t, "I am a string!", mesg.Answer)
	assert.IsType(t, rand.Int(), mesg.Index)
}

func TestAllKnownEndpoints(t *testing.T) {
	assert.HTTPSuccess(t, question.GetRandomQuestionV1, "GET", "/api/v1/question", nil)
	assert.HTTPSuccess(t, answer.GetRandomAnswerV1, "GET", "/api/v1/answer", nil)
}
