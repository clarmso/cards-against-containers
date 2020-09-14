import React, { useState, useEffect } from "react"

import axios from 'axios'

import { Button, Grid } from "@material-ui/core"
import RefreshIcon from "@material-ui/icons/Refresh"

import Layout from "../components/layout"
import {Question, Answer} from "../components/myCard"
import SEO from "../components/seo"


const updateAllCards = (setQuestion, setAnswer) => {
  axios.get("/api/v1/question")
    .then((response) => {
      const question = response.data.question;
      console.log(`Question: ${question}`);
      setQuestion(question)
    })
  axios.get("/api/v1/answer")
    .then((response) => {
      const answer = response.data.answer
      console.log(`Answer: ${answer}`);
      setAnswer(answer)
    })
}

const IndexPage = () => {
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")

  useEffect(() => {
    updateAllCards(setQuestion, setAnswer)
  }, []);

  return (
  <Layout>
    <SEO title="Cards Against Containers" />
    <Grid container justify="space-evenly" alignItems="stretch" >
      <Grid item sm={4}>
        <br />
        <Question question={question}/>
      </Grid>
      <Grid item sm={4}>
        <br />
        <Answer answer={answer}/>
      </Grid>
    </Grid>
    <br />
    <br />
    <Grid container justify="center" size="large">
      <Button 
        color="primary" 
        variant="outlined"
        onClick={() => {
          updateAllCards(setQuestion, setAnswer)
        }}
      >
        Refresh
        <RefreshIcon/>
      </Button>
    </Grid>
  </Layout>
  )
}

export default IndexPage
