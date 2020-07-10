package main

import (
	"testing"

	"card-against-containers-rest-api/answer"
	"card-against-containers-rest-api/question"

	"github.com/stretchr/testify/assert"
)

func TestGetRandomQuestion(t *testing.T) {
	body := assert.HTTPBody(getRandomQuestion, "GET", "/api/v1/question", nil)
	assert.NotNil(t, body)
	assert.Contains(t, question.Question, body)
}

func TestGetRandomAnswer(t *testing.T) {
	body := assert.HTTPBody(getRandomAnswer, "GET", "/api/v1/answer", nil)
	assert.NotNil(t, body)
	assert.Contains(t, answer.Answer, body)
}

func TestAllKnownEndpoints(t *testing.T) {
	assert.HTTPSuccess(t, getRandomQuestion, "GET", "/api/v1/question", nil)
	assert.HTTPSuccess(t, getRandomAnswer, "GET", "/api/v1/answer", nil)
}
