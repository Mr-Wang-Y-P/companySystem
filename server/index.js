import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import QRCode from "qrcode";

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "../dist")));

// 模拟数据存储
// 导入模板生成器模块
import { generateTemplateByType } from "./template.js"
import templates from "./data/templates.json" assert { type: "json" };
import websites from "./data/websites.json"  assert { type: "json" };
let websiteArr = JSON.parse(JSON.stringify(websites));
// 模板API
app.get("/api/templates", async (req, res) => {
  res.json(templates);
});

app.get("/api/templates/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const template = templates.find((t) => t.id === id);

  if (template) {
    res.json(template);
  } else {
    res.status(404).json({ error: "模板不存在" });
  }
});

// 网站API
app.get("/api/websites", async (req, res) => {
//   websiteArr = await websiteArr;
  res.json(websiteArr);
});

app.get("/api/websites/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
//   websiteArr = await websiteArr;
  const website = websiteArr?.find((w) => w.id === id);

  if (website) {
    res.json(website);
  } else {
    res.status(404).json({ error: "网站不存在" });
  }
});

app.post("/api/websites", async (req, res) => {
//   websiteArr = await websiteArr;
  const newWebsite = {
    id: websiteArr.length > 0 ? Math.max(...websiteArr?.map((w) => w.id)) + 1 : 1,
    ...req.body,
    createdAt: new Date().toISOString().split("T")[0],
    url: `https://example.com/site${websiteArr.length + 1}`,
    thumbnail: getTemplateImg(req.body),
  };

  websiteArr.push(newWebsite);
  savewebsiteArr();
  res.status(201).json(newWebsite);
});

app.put("/api/websites/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
//   websiteArr = await websiteArr;
  const index = websiteArr?.findIndex((w) => w.id === id);

  if (index !== -1) {
    const updatedWebsite = {
      ...websiteArr[index],
      ...req.body,
      id: id,
    };

    websiteArr[index] = updatedWebsite;
    savewebsiteArr();
    res.json(updatedWebsite);
  } else {
    res.status(404).json({ error: "网站不存在" });
  }
});

app.delete("/api/websites/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
//   websiteArr = await websiteArr;
  const index = websiteArr?.findIndex((w) => w.id === id);

  if (index !== -1) {
    websiteArr = websiteArr?.filter((w) => w.id !== id);
    savewebsiteArr();
    res.status(204).send();
  } else {
    res.status(404).json({ error: "网站不存在" });
  }
});

// 修改预览API
app.get("/api/preview/:id", (req, res) => {
    try {
      const id = req.params.id
      console.log(`预览请求ID: ${id}`)
  
      // 检查是否是临时预览
      if (id.startsWith("temp-")) {
        // 临时预览，返回一个简单的HTML页面
        const templateId = Number.parseInt(id.replace("temp-", ""))
        console.log(`临时预览模板ID: ${templateId}`)
  
        const template = templates.find((t) => t.id === templateId)
  
        if (template) {
          console.log(`找到模板: ${template.name}`)
  
          // 从localStorage或会话中获取临时预览数据
          const previewConfig = req.session?.previewConfig || {
            companyName: "预览模式",
            templateId: templateId,
          }
  
          // 根据模板类型选择合适的模板生成函数
          let templateType = "default"
  
          if (template.industry && template.industry.includes("科技")) {
            templateType = "modern-tech"
          } else if (template.industry && template.industry.includes("设计")) {
            templateType = "creative-design"
          } else if (template.industry && template.industry.includes("制造")) {
            templateType = "traditional-business"
          } else if (template.industry && template.industry.includes("餐饮")) {
            templateType = "food-business"
          }
  
          res.send(generateTemplateByType(templateType, template.name, previewConfig))
        } else {
          console.log(`未找到模板ID: ${templateId}`)
          res.status(404).send("模板不存在")
        }
      } else {
        // 正式网站预览
        const websiteId = Number.parseInt(id)
        console.log(`网站预览ID: ${websiteId}`)
  
        const website = websiteArr.find((w) => w.id === websiteId)
  
        if (website) {
          console.log(`找到网站: ${website.name}`)
          const template = templates.find((t) => t.id === website.templateId)
          if (template) {
            console.log(`找到对应模板: ${template.name}`)
  
            // 根据模板类型选择合适的模板生成函数
            let templateType = "default"
  
            if (template.industry && template.industry.includes("科技")) {
              templateType = "modern-tech"
            } else if (template.industry && template.industry.includes("设计")) {
              templateType = "creative-design"
            } else if (template.industry && template.industry.includes("制造")) {
              templateType = "traditional-business"
            } else if (template.industry && template.industry.includes("餐饮")) {
              templateType = "food-business"
            }
            console.log('website', website)
            res.send(generateTemplateByType(templateType, template.name, website))
          } else {
            console.log(`未找到对应模板ID: ${website.templateId}`)
            res.status(404).send("模板不存在")
          }
        } else {
          console.log(`未找到网站ID: ${websiteId}`)
          res.status(404).send("网站不存在")
        }
      }
    } catch (error) {
      console.error("预览API错误:", error)
      res.status(500).send("服务器错误")
    }
  })

// 生成二维码 - 修复版本
app.get("/api/qrcode", (req, res) => {
  try {
    const url = req.query.url;
    console.log(`二维码请求URL: ${url}`);

    if (!url) {
      console.log("缺少URL参数");
      return res.status(400).json({ error: "缺少URL参数" });
    }

    QRCode.toDataURL(url, (err, dataUrl) => {
      if (err) {
        console.error("生成二维码失败:", err);
        return res.status(500).json({ error: "生成二维码失败" });
      }

      console.log("二维码生成成功");
      res.json({ qrcode: dataUrl });
    });
  } catch (error) {
    console.error("二维码API错误:", error);
    res.status(500).json({ error: "服务器错误" });
  }
});

// 保存网站数据到文件
function savewebsiteArr() {
  fs.writeFileSync(
    path.join(process.cwd(), "./data/websiteArr.json"),
    JSON.stringify(websiteArr, null, 2)
  );
}

