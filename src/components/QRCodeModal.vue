<template>
    <div v-if="show" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="$emit('close')"></div>
  
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
              <QrCodeIcon class="h-6 w-6 text-indigo-600" />
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                扫描二维码预览
              </h3>
              <div class="mt-4 flex justify-center">
                <div class="w-48 h-48 bg-gray-100 flex items-center justify-center">
                  <img :src="qrCodeUrl" alt="二维码" class="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              @click="$emit('close')"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { QrCodeIcon } from 'lucide-vue-next'
  
  defineProps({
    show: {
      type: Boolean,
      default: false
    },
    qrCodeUrl: {
      type: String,
      default: '/qrcode-placeholder.png'
    }
  })
  
  defineEmits(['close'])
  </script>
  
  