module.exports = {
  siteMetadata: {
    title: `Yash Ladha`,
    url: "https://yashladha.in",
    image: "/icon.png",
    siteUrl: `https://yashladha.in`,
    description: `Hi there, I am a Software Engineer in day and open source developer in night.`,
    twitterUsername: `yashLadha_`,
  },
  plugins: [
    "gatsby-plugin-preact",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
        name: `Yash Ladha`,
        short_name: `yashLadha`,
        start_url: `/`,
        theme_color: "#000000",
        background_color: "#ffffff",
        display: `standalone`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Raleway:500,700']
        }
      }
    }
  ],
};
