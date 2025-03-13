<template>
    <div>
      <div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 class="text-lg leading-6 font-medium text-gray-900">我的网站</h3>
        <div class="mt-3 sm:mt-0 sm:ml-4">
          <router-link
            to="/templates"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon class="h-4 w-4 mr-1" />
            创建新网站
          </router-link>
        </div>
      </div>
  
      <div v-if="loading" class="flex justify-center mt-8">
        <LoaderIcon class="h-8 w-8 text-indigo-500 animate-spin" />
      </div>
  
      <div v-else-if="websites.length > 0" class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <WebsiteCard 
          v-for="website in websites" 
          :key="website.id" 
          :website="website"
          @delete="showDeleteConfirm(website.id)" 
        />
      </div>
  
      <!-- 空状态 -->
      <div v-else class="text-center py-12">
        <div class="mx-auto h-12 w-12 text-gray-400">
          <LayoutIcon class="h-12 w-12" />
        </div>
        <h3 class="mt-2 text-sm font-medium text-gray-900">暂无网站</h3>
        <p class="mt-1 text-sm text-gray-500">开始创建您的第一个公司网站吧！</p>
        <div class="mt-6">
          <router-link
            to="/templates"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon class="h-4 w-4 mr-1" />
            创建新网站
          </router-link>
        </div>
      </div>
  
      <DeleteConfirmModal
        :show="showDeleteModal"
        title="删除网站"
        message="您确定要删除这个网站吗？此操作无法撤销，网站数据将永久删除。"
        @confirm="deleteWebsite"
        @cancel="showDeleteModal = false"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { PlusIcon, LayoutIcon, LoaderIcon } from 'lucide-vue-next'
  import WebsiteCard from '@/components/WebsiteCard.vue'
  import DeleteConfirmModal from '@/components/DeleteConfirmModal.vue'
  import { useWebsiteStore } from '@/stores/website'
  import { useToastStore } from '@/stores/toast'
  
  const websiteStore = useWebsiteStore()
  const toastStore = useToastStore()
  const websites = ref([])
  const loading = ref(true)
  const showDeleteModal = ref(false)
  const websiteToDelete = ref(null)
  
  onMounted(async () => {
    await fetchWebsites()
  })
  
  const fetchWebsites = async () => {
    try {
      await websiteStore.fetchWebsites()
      websites.value = websiteStore.websites
    } catch (error) {
      toastStore.showToast('获取网站列表失败：' + error.message, 'error')
    } finally {
      loading.value = false
    }
  }
  
  // 显示删除确认弹窗
  const showDeleteConfirm = (websiteId) => {
    websiteToDelete.value = websiteId
    showDeleteModal.value = true
  }
  
  // 删除网站
  const deleteWebsite = async () => {
    try {
      await websiteStore.deleteWebsite(websiteToDelete.value)
      toastStore.showToast('网站已成功删除！', 'success')
      showDeleteModal.value = false
      websiteToDelete.value = null
      await fetchWebsites()
    } catch (error) {
      toastStore.showToast('删除失败：' + error.message, 'error')
    }
  }
  </script>
  
  