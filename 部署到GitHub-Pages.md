# 部署到 GitHub Pages - 简单三步

## ✅ 已完成
- Git 仓库已初始化
- 所有文件已提交

## 📋 接下来的步骤

### 第1步：在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 仓库名称：`eatwhat`（或其他您喜欢的名称）
3. 设置为 **公开（Public）** - 这对免费 GitHub Pages 很重要
4. **不要** 勾选 "Initialize with README"
5. 点击 "Create repository"

### 第2步：推送到 GitHub

复制并执行以下命令（将 `YOUR_USERNAME` 替换为您的 GitHub 用户名）：

```bash
cd "d:\ProJect\eatwhat"
git remote add origin https://github.com/YOUR_USERNAME/eatwhat.git
git branch -M main
git push -u origin main
```

### 第3步：启用 GitHub Pages

1. 在您的 GitHub 仓库页面
2. 点击顶部的 **"Settings"** 标签
3. 在左侧边栏找到并点击 **"Pages"**
4. 在 "Source" 下选择 **"Deploy from a branch"**
5. Branch 选择：**main** 分支，文件夹选择：**/ (root)**
6. 点击 **"Save"**

## 🎉 完成！

等待 1-2 分钟后，您的网站将在以下地址可用：

```
https://YOUR_USERNAME.github.io/eatwhat
```

---

## 🔍 验证部署

部署完成后，访问您的 GitHub Pages URL 并测试：
- ✅ 页面正常加载
- ✅ 中文界面显示正确
- ✅ 可以上传照片
- ✅ API 密钥设置正常工作

## ⚠️ 常见问题

### 网站无法访问？
- 等待 2-3 分钟，GitHub Pages 需要时间构建
- 检查 Settings > Pages 确认部署状态
- 确保选择了正确的分支和文件夹

### 样式不加载？
- 清除浏览器缓存（Ctrl+Shift+Delete）
- 强制刷新页面（Ctrl+F5）
- 检查 `.nojekyll` 文件是否存在

### API 密钥问题？
- 每个用户需要在浏览器中输入自己的 API 密钥
- API 密钥不会上传到 GitHub
- 从 https://makersuite.google.com/app/apikey 获取

---

## 🔄 更新网站

以后修改代码后，使用以下命令更新：

```bash
cd "d:\ProJect\eatwhat"
git add .
git commit -m "描述您的更改"
git push origin main
```

GitHub Pages 会在 1-2 分钟内自动更新！
