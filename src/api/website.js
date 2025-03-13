// 将模拟API调用改为真实API调用

// 获取所有网站
export const fetchWebsites = () => {
  return fetch("/api/websites").then((response) => {
    if (!response.ok) {
      throw new Error("获取网站列表失败")
    }
    return response.json()
  })
}

// 根据ID获取网站
export const fetchWebsiteById = (id) => {
  return fetch(`/api/websites/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error("获取网站详情失败")
    }
    return response.json()
  })
}

// 创建网站
export const createWebsite = (websiteData) => {
  return fetch("/api/websites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(websiteData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("创建网站失败")
    }
    return response.json()
  })
}

// 更新网站
export const updateWebsite = (id, websiteData) => {
  return fetch(`/api/websites/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(websiteData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("更新网站失败")
    }
    return response.json()
  })
}

// 删除网站
export const deleteWebsite = (id) => {
  return fetch(`/api/websites/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("删除网站失败")
    }
    return
  })
}

