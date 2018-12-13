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
        `gatsby-plugin-react-helmet`
    ]
}