const getTemplateImg = (template) => {
        if (template.industry && template.industry.includes("科技")) {
            return '/public/images/科技.png'
          } else if (template.industry && template.industry.includes("设计")) {
            return '/public/images/现代.png'
          } else if (template.industry && template.industry.includes("制造")) {
            return '/public/images/传统.png'
          } else if (template.industry && template.industry.includes("餐饮")) {
            return '/public/images/食物.png'
          }else {
            return '/public/images/现代.png'
          }
    }

// 生成预览HTML
// function generatePreviewHTML(templateName, companyName) {
//     return `
//       <!DOCTYPE html>
//       <html lang="zh-CN">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${companyName} - 网站预览</title>
//         <style>
//           html {
//             scroll-behavior: smooth; /* 添加平滑滚动 */
//           }
//           body {
//             font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             color: #333;
//             position: relative;
//           }
//           header {
//             background-color: #4f46e5;
//             color: white;
//             padding: 1rem;
//           }
//           nav {
//             background-color: #f9fafb;
//             padding: 0.5rem 1rem;
//             border-bottom: 1px solid #e5e7eb;
//             position: sticky;
//             top: 0;
//             z-index: 100;
//           }
//           nav ul {
//             display: flex;
//             list-style: none;
//             margin: 0;
//             padding: 0;
//           }
//           nav li {
//             margin-right: 1rem;
//           }
//           nav a {
//             color: #4b5563;
//             text-decoration: none;
//             font-size: 0.875rem;
//             padding: 0.5rem;
//             border-radius: 0.25rem;
//             transition: all 0.3s ease;
//           }
//           nav a:hover {
//             background-color: #e5e7eb;
//             color: #1f2937;
//           }
//           main {
//             padding: 2rem;
//           }
//           .hero {
//             text-align: center;
//             padding: 3rem 1rem;
//             background-color: #f3f4f6;
//             margin-bottom: 2rem;
//           }
//           .hero h1 {
//             font-size: 2.25rem;
//             color: #111827;
//             margin-bottom: 1rem;
//           }
//           .hero p {
//             font-size: 1.125rem;
//             color: #6b7280;
//             max-width: 36rem;
//             margin: 0 auto;
//           }
//           .content {
//             max-width: 64rem;
//             margin: 0 auto;
//           }
//           .section {
//             margin-bottom: 3rem;
//             padding-top: 2rem; /* 为锚点添加顶部间距 */
//           }
//           .section h2 {
//             font-size: 1.5rem;
//             color: #111827;
//             margin-bottom: 1rem;
//             padding-bottom: 0.5rem;
//             border-bottom: 1px solid #e5e7eb;
//           }
//           .grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
//             gap: 1.5rem;
//           }
//           .card {
//             border: 1px solid #e5e7eb;
//             border-radius: 0.5rem;
//             overflow: hidden;
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//           }
//           .card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//           }
//           .card-img {
//             height: 12rem;
//             background-color: #f3f4f6;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #9ca3af;
//           }
//           .card-body {
//             padding: 1rem;
//           }
//           .card-title {
//             font-size: 1.125rem;
//             font-weight: 500;
//             margin-bottom: 0.5rem;
//           }
//           .card-text {
//             color: #6b7280;
//             font-size: 0.875rem;
//           }
//           footer {
//             background-color: #1f2937;
//             color: white;
//             padding: 2rem;
//             text-align: center;
//           }
//           .back-to-top {
//             position: fixed;
//             bottom: 2rem;
//             right: 2rem;
//             background-color: #4f46e5;
//             color: white;
//             width: 3rem;
//             height: 3rem;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             text-decoration: none;
//             opacity: 0;
//             transition: opacity 0.3s ease;
//             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//             z-index: 99;
//           }
//           .back-to-top.visible {
//             opacity: 1;
//           }
//           .back-to-top:hover {
//             background-color: #4338ca;
//           }
//         </style>
//       </head>
//       <body>
//         <header id="top">
//           <h1>${companyName}</h1>
//           <p>基于 ${templateName} 模板</p>
//         </header>
        
//         <nav>
//           <ul>
//             <li><a href="#top">首页</a></li>
//             <li><a href="#about">关于我们</a></li>
//             <li><a href="#service">产品服务</a></li>
//             <li><a href="#call">联系我们</a></li>
//           </ul>
//         </nav>
        
//         <main>
//           <div class="hero" id="hero">
//             <h1>欢迎访问 ${companyName}</h1>
//             <p>这是一个网站预览页面，展示了基于 ${templateName} 模板生成的网站效果。</p>
//           </div>
          
//           <div class="content">
//             <div class="section" id="about">
//               <h2>关于我们</h2>
//               <p>我们是一家专注于提供高质量产品和服务的企业，致力于为客户创造价值。</p>
//               <p>公司成立于2010年，经过多年的发展，已经成为行业内的领先企业。我们拥有一支专业的团队，为客户提供全方位的解决方案。</p>
//               <p>我们的使命是通过创新和卓越的服务，帮助客户实现业务目标，创造更大的价值。</p>
//             </div>
            
//             <div class="section" id="service">
//               <h2>产品服务</h2>
//               <div class="grid">
//                 <div class="card">
//                   <div class="card-img">产品图片</div>
//                   <div class="card-body">
//                     <h3 class="card-title">产品一</h3>
//                     <p class="card-text">这是产品一的简介，描述产品的特点和优势。我们提供高质量的产品，满足客户的各种需求。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img">产品图片</div>
//                   <div class="card-body">
//                     <h3 class="card-title">产品二</h3>
//                     <p class="card-text">这是产品二的简介，描述产品的特点和优势。我们的产品采用先进技术，确保性能稳定可靠。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img">产品图片</div>
//                   <div class="card-body">
//                     <h3 class="card-title">产品三</h3>
//                     <p class="card-text">这是产品三的简介，描述产品的特点和优势。我们不断创新，为客户提供更好的产品体验。</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div class="section" id="call">
//               <h2>联系我们</h2>
//               <p>地址：北京市朝阳区科技园区88号</p>
//               <p>电话：010-12345678</p>
//               <p>邮箱：contact@example.com</p>
//             </div>
//           </div>
//         </main>
        
//         <footer>
//           <p>&copy; 2023 ${companyName}. 保留所有权利。</p>
//         </footer>
  
//         <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
//         <script>
//           // 回到顶部按钮显示/隐藏逻辑
//           const backToTopButton = document.getElementById('backToTop');
          
