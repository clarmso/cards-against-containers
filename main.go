package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/clarmso/card-against-containers-rest-api/answers"
	"github.com/clarmso/card-against-containers-rest-api/questions"

	"github.com/gorilla/mux"
)

func getRandomAnswer(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().Unix())
	fmt.Fprintf(w, answers.Answers[rand.Intn(len(answers.Answers))])
}

func getRandomQuestion(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().Unix())
	fmt.Fprintf(w, questions.Questions[rand.Intn(len(questions.Questions))])
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
