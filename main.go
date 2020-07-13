package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"card-against-containers-rest-api/answer"
	"card-against-containers-rest-api/question"

	"github.com/gorilla/mux"
)

func getRandomAnswer(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())
	answerIndex := rand.Intn(len(answer.Answer))
	randomAnswer := answer.Answer[answerIndex]
	response := answer.ResponseAnswer{Index: answerIndex, Answer: randomAnswer}
	log.Printf("Index = %d. Random answer: %s", response.Index, response.Answer)
	json.NewEncoder(w).Encode(response)
}

func getRandomQuestion(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())
	questionIndex := rand.Intn(len(question.Question))
	randomQuestion := question.Question[questionIndex]
	response := question.ResponseQuestion{Index: questionIndex, Question: randomQuestion}
	log.Printf("Index = %d. Random question: %s", response.Index, response.Question)
	json.NewEncoder(w).Encode(response)
}

func commonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func walkingRoutes(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
	pathTemplate, err := route.GetPathTemplate()
	if err == nil {
		log.Println("ROUTE:", pathTemplate)
	} else {
		return err
	}
	pathRegexp, err := route.GetPathRegexp()
	if err == nil {
		log.Println("Path regexp:", pathRegexp)
	} else {
		return err
	}
	queriesTemplates, err := route.GetQueriesTemplates()
	if err == nil {
		log.Println("Queries templates:", strings.Join(queriesTemplates, ","))
	} else {
		return err
	}
	queriesRegexps, err := route.GetQueriesRegexp()
	if err == nil {
		log.Println("Queries regexps:", strings.Join(queriesRegexps, ","))
	} else {
		return err
	}
	methods, err := route.GetMethods()
	if err == nil {
		log.Println("Methods:", strings.Join(methods, ","))
	} else {
		return err
	}
	return nil
}

func main() {
	const Port = 8080
	log.Println("Server started")
	router := mux.NewRouter().StrictSlash(true)
	router.Use(commonMiddleware)

	api := router.PathPrefix("/api").Subrouter()
	api1 := api.PathPrefix("/v1").Subrouter()
	api1.HandleFunc("/answer", getRandomAnswer).Methods("GET")
	api1.HandleFunc("/question", getRandomQuestion).Methods("GET")

	err := api1.Walk(walkingRoutes)
	if err != nil {
		log.Fatal(err)
	}

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", Port), router))
}
