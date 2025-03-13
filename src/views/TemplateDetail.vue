<template>
    <div v-if="template">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ template.name }}</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ template.description }}</p>
          </div>
          <router-link
            :to="`/config/${template.id}`"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <SettingsIcon class="h-4 w-4 mr-1" />
            配置模板
          </router-link>
        </div>
        <div class="border-t border-gray-200">
          <div class="aspect-w-16 aspect-h-9">
            <img :src="template.thumbnail" alt="模板预览" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
  
      <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">模板特点</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">适用行业</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ template.industry }}</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">包含页面</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ template.pages.join(', ') }}</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">设计风格</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ template.style }}</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">响应式</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ template.responsive ? '支持' : '不支持' }}</dd>
            </div>
          </dl>
        </div>
      </div>
  
      <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">页面预览</h3>
        </div>
        <div class="border-t border-gray-200">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
            <div v-for="(page, index) in template.pageScreenshots" :key="index" class="bg-gray-100 rounded-lg overflow-hidden">
              <img :src="page.image" :alt="page.name" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h4 class="text-sm font-medium text-gray-900">{{ page.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-64">
      <LoaderIcon class="h-8 w-8 text-indigo-500 animate-spin" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { SettingsIcon, LoaderIcon } from 'lucide-vue-next'
  import { useTemplateStore } from '@/stores/template'
  
  const route = useRoute()
  const templateStore = useTemplateStore()
  const template = ref(null)
  
  onMounted(async () => {
    const templateId = parseInt(route.params.id)
    await templateStore.fetchTemplateById(templateId)
    template.value = templateStore.currentTemplate
  })
  </script>
  
  