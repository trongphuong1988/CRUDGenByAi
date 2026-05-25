export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [],
  
  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  typescript: {
    strict: true,
    typeCheck: true,
  },
  
  nitro: {
    experimental: {
      asyncContext: true,
    },
  },
})