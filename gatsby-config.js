module.exports = {
  siteMetadata: {
    title: `Yash Ladha`,
    url: "https://yashladha.in",
    image: "/icon.png",
    siteUrl: `https://yashladha.in`,
    description: `Experienced Software Engineer with expertise in full-stack development, backend systems, and emerging technologies. Passionate about creating innovative, scalable, and user-centric software solutions. Proven track record of delivering high-quality projects for clients across diverse industries.`,
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
          families: ['Gill Sans:300,500']
        }
      }
    }
  ],
};
