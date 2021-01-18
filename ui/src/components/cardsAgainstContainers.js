import React, { useState, useEffect } from "react"

import { Button, CircularProgress, Grid } from "@material-ui/core"
import RefreshIcon from "@material-ui/icons/Refresh"

import { Question, Answer } from "./myCard"
import { getAnswerV1, getQuestionV1 } from "../utilities/api"

const updateAllCards = async (setQuestion, setAnswer, setLoading) => {
  setLoading(true)
  setQuestion("")
  setAnswer([""])
  let allAnswers = []
  const { numAnswer, question } = await getQuestionV1()
  allAnswers.push(await getAnswerV1())
  while (numAnswer > allAnswers.length) {
    allAnswers.push(await getAnswerV1())
  }
  setQuestion(question)
  setAnswer(allAnswers)
  setLoading(false)
}

const CardsAgainstContainers = () => {
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
    <div>
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
    </div>
  )
}

export default CardsAgainstContainers
