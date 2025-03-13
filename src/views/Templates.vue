<template>
    <div>
      <div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 class="text-2xl font-bold text-gray-900">网站模板</h1>
        <div class="mt-3 sm:mt-0 sm:ml-4">
          <div class="flex rounded-md shadow-sm">
            <div class="relative flex-grow focus-within:z-10">
              <input
                type="text"
                v-model="searchQuery"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:text-sm border-gray-300"
                placeholder="搜索模板..."
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TemplateCard 
          v-for="template in filteredTemplates" 
          :key="template.id" 
          :template="template" 
        />
      </div>
  
      <div v-if="loading" class="flex justify-center mt-8">
        <LoaderIcon class="h-8 w-8 text-indigo-500 animate-spin" />
      </div>
  
      <div v-if="!loading && filteredTemplates.length === 0" class="text-center py-12">
        <div class="mx-auto h-12 w-12 text-gray-400">
          <SearchIcon class="h-12 w-12" />
        </div>
        <h3 class="mt-2 text-sm font-medium text-gray-900">未找到模板</h3>
        <p class="mt-1 text-sm text-gray-500">尝试使用其他关键词搜索</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { SearchIcon, LoaderIcon } from 'lucide-vue-next'
  import TemplateCard from '@/components/TemplateCard.vue'
  import { useTemplateStore } from '@/stores/template'
  
  const templateStore = useTemplateStore()
  const searchQuery = ref('')
  const loading = ref(true)
  
  const filteredTemplates = computed(() => {
    if (!searchQuery.value) return templateStore.templates
    const query = searchQuery.value.toLowerCase()
    return templateStore.templates.filter(
      template => 
        template.name.toLowerCase().includes(query) || 
        template.description.toLowerCase().includes(query)
    )
  })
  
  onMounted(async () => {
    await templateStore.fetchTemplates()
    loading.value = false
  })
  </script>
  
  