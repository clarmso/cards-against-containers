import React, { useState, useEffect } from "react"

import axios from "axios"

import { Button, CircularProgress, Grid } from "@material-ui/core"
import RefreshIcon from "@material-ui/icons/Refresh"

import Layout from "../components/layout"
import { Question, Answer } from "../components/myCard"
import SEO from "../components/seo"

const updateAllCards = (setQuestion, setAnswer, setLoading) => {
  setLoading(true)
  const promiseQuestion = axios.get("/api/v1/question").then(response => {
    const question = response.data.question
    console.log(`Question: ${question}`)
    setQuestion(question)
  })
  const promiseAnswer = axios.get("/api/v1/answer").then(response => {
    const answer = response.data.answer
    console.log(`Answer: ${answer}`)
    setAnswer(answer)
  })
  Promise.all([promiseQuestion, promiseAnswer]).then(() => {
    setLoading(false)
  })
}

const IndexPage = () => {
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    updateAllCards(setQuestion, setAnswer, setLoading)
  }, [])

  return (
    <Layout>
      <SEO title="Cards Against Containers" />
      <Grid container justify="space-evenly" alignItems="stretch">
        <Grid item>
          <br />
          <Question question={question} />
        </Grid>
        <Grid item>
          <br />
          <Answer answer={answer} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container justify="center">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            updateAllCards(setQuestion, setAnswer, setLoading)
          }}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
        >
          Refresh
        </Button>
      </Grid>
    </Layout>
  )
}

export default IndexPage
