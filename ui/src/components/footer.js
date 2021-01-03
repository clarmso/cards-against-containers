import PropTypes from "prop-types"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles({
  footer: {
    padding: "5px",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap" /* added line */,
    border: "0",
  },
  icon: {
    color: "#000000",
  },
})

const Footer = ({ author, homepageLink, githubLink }) => {
  const classes = useStyles()
  return (
    <Grid>
      <br />
      <footer className={classes.footer}>
        <p>
          Made with{" "}
          <span role="img" aria-label="heart">
            <span className={classes.srOnly}>Love</span>
            ❤️{" "}
          </span>{" "}
          by <a href={homepageLink}>{author}</a> © {new Date().getFullYear()}.{" "}
          <a href={githubLink}>
            <span className={classes.srOnly}>Github Repo</span>
            <GitHubIcon className={classes.icon} aria-label="github" />
          </a>
        </p>
      </footer>
    </Grid>
  )
}

Footer.propTypes = {
  author: PropTypes.string,
  homepageLink: PropTypes.string,
  githubLink: PropTypes.string,
}

Footer.defaultProps = {
  author: "",
  homepageLink: "",
  githubLink: "https://github.com/clarmso/cards-against-containers",
}

export default Footer
