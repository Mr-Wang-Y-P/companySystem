<template>
  <div>
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">网站预览</h1>
          <div class="flex space-x-3">
            <button
              @click="generateAndShowQRCode"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <QrCodeIcon class="h-5 w-5 mr-2" />
              二维码预览
            </button>
            <button
              @click="copyLink"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LinkIcon class="h-5 w-5 mr-2" />
              复制链接
            </button>
            <button
              @click="
                router.push(
                  `/config/${templateId}${
                    websiteId ? '?websiteId=' + websiteId : ''
                  }`
                )
              "
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <EditIcon class="h-5 w-5 mr-2" />
              继续编辑
            </button>
            <button
              @click="saveWebsite"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <SaveIcon class="h-5 w-5 mr-2" />
              保存网站
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow overflow-hidden rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div
            class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden"
          >
            <iframe
              ref="previewFrame"
              class="w-full h-full"
              :src="previewUrl"
              title="网站预览"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <QRCodeModal
      :show="showQRCode"
      :qrCodeUrl="qrCodeUrl"
      @close="showQRCode = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QrCodeIcon, LinkIcon, EditIcon, SaveIcon } from "lucide-vue-next";
import QRCodeModal from "@/components/QRCodeModal.vue";
import { useWebsiteStore } from "@/stores/website";
import { useToastStore } from "@/stores/toast";

const route = useRoute();
const router = useRouter();
const websiteStore = useWebsiteStore();
const toastStore = useToastStore();

const websiteId = ref(route.params.websiteId);
const templateId = ref(null);
const previewFrame = ref(null);
const showQRCode = ref(false);
const websiteConfig = ref(null);
const qrCodeUrl = ref("/qrcode-placeholder.png");
const isLoading = ref(false);

// 检查是否是临时预览
const isTempPreview = computed(() => {
  return String(websiteId.value).startsWith("temp-");
});

// 预览URL
const previewUrl = computed(() => {
  return `/api/preview/${websiteId.value}`;
});

onMounted(async () => {
  try {
    if (isTempPreview.value) {
      // 如果是临时预览，从localStorage获取配置
      const configStr = localStorage.getItem("previewConfig");
      if (configStr) {
        websiteConfig.value = JSON.parse(configStr);
        templateId.value = websiteConfig.value.templateId;
        console.log("从localStorage加载临时预览配置:", templateId.value);
      }
    } else {
      // 获取网站数据
      await websiteStore.fetchWebsiteById(websiteId.value);
      websiteConfig.value = websiteStore.currentWebsite;
      templateId.value = websiteConfig.value.templateId;
      console.log("加载网站配置:", websiteId.value, templateId.value);
    }
  } catch (error) {
    console.error("加载网站配置失败:", error);
    toastStore.showToast("加载网站配置失败: " + error.message, "error");
  }
});

// 生成并显示二维码
const generateAndShowQRCode = async () => {
  try {
    isLoading.value = true;
    const fullUrl = window.location.origin + previewUrl.value;
    console.log("生成二维码URL:", fullUrl);

    const response = await fetch(
      `/api/qrcode?url=${encodeURIComponent(fullUrl)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP错误 ${response.status}`);
    }

    const data = await response.json();
    qrCodeUrl.value = data.qrcode;
    showQRCode.value = true;
  } catch (error) {
    console.error("生成二维码失败:", error);
    toastStore.showToast("生成二维码失败: " + error.message, "error");
    qrCodeUrl.value = "/qrcode-placeholder.png";
  } finally {
    isLoading.value = false;
  }
};

// 复制链接
const copyLink = () => {
  const fullUrl = window.location.origin + previewUrl.value;
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    navigator.clipboard
      ?.writeText(fullUrl)
      .then(() => {
        toastStore.showToast("链接已复制到剪贴板！", "success");
      })
      .catch((err) => {
        console.error("复制链接失败:", err);
        toastStore.showToast("无法复制链接: " + err.message, "error");
      });
  } else {
    // 创建text area
    let textArea = document.createElement("textarea");
    textArea.value = fullUrl;
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = 0;
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
      toastStore.showToast("链接已复制到剪贴板！", "success");
    });
  }
};

// 保存网站
const saveWebsite = async () => {
  try {
    if (!websiteConfig.value) {
      throw new Error("网站配置不存在");
    }

    if (isTempPreview.value) {
      // 创建新网站
      await websiteStore.createWebsite(websiteConfig.value);
      toastStore.showToast("网站创建成功！", "success");
    } else {
      // 更新现有网站
      await websiteStore.updateWebsite(websiteId.value, websiteConfig.value);
      toastStore.showToast("网站更新成功！", "success");
    }

    router.push("/my-websites");
  } catch (error) {
    console.error("保存网站失败:", error);
    toastStore.showToast("保存失败：" + error.message, "error");
  }
};
</script>
