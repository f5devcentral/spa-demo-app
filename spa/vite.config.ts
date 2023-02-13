import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/images/.*": "http://localhost:8000",
      "/api": "http://localhost:8000",
    },
  },
  test: {
    globals: true, // required
    setupFiles: ["vitest-localstorage-mock"],
    mockReset: false,
    environment: "jsdom",
    coverage: {
      provider: "c8",
      all: true,
      reporter: ["text", "json", "html", "lcov"],
    },
  },
})
