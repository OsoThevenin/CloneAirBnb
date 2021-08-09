export default {
  components: true,
  head: {
    titleTemplate: "Mastering Nuxt: %s",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class: ["my_style"],
    },
    meta: [
      {
        charset: "utf-8",
      },
    ],
  },
  router: {
    prefetchLinks: false,
  },
  plugins: [
    "~/plugins/maps.client",
    "~/plugins/dataApi",
    "~/plugins/auth.client",
  ],
  modules: ['~/modules/auth', '~/modules/algolia', '~/modules/cloudinary', "@nuxtjs/cloudinary"],
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  cloudinary: {
    cloudName: 'dlvju6d8g',

  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dlvju6d8g/image/upload/'
    }
  },
  css: ["~/assets/sass/app.scss"],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },
  publicRuntimeConfig: {
    auth: {
      cookieName: "idToken",
      clientId: "212096474408-r38fnhqopkthssdvs1gga1hq238u32pp.apps.googleusercontent.com",
    },
    algolia: {
      APPLICATION_ID: "T2OKKX09II",
      API_KEY: "1958c90625c59344dc055a3dddf1a550"
    },
    cloudinary: {
      API_KEY: "237921354725786",
    }
  },
  privateRuntimeConfig: {
    algolia: {
      APPLICATION_ID: "T2OKKX09II",
      API_KEY: "55abaa55819243489563ecbbdbdcf036",
    },
    cloudinary: {
      API_SECRET: "aVrfGElM15G2qzfLtmqpUaVFe-0",
    }
  },
}