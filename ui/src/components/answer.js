import PropTypes from "prop-types"
import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from "@material-ui/core"
import ComputerIcon from '@material-ui/icons/Computer';

const useStyles = makeStyles(() => ({
  answerCard: {
    backgroundColor: "white",
    color: "#322923",
  },
  answerContent: {
    width: "25vw",
    height: "30vw"
  }
}));

const Answer = ({answer}) => {
  const classes = useStyles()
  return (
    <Card className={classes.answerCard} >
      <CardContent variant="outlined" className={classes.answerContent}>
        {answer}
      </CardContent>
      <CardActions>
        <ComputerIcon />
        Cards Against Containers
      </CardActions>
    </Card>
  )
}

Answer.propTypes = {
  answer: PropTypes.string,
}

Answer.defaultProps = {
  answer: "",
}

export default Answer