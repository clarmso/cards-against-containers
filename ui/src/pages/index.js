import React, { useState, useEffect } from "react"

import axios from "axios"

import { Button, CircularProgress, Grid } from "@material-ui/core"
import RefreshIcon from "@material-ui/icons/Refresh"

import Layout from "../components/layout"
import { Question, Answer } from "../components/myCard"
import SEO from "../components/seo"

const updateAllCards = async (setQuestion, setAnswer, setLoading) => {
  setLoading(true)

  let numAnswer
  await axios.get("/api/v1/question").then(response => {
    const question = response.data.question
    numAnswer = response.data.numAnswer
    setQuestion(question)
  })

  let allAnswers = []
  while (numAnswer > 0) {
    await axios.get("/api/v1/answer").then(response => {
      const answer = response.data.answer
      allAnswers.push(answer)
    })
    numAnswer--
  }
  setAnswer(allAnswers)

  setLoading(false)
}

const IndexPage = () => {
  const [answer, setAnswer] = useState([""])
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    updateAllCards(setQuestion, setAnswer, setLoading)
  }, [])

  const answerList = []
  answer.forEach(ans => {
    answerList.push(
      <Grid item key={ans}>
        <br />
        <Answer answer={ans} />
      </Grid>
    )
  })

  return (
    <Layout>
      <SEO title="Cards Against Containers" />
      <Grid container justify="space-evenly" alignItems="stretch">
        <Grid item>
          <br />
          <Question question={question} />
        </Grid>
        {answerList}
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
