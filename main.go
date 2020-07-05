package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"card-against-containers-rest-api/answer"
	"card-against-containers-rest-api/question"

	"github.com/gorilla/mux"
)

func getRandomAnswer(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().Unix())
	fmt.Fprintf(w, answer.Answer[rand.Intn(len(answer.Answer))])
}

func getRandomQuestion(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().Unix())
	fmt.Fprintf(w, question.Question[rand.Intn(len(question.Question))])
}

func main() {
	const Port = 8080
	router := mux.NewRouter().StrictSlash(true)
	api := router.PathPrefix("/api").Subrouter()
	api1 := api.PathPrefix("/v1").Subrouter()
	api1.HandleFunc("/answer", getRandomAnswer)
	api1.HandleFunc("/question", getRandomQuestion)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", Port), router))
}
