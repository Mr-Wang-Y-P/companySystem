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
const templates = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), "./server/data/templates.json"),"utf8"
));
const websites = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), "./server/data/websiteArr.json"),"utf8"
));

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
          const newConfig = JSON.parse(req.query?.previewConfig)
          // 从localStorage或会话中获取临时预览数据
          const previewConfig = {
            ...newConfig,
            templateId: templateId,
            companyName: "预览模式",
          };
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
    path.join(process.cwd(), "./server/data/websiteArr.json"),
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


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"))
  })

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