//           window.addEventListener('scroll', () => {
//             if (window.pageYOffset > 300) {
//               backToTopButton.classList.add('visible');
//             } else {
//               backToTopButton.classList.remove('visible');
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;
//   }

// function generateModernTechTemplate(templateName, companyName) {
//     return `
//       <!DOCTYPE html>
//       <html lang="zh-CN">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${companyName} - 网站预览</title>
//         <style>
//           html {
//             scroll-behavior: smooth;
//           }
//           body {
//             font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             color: #111827;
//             background-color: #f9fafb;
//             position: relative;
//           }
//           header {
//             background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
//             color: white;
//             padding: 2rem;
//             text-align: center;
//           }
//           header h1 {
//             font-size: 2.5rem;
//             margin-bottom: 0.5rem;
//             font-weight: 800;
//           }
//           nav {
//             background-color: white;
//             padding: 1rem 2rem;
//             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//             position: sticky;
//             top: 0;
//             z-index: 100;
//           }
//           nav ul {
//             display: flex;
//             list-style: none;
//             margin: 0;
//             padding: 0;
//             justify-content: center;
//           }
//           nav li {
//             margin: 0 1rem;
//           }
//           nav a {
//             color: #4b5563;
//             text-decoration: none;
//             font-size: 1rem;
//             font-weight: 500;
//             padding: 0.5rem 1rem;
//             border-radius: 0.375rem;
//             transition: all 0.3s ease;
//           }
//           nav a:hover {
//             color: #6366f1;
//             background-color: #f3f4f6;
//           }
//           main {
//             padding: 2rem;
//           }
//           .hero {
//             text-align: center;
//             padding: 5rem 1rem;
//             background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://source.unsplash.com/random/1600x900/?technology') center/cover no-repeat;
//             margin-bottom: 3rem;
//             border-radius: 0.5rem;
//             box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//           }
//           .hero h1 {
//             font-size: 3rem;
//             color: #111827;
//             margin-bottom: 1.5rem;
//             font-weight: 800;
//           }
//           .hero p {
//             font-size: 1.25rem;
//             color: #4b5563;
//             max-width: 42rem;
//             margin: 0 auto;
//             line-height: 1.7;
//           }
//           .content {
//             max-width: 72rem;
//             margin: 0 auto;
//           }
//           .section {
//             margin-bottom: 5rem;
//             padding-top: 2rem;
//             background-color: white;
//             border-radius: 0.5rem;
//             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//             padding: 2rem;
//           }
//           .section h2 {
//             font-size: 2rem;
//             color: #111827;
//             margin-bottom: 1.5rem;
//             font-weight: 700;
//             position: relative;
//             padding-bottom: 1rem;
//           }
//           .section h2::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 4rem;
//             height: 0.25rem;
//             background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
//             border-radius: 0.125rem;
//           }
//           .grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
//             gap: 2rem;
//           }
//           .card {
//             border-radius: 0.5rem;
//             overflow: hidden;
//             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//             background-color: white;
//           }
//           .card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//           }
//           .card-img {
//             height: 15rem;
//             background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #6366f1;
//             font-weight: 600;
//           }
//           .card-body {
//             padding: 1.5rem;
//           }
//           .card-title {
//             font-size: 1.25rem;
//             font-weight: 600;
//             margin-bottom: 0.75rem;
//             color: #111827;
//           }
//           .card-text {
//             color: #4b5563;
//             font-size: 1rem;
//             line-height: 1.6;
//           }
//           .contact-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
//             gap: 2rem;
//           }
//           .contact-item {
//             display: flex;
//             align-items: center;
//             padding: 1rem;
//             background-color: #f3f4f6;
//             border-radius: 0.5rem;
//           }
//           .contact-icon {
//             width: 3rem;
//             height: 3rem;
//             background-color: #6366f1;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin-right: 1rem;
//             color: white;
//             font-size: 1.25rem;
//           }
//           .contact-text {
//             font-size: 1rem;
//             color: #4b5563;
//           }
//           footer {
//             background-color: #1f2937;
//             color: white;
//             padding: 3rem 2rem;
//             text-align: center;
//           }
//           .back-to-top {
//             position: fixed;
//             bottom: 2rem;
//             right: 2rem;
//             background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
//             color: white;
//             width: 3.5rem;
//             height: 3.5rem;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             text-decoration: none;
//             opacity: 0;
//             transition: opacity 0.3s ease, transform 0.3s ease;
//             box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//             z-index: 99;
//             font-size: 1.5rem;
//           }
//           .back-to-top.visible {
//             opacity: 1;
//           }
//           .back-to-top:hover {
//             transform: translateY(-5px);
//           }
//         </style>
//       </head>
//       <body>
//         <header id="top">
//           <h1>${companyName}</h1>
//           <p>基于 ${templateName} 模板 | 现代科技风格</p>
//         </header>
        
//         <nav>
//           <ul>
//             <li><a href="#top">首页</a></li>
//             <li><a href="#about">关于我们</a></li>
//             <li><a href="#service">产品服务</a></li>
//             <li><a href="#call">联系我们</a></li>
//           </ul>
//         </nav>
        
//         <main>
//           <div class="hero" id="hero">
//             <h1>创新科技，引领未来</h1>
//             <p>我们致力于为客户提供最前沿的技术解决方案，帮助企业实现数字化转型，提升竞争力。</p>
//           </div>
          
//           <div class="content">
//             <div class="section" id="about">
//               <h2>关于我们</h2>
//               <p>${companyName}成立于2010年，是一家专注于技术创新的企业。我们拥有一支由行业专家组成的团队，致力于为客户提供最优质的产品和服务。</p>
//               <p>我们的核心价值观是创新、品质和客户至上。通过不断探索和创新，我们已经成为行业内的领先企业，为众多客户提供了成功的解决方案。</p>
//               <p>我们的使命是通过技术创新，帮助企业提升效率，降低成本，实现可持续发展。我们相信，科技的力量可以改变世界，创造更美好的未来。</p>
//             </div>
            
