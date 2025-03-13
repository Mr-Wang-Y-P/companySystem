<template>
    <div v-if="toast.show" class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div :class="[
          'p-2 rounded-lg shadow-lg sm:p-3',
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        ]">
          <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
              <span :class="[
                'flex p-2 rounded-lg',
                toast.type === 'success' ? 'bg-green-800' : 'bg-red-800'
              ]">
                <CheckIcon v-if="toast.type === 'success'" class="h-6 w-6 text-white" />
                <AlertTriangleIcon v-else class="h-6 w-6 text-white" />
              </span>
              <p class="ml-3 font-medium text-white truncate">
                <span>{{ toast.message }}</span>
              </p>
            </div>
            <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                @click="hideToast"
                :class="[
                  '-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white',
                  toast.type === 'success' ? 'hover:bg-green-500' : 'hover:bg-red-500'
                ]"
              >
                <XIcon class="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { CheckIcon, AlertTriangleIcon, XIcon } from 'lucide-vue-next'
  import { useToastStore } from '@/stores/toast'
  import { storeToRefs } from 'pinia'
  
  const toastStore = useToastStore()
  const { toast } = storeToRefs(toastStore)
  
  const hideToast = () => {
    toastStore.hideToast()
  }
  </script>
  
  