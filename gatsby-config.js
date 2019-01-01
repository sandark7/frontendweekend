module.exports = {
  siteMetadata: {
    siteUrl: `https://frontendweekend.ml`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-T93788N',
        // Include GTM in development.
        includeInDevelopment: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    },
    {
      resolve: `gatsby-plugin-i18next`,
      options: {
        availableLngs: ['en', 'ru'],
        fallbackLng: 'ru',
        debug: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${ __dirname }/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locale`,
        path: `${ __dirname }/locale`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `comment`,
        path: `${ __dirname }/content/comment`,
      },
    },
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-component`]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Frontend Weekend podcast`,
        short_name: `FW`,
        start_url: `/`,
        background_color: `#ffee4e`,
        theme_color: `#333333`,
        display: `standalone`,
        icon: `static/img/android-chrome-384x384.png`,
      },
    },
    `gatsby-plugin-offline`
  ]
}