//             <div class="section" id="service">
//               <h2>产品服务</h2>
//               <div class="grid">
//                 <div class="card">
//                   <div class="card-img">智能解决方案</div>
//                   <div class="card-body">
//                     <h3 class="card-title">人工智能平台</h3>
//                     <p class="card-text">我们的AI平台集成了最先进的机器学习算法，帮助企业实现数据分析、预测和决策自动化，提升业务效率和准确性。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img">云服务</div>
//                   <div class="card-body">
//                     <h3 class="card-title">企业云平台</h3>
//                     <p class="card-text">安全、可靠、高效的云计算服务，为企业提供灵活的IT基础设施，支持业务快速扩展和创新。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img">数据分析</div>
//                   <div class="card-body">
//                     <h3 class="card-title">大数据分析工具</h3>
//                     <p class="card-text">强大的数据处理和分析工具，帮助企业从海量数据中挖掘价值，发现业务洞察，制定更明智的决策。</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div class="section" id="call">
//               <h2>联系我们</h2>
//               <div class="contact-grid">
//                 <div class="contact-item">
//                   <div class="contact-icon">📍</div>
//                   <div class="contact-text">北京市朝阳区科技园区88号</div>
//                 </div>
//                 <div class="contact-item">
//                   <div class="contact-icon">📞</div>
//                   <div class="contact-text">010-12345678</div>
//                 </div>
//                 <div class="contact-item">
//                   <div class="contact-icon">✉️</div>
//                   <div class="contact-text">contact@example.com</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
        
//         <footer>
//           <p>&copy; 2023 ${companyName}. 保留所有权利。</p>
//           <p>创新科技，引领未来</p>
//         </footer>
  
//         <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
//         <script>
//           // 回到顶部按钮显示/隐藏逻辑
//           const backToTopButton = document.getElementById('backToTop');
          
//           window.addEventListener('scroll', () => {
//             if (window.pageYOffset > 300) {
//               backToTopButton.classList.add('visible');
//             } else {
//               backToTopButton.classList.remove('visible');
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;
//   }

// function generateCreativeDesignTemplate(templateName, companyName) {
//     return `
//       <!DOCTYPE html>
//       <html lang="zh-CN">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${companyName} - 网站预览</title>
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
//           html {
//             scroll-behavior: smooth;
//           }
//           body {
//             font-family: 'Poppins', sans-serif;
//             margin: 0;
//             padding: 0;
//             color: #333;
//             background-color: #fff;
//             position: relative;
//             overflow-x: hidden;
//           }
//           header {
//             background-color: #ff6b6b;
//             color: white;
//             padding: 2rem;
//             text-align: center;
//             position: relative;
//             overflow: hidden;
//           }
//           header::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.8) 0%, rgba(255, 107, 107, 0) 50%),
//                       radial-gradient(circle at 80% 80%, rgba(255, 230, 109, 0.8) 0%, rgba(255, 230, 109, 0) 50%);
//             z-index: 0;
//           }
//           header h1, header p {
//             position: relative;
//             z-index: 1;
//           }
//           header h1 {
//             font-size: 3rem;
//             margin-bottom: 0.5rem;
//             font-weight: 700;
//           }
//           nav {
//             background-color: white;
//             padding: 1rem 2rem;
//             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//             position: sticky;
//             top: 0;
//             z-index: 100;
//           }
//           nav ul {
//             display: flex;
//             list-style: none;
//             margin: 0;
//             padding: 0;
//             justify-content: center;
//           }
//           nav li {
//             margin: 0 1rem;
//           }
//           nav a {
//             color: #333;
//             text-decoration: none;
//             font-size: 1rem;
//             font-weight: 500;
//             padding: 0.5rem 1rem;
//             border-radius: 2rem;
//             transition: all 0.3s ease;
//             position: relative;
//           }
//           nav a::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             left: 50%;
//             width: 0;
//             height: 2px;
//             background-color: #ff6b6b;
//             transition: all 0.3s ease;
//             transform: translateX(-50%);
//           }
//           nav a:hover::after {
//             width: 80%;
//           }
//           nav a:hover {
//             color: #ff6b6b;
//           }
//           main {
//             padding: 2rem;
//           }
//           .hero {
//             text-align: center;
//             padding: 5rem 1rem;
//             background-color: #f8f9fa;
//             margin-bottom: 3rem;
//             border-radius: 1rem;
//             position: relative;
//             overflow: hidden;
//           }
//           .hero::before {
//             content: '';
//             position: absolute;
//             top: -50px;
//             right: -50px;
//             width: 200px;
//             height: 200px;
//             border-radius: 50%;
//             background-color: rgba(255, 107, 107, 0.1);
//             z-index: 0;
//           }
//           .hero::after {
//             content: '';
//             position: absolute;
//             bottom: -30px;
//             left: -30px;
//             width: 150px;
//             height: 150px;
//             border-radius: 50%;
//             background-color: rgba(255, 230, 109, 0.1);
//             z-index: 0;
//           }
//           .hero h1 {
//             font-size: 3.5rem;
//             color: #333;
//             margin-bottom: 1.5rem;
//             font-weight: 700;
//             position: relative;
//             z-index: 1;
//           }
//           .hero p {
//             font-size: 1.25rem;
//             color: #666;
//             max-width: 42rem;
//             margin: 0 auto;
//             line-height: 1.7;
//             position: relative;
//             z-index: 1;
//           }
//           .content {
//             max-width: 72rem;
//             margin: 0 auto;
//           }
//           .section {
//             margin-bottom: 5rem;
//             padding: 3rem;
//             background-color: white;
//             border-radius: 1rem;
//             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
//             position: relative;
//             overflow: hidden;
//           }
//           .section::before {
//             content: '';
//             position: absolute;
//             width: 100px;
//             height: 100px;
//             border-radius: 50%;
//             background-color: rgba(255, 107, 107, 0.05);
//             z-index: 0;
//           }
//           #about::before {
//             top: -50px;
//             left: -50px;
//           }
//           #service::before {
//             bottom: -50px;
//             right: -50px;
//             background-color: rgba(255, 230, 109, 0.05);
//           }
//           #call::before {
//             top: -50px;
//             right: -50px;
//             background-color: rgba(130, 204, 221, 0.05);
//           }
//           .section h2 {
//             font-size: 2.5rem;
//             color: #333;
//             margin-bottom: 2rem;
//             font-weight: 700;
//             position: relative;
//             display: inline-block;
//           }
//           .section h2::after {
//             content: '';
//             position: absolute;
//             bottom: -10px;
//             left: 0;
//             width: 50%;
//             height: 4px;
//             background-color: #ff6b6b;
//             border-radius: 2px;
//           }
//           .grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//             gap: 2rem;
//           }
//           .card {
//             border-radius: 1rem;
//             overflow: hidden;
//             box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//             background-color: white;
//             position: relative;
//             z-index: 1;
//           }
//           .card:hover {
//             transform: translateY(-10px);
//             box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
//           }
//           .card-img {
//             height: 200px;
//             background: linear-gradient(45deg, #ff6b6b, #feca57);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-weight: 600;
//             font-size: 1.5rem;
//           }
//           .card-body {
//             padding: 2rem;
//           }
//           .card-title {
//             font-size: 1.5rem;
//             font-weight: 600;
//             margin-bottom: 1rem;
//             color: #333;
//           }
//           .card-text {
//             color: #666;
//             font-size: 1rem;
//             line-height: 1.7;
//           }
//           .contact-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 2rem;
//           }
//           .contact-item {
//             display: flex;
//             align-items: center;
//             padding: 1.5rem;
//             background-color: #f8f9fa;
//             border-radius: 1rem;
//             transition: transform 0.3s ease;
//           }
//           .contact-item:hover {
//             transform: translateY(-5px);
//           }
//           .contact-icon {
//             width: 4rem;
//             height: 4rem;
//             background: linear-gradient(45deg, #ff6b6b, #feca57);
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin-right: 1.5rem;
//             color: white;
//             font-size: 1.5rem;
//           }
//           .contact-text {
//             font-size: 1.1rem;
//             color: #333;
//           }
//           footer {
//             background-color: #333;
//             color: white;
//             padding: 3rem 2rem;
//             text-align: center;
//             position: relative;
//             overflow: hidden;
//           }
//           footer::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: radial-gradient(circle at 10% 90%, rgba(255, 107, 107, 0.3) 0%, rgba(255, 107, 107, 0) 30%),
//                       radial-gradient(circle at 90% 10%, rgba(255, 230, 109, 0.3) 0%, rgba(255, 230, 109, 0) 30%);
//             z-index: 0;
//           }
//           footer p {
//             position: relative;
//             z-index: 1;
//           }
//           .back-to-top {
//             position: fixed;
//             bottom: 2rem;
//             right: 2rem;
//             background: linear-gradient(45deg, #ff6b6b, #feca57);
//             color: white;
//             width: 3.5rem;
//             height: 3.5rem;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             text-decoration: none;
//             opacity: 0;
//             transition: all 0.3s ease;
//             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//             z-index: 99;
//             font-size: 1.5rem;
//           }
//           .back-to-top.visible {
//             opacity: 1;
//           }
//           .back-to-top:hover {
//             transform: translateY(-5px) scale(1.1);
//           }
//         </style>
//       </head>
//       <body>
//         <header id="top">
//           <h1>${companyName}</h1>
//           <p>基于 ${templateName} 模板 | 创意设计风格</p>
//         </header>
        
