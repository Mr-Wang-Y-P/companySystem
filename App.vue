<!--
 * @Author: 汪迎平
 * @Date: 2025-03-10 14:15:57
 * @LastEditTime: 2025-03-10 14:27:19
 * @LastEditors: 汪迎平
 * @Description: 
-->
<template>
    <div class="min-h-screen bg-gray-50">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <!-- <img class="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="公司网站模板系统" /> -->
                <span class="ml-2 text-xl font-bold text-gray-900">公司网站模板管理系统</span>
              </div>
            </div>
            <div class="flex items-center">
              <button
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon class="h-4 w-4 mr-1" />
                新建网站
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <!-- 主内容区域 -->
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- 当前路由视图 -->
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { PlusIcon } from 'lucide-vue-next'
  </script>
  
  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  
  