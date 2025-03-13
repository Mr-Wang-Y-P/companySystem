import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/templates",
    name: "Templates",
    component: () => import("../views/Templates.vue"),
  },
  {
    path: "/template/:id",
    name: "TemplateDetail",
    component: () => import("../views/TemplateDetail.vue"),
    props: true,
  },
  {
    path: "/config/:templateId",
    name: "TemplateConfig",
    component: () => import("../views/TemplateConfig.vue"),
    props: true,
  },
  {
    path: "/preview/:websiteId",
    name: "WebsitePreview",
    component: () => import("../views/WebsitePreview.vue"),
    props: true,
  },
  {
    path: "/my-websites",
    name: "MyWebsites",
    component: () => import("../views/MyWebsites.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