//         <nav>
//           <ul>
//             <li><a href="#top">首页</a></li>
//             <li><a href="#about">关于我们</a></li>
//             <li><a href="#service">作品展示</a></li>
//             <li><a href="#call">联系我们</a></li>
//           </ul>
//         </nav>
        
//         <main>
//           <div class="hero" id="hero">
//             <h1>创意无限，设计未来</h1>
//             <p>我们是一家充满激情的创意设计工作室，致力于为客户提供独特、创新的设计解决方案。</p>
//           </div>
          
//           <div class="content">
//             <div class="section" id="about">
//               <h2>关于我们</h2>
//               <p>${companyName}成立于2015年，是一家专注于视觉设计和品牌塑造的创意工作室。我们的团队由一群充满激情和创造力的设计师组成，每个人都拥有独特的视角和丰富的行业经验。</p>
//               <p>我们相信设计的力量可以改变世界，通过创新的视觉语言和独特的创意思维，我们帮助客户建立强大的品牌形象，传达核心价值，吸引目标受众。</p>
//               <p>无论是品牌设计、网站开发还是营销活动，我们都致力于提供超越期望的创意解决方案，帮助客户在竞争激烈的市场中脱颖而出。</p>
//             </div>
            
//             <div class="section" id="service">
//               <h2>作品展示</h2>
//               <div class="grid">
//                 <div class="card">
//                   <div class="card-img">品牌设计</div>
//                   <div class="card-body">
//                     <h3 class="card-title">企业品牌重塑</h3>
//                     <p class="card-text">为成立十周年的科技公司进行品牌重塑，包括logo设计、视觉识别系统和品牌指南，帮助企业展现创新精神和专业形象。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img">网站设计</div>
//                   <div class="card-body">
//                     <h3 class="card-title">响应式电商平台</h3>
//                     <p class="card-text">为时尚品牌设计并开发的响应式电商平台，融合现代美学和用户体验设计，提升转化率和用户满意度。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img">包装设计</div>
//                   <div class="card-body">
//                     <h3 class="card-title">有机食品包装</h3>
//                     <p class="card-text">为有机食品品牌设计的环保包装系列，通过清新自然的视觉元素传达产品的纯净和健康理念。</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div class="section" id="call">
//               <h2>联系我们</h2>
//               <div class="contact-grid">
//                 <div class="contact-item">
//                   <div class="contact-icon">📍</div>
//                   <div class="contact-text">上海市静安区创意园区25号</div>
//                 </div>
//                 <div class="contact-item">
//                   <div class="contact-icon">📞</div>
//                   <div class="contact-text">021-87654321</div>
//                 </div>
//                 <div class="contact-item">
//                   <div class="contact-icon">✉️</div>
//                   <div class="contact-text">design@example.com</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
        
//         <footer>
//           <p>&copy; 2023 ${companyName}. 保留所有权利。</p>
//           <p>创意无限，设计未来</p>
//         </footer>
  
//         <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
//         <script>
//           // 回到顶部按钮显示/隐藏逻辑
//           const backToTopButton = document.getElementById('backToTop');
          
