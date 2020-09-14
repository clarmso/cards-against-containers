import PropTypes from "prop-types"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Card, CardActions, CardContent } from "@material-ui/core"
import ComputerIcon from "@material-ui/icons/Computer"

const useStyles = makeStyles(() => ({
  questionCard: {
    backgroundColor: "#322923",
    color: "white",
  },
  questionContent: {
    width: "25vw",
    height: "30vw"
  },
}))

const Question = ({ question, black }) => {
  const classes = useStyles()
  return (
    <Card className={classes.questionCard}>
      <CardContent variant="outlined" className={classes.questionContent}>
        {question}
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

export default Question
