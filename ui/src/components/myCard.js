import PropTypes from "prop-types"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Card, CardActions, CardContent } from "@material-ui/core"
import ComputerIcon from "@material-ui/icons/Computer"
import CircularProgress from '@material-ui/core/CircularProgress';

const CARD_WIDTH = "250px"
const CARD_HEIGHT = "250px"
const BLACK = "#322923"

const useStylesQuestion = makeStyles({
  card: {
    backgroundColor: BLACK,
    color: "white",
    width: CARD_WIDTH
  },
  content: {
    height: CARD_HEIGHT
  }
})

const useStylesAnswer = makeStyles({
  card: {
    backgroundColor: "white",
    color: BLACK,
    width: CARD_WIDTH
  },
  content: {
    height: CARD_HEIGHT
  }
})

const myCard = (content, classes) => {
  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.content}>
        {!content ? <CircularProgress size={20} /> : content}
      </CardContent>
      <CardActions>
        <ComputerIcon />
        <span>Cards Against Containers</span>
      </CardActions>
    </Card>
  )
}

const Question = ({ question }) => {
  return myCard(question, useStylesQuestion());
}

const Answer = ({answer}) => {
  return myCard(answer, useStylesAnswer())
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