<template>
    <div v-if="template">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">网站配置</h3>
            <p class="mt-1 text-sm text-gray-600">
              配置您的公司网站信息，所有更改将实时预览。
            </p>
            
            <div class="mt-6">
              <h4 class="text-md font-medium text-gray-900">页面导航</h4>
              <nav class="mt-2 space-y-1">
                <button
                  v-for="page in template.pages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    currentPage === page
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left'
                  ]"
                >
                  <span class="truncate">{{ page }}</span>
                </button>
              </nav>
            </div>
            
            <div class="mt-8">
              <button
                @click="generateWebsite"
                class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :disabled="isGenerating"
              >
                <LoaderIcon v-if="isGenerating" class="h-4 w-4 mr-1 animate-spin" />
                <SaveIcon v-else class="h-4 w-4 mr-1" />
                {{ websiteId ? '编辑网站' : isGenerating ? '生成中...' : '生成网站' }}
              </button>
              
              <button
                @click="previewWebsite"
                class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <EyeIcon class="h-4 w-4 mr-1" />
                预览网站
              </button>
            </div>
          </div>
        </div>
        
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <!-- 基本信息配置 -->
              <div v-if="currentPage === '首页' || currentPage === '公司简介' || currentPage === '关于我们'">
                <div>
                  <label for="company-name" class="block text-sm font-medium text-gray-700">公司名称</label>
                  <input
                    type="text"
                    id="company-name"
                    v-model="websiteConfig.companyName"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div class="mt-6">
                  <label for="company-slogan" class="block text-sm font-medium text-gray-700">公司口号/标语</label>
                  <input
                    type="text"
                    id="company-slogan"
                    v-model="websiteConfig.slogan"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div class="mt-6">
                  <label for="company-description" class="block text-sm font-medium text-gray-700">公司简介</label>
                  <textarea
                    id="company-description"
                    v-model="websiteConfig.description"
                    rows="4"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
                
                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700">公司Logo</label>
                  <div class="mt-1 flex items-center">
                    <span class="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      <img v-if="websiteConfig.logo" :src="websiteConfig.logo" alt="公司Logo" class="h-full w-full object-cover" />
                      <ImageIcon v-else class="h-full w-full text-gray-300" />
                    </span>
                    <button
                      type="button"
                      class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      更改
                    </button>
                  </div>
                </div>
                
                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700">首页Banner图</label>
                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <ImageIcon class="mx-auto h-12 w-12 text-gray-400" />
                      <div class="flex text-sm text-gray-600">
                        <label
                          for="banner-upload"
                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>上传图片</span>
                          <input id="banner-upload" type="file" class="sr-only" />
                        </label>
                        <p class="pl-1">或拖放图片到此处</p>
                      </div>
                      <p class="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 联系信息配置 -->
              <div v-if="currentPage === '联系我们' || currentPage === '联系方式'">
                <div>
                  <label for="company-address" class="block text-sm font-medium text-gray-700">公司地址</label>
                  <input
                    type="text"
                    id="company-address"
                    v-model="websiteConfig.address"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div class="mt-6">
                  <label for="company-phone" class="block text-sm font-medium text-gray-700">联系电话</label>
                  <input
                    type="text"
                    id="company-phone"
                    v-model="websiteConfig.phone"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div class="mt-6">
                  <label for="company-email" class="block text-sm font-medium text-gray-700">电子邮箱</label>
                  <input
                    type="email"
                    id="company-email"
                    v-model="websiteConfig.email"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div class="mt-6">
                  <label for="company-wechat" class="block text-sm font-medium text-gray-700">微信公众号</label>
                  <input
                    type="text"
                    id="company-wechat"
                    v-model="websiteConfig.wechat"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700">公司位置</label>
                  <div class="mt-1 aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                    <div class="w-full h-full flex items-center justify-center text-gray-500">
                      <MapPinIcon class="h-8 w-8 mr-2" />
                      <span>地图位置预览</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 招聘信息配置 -->
              <div v-if="currentPage === '新闻动态'">
                <div class="space-y-4">
                  <div v-for="(job, index) in websiteConfig.news" :key="index" class="border rounded-md p-4">
                    <div class="flex justify-between">
                      <h4 class="text-md font-medium">新闻 {{ index + 1 }}</h4>
                      <button @click="removeNews(index)" class="text-red-600 hover:text-red-800">
                        <TrashIcon class="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div class="mt-3">
                      <label :for="`job-title-${index}`" class="block text-sm font-medium text-gray-700">新闻标题</label>
                      <input
                        :id="`job-title-${index}`"
                        v-model="job.title"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div class="mt-3">
                      <label :for="`job-department-${index}`" class="block text-sm font-medium text-gray-700">时间</label>
                      <input
                        type="date"
                        :id="`job-department-${index}`"
                        v-model="job.date"
                        class="w-24 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div class="mt-3">
                      <label :for="`job-requirements-${index}`" class="block text-sm font-medium text-gray-700">新闻内容</label>
                      <textarea
                        :id="`job-requirements-${index}`"
                        v-model="job.content"
                        rows="3"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                  
                  <button
                    @click="addNews"
                    class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon class="h-4 w-4 mr-1" />
                    添加新闻
                  </button>
                </div>
              </div>
              <!-- 招聘信息配置 -->
              <div v-if="currentPage === '招聘信息'">
                <div class="space-y-4">
                  <div v-for="(job, index) in websiteConfig.jobs" :key="index" class="border rounded-md p-4">
                    <div class="flex justify-between">
                      <h4 class="text-md font-medium">职位 {{ index + 1 }}</h4>
                      <button @click="removeJob(index)" class="text-red-600 hover:text-red-800">
                        <TrashIcon class="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div class="mt-3">
                      <label :for="`job-title-${index}`" class="block text-sm font-medium text-gray-700">职位名称</label>
                      <input
                        :id="`job-title-${index}`"
                        v-model="job.title"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div class="mt-3">
                      <label :for="`job-department-${index}`" class="block text-sm font-medium text-gray-700">所属部门</label>
                      <input
                        :id="`job-department-${index}`"
                        v-model="job.department"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div class="mt-3">
                      <label :for="`job-requirements-${index}`" class="block text-sm font-medium text-gray-700">职位要求</label>
                      <textarea
                        :id="`job-requirements-${index}`"
                        v-model="job.requirements"
                        rows="3"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                  
                  <button
                    @click="addJob"
                    class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon class="h-4 w-4 mr-1" />
                    添加职位
                  </button>
                </div>
              </div>
              
              <!-- 产品服务配置 -->
              <div v-if="currentPage === '产品服务' || currentPage === '产品中心' || currentPage === '服务内容'">
                <div class="space-y-4">
                  <div v-for="(product, index) in websiteConfig.products" :key="index" class="border rounded-md p-4">
                    <div class="flex justify-between">
                      <h4 class="text-md font-medium">产品/服务 {{ index + 1 }}</h4>
                      <button @click="removeProduct(index)" class="text-red-600 hover:text-red-800">
                        <TrashIcon class="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div class="mt-3">
                      <label :for="`product-name-${index}`" class="block text-sm font-medium text-gray-700">产品/服务名称</label>
                      <input
                        :id="`product-name-${index}`"
                        v-model="product.name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div class="mt-3">
                      <label :for="`product-description-${index}`" class="block text-sm font-medium text-gray-700">产品/服务描述</label>
                      <textarea
                        :id="`product-description-${index}`"
                        v-model="product.description"
                        rows="3"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    
                    <div class="mt-3">
                      <label class="block text-sm font-medium text-gray-700">产品图片</label>
                      <div class="mt-1 flex items-center">
                        <span class="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                          <img v-if="product.image" :src="product.image" alt="产品图片" class="h-full w-full object-cover" />
                          <ImageIcon v-else class="h-full w-full text-gray-300" />
                        </span>
                        <button
                          type="button"
                          class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          更改
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    @click="addProduct"
                    class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon class="h-4 w-4 mr-1" />
                    添加产品/服务
                  </button>
                </div>
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
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ImageIcon, MapPinIcon, PlusIcon, TrashIcon, LoaderIcon, SaveIcon, EyeIcon } from 'lucide-vue-next'
  import { useTemplateStore } from '@/stores/template'
  import { useWebsiteStore } from '@/stores/website'
  import { useToastStore } from '@/stores/toast'
  
  const route = useRoute()
  const router = useRouter()
  const templateStore = useTemplateStore()
  const websiteStore = useWebsiteStore()
  const toastStore = useToastStore()
  
  const templateId = ref(parseInt(route.params.templateId))
  const websiteId = ref(route.query.websiteId ? parseInt(route.query.websiteId) : null)
  const currentPage = ref('首页')
  const isGenerating = ref(false)
  const template = ref(null)
  
  // 网站配置数据
  const websiteConfig = ref({
    templateId: templateId.value,
    companyName: '',
    slogan: '',
    description: '',
    logo: '',
    bannerImage: '',
    address: '',
    phone: '',
    email: '',
    wechat: '',
    jobs: [],
    products: [],
    news: []
  })
  
  // 获取模板数据
  onMounted(async () => {
    await templateStore.fetchTemplateById(templateId.value)
    template.value = templateStore.currentTemplate
    
    if (websiteId.value) {
      // 编辑现有网站
      await websiteStore.fetchWebsiteById(websiteId.value)
      websiteConfig.value = { ...websiteStore.currentWebsite }
    } else {
      // 新建网站，使用默认配置
      websiteConfig.value = {
        templateId: templateId.value,
        companyName: '示例科技有限公司',
        slogan: '创新科技，改变未来',
        description: '我们是一家专注于技术创新的企业，致力于为客户提供最优质的产品和服务。',
        logo: '',
        bannerImage: '',
        address: '北京市朝阳区科技园区88号',
        phone: '010-12345678',
        email: 'contact@example.com',
        wechat: 'exampletech',
        jobs: [
          {
            title: '前端开发工程师',
            department: '研发部',
            requirements: '熟悉Vue、React等前端框架，有3年以上开发经验。'
          }
        ],
        products: [
          {
            name: '企业管理系统',
            description: '一站式企业管理解决方案，包含人事、财务、客户管理等模块。',
            image: ''
          }
        ],
        news: []
      }
    }
    
    currentPage.value = template.value.pages[0]
  })
  
  // 添加职位
  const addJob = () => {
    websiteConfig.value.jobs.push({
      title: '',
      department: '',
      requirements: ''
    })
  }
  // 添加新闻
  const addNews = () => {
    websiteConfig.value.news.push({
      title: '',
      date: '',
      content: ''
    })
  }
  // 删除职位
  const removeJob = (index) => {
    websiteConfig.value.jobs.splice(index, 1)
  }
  //
  const removeNews = (index) => {
    websiteConfig.value.news.splice(index, 1)
  }
  // 添加产品/服务
  const addProduct = () => {
    websiteConfig.value.products.push({
      name: '',
      description: '',
      image: ''
    })
  }
  
  // 删除产品/服务
  const removeProduct = (index) => {
    websiteConfig.value.products.splice(index, 1)
  }
  
  // 生成网站
  const generateWebsite = async () => {
    isGenerating.value = true
    
    try {
      if (websiteId.value) {
        // 更新现有网站
        await websiteStore.updateWebsite(websiteId.value, websiteConfig.value)
        toastStore.showToast('网站更新成功！', 'success')
      } else {
        // 创建新网站
        await websiteStore.createWebsite(websiteConfig.value)
        toastStore.showToast('网站创建成功！', 'success')
      }
      
      router.push('/my-websites')
    } catch (error) {
      toastStore.showToast('操作失败：' + error.message, 'error')
    } finally {
      isGenerating.value = false
    }
  }
  
  // 预览网站
  const previewWebsite = () => {
    // 保存当前配置到localStorage
    localStorage.setItem('previewConfig', JSON.stringify(websiteConfig.value))
    
    // 跳转到预览页面
    if (websiteId.value) {
      router.push(`/preview/${websiteId.value}`)
    } else {
      router.push(`/preview/temp-${templateId.value}`)
    }
  }
  </script>
  
  