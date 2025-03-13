/*
 * @Author: 汪迎平
 * @Date: 2025-03-10 14:14:39
 * @LastEditTime: 2025-03-10 14:15:02
 * @LastEditors: 汪迎平
 * @Description: 
 */
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./assets/index.css"
import { createPinia } from "pinia"
// import "tailwindcss/tailwind.css"
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount("#app")

