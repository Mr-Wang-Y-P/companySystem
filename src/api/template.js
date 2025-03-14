// 将模拟API调用改为真实API调用
const BASE_URL = "https://companysysnode.wangyp.icu";

// 获取所有模板
export const fetchTemplates = () => {
  return fetch(`${BASE_URL}/api/templates`).then((response) => {
    if (!response.ok) {
      throw new Error("获取模板列表失败");
    }
    return response.json();
  });
}

// 根据ID获取模板
export const fetchTemplateById = (id) => {
  return fetch(`${BASE_URL}/api/templates/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error("获取模板详情失败");
    }
    return response.json();
  });
}