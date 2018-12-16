module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
                id: "GTM-T93788N",
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
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Frontend Weekend podcast`,
                short_name: `FW`,
                start_url: `/`,
                background_color: `#ffee4e`,
                theme_color: `#333333`,
                display: `standalone`,
                icon: `static/img/android-chrome-384x384.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-offline`
    ]
};