import PropTypes from "prop-types"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

const useStyles = makeStyles(({
  header: {
    background: "#322923",
    color: "white",
    borderRadius: "5px"
  },
  gameName: {
    paddingTop: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  subtitle: {
    paddingBottom: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
}))

const Header = ({ siteTitle, siteDescription }) => {
  const classes = useStyles()
  return (
    <Grid item className={classes.header}>
      <h1 className={classes.gameName}>{siteTitle}</h1>
      <p className={classes.subtitle}>{siteDescription}</p>
    </Grid>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: "",
  siteDescription: "",
}

export default Header
