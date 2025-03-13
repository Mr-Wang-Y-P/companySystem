<!--
 * @Author: 汪迎平
 * @Date: 2025-03-10 14:10:13
 * @LastEditTime: 2025-03-10 14:19:58
 * @LastEditors: 汪迎平
 * @Description: 
-->
<template>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="flex items-center">
                <!-- <img class="h-8 w-auto" src="/logo.svg" alt="公司网站模板系统" /> -->
                <span class="ml-2 text-xl font-bold text-gray-900">公司网站模板管理系统</span>
              </router-link>
            </div>
            <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link 
                to="/" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-indigo-500 text-gray-900"
              >
                首页
              </router-link>
              <router-link 
                to="/templates" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-indigo-500 text-gray-900"
              >
                模板库
              </router-link>
              <router-link 
                to="/my-websites" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-indigo-500 text-gray-900"
              >
                我的网站
              </router-link>
            </nav>
          </div>
          <div class="flex items-center">
            <router-link
              to="/templates"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon class="h-4 w-4 mr-1" />
              新建网站
            </router-link>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { PlusIcon } from 'lucide-vue-next'
  </script>
  
  