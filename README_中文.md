# EatWhat - AI食物热量分析器

一个纯前端Web应用，使用Google的Gemini AI分析食物照片并估算热量。轻松追踪您的每日餐点并监控热量摄入。

## 功能特点

- **AI驱动分析**：上传餐点照片，使用Google Gemini Vision API即时获得分析结果
- **热量估算**：自动估算检测到的每种食物的热量
- **餐点历史**：保存并追踪您的餐点记录
- **统计仪表板**：查看今日和本周的热量总计
- **响应式设计**：在桌面、平板和移动设备上无缝工作
- **隐私优先**：所有数据存储在本地浏览器中 - 除了API分析外不会发送到外部服务器

## 获取 Gemini API 密钥

### 步骤：

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 使用Google账号登录（或创建一个）
3. 点击"创建 API 密钥"
4. 复制您的 API 密钥
5. 在应用提示时粘贴它

## 本地使用

1. 克隆或下载此仓库
2. 直接在浏览器中打开 `index.html`
3. 输入您的 Gemini API 密钥
4. 开始上传和分析食物照片！

## 部署到 GitHub Pages

### 方法1：使用 Git 命令行

```bash
# 初始化 git 仓库
git init
git add .
git commit -m "初始提交：EatWhat 应用"

# 添加远程仓库并推送
git remote add origin https://github.com/你的用户名/eatwhat.git
git branch -M main
git push -u origin main

# 在 GitHub 网页界面启用 GitHub Pages
# Settings > Pages > Source: Deploy from branch > main > / (root)
```

### 方法2：使用 GitHub 网页界面

1. 在 GitHub 上创建名为 `eatwhat` 的新仓库
2. 上传此项目的所有文件
3. 进入 Settings > Pages
4. 选择 "Deploy from a branch"
5. 选择 "main" 分支和 "/ (root)" 文件夹
6. 点击保存
7. 您的网站将在 `https://你的用户名.github.io/eatwhat` 可用

## 工作原理

1. **上传照片**：拍照或上传餐点图片
2. **图像处理**：图片被压缩并转换为 base64 格式
3. **AI 分析**：图片被发送到 Google Gemini API 进行分析
4. **结果显示**：显示食物项目和热量估算
5. **保存到历史**：可选择将餐点保存到本地历史
6. **追踪进度**：查看您的每日和每周热量统计

## 文件结构

```
eatwhat/
├── index.html          # 主 HTML 文件
├── css/
│   └── style.css       # 样式和设计系统
├── js/
│   ├── app.js          # 主应用程序逻辑
│   ├── gemini.js       # Gemini API 集成
│   └── storage.js      # LocalStorage 管理
├── assets/
│   └── icons/          # SVG 图标
├── .nojekyll           # GitHub Pages 配置
└── README.md           # 说明文档
```

## 隐私与安全

- **API 密钥**：存储在浏览器的 localStorage 中
- **餐点数据**：所有历史数据本地存储 - 不会上传到任何服务器
- **图片处理**：图片仅发送到 Google Gemini API 进行分析
- **无追踪**：不包含分析或追踪脚本

## API 使用与费用

- Google Gemini API 提供免费套餐，配额充足
- 每次图片分析会消耗 API token
- 查看 [Google AI 定价](https://ai.google.dev/pricing) 了解当前费率
- 在 Google AI Studio 中监控您的使用情况

## 浏览器支持

- Chrome/Edge（最新版）
- Firefox（最新版）
- Safari（最新版）
- 移动浏览器（iOS Safari、Chrome Mobile）

## 故障排除

### "API 密钥无效"错误
- 仔细检查 API 密钥是否有拼写错误
- 确保复制了完整的密钥
- 在 Google AI Studio 中验证 API 密钥是否有效

### "API 配额已用完"错误
- 您已达到 API 速率限制
- 等待几分钟后重试
- 在 Google AI Studio 中检查您的配额

### 图片无法分析
- 确保图片小于 10MB
- 尝试不同的图片格式（JPG、PNG、WEBP）
- 检查网络连接

### 历史无法保存
- 清除浏览器缓存后重试
- 确保 localStorage 未被禁用
- 检查浏览器存储权限

## 未来增强

潜在的未来版本功能：
- 导出数据为 CSV/JSON
- 设置每日热量目标
- 宏量营养素分解（蛋白质、碳水化合物、脂肪）
- 餐点分类（早餐、午餐、晚餐）
- 照片库视图
- 多语言支持
- 包装食品条形码扫描

## 贡献

欢迎贡献！请随时提交问题和拉取请求。

## 许可证

本项目是开源的，遵循 MIT 许可证。

## 致谢

- 由 Google Gemini AI API 提供支持
- 使用原生 JavaScript、HTML5 和 CSS3 构建
- 为简洁和隐私而设计

---

为健康饮食习惯精心制作 ❤️
