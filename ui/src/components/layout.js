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
import Footer from "./footer"

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
          author
          description
          title
          github_link
          homepage_link
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
      <Footer 
        author={site.siteMetadata.author}
        homepageLink={site.siteMetadata.homepage_link}
        githubLink={site.siteMetadata.github_link}
      />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
