package main

import (
	"bytes"
	"card-against-containers-rest-api/answer"
	"card-against-containers-rest-api/question"
	"encoding/json"
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
	body := assert.HTTPBody(getRandomQuestion, "GET", "/api/v1/question", nil)
	assert.NotNil(t, body)
	mesg := convertBodyToQuestion(body)
	assert.Contains(t, question.Question, mesg.Question)
	assert.Equal(t, question.Question[mesg.Index], mesg.Question)
}

func TestGetRandomAnswer(t *testing.T) {
	body := assert.HTTPBody(getRandomAnswer, "GET", "/api/v1/answer", nil)
	assert.NotNil(t, body)
	mesg := convertBodyToAnswer(body)
	assert.Contains(t, answer.Answer, mesg.Answer)
	assert.Equal(t, answer.Answer[mesg.Index], mesg.Answer)
}

func TestAllKnownEndpoints(t *testing.T) {
	assert.HTTPSuccess(t, getRandomQuestion, "GET", "/api/v1/question", nil)
	assert.HTTPSuccess(t, getRandomAnswer, "GET", "/api/v1/answer", nil)
}
