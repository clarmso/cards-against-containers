/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

import { makeStyles } from "@material-ui/core/styles"
import { Container } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    fontFamily: "Helvetica",
  },
})

const Layout = ({ children }) => {
  const classes = useStyles()

  const { site } = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <Container className={classes.root}>
      <Header
        siteTitle={site.siteMetadata.title}
        siteDescription={site.siteMetadata.description}
      />
      {children}
      <footer>Clare So © {new Date().getFullYear()}</footer>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