//           window.addEventListener('scroll', () => {
//             if (window.pageYOffset > 300) {
//               backToTopButton.classList.add('visible');
//             } else {
//               backToTopButton.classList.remove('visible');
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;
//   }
// function generateTraditionalBusinessTemplate(templateName, companyName) {
//     return `
//       <!DOCTYPE html>
//       <html lang="zh-CN">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${companyName} - 网站预览</title>
//         <style>
//           html {
//             scroll-behavior: smooth;
//           }
//           body {
//             font-family: 'Noto Serif SC', serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             color: #333;
//             background-color: #f8f8f8;
//             position: relative;
//           }
//           header {
//             background-color: #1a3a5f;
//             color: white;
//             padding: 2rem;
//             text-align: center;
//           }
//           header h1 {
//             font-size: 2.5rem;
//             margin-bottom: 0.5rem;
//             font-weight: 700;
//           }
//           nav {
//             background-color: #0d2240;
//             padding: 1rem 2rem;
//             position: sticky;
//             top: 0;
//             z-index: 100;
//           }
//           nav ul {
//             display: flex;
//             list-style: none;
//             margin: 0;
//             padding: 0;
//             justify-content: center;
//           }
//           nav li {
//             margin: 0 1rem;
//           }
//           nav a {
//             color: white;
//             text-decoration: none;
//             font-size: 1rem;
//             font-weight: 500;
//             padding: 0.5rem 1rem;
//             transition: all 0.3s ease;
//           }
//           nav a:hover {
//             background-color: rgba(255, 255, 255, 0.1);
//             border-radius: 4px;
//           }
//           main {
//             padding: 2rem;
//           }
//           .hero {
//             text-align: center;
//             padding: 4rem 1rem;
//             background-color: #e8eef4;
//             margin-bottom: 3rem;
//             border: 1px solid #d1d9e6;
//           }
//           .hero h1 {
//             font-size: 2.5rem;
//             color: #1a3a5f;
//             margin-bottom: 1.5rem;
//             font-weight: 700;
//           }
//           .hero p {
//             font-size: 1.25rem;
//             color: #4a5568;
//             max-width: 42rem;
//             margin: 0 auto;
//             line-height: 1.7;
//           }
//           .content {
//             max-width: 72rem;
//             margin: 0 auto;
//           }
//           .section {
//             margin-bottom: 4rem;
//             padding: 2rem;
//             background-color: white;
//             border: 1px solid #d1d9e6;
//           }
//           .section h2 {
//             font-size: 2rem;
//             color: #1a3a5f;
//             margin-bottom: 1.5rem;
//             font-weight: 700;
//             padding-bottom: 0.5rem;
//             border-bottom: 2px solid #d1d9e6;
//           }
//           .grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//             gap: 2rem;
//           }
//           .card {
//             border: 1px solid #d1d9e6;
//             overflow: hidden;
//             background-color: white;
//           }
//           .card-img {
//             height: 200px;
//             background-color: #e8eef4;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #1a3a5f;
//             font-weight: 600;
//           }
//           .card-body {
//             padding: 1.5rem;
//           }
//           .card-title {
//             font-size: 1.25rem;
//             font-weight: 600;
//             margin-bottom: 1rem;
//             color: #1a3a5f;
//           }
//           .card-text {
//             color: #4a5568;
//             font-size: 1rem;
//             line-height: 1.6;
//           }
//           .contact-info {
//             background-color: #e8eef4;
//             padding: 1.5rem;
//             border: 1px solid #d1d9e6;
//           }
//           .contact-info p {
//             margin: 0.5rem 0;
//             color: #4a5568;
//           }
//           .contact-info strong {
//             color: #1a3a5f;
//             margin-right: 0.5rem;
//           }
//           footer {
//             background-color: #1a3a5f;
//             color: white;
//             padding: 2rem;
//             text-align: center;
//           }
//           .back-to-top {
//             position: fixed;
//             bottom: 2rem;
//             right: 2rem;
//             background-color: #1a3a5f;
//             color: white;
//             width: 3rem;
//             height: 3rem;
//             border-radius: 4px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             text-decoration: none;
//             opacity: 0;
//             transition: opacity 0.3s ease;
//             box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//             z-index: 99;
//           }
//           .back-to-top.visible {
//             opacity: 1;
//           }
//           .back-to-top:hover {
//             background-color: #0d2240;
//           }
//         </style>
//       </head>
//       <body>
//         <header id="top">
//           <h1>${companyName}</h1>
//           <p>基于 ${templateName} 模板 | 传统企业风格</p>
//         </header>
        
//         <nav>
//           <ul>
//             <li><a href="#top">首页</a></li>
//             <li><a href="#about">公司简介</a></li>
//             <li><a href="#service">产品中心</a></li>
//             <li><a href="#call">联系方式</a></li>
//           </ul>
//         </nav>
        
//         <main>
//           <div class="hero" id="hero">
//             <h1>专业品质，诚信服务</h1>
//             <p>三十年专业制造经验，为客户提供高品质的产品和全方位的解决方案。</p>
//           </div>
          
//           <div class="content">
//             <div class="section" id="about">
//               <h2>公司简介</h2>
//               <p>${companyName}成立于1990年，是一家专业从事机械设备制造的企业。经过三十年的发展，公司已成为行业内的领军企业，产品远销国内外。</p>
//               <p>公司拥有现代化的生产基地和先进的制造设备，严格按照ISO9001质量管理体系运行，确保产品的高品质和稳定性。我们的研发团队由行业专家组成，不断推出创新产品，满足市场需求。</p>
//               <p>公司秉承"诚信为本，品质至上"的经营理念，致力于为客户提供最优质的产品和最完善的服务。我们相信，只有帮助客户成功，才能实现企业的可持续发展。</p>
//             </div>
            
