import PropTypes from "prop-types"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles({
  footer: {
    padding: "5px",
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
            💖{" "}
          </span>{" "}
          by <a href={homepageLink}>{author}</a> © {new Date().getFullYear()}.{" "}
          <a href={githubLink}>
            <GitHubIcon />
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
