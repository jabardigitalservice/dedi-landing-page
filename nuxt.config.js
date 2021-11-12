export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Desa Digital',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicon/site.webmanifest' },
      { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
    ]
  },

  // Environment dynamic
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL + '/' + process.env.VERSION_ENDPOINT
    },
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    },
    sentry: {
      config: {
        environment: process.env.SENTRY_ENVIRONMENT
      }
    }
  },

  // Environment dynamic secure
  privateRuntimeConfig: {

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.postcss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/design-system.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    'nuxt-windicss',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sentry',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios', // nuxt axios
    'portal-vue/nuxt', // nuxt portal
    'vue-scrollto/nuxt' // nuxt vue scrollto
  ],

  // Define breakpoints
  breakpoints: {
    // custom options
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  },

  googleFonts: {
    families: {
      Lato: {
        wght: [100, 300, 400, 700, 900],
        ital: [100, 300, 400, 700, 900]
      },
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
        ital: [100, 300, 400, 500, 700, 900]
      },
      Lora: {
        wght: [400, 500, 600, 700],
        ital: [400, 500, 600, 700]
      }
    },
    display: 'swap'
  },

  // Google Analytics
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID // Use as fallback if no runtime config is provided
  },

  // Sentry
  sentry: {
    dsn: process.env.SENTRY_DSN,
    disabled: process.env.SENTRY_DISABLED || false,
    tracing: {
      tracesSampleRate: parseFloat(process.env.SENTRY_SAMPLE_RATE),
      vueOptions: {
        tracing: true,
        tracingOptions: {
          hooks: ['mount', 'update'],
          timeout: 2000,
          trackComponents: true
        }
      },
      browserOptions: {}
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@jabardigitalservice/jds-design-system'
    ]
  }
}
