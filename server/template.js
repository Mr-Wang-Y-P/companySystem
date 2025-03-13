/**
 * 模板生成器模块
 * 包含各种风格的网站模板生成函数
 */

/**
 * 生成现代科技风格模板
 * @param {string} templateName - 模板名称
 * @param {object} websiteData - 网站数据
 * @returns {string} HTML字符串
 */
export function generateModernTechTemplate(templateName, websiteData) {
  // 解构获取网站数据
  const {
    companyName = "科技公司",
    slogan = "创新科技，改变未来",
    description = "我们是一家专注于技术创新的企业，致力于为客户提供最优质的产品和服务。",
    logo = "",
    bannerImage = "",
    address = "",
    phone = "",
    email = "",
    wechat = "",
    jobs = [],
    products = [],
    news = [],
  } = websiteData;

  return `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${companyName} - 网站预览</title>
        <style>
          html {
            scroll-behavior: smooth;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f9fafb;
            position: relative;
          }
          header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 1.5rem;
          }
          .header-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo-container {
            display: flex;
            align-items: center;
          }
          .logo {
            max-height: 50px;
            margin-right: 1rem;
          }
          header h1 {
            font-size: 1.5rem;
            margin: 0;
            font-weight: 600;
          }
          header p.slogan {
            font-size: 0.875rem;
            margin: 0.25rem 0 0;
            opacity: 0.9;
          }
          nav {
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 0.75rem 1.5rem;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          nav li {
            margin: 0 0.75rem;
          }
          nav a {
            color: #4f46e5;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            transition: all 0.2s ease;
          }
          nav a:hover {
            background-color: rgba(79, 70, 229, 0.1);
          }
          main {
            padding: 2rem 1.5rem;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .banner {
            width: 100%;
            height: 500px;
            overflow: hidden;
            position: relative;
            margin-bottom: 3rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(79, 70, 229, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
            padding: 0 2rem;
          }
          .banner-overlay h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 700;
          }
          .banner-overlay p {
            font-size: 1.25rem;
            max-width: 800px;
            opacity: 0.9;
          }
          .hero {
            text-align: center;
            padding: 4rem 1rem;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            margin-bottom: 3rem;
            border-radius: 0.5rem;
            color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
          }
          .hero p {
            font-size: 1.25rem;
            max-width: 42rem;
            margin: 0 auto;
            line-height: 1.7;
            opacity: 0.9;
          }
          .section {
            margin-bottom: 4rem;
            padding: 2rem;
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .section h2 {
            font-size: 1.875rem;
            color: #111827;
            margin-bottom: 1.5rem;
            font-weight: 700;
            position: relative;
            padding-bottom: 0.75rem;
          }
          .section h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 4px;
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            border-radius: 2px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }
          .card {
            border-radius: 0.5rem;
            overflow: hidden;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          }
          .card-img {
            height: 200px;
            background-color: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-weight: 500;
            overflow: hidden;
          }
          .card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .card-body {
            padding: 1.5rem;
          }
          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #111827;
          }
          .card-text {
            color: #4b5563;
            font-size: 0.875rem;
            line-height: 1.6;
          }
          .job-listing {
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            background-color: #f9fafb;
            border-radius: 0.5rem;
            border-left: 4px solid #4f46e5;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .job-listing:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .job-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.5rem;
          }
          .job-department {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 1rem;
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background-color: #e0e7ff;
            border-radius: 9999px;
            font-weight: 500;
          }
          .job-requirements {
            color: #4b5563;
            line-height: 1.6;
            font-size: 0.875rem;
          }
          .contact-info {
            background-color: #f9fafb;
            padding: 1.5rem;
            border-radius: 0.5rem;
          }
          .contact-info p {
            margin: 0.75rem 0;
            color: #4b5563;
            display: flex;
            align-items: center;
          }
          .contact-info strong {
            color: #111827;
            margin-right: 0.5rem;
            min-width: 80px;
          }
          .contact-icon {
            width: 20px;
            height: 20px;
            margin-right: 0.75rem;
            color: #4f46e5;
          }
          .wechat-info {
            display: flex;
            align-items: center;
            margin-top: 1rem;
          }
          .wechat-qrcode {
            width: 100px;
            height: 100px;
            background-color: #f3f4f6;
            margin-left: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
          }
          footer {
            background-color: #1f2937;
            color: white;
            padding: 3rem 1.5rem;
          }
          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-logo {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
          }
          .footer-logo img {
            max-height: 40px;
            margin-right: 0.75rem;
          }
          .footer-logo h2 {
            font-size: 1.5rem;
            margin: 0;
            font-weight: 600;
          }
          .footer-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
          }
          .footer-links a {
            color: #e5e7eb;
            text-decoration: none;
            margin: 0 1rem;
            font-size: 0.875rem;
            transition: color 0.2s ease;
          }
          .footer-links a:hover {
            color: white;
          }
          .footer-bottom {
            text-align: center;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
          }
          .footer-bottom p {
            margin: 0.5rem 0;
            font-size: 0.875rem;
            color: #9ca3af;
          }
          .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: #4f46e5;
            color: white;
            width: 3rem;
            height: 3rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            opacity: 0;
            transition: opacity 0.3s ease, background-color 0.2s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 99;
          }
          .back-to-top.visible {
            opacity: 1;
          }
          .back-to-top:hover {
            background-color: #4338ca;
          }
          .empty-state {
            padding: 3rem 2rem;
            text-align: center;
            color: #6b7280;
            background-color: #f9fafb;
            border-radius: 0.5rem;
            border: 1px dashed #e5e7eb;
            margin: 1rem 0;
          }
          .news-item {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #e5e7eb;
          }
          .news-item:last-child {
            border-bottom: none;
          }
          .news-date {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 0.5rem;
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background-color: #f3f4f6;
            border-radius: 9999px;
          }
          .news-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.75rem;
          }
          .news-content {
            color: #4b5563;
            line-height: 1.6;
            font-size: 0.875rem;
          }
          @media (max-width: 768px) {
            .header-container, .nav-container {
              flex-direction: column;
              text-align: center;
            }
            .logo-container {
              margin-bottom: 1rem;
              justify-content: center;
            }
            nav ul {
              margin-top: 1rem;
              flex-wrap: wrap;
              justify-content: center;
            }
            nav li {
              margin: 0.25rem;
            }
            .banner-overlay h1 {
              font-size: 2rem;
            }
            .banner-overlay p {
              font-size: 1rem;
            }
            .hero h1 {
              font-size: 2rem;
            }
            .hero p {
              font-size: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <header id="top">
          <div class="header-container">
            <div class="logo-container">
              ${
                logo
                  ? `<img src="${logo}" alt="${companyName} Logo" class="logo">`
                  : ""
              }
              <div>
                <h1>${companyName}</h1>
                ${slogan ? `<p class="slogan">${slogan}</p>` : ""}
              </div>
            </div>
            <div>
              <p>基于 ${templateName} 模板 | 现代科技风格</p>
            </div>
          </div>
        </header>
        
        <nav>
          <div class="nav-container">
            <ul>
              <li><a href="#top">首页</a></li>
              <li><a href="#about">关于我们</a></li>
              ${
                products && products.length > 0
                  ? `<li><a href="#products">产品服务</a></li>`
                  : ""
              }
              ${
                news && news.length > 0
                  ? `<li><a href="#news">新闻动态</a></li>`
                  : ""
              }
              ${
                jobs && jobs.length > 0
                  ? `<li><a href="#jobs">招聘信息</a></li>`
                  : ""
              }
              <li><a href="#contact">联系我们</a></li>
            </ul>
          </div>
        </nav>
        
        <main>
          <div class="container">
            ${
              bannerImage
                ? `
            <div class="banner">
              <img src="${bannerImage}" alt="${companyName} 横幅">
              <div class="banner-overlay">
                <h1>${companyName}</h1>
                <p>${slogan || "创新科技，改变未来"}</p>
              </div>
            </div>
            `
                : `
            <div class="hero" id="hero">
              <h1>${slogan || "创新科技，改变未来"}</h1>
              <p>${
                description ||
                "我们是一家专注于技术创新的企业，致力于为客户提供最优质的产品和服务。"
              }</p>
            </div>
            `
            }
            
            <div class="section" id="about">
              <h2>关于我们</h2>
              <p>${
                description ||
                `${companyName}是一家专注于技术创新的企业，致力于为客户提供最优质的产品和服务。我们拥有一支经验丰富的技术团队，不断探索前沿科技，开发创新产品。`
              }</p>
              <p>我们的使命是通过技术创新，为客户创造价值，推动行业发展。我们相信，只有不断创新，才能在竞争激烈的市场中保持领先地位。</p>
              <p>公司成立以来，我们已经为众多客户提供了优质的产品和服务，赢得了良好的口碑和市场认可。我们将继续秉承"创新、专业、诚信"的理念，为客户创造更大的价值。</p>
            </div>
            
            ${
              products && products.length > 0
                ? `
            <div class="section" id="products">
              <h2>产品服务</h2>
              <div class="grid">
                ${products
                  .map(
                    (product) => `
                  <div class="card">
                    <div class="card-img">
                      ${
                        product.image
                          ? `<img src="${product.image}" alt="${product.name}">`
                          : "产品图片"
                      }
                    </div>
                    <div class="card-body">
                      <h3 class="card-title">${product.name}</h3>
                      <p class="card-text">${product.description}</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
            
            ${
              news && news.length > 0
                ? `
            <div class="section" id="news">
              <h2>新闻动态</h2>
              ${news
                .map(
                  (item) => `
                <div class="news-item">
                  <div class="news-date">${item.date || "2023-01-01"}</div>
                  <h3 class="news-title">${item.title}</h3>
                  <div class="news-content">${item.content}</div>
                </div>
              `
                )
                .join("")}
            </div>
            `
                : ""
            }
            
            ${
              jobs && jobs.length > 0
                ? `
            <div class="section" id="jobs">
              <h2>招聘信息</h2>
              ${jobs
                .map(
                  (job) => `
                <div class="job-listing">
                  <h3 class="job-title">${job.title}</h3>
                  <div class="job-department">${job.department}</div>
                  <div class="job-requirements">${job.requirements}</div>
                </div>
              `
                )
                .join("")}
            </div>
            `
                : ""
            }
            
            <div class="section" id="contact">
              <h2>联系我们</h2>
              <div class="contact-info">
                ${address ? `<p><strong>地址</strong>${address}</p>` : ""}
                ${phone ? `<p><strong>电话</strong>${phone}</p>` : ""}
                ${email ? `<p><strong>邮箱</strong>${email}</p>` : ""}
                ${
                  wechat
                    ? `
                  <p><strong>微信公众号</strong>${wechat}</p>
                  <div class="wechat-info">
                    <span>扫描二维码关注我们：</span>
                    <div class="wechat-qrcode">二维码</div>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
        </main>
        
        <footer>
          <div class="footer-container">
            <div class="footer-logo">
              ${logo ? `<img src="${logo}" alt="${companyName} Logo">` : ""}
              <h2>${companyName}</h2>
            </div>
            
            <div class="footer-links">
              <a href="#top">首页</a>
              <a href="#about">关于我们</a>
              ${
                products && products.length > 0
                  ? `<a href="#products">产品服务</a>`
                  : ""
              }
              ${news && news.length > 0 ? `<a href="#news">新闻动态</a>` : ""}
              ${jobs && jobs.length > 0 ? `<a href="#jobs">招聘信息</a>` : ""}
              <a href="#contact">联系我们</a>
            </div>
            
            <div class="footer-bottom">
              <p>&copy; ${new Date().getFullYear()} ${companyName}. 保留所有权利。</p>
              <p>${slogan || "创新科技，改变未来"}</p>
            </div>
          </div>
        </footer>
  
        <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
        <script>
          // 回到顶部按钮显示/隐藏逻辑
          const backToTopButton = document.getElementById('backToTop');
          
          window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
              backToTopButton.classList.add('visible');
            } else {
              backToTopButton.classList.remove('visible');
            }
          });
        </script>
      </body>
      </html>
    `;
}

/**
 * 生成创意设计风格模板
 * @param {string} templateName - 模板名称
 * @param {object} websiteData - 网站数据
 * @returns {string} HTML字符串
 */
export function generateCreativeDesignTemplate(templateName, websiteData) {
  // 解构获取网站数据
  const {
    companyName = "创意设计工作室",
    slogan = "创意无限，设计未来",
    description = "我们是一家充满创意的设计工作室，致力于为客户提供独特而富有创意的设计解决方案。",
    logo = "",
    bannerImage = "",
    address = "",
    phone = "",
    email = "",
    wechat = "",
    jobs = [],
    products = [],
    news = [],
  } = websiteData;

  return `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${companyName} - 网站预览</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          html {
            scroll-behavior: smooth;
          }
          body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f8f9fa;
            position: relative;
          }
          header {
            background-color: #000;
            color: white;
            padding: 2rem;
          }
          .header-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo-container {
            display: flex;
            align-items: center;
          }
          .logo {
            max-height: 60px;
            margin-right: 1rem;
          }
          header h1 {
            font-size: 2rem;
            margin: 0;
            font-weight: 700;
            letter-spacing: -1px;
          }
          header p.slogan {
            font-size: 1rem;
            margin: 0.5rem 0 0;
            font-weight: 300;
            letter-spacing: 1px;
          }
          nav {
            background-color: #000;
            padding: 0;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          nav li {
            margin: 0;
          }
          nav a {
            color: white;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            padding: 1rem 1.5rem;
            display: block;
            transition: all 0.3s ease;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          nav a:hover {
            background-color: #333;
          }
          main {
            padding: 0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 2rem;
          }
          .banner {
            width: 100%;
            height: 100vh;
            overflow: hidden;
            position: relative;
          }
          .banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
            padding: 0 2rem;
          }
          .banner-overlay h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            font-weight: 700;
            letter-spacing: -1px;
          }
          .banner-overlay p {
            font-size: 1.5rem;
            max-width: 800px;
            font-weight: 300;
            letter-spacing: 1px;
          }
          .hero {
            text-align: center;
            padding: 8rem 1rem;
            background-color: #000;
            color: white;
          }
          .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
            letter-spacing: -1px;
          }
          .hero p {
            font-size: 1.25rem;
            max-width: 42rem;
            margin: 0 auto;
            line-height: 1.7;
            font-weight: 300;
            letter-spacing: 0.5px;
          }
          .section {
            margin-bottom: 0;
            padding: 8rem 2rem;
          }
          .section:nth-child(odd) {
            background-color: #f8f9fa;
          }
          .section:nth-child(even) {
            background-color: #fff;
          }
          .section-header {
            text-align: center;
            margin-bottom: 4rem;
          }
          .section h2 {
            font-size: 2.5rem;
            color: #000;
            margin-bottom: 1rem;
            font-weight: 700;
            letter-spacing: -1px;
          }
          .section-header p {
            font-size: 1.125rem;
            color: #666;
            max-width: 600px;
            margin: 0 auto;
            font-weight: 300;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
          }
          .card {
            border: none;
            overflow: hidden;
            background-color: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
          }
          .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
          }
          .card-img {
            height: 300px;
            background-color: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-weight: 500;
            overflow: hidden;
          }
          .card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          .card:hover .card-img img {
            transform: scale(1.05);
          }
          .card-body {
            padding: 2rem;
          }
          .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #000;
          }
          .card-text {
            color: #666;
            font-size: 1rem;
            line-height: 1.6;
            font-weight: 300;
          }
          .job-listing {
            margin-bottom: 2rem;
            padding: 2rem;
            background-color: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-left: 5px solid #000;
          }
          .job-listing:hover {
            transform: translateX(10px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          }
          .job-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #000;
            margin-bottom: 0.5rem;
          }
          .job-department {
            font-size: 1rem;
            color: #666;
            margin-bottom: 1.5rem;
            font-weight: 300;
            display: inline-block;
            padding: 0.25rem 1rem;
            background-color: #f3f4f6;
          }
          .job-requirements {
            color: #666;
            line-height: 1.6;
            font-weight: 300;
          }
          .contact-info {
            background-color: white;
            padding: 2rem;
          }
          .contact-info p {
            margin: 1rem 0;
            color: #666;
            font-size: 1.125rem;
            display: flex;
            align-items: center;
          }
          .contact-info strong {
            color: #000;
            margin-right: 1rem;
            min-width: 100px;
            font-weight: 600;
          }
          .wechat-info {
            display: flex;
            align-items: center;
            margin-top: 2rem;
          }
          .wechat-qrcode {
            width: 120px;
            height: 120px;
            background-color: #f3f4f6;
            margin-left: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          footer {
            background-color: #000;
            color: white;
            padding: 4rem 2rem;
          }
          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-logo {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
          }
          .footer-logo img {
            max-height: 50px;
            margin-right: 1rem;
          }
          .footer-logo h2 {
            font-size: 1.5rem;
            margin: 0;
            font-weight: 700;
            letter-spacing: -1px;
          }
          .footer-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 3rem;
          }
          .footer-links a {
            color: white;
            text-decoration: none;
            margin: 0 1.5rem;
            font-size: 0.875rem;
            transition: color 0.2s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .footer-links a:hover {
            color: #ccc;
          }
          .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
          }
          .footer-bottom p {
            margin: 0.5rem 0;
            font-size: 0.875rem;
            color: #999;
            font-weight: 300;
          }
          .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: #000;
            color: white;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            opacity: 0;
            transition: opacity 0.3s ease, background-color 0.2s ease;
            z-index: 99;
          }
          .back-to-top.visible {
            opacity: 1;
          }
          .back-to-top:hover {
            background-color: #333;
          }
          .empty-state {
            padding: 4rem 2rem;
            text-align: center;
            color: #666;
            background-color: #f8f9fa;
            margin: 2rem 0;
            font-weight: 300;
          }
          .news-item {
            margin-bottom: 3rem;
            padding-bottom: 3rem;
            border-bottom: 1px solid #eee;
          }
          .news-item:last-child {
            border-bottom: none;
          }
          .news-date {
            font-size: 0.875rem;
            color: #666;
            margin-bottom: 0.5rem;
            font-weight: 300;
          }
          .news-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #000;
            margin-bottom: 1rem;
          }
          .news-content {
            color: #666;
            line-height: 1.6;
            font-weight: 300;
          }
          @media (max-width: 768px) {
            .header-container {
              flex-direction: column;
              text-align: center;
            }
            .logo-container {
              margin-bottom: 1.5rem;
              justify-content: center;
            }
            nav ul {
              flex-direction: column;
            }
            nav a {
              padding: 0.75rem 1rem;
              text-align: center;
            }
            .banner-overlay h1 {
              font-size: 2.5rem;
            }
            .banner-overlay p {
              font-size: 1.125rem;
            }
            .hero h1 {
              font-size: 2.5rem;
            }
            .hero p {
              font-size: 1.125rem;
            }
            .section h2 {
              font-size: 2rem;
            }
          }
        </style>
      </head>
      <body>
        <header id="top">
          <div class="header-container">
            <div class="logo-container">
              ${
                logo
                  ? `<img src="${logo}" alt="${companyName} Logo" class="logo">`
                  : ""
              }
              <div>
                <h1>${companyName}</h1>
                ${slogan ? `<p class="slogan">${slogan}</p>` : ""}
              </div>
            </div>
            <div>
              <p>基于 ${templateName} 模板 | 创意设计风格</p>
            </div>
          </div>
        </header>
        
        <nav>
          <div class="nav-container">
            <ul>
              <li><a href="#top">首页</a></li>
              <li><a href="#about">关于我们</a></li>
              ${
                products && products.length > 0
                  ? `<li><a href="#products">作品展示</a></li>`
                  : ""
              }
              ${
                news && news.length > 0
                  ? `<li><a href="#news">新闻动态</a></li>`
                  : ""
              }
              ${
                jobs && jobs.length > 0
                  ? `<li><a href="#jobs">招聘信息</a></li>`
                  : ""
              }
              <li><a href="#contact">联系我们</a></li>
            </ul>
          </div>
        </nav>
        
        <main>
          ${
            bannerImage
              ? `
          <div class="banner">
            <img src="${bannerImage}" alt="${companyName} 横幅">
            <div class="banner-overlay">
              <h1>${companyName}</h1>
              <p>${slogan || "创意无限，设计未来"}</p>
            </div>
          </div>
          `
              : `
          <div class="hero" id="hero">
            <h1>${slogan || "创意无限，设计未来"}</h1>
            <p>${
              description ||
              "我们是一家充满创意的设计工作室，致力于为客户提供独特而富有创意的设计解决方案。"
            }</p>
          </div>
          `
          }
          
          <div class="section" id="about">
            <div class="container">
              <div class="section-header">
                <h2>关于我们</h2>
                <p>了解我们的故事、理念和团队</p>
              </div>
              <p>${
                description ||
                `${companyName}是一家充满创意的设计工作室，致力于为客户提供独特而富有创意的设计解决方案。我们的团队由一群充满激情的设计师组成，他们拥有丰富的经验和独特的创意视角。`
              }</p>
              <p>我们相信设计不仅仅是美观，更是解决问题的工具。我们注重用户体验，将创意与实用性完美结合，为客户创造有价值的设计作品。</p>
              <p>从品牌设计到网站开发，从包装设计到室内装饰，我们提供全方位的设计服务，满足客户的各种需求。我们期待与您合作，共同创造令人惊叹的设计作品。</p>
            </div>
          </div>
          
          ${
            products && products.length > 0
              ? `
          <div class="section" id="products">
            <div class="container">
              <div class="section-header">
                <h2>作品展示</h2>
                <p>探索我们的创意设计作品</p>
              </div>
              <div class="grid">
                ${products
                  .map(
                    (product) => `
                  <div class="card">
                    <div class="card-img">
                      ${
                        product.image
                          ? `<img src="${product.image}" alt="${product.name}">`
                          : "作品图片"
                      }
                    </div>
                    <div class="card-body">
                      <h3 class="card-title">${product.name}</h3>
                      <p class="card-text">${product.description}</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            news && news.length > 0
              ? `
          <div class="section" id="news">
            <div class="container">
              <div class="section-header">
                <h2>新闻动态</h2>
                <p>了解我们的最新动态和行业资讯</p>
              </div>
              ${news
                .map(
                  (item) => `
                <div class="news-item">
                  <div class="news-date">${item.date || "2023-01-01"}</div>
                  <h3 class="news-title">${item.title}</h3>
                  <div class="news-content">${item.content}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          `
              : ""
          }
          
          ${
            jobs && jobs.length > 0
              ? `
          <div class="section" id="jobs">
            <div class="container">
              <div class="section-header">
                <h2>招聘信息</h2>
                <p>加入我们的创意团队，一起创造精彩</p>
              </div>
              ${jobs
                .map(
                  (job) => `
                <div class="job-listing">
                  <h3 class="job-title">${job.title}</h3>
                  <div class="job-department">${job.department}</div>
                  <div class="job-requirements">${job.requirements}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          `
              : ""
          }
          
          <div class="section" id="contact">
            <div class="container">
              <div class="section-header">
                <h2>联系我们</h2>
                <p>有任何问题或合作意向，请随时联系我们</p>
              </div>
              <div class="contact-info">
                ${address ? `<p><strong>地址</strong>${address}</p>` : ""}
                ${phone ? `<p><strong>电话</strong>${phone}</p>` : ""}
                ${email ? `<p><strong>邮箱</strong>${email}</p>` : ""}
                ${
                  wechat
                    ? `
                  <p><strong>微信公众号</strong>${wechat}</p>
                  <div class="wechat-info">
                    <span>扫描二维码关注我们：</span>
                    <div class="wechat-qrcode">二维码</div>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
        </main>
        
        <footer>
          <div class="footer-container">
            <div class="footer-logo">
              ${logo ? `<img src="${logo}" alt="${companyName} Logo">` : ""}
              <h2>${companyName}</h2>
            </div>
            
            <div class="footer-links">
              <a href="#top">首页</a>
              <a href="#about">关于我们</a>
              ${
                products && products.length > 0
                  ? `<a href="#products">作品展示</a>`
                  : ""
              }
              ${news && news.length > 0 ? `<a href="#news">新闻动态</a>` : ""}
              ${jobs && jobs.length > 0 ? `<a href="#jobs">招聘信息</a>` : ""}
              <a href="#contact">联系我们</a>
            </div>
            
            <div class="footer-bottom">
              <p>&copy; ${new Date().getFullYear()} ${companyName}. 保留所有权利。</p>
              <p>${slogan || "创意无限，设计未来"}</p>
            </div>
          </div>
        </footer>
  
        <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
        <script>
          // 回到顶部按钮显示/隐藏逻辑
          const backToTopButton = document.getElementById('backToTop');
          
          window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
              backToTopButton.classList.add('visible');
            } else {
              backToTopButton.classList.remove('visible');
            }
          });
        </script>
      </body>
      </html>
    `;
}

/**
 * 生成传统企业风格模板
 * @param {string} templateName - 模板名称
 * @param {object} websiteData - 网站数据
 * @returns {string} HTML字符串
 */
export function generateTraditionalBusinessTemplate(templateName, websiteData) {
  // 解构获取网站数据
  const {
    companyName = "传统企业",
    slogan = "专业品质，诚信服务",
    description = "我们是一家专业从事机械设备制造的企业。经过多年的发展，公司已成为行业内的领军企业，产品远销国内外。",
    logo = "",
    bannerImage = "",
    address = "",
    phone = "",
    email = "",
    wechat = "",
    jobs = [],
    products = [],
    news = [],
  } = websiteData;

  return `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${companyName} - 网站预览</title>
        <style>
          html {
            scroll-behavior: smooth;
          }
          body {
            font-family: 'Noto Serif SC', serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f8f8f8;
            position: relative;
          }
          header {
            background-color: #1a3a5f;
            color: white;
            padding: 2rem;
            text-align: center;
          }
          .logo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .logo {
            max-height: 80px;
            margin-right: 1rem;
          }
          header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
          }
          header p.slogan {
            font-size: 1.2rem;
            margin-top: 0.5rem;
            font-style: italic;
          }
          nav {
            background-color: #0d2240;
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            justify-content: center;
          }
          nav li {
            margin: 0 1rem;
          }
          nav a {
            color: white;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease;
          }
          nav a:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          main {
            padding: 2rem;
          }
          .banner {
            width: 100%;
            height: 400px;
            overflow: hidden;
            position: relative;
            margin-bottom: 3rem;
          }
          .banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
            padding: 0 2rem;
          }
          .banner-overlay h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
          .banner-overlay p {
            font-size: 1.5rem;
            max-width: 800px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          }
          .hero {
            text-align: center;
            padding: 4rem 1rem;
            background-color: #e8eef4;
            margin-bottom: 3rem;
            border: 1px solid #d1d9e6;
          }
          .hero h1 {
            font-size: 2.5rem;
            color: #1a3a5f;
            margin-bottom: 1.5rem;
            font-weight: 700;
          }
          .hero p {
            font-size: 1.25rem;
            color: #4a5568;
            max-width: 42rem;
            margin: 0 auto;
            line-height: 1.7;
          }
          .content {
            max-width: 72rem;
            margin: 0 auto;
          }
          .section {
            margin-bottom: 4rem;
            padding: 2rem;
            background-color: white;
            border: 1px solid #d1d9e6;
          }
          .section h2 {
            font-size: 2rem;
            color: #1a3a5f;
            margin-bottom: 1.5rem;
            font-weight: 700;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #d1d9e6;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }
          .card {
            border: 1px solid #d1d9e6;
            overflow: hidden;
            background-color: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }
          .card-img {
            height: 200px;
            background-color: #e8eef4;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a3a5f;
            font-weight: 600;
            overflow: hidden;
          }
          .card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .card-body {
            padding: 1.5rem;
          }
          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1a3a5f;
          }
          .card-text {
            color: #4a5568;
            font-size: 1rem;
            line-height: 1.6;
          }
          .job-listing {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background-color: #f8f9fa;
            border: 1px solid #d1d9e6;
            border-left: 4px solid #1a3a5f;
          }
          .job-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1a3a5f;
            margin-bottom: 0.5rem;
          }
          .job-department {
            font-size: 1rem;
            color: #4a5568;
            margin-bottom: 1rem;
            font-style: italic;
          }
          .job-requirements {
            color: #4a5568;
            line-height: 1.6;
          }
          .contact-info {
            background-color: #e8eef4;
            padding: 1.5rem;
            border: 1px solid #d1d9e6;
          }
          .contact-info p {
            margin: 0.5rem 0;
            color: #4a5568;
          }
          .contact-info strong {
            color: #1a3a5f;
            margin-right: 0.5rem;
          }
          .wechat-info {
            display: flex;
            align-items: center;
            margin-top: 1rem;
          }
          .wechat-qrcode {
            width: 100px;
            height: 100px;
            background-color: #f8f9fa;
            margin-left: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #d1d9e6;
          }
          footer {
            background-color: #1a3a5f;
            color: white;
            padding: 2rem;
            text-align: center;
          }
          .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: #1a3a5f;
            color: white;
            width: 3rem;
            height: 3rem;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 99;
          }
          .back-to-top.visible {
            opacity: 1;
          }
          .back-to-top:hover {
            background-color: #0d2240;
          }
          .empty-state {
            padding: 2rem;
            text-align: center;
            color: #4a5568;
            background-color: #f8f9fa;
            border: 1px dashed #d1d9e6;
            margin: 1rem 0;
          }
          .news-item {
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #d1d9e6;
          }
          .news-item:last-child {
            border-bottom: none;
          }
          .news-date {
            font-size: 0.9rem;
            color: #718096;
            margin-bottom: 0.5rem;
          }
          .news-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1a3a5f;
            margin-bottom: 0.5rem;
          }
          .news-content {
            color: #4a5568;
            line-height: 1.6;
          }
          @media (max-width: 768px) {
            nav ul {
              flex-direction: column;
              align-items: center;
            }
            nav li {
              margin: 0.5rem 0;
            }
            .banner-overlay h1 {
              font-size: 2rem;
            }
            .banner-overlay p {
              font-size: 1rem;
            }
            .hero h1 {
              font-size: 2rem;
            }
            .hero p {
              font-size: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <header id="top">
          <div class="logo-container">
            ${
              logo
                ? `<img src="${logo}" alt="${companyName} Logo" class="logo">`
                : ""
            }
            <h1>${companyName}</h1>
          </div>
          ${slogan ? `<p class="slogan">${slogan}</p>` : ""}
          <p>基于 ${templateName} 模板 | 传统企业风格</p>
        </header>
        
        <nav>
          <ul>
            <li><a href="#top">首页</a></li>
            <li><a href="#about">公司简介</a></li>
            ${
              products && products.length > 0
                ? `<li><a href="#products">产品中心</a></li>`
                : ""
            }
            ${
              news && news.length > 0
                ? `<li><a href="#news">新闻中心</a></li>`
                : ""
            }
            ${
              jobs && jobs.length > 0
                ? `<li><a href="#jobs">招聘信息</a></li>`
                : ""
            }
            <li><a href="#contact">联系方式</a></li>
          </ul>
        </nav>
        
        <main>
          ${
            bannerImage
              ? `
          <div class="banner">
            <img src="${bannerImage}" alt="${companyName} 横幅">
            <div class="banner-overlay">
              <h1>${companyName}</h1>
              <p>${slogan || ""}</p>
            </div>
          </div>
          `
              : `
          <div class="hero" id="hero">
            <h1>${slogan || "专业品质，诚信服务"}</h1>
            <p>${
              description ||
              "我们致力于为客户提供高品质的产品和全方位的解决方案。"
            }</p>
          </div>
          `
          }
          
          <div class="content">
            <div class="section" id="about">
              <h2>公司简介</h2>
              <p>${
                description ||
                `${companyName}是一家专业从事机械设备制造的企业。经过多年的发展，公司已成为行业内的领军企业，产品远销国内外。`
              }</p>
              <p>公司拥有现代化的生产基地和先进的制造设备，严格按照ISO9001质量管理体系运行，确保产品的高品质和稳定性。我们的研发团队由行业专家组成，不断推出创新产品，满足市场需求。</p>
              <p>公司秉承"诚信为本，品质至上"的经营理念，致力于为客户提供最优质的产品和最完善的服务。我们相信，只有帮助客户成功，才能实现企业的可持续发展。</p>
            </div>
            
            ${
              products && products.length > 0
                ? `
            <div class="section" id="products">
              <h2>产品中心</h2>
              <div class="grid">
                ${products
                  .map(
                    (product) => `
                  <div class="card">
                    <div class="card-img">
                      ${
                        product.image
                          ? `<img src="${product.image}" alt="${product.name}">`
                          : "产品图片"
                      }
                    </div>
                    <div class="card-body">
                      <h3 class="card-title">${product.name}</h3>
                      <p class="card-text">${product.description}</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
            
            ${
              news && news.length > 0
                ? `
            <div class="section" id="news">
              <h2>新闻中心</h2>
              ${news
                .map(
                  (item) => `
                <div class="news-item">
                  <div class="news-date">${item.date || "2023-01-01"}</div>
                  <h3 class="news-title">${item.title}</h3>
                  <div class="news-content">${item.content}</div>
                </div>
              `
                )
                .join("")}
            </div>
            `
                : ""
            }
            
            ${
              jobs && jobs.length > 0
                ? `
            <div class="section" id="jobs">
              <h2>招聘信息</h2>
              ${jobs
                .map(
                  (job) => `
                <div class="job-listing">
                  <h3 class="job-title">${job.title}</h3>
                  <div class="job-department">${job.department}</div>
                  <div class="job-requirements">${job.requirements}</div>
                </div>
              `
                )
                .join("")}
            </div>
            `
                : ""
            }
            
            <div class="section" id="contact">
              <h2>联系方式</h2>
              <div class="contact-info">
                ${address ? `<p><strong>地址：</strong>${address}</p>` : ""}
                ${phone ? `<p><strong>电话：</strong>${phone}</p>` : ""}
                ${email ? `<p><strong>邮箱：</strong>${email}</p>` : ""}
                ${
                  wechat
                    ? `
                  <p><strong>微信公众号：</strong>${wechat}</p>
                  <div class="wechat-info">
                    <span>扫描二维码关注我们：</span>
                    <div class="wechat-qrcode">二维码</div>
                  </div>
                `
                    : ""
                }
                <p><strong>营业时间：</strong>周一至周五 8:30-17:30</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} ${companyName}. 保留所有权利。</p>
          <p>${slogan || "专业品质，诚信服务"}</p>
        </footer>
  
        <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
        <script>
          // 回到顶部按钮显示/隐藏逻辑
          const backToTopButton = document.getElementById('backToTop');
          
          window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
              backToTopButton.classList.add('visible');
            } else {
              backToTopButton.classList.remove('visible');
            }
          });
        </script>
      </body>
      </html>
    `;
}

/**
 * 生成餐饮美食风格模板
 * @param {string} templateName - 模板名称
 * @param {object} websiteData - 网站数据
 * @returns {string} HTML字符串
 */
export function generateFoodBusinessTemplate(templateName, websiteData) {
  // 解构获取网站数据
  const {
    companyName = "美食餐厅",
    slogan = "美味佳肴，舌尖享受",
    description = "我们是一家专注于提供高品质美食体验的餐厅，致力于为顾客带来舌尖上的享受。",
    logo = "",
    bannerImage = "",
    address = "",
    phone = "",
    email = "",
    wechat = "",
    jobs = [],
    products = [],
    news = [],
  } = websiteData;

  return `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${companyName} - 网站预览</title>
        <style>
          html {
            scroll-behavior: smooth;
          }
          body {
            font-family: 'Noto Serif SC', serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #4a3520;
            background-color: #fffaf5;
            position: relative;
          }
          header {
            background-color: #8b4513;
            color: white;
            padding: 2rem;
            text-align: center;
          }
          .logo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .logo {
            max-height: 80px;
            margin-right: 1rem;
          }
          header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
            font-family: 'Noto Serif SC', serif;
          }
          header p.slogan {
            font-size: 1.2rem;
            margin-top: 0.5rem;
            font-style: italic;
          }
          nav {
            background-color: #6b3609;
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            justify-content: center;
          }
          nav li {
            margin: 0 1rem;
          }
          nav a {
            color: white;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease;
          }
          nav a:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          main {
            padding: 2rem;
          }
          .banner {
            width: 100%;
            height: 500px;
            overflow: hidden;
            position: relative;
            margin-bottom: 3rem;
            border-radius: 8px;
          }
          .banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
            padding: 0 2rem;
          }
          .banner-overlay h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            font-family: 'Noto Serif SC', serif;
          }
          .banner-overlay p {
            font-size: 1.5rem;
            max-width: 800px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          }
          .hero {
            text-align: center;
            padding: 4rem 1rem;
            background-color: #f8e9d6;
            margin-bottom: 3rem;
            border: 1px solid #e6d5c0;
            border-radius: 8px;
          }
          .hero h1 {
            font-size: 2.5rem;
            color: #8b4513;
            margin-bottom: 1.5rem;
            font-weight: 700;
            font-family: 'Noto Serif SC', serif;
          }
          .hero p {
            font-size: 1.25rem;
            color: #6b4226;
            max-width: 42rem;
            margin: 0 auto;
            line-height: 1.7;
          }
          .content {
            max-width: 72rem;
            margin: 0 auto;
          }
          .section {
            margin-bottom: 4rem;
            padding: 2rem;
            background-color: white;
            border: 1px solid #e6d5c0;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .section h2 {
            font-size: 2rem;
            color: #8b4513;
            margin-bottom: 1.5rem;
            font-weight: 700;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e6d5c0;
            font-family: 'Noto Serif SC', serif;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }
          .card {
            border: 1px solid #e6d5c0;
            overflow: hidden;
            background-color: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }
          .card-img {
            height: 200px;
            background-color: #f8e9d6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8b4513;
            font-weight: 600;
            overflow: hidden;
          }
          .card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .card-body {
            padding: 1.5rem;
          }
          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #8b4513;
            font-family: 'Noto Serif SC', serif;
          }
          .card-text {
            color: #6b4226;
            font-size: 1rem;
            line-height: 1.6;
          }
          .job-listing {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background-color: #fffaf5;
            border: 1px solid #e6d5c0;
            border-left: 4px solid #8b4513;
            border-radius: 0 8px 8px 0;
          }
          .job-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #8b4513;
            margin-bottom: 0.5rem;
            font-family: 'Noto Serif SC', serif;
          }
          .job-department {
            font-size: 1rem;
            color: #6b4226;
            margin-bottom: 1rem;
            font-style: italic;
          }
          .job-requirements {
            color: #6b4226;
            line-height: 1.6;
          }
          .contact-info {
            background-color: #f8e9d6;
            padding: 1.5rem;
            border: 1px solid #e6d5c0;
            border-radius: 8px;
          }
          .contact-info p {
            margin: 0.5rem 0;
            color: #6b4226;
          }
          .contact-info strong {
            color: #8b4513;
            margin-right: 0.5rem;
          }
          .wechat-info {
            display: flex;
            align-items: center;
            margin-top: 1rem;
          }
          .wechat-qrcode {
            width: 100px;
            height: 100px;
            background-color: #fffaf5;
            margin-left: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e6d5c0;
            border-radius: 8px;
          }
          footer {
            background-color: #8b4513;
            color: white;
            padding: 2rem;
            text-align: center;
          }
          .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: #8b4513;
            color: white;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 99;
          }
          .back-to-top.visible {
            opacity: 1;
          }
          .back-to-top:hover {
            background-color: #6b3609;
          }
          .empty-state {
            padding: 2rem;
            text-align: center;
            color: #6b4226;
            background-color: #fffaf5;
            border: 1px dashed #e6d5c0;
            margin: 1rem 0;
            border-radius: 8px;
          }
          .news-item {
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #e6d5c0;
          }
          .news-item:last-child {
            border-bottom: none;
          }
          .news-date {
            font-size: 0.9rem;
            color: #8d7055;
            margin-bottom: 0.5rem;
          }
          .news-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #8b4513;
            margin-bottom: 0.5rem;
            font-family: 'Noto Serif SC', serif;
          }
          .news-content {
            color: #6b4226;
            line-height: 1.6;
          }
          .menu-category {
            margin-bottom: 2rem;
          }
          .menu-category-title {
            font-size: 1.5rem;
            color: #8b4513;
            margin-bottom: 1rem;
            font-weight: 600;
            font-family: 'Noto Serif SC', serif;
          }
          .menu-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px dashed #e6d5c0;
          }
          .menu-item:last-child {
            border-bottom: none;
          }
          .menu-item-name {
            font-weight: 600;
            color: #6b4226;
          }
          .menu-item-price {
            color: #8b4513;
            font-weight: 600;
          }
          .menu-item-description {
            font-size: 0.9rem;
            color: #8d7055;
            margin-top: 0.25rem;
          }
          @media (max-width: 768px) {
            nav ul {
              flex-direction: column;
              align-items: center;
            }
            nav li {
              margin: 0.5rem 0;
            }
            .banner-overlay h1 {
              font-size: 2rem;
            }
            .banner-overlay p {
              font-size: 1rem;
            }
            .hero h1 {
              font-size: 2rem;
            }
            .hero p {
              font-size: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <header id="top">
          <div class="logo-container">
            ${
              logo
                ? `<img src="${logo}" alt="${companyName} Logo" class="logo">`
                : ""
            }
            <h1>${companyName}</h1>
          </div>
          ${slogan ? `<p class="slogan">${slogan}</p>` : ""}
          <p>基于 ${templateName} 模板 | 餐饮美食风格</p>
        </header>
        
        <nav>
          <ul>
            <li><a href="#top">首页</a></li>
            <li><a href="#about">品牌故事</a></li>
            ${
              products && products.length > 0
                ? `<li><a href="#products">菜单展示</a></li>`
                : ""
            }
            ${
              news && news.length > 0
                ? `<li><a href="#news">新闻动态</a></li>`
                : ""
            }
            ${
              jobs && jobs.length > 0
                ? `<li><a href="#jobs">招聘信息</a></li>`
                : ""
            }
            <li><a href="#contact">联系我们</a></li>
          </ul>
        </nav>
        
        <main>
          ${
            bannerImage
              ? `
          <div class="banner">
            <img src="${bannerImage}" alt="${companyName} 横幅">
            <div class="banner-overlay">
              <h1>${companyName}</h1>
              <p>${slogan || "美味佳肴，舌尖享受"}</p>
            </div>
          </div>
          `
              : `
          <div class="hero" id="hero">
            <h1>${slogan || "美味佳肴，舌尖享受"}</h1>
            <p>${
              description ||
              "我们是一家专注于提供高品质美食体验的餐厅，致力于为顾客带来舌尖上的享受。"
            }</p>
          </div>
          `
          }
          
          <div class="content">
            <div class="section" id="about">
              <h2>品牌故事</h2>
              <p>${
                description ||
                `${companyName}是一家专注于提供高品质美食体验的餐厅，致力于为顾客带来舌尖上的享受。我们的厨师团队拥有多年的烹饪经验，精心挑选新鲜食材，用心制作每一道菜品。`
              }</p>
              <p>我们的餐厅环境舒适优雅，服务热情周到，是您与家人朋友聚餐、商务宴请的理想场所。我们注重食材的新鲜和品质，坚持使用当季食材，确保每一道菜品都能带给您最佳的味觉体验。</p>
              <p>多年来，我们始终坚持"品质第一，顾客至上"的经营理念，赢得了广大顾客的信赖和好评。我们将继续努力，为您提供更加美味的佳肴和更加优质的服务。</p>
            </div>
            
            ${
              products && products.length > 0
                ? `
            <div class="section" id="products">
              <h2>菜单展示</h2>
              <div class="grid">
                ${products
                  .map(
                    (product) => `
                  <div class="card">
                    <div class="card-img">
                      ${
                        product.image
                          ? `<img src="${product.image}" alt="${product.name}">`
                          : "菜品图片"
                      }
                    </div>
                    <div class="card-body">
                      <h3 class="card-title">${product.name}</h3>
                      <p class="card-text">${product.description}</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
            
            ${
              news && news.length > 0
                ? `
            <div class="section" id="news">
              <h2>新闻动态</h2>
              ${news
                .map(
                  (item) => `
                <div class="news-item">
                  <div class="news-date">${item.date || "2023-01-01"}</div>
                  <h3 class="news-title">${item.title}</h3>
                  <div class="news-content">${item.content}</div>
                </div>
              `
                )
                .join("")}
            </div>
            `
                : ""
            }
            
            ${
              jobs && jobs.length > 0
                ? `
            <div class="section" id="jobs">
              <h2>招聘信息</h2>
              ${jobs
                .map(
                  (job) => `
                <div class="job-listing">
                  <h3 class="job-title">${job.title}</h3>
                  <div class="job-department">${job.department}</div>
                  <div class="job-requirements">${job.requirements}</div>
                </div>
              `
                )
                .join("")}
            </div>
            `
                : ""
            }
            
            <div class="section" id="contact">
              <h2>联系我们</h2>
              <div class="contact-info">
                ${address ? `<p><strong>地址：</strong>${address}</p>` : ""}
                ${phone ? `<p><strong>电话：</strong>${phone}</p>` : ""}
                ${email ? `<p><strong>邮箱：</strong>${email}</p>` : ""}
                ${
                  wechat
                    ? `
                  <p><strong>微信公众号：</strong>${wechat}</p>
                  <div class="wechat-info">
                    <span>扫描二维码关注我们：</span>
                    <div class="wechat-qrcode">二维码</div>
                  </div>
                `
                    : ""
                }
                <p><strong>营业时间：</strong>周一至周日 11:00-22:00</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} ${companyName}. 保留所有权利。</p>
          <p>${slogan || "美味佳肴，舌尖享受"}</p>
        </footer>
  
        <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
        <script>
          // 回到顶部按钮显示/隐藏逻辑
          const backToTopButton = document.getElementById('backToTop');
          
          window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
              backToTopButton.classList.add('visible');
            } else {
              backToTopButton.classList.remove('visible');
            }
          });
        </script>
      </body>
      </html>
    `;
}

/**
 * 生成默认模板
 * @param {string} templateName - 模板名称
 * @param {object} websiteData - 网站数据
 * @returns {string} HTML字符串
 */
export function generateDefaultTemplate(templateName, websiteData) {
  // 解构获取网站数据
  const {
    companyName = "公司名称",
    slogan = "公司口号",
    description = "公司简介",
    logo = "",
    bannerImage = "",
    address = "",
    phone = "",
    email = "",
    wechat = "",
    jobs = [],
    products = [],
    news = [],
  } = websiteData;

  return `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${companyName} - 网站预览</title>
        <style>
          html {
            scroll-behavior: smooth;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f9fafb;
            position: relative;
          }
          header {
            background-color: #4f46e5;
            color: white;
            padding: 1.5rem;
          }
          .header-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo-container {
            display: flex;
            align-items: center;
          }
          .logo {
            max-height: 50px;
            margin-right: 1rem;
          }
          header h1 {
            font-size: 1.5rem;
            margin: 0;
            font-weight: 600;
          }
          header p.slogan {
            font-size: 0.875rem;
            margin: 0.25rem 0 0;
            opacity: 0.9;
          }
          nav {
            background-color: white;
            padding: 0.75rem 1.5rem;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          nav li {
            margin: 0 0.75rem;
          }
          nav a {
            color: #4f46e5;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            transition: all 0.2s ease;
          }
          nav a:hover {
            background-color: rgba(79, 70, 229, 0.1);
          }
          main {
            padding: 2rem 1.5rem;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .banner {
            width: 100%;
            height: 400px;
            overflow: hidden;
            position: relative;
            margin-bottom: 3rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(79, 70, 229, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
            padding: 0 2rem;
          }
          .banner-overlay h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
          }
          .banner-overlay p {
            font-size: 1.25rem;
            max-width: 800px;
            opacity: 0.9;
          }
          .hero {
            text-align: center;
            padding: 4rem 1rem;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            margin-bottom: 3rem;
            border-radius: 0.5rem;
            color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
          }
          .hero p {
            font-size: 1.25rem;
            max-width: 42rem;
            margin: 0 auto;
            line-height: 1.7;
            opacity: 0.9;
          }
          .section {
            margin-bottom: 4rem;
            padding: 2rem;
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .section h2 {
            font-size: 1.875rem;
            color: #111827;
            margin-bottom: 1.5rem;
            font-weight: 700;
            position: relative;
            padding-bottom: 0.75rem;
          }
          .section h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 4px;
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            border-radius: 2px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }
          .card {
            border-radius: 0.5rem;
            overflow: hidden;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          }
          .card-img {
            height: 200px;
            background-color: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-weight: 500;
            overflow: hidden;
          }
          .card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .card-body {
            padding: 1.5rem;
          }
          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #111827;
          }
          .card-text {
            color: #4b5563;
            font-size: 0.875rem;
            line-height: 1.6;
          }
          .job-listing {
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            background-color: #f9fafb;
            border-radius: 0.5rem;
            border-left: 4px solid #4f46e5;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .job-listing:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .job-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.5rem;
          }
          .job-department {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 1rem;
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background-color: #e0e7ff;
            border-radius: 9999px;
            font-weight: 500;
          }
          .job-requirements {
            color: #4b5563;
            line-height: 1.6;
            font-size: 0.875rem;
          }
          .contact-info {
            background-color: #f9fafb;
            padding: 1.5rem;
            border-radius: 0.5rem;
          }
          .contact-info p {
            margin: 0.75rem 0;
            color: #4b5563;
            display: flex;
            align-items: center;
          }
          .contact-info strong {
            color: #111827;
            margin-right: 0.5rem;
            min-width: 80px;
          }
          .wechat-info {
            display: flex;
            align-items: center;
            margin-top: 1rem;
          }
          .wechat-qrcode {
            width: 100px;
            height: 100px;
            background-color: #f3f4f6;
            margin-left: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
          }
          footer {
            background-color: #1f2937;
            color: white;
            padding: 3rem 1.5rem;
          }
          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-logo {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
          }
          .footer-logo img {
            max-height: 40px;
            margin-right: 0.75rem;
          }
          .footer-logo h2 {
            font-size: 1.5rem;
            margin: 0;
            font-weight: 600;
          }
          .footer-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
          }
          .footer-links a {
            color: #e5e7eb;
            text-decoration: none;
            margin: 0 1rem;
            font-size: 0.875rem;
            transition: color 0.2s ease;
          }
          .footer-links a:hover {
            color: white;
          }
          .footer-bottom {
            text-align: center;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
          }
          .footer-bottom p {
            margin: 0.5rem 0;
            font-size: 0.875rem;
            color: #9ca3af;
          }
          .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: #4f46e5;
            color: white;
            width: 3rem;
            height: 3rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            opacity: 0;
            transition: opacity 0.3s ease, background-color 0.2s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 99;
          }
          .back-to-top.visible {
            opacity: 1;
          }
          .back-to-top:hover {
            background-color: #4338ca;
          }
          .empty-state {
            padding: 3rem 2rem;
            text-align: center;
            color: #6b7280;
            background-color: #f9fafb;
            border-radius: 0.5rem;
            border: 1px dashed #e5e7eb;
            margin: 1rem 0;
          }
          .news-item {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #e5e7eb;
          }
          .news-item:last-child {
            border-bottom: none;
          }
          .news-date {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 0.5rem;
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background-color: #f3f4f6;
            border-radius: 9999px;
          }
          .news-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.75rem;
          }
          .news-content {
            color: #4b5563;
            line-height: 1.6;
            font-size: 0.875rem;
          }
          @media (max-width: 768px) {
            .header-container, .nav-container {
              flex-direction: column;
              text-align: center;
            }
            .logo-container {
              margin-bottom: 1rem;
              justify-content: center;
            }
            nav ul {
              margin-top: 1rem;
              flex-wrap: wrap;
              justify-content: center;
            }
            nav li {
              margin: 0.25rem;
            }
            .banner-overlay h1 {
              font-size: 2rem;
            }
            .banner-overlay p {
              font-size: 1rem;
            }
            .hero h1 {
              font-size: 2rem;
            }
            .hero p {
              font-size: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <header id="top">
          <div class="header-container">
            <div class="logo-container">
              ${
                logo
                  ? `<img src="${logo}" alt="${companyName} Logo" class="logo">`
                  : ""
              }
              <div>
                <h1>${companyName}</h1>
                ${slogan ? `<p class="slogan">${slogan}</p>` : ""}
              </div>
            </div>
            <div>
              <p>基于 ${templateName} 模板 | 默认风格</p>
            </div>
          </div>
        </header>
        
        <nav>
          <div class="nav-container">
            <ul>
              <li><a href="#top">首页</a></li>
              <li><a href="#about">关于我们</a></li>
              ${
                products && products.length > 0
                  ? `<li><a href="#products">产品服务</a></li>`
                  : ""
              }
              ${
                news && news.length > 0
                  ? `<li><a href="#news">新闻动态</a></li>`
                  : ""
              }
              ${
                jobs && jobs.length > 0
                  ? `<li><a href="#jobs">招聘信息</a></li>`
                  : ""
              }
              <li><a href="#contact">联系我们</a></li>
            </ul>
          </div>
        </nav>
        
        <main>
          <div class="container">
            ${
              bannerImage
                ? `
            <div class="banner">
              <img src="${bannerImage}" alt="${companyName} 横幅">
              <div class="banner-overlay">
                <h1>${companyName}</h1>
                <p>${slogan || ""}</p>
              </div>
            </div>
            `
                : `
            <div class="hero" id="hero">
              <h1>${slogan || "欢迎访问我们的网站"}</h1>
              <p>${description || "我们致力于为客户提供优质的产品和服务。"}</p>
            </div>
            `
            }
            
            <div class="section" id="about">
              <h2>关于我们</h2>
              <p>${
                description ||
                `${companyName}是一家专业的企业，致力于为客户提供优质的产品和服务。我们拥有一支经验丰富的团队，不断追求卓越，为客户创造价值。`
              }</p>
              <p>我们的使命是通过不断创新和提高，为客户提供最好的解决方案。我们相信，只有帮助客户成功，我们才能取得长期的发展。</p>
              <p>公司成立以来，我们已经为众多客户提供了优质的产品和服务，赢得了良好的口碑和市场认可。我们将继续秉承"诚信、专业、创新"的理念，为客户创造更大的价值。</p>
            </div>
            
            ${
              products && products.length > 0
                ? `
            <div class="section" id="products">
              <h2>产品服务</h2>
              <div class="grid">
                ${products
                  .map(
                    (product) => `
                  <div class="card">
                    <div class="card-img">
                      ${
                        product.image
                          ? `<img src="${product.image}" alt="${product.name}">`
                          : "产品图片"
                      }
                    </div>
                    <div class="card-body">
                      <h3 class="card-title">${product.name}</h3>
                      <p class="card-text">${product.description}</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
            
            ${
              news && news.length > 0
                ? `
            <div class="section" id="news">
              <h2>新闻动态</h2>
              ${news
                .map(
                  (item) => `
                <div class="news-item">
                  <div class="news-date">${item.date || "2023-01-01"}</div>
                  <h3 class="news-title">${item.title}</h3>
                  <div class="news-content">${item.content}</div>
                </div>
              `
                )
                .join("")}
            </div>
            `
                : ""
            }
            
            ${
              jobs && jobs.length > 0
                ? `
            <div class="section" id="jobs">
              <h2>招聘信息</h2>
              ${jobs
                .map(
                  (job) => `
                <div class="job-listing">
                  <h3 class="job-title">${job.title}</h3>
                  <div class="job-department">${job.department}</div>
                  <div class="job-requirements">${job.requirements}</div>
                </div>
              `
                )
                .join("")}
            </div>
            `
                : ""
            }
            
            <div class="section" id="contact">
              <h2>联系我们</h2>
              <div class="contact-info">
                ${address ? `<p><strong>地址</strong>${address}</p>` : ""}
                ${phone ? `<p><strong>电话</strong>${phone}</p>` : ""}
                ${email ? `<p><strong>邮箱</strong>${email}</p>` : ""}
                ${
                  wechat
                    ? `
                  <p><strong>微信公众号</strong>${wechat}</p>
                  <div class="wechat-info">
                    <span>扫描二维码关注我们：</span>
                    <div class="wechat-qrcode">二维码</div>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
        </main>
        
        <footer>
          <div class="footer-container">
            <div class="footer-logo">
              ${logo ? `<img src="${logo}" alt="${companyName} Logo">` : ""}
              <h2>${companyName}</h2>
            </div>
            
            <div class="footer-links">
              <a href="#top">首页</a>
              <a href="#about">关于我们</a>
              ${
                products && products.length > 0
                  ? `<a href="#products">产品服务</a>`
                  : ""
              }
              ${news && news.length > 0 ? `<a href="#news">新闻动态</a>` : ""}
              ${jobs && jobs.length > 0 ? `<a href="#jobs">招聘信息</a>` : ""}
              <a href="#contact">联系我们</a>
            </div>
            
            <div class="footer-bottom">
              <p>&copy; ${new Date().getFullYear()} ${companyName}. 保留所有权利。</p>
              <p>${slogan || ""}</p>
            </div>
          </div>
        </footer>
  
        <a href="#top" class="back-to-top" id="backToTop">↑</a>
  
        <script>
          // 回到顶部按钮显示/隐藏逻辑
          const backToTopButton = document.getElementById('backToTop');
          
          window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
              backToTopButton.classList.add('visible');
            } else {
              backToTopButton.classList.remove('visible');
            }
          });
        </script>
      </body>
      </html>
    `;
}

/**
 * 根据模板类型生成相应的HTML模板
 * @param {string} templateType - 模板类型
 * @param {string} templateName - 模板名称
 * @param {object} websiteData - 网站数据
 * @returns {string} HTML字符串
 */
export function generateTemplateByType(
  templateType,
  templateName,
  websiteData
) {
  switch (templateType) {
    case "modern-tech":
      return generateModernTechTemplate(templateName, websiteData);
    case "creative-design":
      return generateCreativeDesignTemplate(templateName, websiteData);
    case "traditional-business":
      return generateTraditionalBusinessTemplate(templateName, websiteData);
    case "food-business":
      return generateFoodBusinessTemplate(templateName, websiteData);
    default:
      return generateDefaultTemplate(templateName, websiteData);
  }
}