//             <div class="section" id="service">
//               <h2>产品中心</h2>
//               <div class="grid">
//                 <div class="card">
//                   <div class="card-img">产品图片</div>
//                   <div class="card-body">
//                     <h3 class="card-title">高精度数控机床</h3>
//                     <p class="card-text">采用先进技术，精度高，稳定性好，适用于航空航天、汽车制造等高精度加工领域。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img">产品图片</div>
//                   <div class="card-body">
//                     <h3 class="card-title">工业自动化设备</h3>
//                     <p class="card-text">提供定制化的工业自动化解决方案，提高生产效率，降低人工成本。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img">产品图片</div>
//                   <div class="card-body">
//                     <h3 class="card-title">精密零部件</h3>
//                     <p class="card-text">专业生产各类精密零部件，材质多样，加工精度高，广泛应用于各个行业。</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div class="section" id="call">
//               <h2>联系方式</h2>
//               <div class="contact-info">
//                 <p><strong>地址：</strong>江苏省苏州市工业园区机械大道88号</p>
//                 <p><strong>电话：</strong>0512-12345678</p>
//                 <p><strong>传真：</strong>0512-87654321</p>
//                 <p><strong>邮箱：</strong>info@example.com</p>
//                 <p><strong>营业时间：</strong>周一至周五 8:30-17:30</p>
//               </div>
//             </div>
//           </div>
//         </main>
        
//         <footer>
//           <p>&copy; 2023 ${companyName}. 保留所有权利。</p>
//           <p>专业品质，诚信服务</p>
//         </footer>
  
//         <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
//         <script>
//           // 回到顶部按钮显示/隐藏逻辑
//           const backToTopButton = document.getElementById('backToTop');
          
//           window.addEventListener('scroll', () => {
//             if (window.pageYOffset > 300) {
//               backToTopButton.classList.add('visible');
//             } else {
//               backToTopButton.classList.remove('visible');
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;
//   }
// function generateFoodBusinessTemplate(templateName, companyName) {
//     return `
//       <!DOCTYPE html>
//       <html lang="zh-CN">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${companyName} - 网站预览</title>
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap');
          
//           html {
//             scroll-behavior: smooth;
//           }
//           body {
//             font-family: 'ZCOOL XiaoWei', serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             color: #5d4037;
//             background-color: #fffbf0;
//             position: relative;
//           }
//           header {
//             background-color: #8d6e63;
//             color: white;
//             padding: 2rem;
//             text-align: center;
//             background-image: url('https://source.unsplash.com/random/1600x900/?food,pattern');
//             background-blend-mode: overlay;
//             background-size: cover;
//             position: relative;
//           }
//           header::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: rgba(141, 110, 99, 0.8);
//           }
//           header h1, header p {
//             position: relative;
//             z-index: 1;
//           }
//           header h1 {
//             font-size: 3rem;
//             margin-bottom: 0.5rem;
//             font-weight: 400;
//             text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
//           }
//           nav {
//             background-color: #5d4037;
//             padding: 1rem 2rem;
//             position: sticky;
//             top: 0;
//             z-index: 100;
//           }
//           nav ul {
//             display: flex;
//             list-style: none;
//             margin: 0;
//             padding: 0;
//             justify-content: center;
//           }
//           nav li {
//             margin: 0 1rem;
//           }
//           nav a {
//             color: #fffbf0;
//             text-decoration: none;
//             font-size: 1.1rem;
//             padding: 0.5rem 1rem;
//             transition: all 0.3s ease;
//             border-radius: 4px;
//           }
//           nav a:hover {
//             background-color: rgba(255, 251, 240, 0.2);
//           }
//           main {
//             padding: 2rem;
//           }
//           .hero {
//             text-align: center;
//             padding: 5rem 1rem;
//             background-image: url('https://source.unsplash.com/random/1600x900/?food');
//             background-size: cover;
//             background-position: center;
//             margin-bottom: 3rem;
//             position: relative;
//             border-radius: 8px;
//             overflow: hidden;
//           }
//           .hero::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: rgba(255, 251, 240, 0.8);
//           }
//           .hero h1, .hero p {
//             position: relative;
//             z-index: 1;
//           }
//           .hero h1 {
//             font-size: 3rem;
//             color: #5d4037;
//             margin-bottom: 1.5rem;
//             font-weight: 400;
//           }
//           .hero p {
//             font-size: 1.25rem;
//             color: #795548;
//             max-width: 42rem;
//             margin: 0 auto;
//             line-height: 1.7;
//           }
//           .content {
//             max-width: 72rem;
//             margin: 0 auto;
//           }
//           .section {
//             margin-bottom: 4rem;
//             padding: 2rem;
//             background-color: white;
//             border-radius: 8px;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//           }
//           .section h2 {
//             font-size: 2.2rem;
//             color: #5d4037;
//             margin-bottom: 1.5rem;
//             font-weight: 400;
//             text-align: center;
//             position: relative;
//             padding-bottom: 1rem;
//           }
//           .section h2::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             left: 50%;
//             transform: translateX(-50%);
//             width: 80px;
//             height: 3px;
//             background-color: #8d6e63;
//             border-radius: 1.5px;
//           }
//           .grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//             gap: 2rem;
//           }
//           .card {
//             border-radius: 8px;
//             overflow: hidden;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//             background-color: white;
//           }
//           .card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//           }
//           .card-img {
//             height: 200px;
//             background-color: #efebe9;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #8d6e63;
//             font-weight: 400;
//             font-size: 1.2rem;
//             background-image: url('https://source.unsplash.com/random/400x300/?food,dish');
//             background-size: cover;
//             background-position: center;
//           }
//           .card-body {
//             padding: 1.5rem;
//           }
//           .card-title {
//             font-size: 1.5rem;
//             font-weight: 400;
//             margin-bottom: 0.75rem;
//             color: #5d4037;
//           }
//           .card-text {
//             color: #795548;
//             font-size: 1rem;
//             line-height: 1.6;
//           }
//           .menu-item {
//             display: flex;
//             justify-content: space-between;
//             padding: 1rem 0;
//             border-bottom: 1px dashed #d7ccc8;
//           }
//           .menu-item:last-child {
//             border-bottom: none;
//           }
//           .menu-item-name {
//             font-size: 1.2rem;
//             color: #5d4037;
//           }
//           .menu-item-price {
//             font-size: 1.2rem;
//             color: #8d6e63;
//             font-weight: bold;
//           }
//           .menu-item-desc {
//             font-size: 0.9rem;
//             color: #795548;
//             margin-top: 0.5rem;
//           }
//           .contact-info {
//             text-align: center;
//             padding: 1rem;
//           }
//           .contact-info p {
//             margin: 0.75rem 0;
//             color: #795548;
//             font-size: 1.1rem;
//           }
//           .contact-info strong {
//             color: #5d4037;
//           }
//           .map {
//             height: 300px;
//             background-color: #efebe9;
//             margin-top: 2rem;
//             border-radius: 8px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #8d6e63;
//           }
//           footer {
//             background-color: #5d4037;
//             color: white;
//             padding: 3rem 2rem;
//             text-align: center;
//           }
//           .back-to-top {
//             position: fixed;
//             bottom: 2rem;
//             right: 2rem;
//             background-color: #8d6e63;
//             color: white;
//             width: 3rem;
//             height: 3rem;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             text-decoration: none;
//             opacity: 0;
//             transition: all 0.3s ease;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//             z-index: 99;
//           }
//           .back-to-top.visible {
//             opacity: 1;
//           }
//           .back-to-top:hover {
//             background-color: #6d4c41;
//             transform: scale(1.1);
//           }
//         </style>
//       </head>
//       <body>
//         <header id="top">
//           <h1>${companyName}</h1>
//           <p>基于 ${templateName} 模板 | 餐饮美食风格</p>
//         </header>
        
