import PropTypes from "prop-types"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Card, CardActions, CardContent } from "@material-ui/core"
import ComputerIcon from "@material-ui/icons/Computer"

const CARD_WIDTH = "250px"
const CARD_HEIGHT = "250px"
const BLACK = "#322923"

const useStylesQuestion = makeStyles(() => ({
  questionCard: {
    backgroundColor: BLACK,
    color: "white",
    width: CARD_WIDTH
  },
  questionContent: {
    height: CARD_HEIGHT
  }
}))

const useStylesAnswer = makeStyles(() => ({
  answerCard: {
    backgroundColor: "white",
    color: BLACK,
    width: CARD_WIDTH
  },
  answerContent: {
    height: CARD_HEIGHT
  }
}));

const Question = ({ question }) => {
  const classes = useStylesQuestion()
  return (
    <Card raised={true} className={classes.questionCard}>
      <CardContent className={classes.questionContent}>
        {question}
        </CardContent>
      <CardActions>
        <ComputerIcon />
        Cards Against Containers
      </CardActions>
    </Card>
  )
}

const Answer = ({answer}) => {
  const classes = useStylesAnswer()
  return (
    <Card raised={true} className={classes.answerCard} >
      <CardContent className={classes.answerContent}>
        {answer}
      </CardContent>
      <CardActions>
        <ComputerIcon />
        Cards Against Containers
      </CardActions>
    </Card>
  )
}

Question.propTypes = {
  question: PropTypes.string,
}

Question.defaultProps = {
  question: "",
}

Answer.propTypes = {
  answer: PropTypes.string,
}

Answer.defaultProps = {
  answer: "",
}

export {Question, Answer}