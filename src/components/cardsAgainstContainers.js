import React, { useState, useEffect } from "react"

import { Button, Grid } from "@material-ui/core"
import RefreshIcon from "@material-ui/icons/Refresh"

import { Question, Answer } from "./myCard"
import { getAnswerV1, getQuestionV1 } from "../utilities/api"

const drawCards = () => {
  const { numAnswer, question } = getQuestionV1()
  const allAnswers = []
  for (let i = 0; i < numAnswer; i++) {
    allAnswers.push(getAnswerV1())
  }
  return { question, allAnswers }
}

const CardsAgainstContainers = () => {
  const [answer, setAnswer] = useState([""])
  const [question, setQuestion] = useState("")

  const refresh = () => {
    const { question, allAnswers } = drawCards()
    setQuestion(question)
    setAnswer(allAnswers)
  }

  useEffect(() => {
    refresh()
  }, [])

  const answerList = []
  answer.forEach((ans, index) => {
    answerList.push(
      <Grid item key={ans}>
        <br />
        <Answer answer={ans} index={index} />
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
          onClick={refresh}
          endIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
      </Grid>
    </div>
  )
}

export default CardsAgainstContainers
