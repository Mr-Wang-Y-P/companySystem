import { defineStore } from "pinia"
import { ref } from "vue"

export const useToastStore = defineStore("toast", () => {
  const toast = ref({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  })

  const showToast = (message, type = "success") => {
    toast.value = {
      show: true,
      message,
      type,
    }

    // 自动隐藏
    setTimeout(() => {
      hideToast()
    }, 3000)
  }

  const hideToast = () => {
    toast.value.show = false
  }

  return {
    toast,
    showToast,
    hideToast,
  }
})

