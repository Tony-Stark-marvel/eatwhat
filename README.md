# EatWhat - AI Food Calorie Analyzer / AI食物热量分析器

[English](#english) | [中文](#chinese)

---

## English

A pure frontend web application that uses Google's Gemini AI to analyze food photos and estimate calories. Track your daily meals and monitor your calorie intake with ease.

### Features

- **AI-Powered Analysis**: Upload a photo of your meal and get instant analysis using Google's Gemini Vision API
- **Calorie Estimation**: Automatically estimates calories for each food item detected
- **Meal History**: Save and track your meals over time
- **Statistics Dashboard**: View today's and weekly calorie totals
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Privacy First**: All data stored locally in your browser - nothing sent to external servers except for API analysis

### Quick Start

1. **Open the app**: Double-click `index.html` or visit your GitHub Pages URL
2. **Get API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Enter Key**: Paste your API key when prompted
4. **Upload Photo**: Drag & drop or select a food image
5. **Analyze**: Click "Analyze Food" button
6. **View Results**: See detected foods and calories instantly!

### Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **AI Model**: Google Gemini 3 Flash Preview (`gemini-3-flash-preview`)
- **Storage**: Browser LocalStorage
- **Deployment**: GitHub Pages

### Deployment

This project is ready for GitHub Pages deployment:

```bash
git clone https://github.com/Tony-Stark-marvel/eatwhat.git
cd eatwhat
# Open index.html in your browser
```

Your site will be available at: `https://tony-stark-marvel.github.io/eatwhat`

### File Structure

```
eatwhat/
├── index.html          # Main application page
├── css/
│   └── style.css       # Modern design system
├── js/
│   ├── app.js          # Main application logic
│   ├── gemini.js       # Gemini API integration
│   └── storage.js      # LocalStorage management
├── assets/
│   └── icons/          # SVG icons
└── README.md           # This file
```

### Privacy & Security

- ✅ API keys stored only in browser localStorage
- ✅ No data sent except to Gemini API for analysis
- ✅ No tracking or analytics
- ✅ XSS protection implemented
- ✅ Input validation on all uploads

### Troubleshooting

**"Invalid API Key" Error**
- Double-check your API key for typos
- Ensure you copied the entire key
- Verify your API key is active in Google AI Studio

**"Request Timeout" Error**
- Check your internet connection
- Try again later
- Image may be too large (max 10MB)

**Image Not Analyzing**
- Ensure image is under 10MB
- Try a different image format (JPG, PNG, WEBP)
- Check your internet connection

### Future Enhancements

- Export data to CSV/JSON
- Set daily calorie goals
- Macronutrient breakdown (protein, carbs, fat)
- Meal categorization (breakfast, lunch, dinner)
- Multiple language support

### License

MIT License

---

## 中文

一个纯前端Web应用，使用Google的Gemini AI分析食物照片并估算热量。轻松追踪您的每日餐点并监控热量摄入。

### 功能特点

- **AI驱动分析**：上传餐点照片，使用Google Gemini Vision API即时获得分析结果
- **热量估算**：自动估算检测到的每种食物的热量
- **餐点历史**：保存并追踪您的餐点记录
- **统计仪表板**：查看今日和本周的热量总计
- **响应式设计**：在桌面、平板和移动设备上无缝工作
- **隐私优先**：所有数据存储在本地浏览器中 - 除了API分析外不会发送到外部服务器

### 快速开始

1. **打开应用**：双击 `index.html` 或访问您的 GitHub Pages 网址
2. **获取API密钥**：访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **输入密钥**：在提示框中粘贴您的 API 密钥
4. **上传照片**：拖拽或选择食物图片
5. **分析**：点击"分析食物"按钮
6. **查看结果**：立即看到检测到的食物和热量！

### 技术栈

- **前端**：原生 JavaScript (ES6+)、HTML5、CSS3
- **AI模型**：Google Gemini 3 Flash Preview (`gemini-3-flash-preview`)
- **存储**：浏览器 LocalStorage
- **部署**：GitHub Pages

### 部署

此项目已准备好部署到 GitHub Pages：

```bash
git clone https://github.com/Tony-Stark-marvel/eatwhat.git
cd eatwhat
# 在浏览器中打开 index.html
```

您的网站将在以下地址可用：`https://tony-stark-marvel.github.io/eatwhat`

### 文件结构

```
eatwhat/
├── index.html          # 主应用程序页面
├── css/
│   └── style.css       # 现代设计系统
├── js/
│   ├── app.js          # 主应用程序逻辑
│   ├── gemini.js       # Gemini API集成
│   └── storage.js      # LocalStorage管理
├── assets/
│   └── icons/          # SVG图标
└── README.md           # 本文件
```

### 隐私与安全

- ✅ API密钥仅存储在浏览器localStorage中
- ✅ 除API分析外不发送任何数据
- ✅ 无追踪或分析脚本
- ✅ 实现XSS防护
- ✅ 所有上传都有输入验证

### 故障排除

**"API密钥无效"错误**
- 仔细检查API密钥是否有拼写错误
- 确保复制了完整的密钥
- 在Google AI Studio中验证API密钥是否有效

**"请求超时"错误**
- 检查网络连接
- 稍后重试
- 图片可能太大（最大10MB）

**图片无法分析**
- 确保图片小于10MB
- 尝试不同的图片格式（JPG、PNG、WEBP）
- 检查网络连接

### 未来增强

- 导出数据为CSV/JSON
- 设置每日热量目标
- 宏量营养素分解（蛋白质、碳水化合物、脂肪）
- 餐点分类（早餐、午餐、晚餐）
- 多语言支持

### 许可证

MIT 许可证

---

**Made with ❤️ for healthy eating habits / 为健康饮食习惯精心制作**
