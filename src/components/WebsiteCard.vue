<!--
 * @Author: 汪迎平
 * @Date: 2025-03-10 14:11:00
 * @LastEditTime: 2025-03-13 17:13:33
 * @LastEditors: 汪迎平
 * @Description: 
-->
<template>
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="relative pb-2/3">
        <img :src="website.thumbnail" alt="网站预览" class="absolute h-full w-full object-cover" />
      </div>
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ website.companyName }}</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>{{ website.description }}</p>
        </div>
        <div class="mt-3 flex items-center text-sm text-gray-500">
          <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
          <span>创建于 {{ website.createdAt }}</span>
        </div>
        <div class="mt-5 flex space-x-2">
          <a
           :href="`${baseUrl}/api/preview/${website.id}`"
            target="_blank"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ExternalLinkIcon class="h-4 w-4 mr-1" />
            访问网站
          </a>
          <router-link
            :to="`/config/${website.templateId}?websiteId=${website.id}`"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <EditIcon class="h-4 w-4 mr-1" />
            编辑
          </router-link>
          <button
            @click="$emit('delete', website.id)"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon class="h-4 w-4 mr-1" />
            删除
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { CalendarIcon, ExternalLinkIcon, EditIcon, TrashIcon } from 'lucide-vue-next'
  
  defineProps({
    website: {
      type: Object,
      required: true
    }
  })
  const baseUrl = window.location.origin
  defineEmits(['delete'])
  </script>
  
  