<template>
    <div class="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
      <Toast />
    </div>
  </template>
  
  <script setup>
  import Navbar from '@/components/Navbar.vue'
  import Toast from '@/components/Toast.vue'
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
  
  