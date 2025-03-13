import { createRouter, createWebHistory } from "vue-router"
import TemplateList from "./views/TemplateList.vue"
import TemplateConfig from "./views/TemplateConfig.vue"
import WebsitePreview from "./views/WebsitePreview.vue"
import MyWebsites from "./views/MyWebsites.vue"

const routes = [
  {
    path: "/",
    name: "TemplateList",
    component: TemplateList,
  },
  {
    path: "/config/:templateId",
    name: "TemplateConfig",
    component: TemplateConfig,
    props: true,
  },
  {
    path: "/preview/:websiteId",
    name: "WebsitePreview",
    component: WebsitePreview,
    props: true,
  },
  {
    path: "/my-websites",
    name: "MyWebsites",
    component: MyWebsites,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