//         <nav>
//           <ul>
//             <li><a href="#top">首页</a></li>
//             <li><a href="#about">品牌故事</a></li>
//             <li><a href="#menu">菜单展示</a></li>
//             <li><a href="#call">门店信息</a></li>
//           </ul>
//         </nav>
        
//         <main>
//           <div class="hero" id="hero">
//             <h1>匠心美食，舌尖享受</h1>
//             <p>传承百年工艺，精选优质食材，为您带来难忘的味蕾体验。</p>
//           </div>
          
//           <div class="content">
//             <div class="section" id="about">
//               <h2>品牌故事</h2>
//               <p>${companyName}创立于2005年，源于创始人对传统美食的热爱和对匠心工艺的坚持。我们秉承"用心做好每一道菜"的理念，致力于为顾客提供最正宗、最美味的餐饮体验。</p>
//               <p>多年来，我们不断探索创新，将传统工艺与现代技术相结合，打造出一系列深受顾客喜爱的特色美食。我们精选优质食材，坚持手工制作，每一道菜品都凝聚了厨师的匠心和热情。</p>
//               <p>如今，${companyName}已发展成为拥有多家连锁店的知名餐饮品牌，但我们始终不忘初心，继续为每一位顾客提供美味佳肴和温馨服务，让您在忙碌的生活中找到舌尖上的慰藉。</p>
//             </div>
            
//             <div class="section" id="menu">
//               <h2>菜单展示</h2>
//               <div class="menu-section">
//                 <h3 style="text-align: center; color: #8d6e63; margin-bottom: 1.5rem;">招牌菜品</h3>
//                 <div class="menu-item">
//                   <div>
//                     <div class="menu-item-name">红烧狮子头</div>
//                     <div class="menu-item-desc">精选上等猪肉，手工制作，口感鲜嫩，汤汁浓郁。</div>
//                   </div>
//                   <div class="menu-item-price">¥68</div>
//                 </div>
//                 <div class="menu-item">
//                   <div>
//                     <div class="menu-item-name">糖醋里脊</div>
//                     <div class="menu-item-desc">外酥里嫩，酸甜可口，是老少皆宜的经典美食。</div>
//                   </div>
//                   <div class="menu-item-price">¥48</div>
//                 </div>
//                 <div class="menu-item">
//                   <div>
//                     <div class="menu-item-name">清蒸鲈鱼</div>
//                     <div class="menu-item-desc">新鲜鲈鱼，清蒸工艺，保留原汁原味，肉质鲜美。</div>
//                   </div>
//                   <div class="menu-item-price">¥88</div>
//                 </div>
//               </div>
              
//               <div class="grid" style="margin-top: 2rem;">
//                 <div class="card">
//                   <div class="card-img"></div>
//                   <div class="card-body">
//                     <h3 class="card-title">特色小吃</h3>
//                     <p class="card-text">精选传统小吃，口味地道，让您品尝家乡的味道。包括锅贴、小笼包、葱油饼等多种选择。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img"></div>
//                   <div class="card-body">
//                     <h3 class="card-title">时令菜品</h3>
//                     <p class="card-text">根据季节变化，精心挑选当季食材，制作出新鲜美味的时令菜品，带给您不同的味蕾体验。</p>
//                   </div>
//                 </div>
//                 <div class="card">
//                   <div class="card-img"></div>
//                   <div class="card-body">
//                     <h3 class="card-title">精美甜点</h3>
//                     <p class="card-text">甜而不腻的精美甜点，是餐后的完美选择。我们的甜点师傅用心制作每一款甜品，让您回味无穷。</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div class="section" id="call">
//               <h2>门店信息</h2>
//               <div class="contact-info">
//                 <p><strong>总店地址：</strong>上海市静安区美食街45号</p>
//                 <p><strong>营业时间：</strong>周一至周日 10:30-22:00</p>
//                 <p><strong>订座电话：</strong>021-12345678</p>
//                 <p><strong>外卖服务：</strong>支持美团、饿了么外卖配送</p>
//               </div>
//               <div class="map">
//                 <p>地图位置（此处应显示实际地图）</p>
//               </div>
//             </div>
//           </div>
//         </main>
        
//         <footer>
//           <p>&copy; 2023 ${companyName}. 保留所有权利。</p>
//           <p>匠心美食，舌尖享受</p>
//         </footer>
  
//         <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
//         <script>
//           // 回到顶部按钮显示/隐藏逻辑
//           const backToTopButton = document.getElementById('backToTop');
          
//           window.addEventListener('scroll', () => {
//             if (window.pageYOffset > 300) {
//               backToTopButton.classList.add('visible');
//             } else {
//               backToTopButton.classList.remove('visible');
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;
//   }

// function generateTemplateByType(templateType, templateName, companyName) {
//     switch(templateType) {
//       case 'modern-tech':
//         return generateModernTechTemplate(templateName, companyName);
//       case 'creative-design':
//         return generateCreativeDesignTemplate(templateName, companyName);
//       case 'traditional-business':
//         return generateTraditionalBusinessTemplate(templateName, companyName);
//       case 'food-business':
//         return generateFoodBusinessTemplate(templateName, companyName);
//       default:
//         return generatePreviewHTML(templateName, companyName); // 默认模板
//     }
//   }
// 启动服务器

// 添加通配符路由，确保SPA正常工作
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"))
  })

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
