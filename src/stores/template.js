import { defineStore } from "pinia"
import { ref } from "vue"
import { fetchTemplates as apiGetTemplates, fetchTemplateById as apiGetTemplateById } from "@/api/template"

export const useTemplateStore = defineStore("template", () => {
  const templates = ref([])
  const currentTemplate = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchTemplates = async () => {
    loading.value = true
    error.value = null

    try {
      templates.value = await apiGetTemplates()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchTemplateById = async (id) => {
    loading.value = true
    error.value = null

    try {
      currentTemplate.value = await apiGetTemplateById(id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    templates,
    currentTemplate,
    loading,
    error,
    fetchTemplates,
    fetchTemplateById,
  }
})

