import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  app: {
    baseURL: "/dragon-quest-monster-synthesis/",
    buildAssetsDir: "assets",
  },

  ssr: false,
  modules: ["@nuxt/ui", "@nuxt/image"],

  css: ["~/assets/css/main.css"],
  image: {
    provider: "static",
  },
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
