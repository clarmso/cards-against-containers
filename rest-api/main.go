package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"card-against-containers-rest-api/answer"
	"card-against-containers-rest-api/question"

	"github.com/gorilla/mux"
)

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
	api1.HandleFunc("/answer", answer.GetRandomAnswerV1).Methods("GET")
	api1.HandleFunc("/question", question.GetRandomQuestionV1).Methods("GET")

	err := api1.Walk(walkingRoutes)
	if err != nil {
		log.Fatal(err)
	}

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", Port), router))
}
