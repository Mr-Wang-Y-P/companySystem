<template>
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="relative pb-2/3">
        <img :src="template.thumbnail" alt="模板预览" class="absolute h-full w-full object-cover" />
      </div>
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ template.name }}</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>{{ template.description }}</p>
        </div>
        <div class="mt-5 flex space-x-2">
          <router-link
            :to="`/config/${template.id}`"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            配置模板
          </router-link>
          <router-link
            :to="`/template/${template.id}`"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            查看详情
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    template: {
      type: Object,
      required: true
    }
  })
  </script>
  
  