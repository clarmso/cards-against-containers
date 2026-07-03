import React from "react"

import Layout from "../components/layout"
import CardsAgainstContainers from "../components/cardsAgainstContainers"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Cards Against Containers" />
      <CardsAgainstContainers />
    </Layout>
  )
}

export default IndexPage
