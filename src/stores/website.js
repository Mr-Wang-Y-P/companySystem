import { defineStore } from "pinia"
import { ref } from "vue"
import {
  fetchWebsites as apiGetWebsites,
  fetchWebsiteById as apiGetWebsiteById,
  createWebsite as apiCreateWebsite,
  updateWebsite as apiUpdateWebsite,
  deleteWebsite as apiDeleteWebsite,
} from "@/api/website"

export const useWebsiteStore = defineStore("website", () => {
  const websites = ref([])
  const currentWebsite = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchWebsites = async () => {
    loading.value = true
    error.value = null

    try {
      websites.value = await apiGetWebsites()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchWebsiteById = async (id) => {
    loading.value = true
    error.value = null

    try {
      currentWebsite.value = await apiGetWebsiteById(id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createWebsite = async (websiteData) => {
    loading.value = true
    error.value = null

    try {
      const newWebsite = await apiCreateWebsite(websiteData)
      websites.value.push(newWebsite)
      return newWebsite
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateWebsite = async (id, websiteData) => {
    loading.value = true
    error.value = null

    try {
      const updatedWebsite = await apiUpdateWebsite(id, websiteData)
      const index = websites.value.findIndex((website) => website.id === id)
      if (index !== -1) {
        websites.value[index] = updatedWebsite
      }
      return updatedWebsite
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteWebsite = async (id) => {
    loading.value = true
    error.value = null

    try {
      await apiDeleteWebsite(id)
      websites.value = websites.value.filter((website) => website.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    websites,
    currentWebsite,
    loading,
    error,
    fetchWebsites,
    fetchWebsiteById,
    createWebsite,
    updateWebsite,
    deleteWebsite,
  }
})

