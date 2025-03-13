/*
 * @Author: 汪迎平
 * @Date: 2025-03-10 14:17:13
 * @LastEditTime: 2025-03-13 16:26:42
 * @LastEditors: 汪迎平
 * @Description: 
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})

