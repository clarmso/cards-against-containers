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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cards-against-containers`,
        short_name: `cards`,
        start_url: `/`,
        background_color: `white`,
        theme_color: `#322923`,
        display: `minimal-ui`,
        icon: `src/images/laptop_24px.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  proxy: {
    prefix: "/api",
    url: "http://localhost:8080",
  },
}
