<template>
    <div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="text-center">
            <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              创建您的专业公司网站
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              使用我们的模板管理系统，轻松创建专业的公司网站，展示您的品牌和服务。
            </p>
            <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div class="rounded-md shadow">
                <router-link
                  to="/templates"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  浏览模板
                </router-link>
              </div>
              <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <router-link
                  to="/my-websites"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  我的网站
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="mt-10">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">热门模板</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TemplateCard 
            v-for="template in featuredTemplates" 
            :key="template.id" 
            :template="template" 
          />
        </div>
        <div class="mt-6 text-center">
          <router-link
            to="/templates"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            查看全部模板
            <ArrowRightIcon class="ml-2 h-4 w-4" />
          </router-link>
        </div>
      </div>
  
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">功能特点</h2>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <LayoutIcon class="h-6 w-6 text-white" />
                </div>
                <div class="ml-5">
                  <h3 class="text-lg font-medium text-gray-900">多种模板</h3>
                  <p class="mt-2 text-sm text-gray-500">
                    提供多种行业模板，满足不同企业需求
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <SettingsIcon class="h-6 w-6 text-white" />
                </div>
                <div class="ml-5">
                  <h3 class="text-lg font-medium text-gray-900">简单配置</h3>
                  <p class="mt-2 text-sm text-gray-500">
                    通过简单配置，快速生成专业网站
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <SmartphoneIcon class="h-6 w-6 text-white" />
                </div>
                <div class="ml-5">
                  <h3 class="text-lg font-medium text-gray-900">响应式设计</h3>
                  <p class="mt-2 text-sm text-gray-500">
                    所有网站模板均支持电脑、平板和手机等设备
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { ArrowRightIcon, LayoutIcon, SettingsIcon, SmartphoneIcon } from 'lucide-vue-next'
  import TemplateCard from '@/components/TemplateCard.vue'
  import { useTemplateStore } from '@/stores/template'
  
  const templateStore = useTemplateStore()
  const featuredTemplates = ref([])
  
  onMounted(async () => {
    await templateStore.fetchTemplates()
    featuredTemplates.value = templateStore.templates.slice(0, 3)
  })
  </script>
  
  