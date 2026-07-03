/* eslint-disable */

module.exports = {
  siteMetadata: {
    title: `Cards Against Containers`,
    description: `Randomly generated DevOps jokes. Don't take them seriously. 😜`,
    author: `Clare So`,
    homepage_link: `https://clarmso.ca`,
    black: `#322923`,
    github_link: `https://github.com/clarmso/cards-against-containers`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cards-against-containers`,
        short_name: `cards`,
        start_url: `/`,
        background_color: `white`,
        theme_color: `#322923`,
        display: `minimal-ui`,
        icon: `src/images/icon-512.png`,
      },
    },
  ],
  pathPrefix: `/cards-against-containers`,
}
