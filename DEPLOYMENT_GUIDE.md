# Vercel 部署指南

本指南将帮助您将 Learning Loop AI 前端原型部署到 Vercel，让面试官可以直接访问。

## 前提条件

1. **GitHub 账号**：需要将代码托管到 GitHub 仓库
2. **Vercel 账号**：用于部署和托管项目
3. **Node.js**：本地开发环境

## 部署步骤

### 步骤 1：准备 GitHub 仓库

1. **创建 GitHub 仓库**
   - 登录 GitHub，创建一个新的仓库
   - 仓库名称建议：`learning-loop-ai`
   - 选择公开仓库（方便面试官访问）

2. **推送代码到 GitHub**
   ```bash
   # 初始化 git 仓库（如果尚未初始化）
   git init
   
   # 添加远程仓库
   git remote add origin https://github.com/your-username/learning-loop-ai.git
   
   # 添加所有文件
   git add .
   
   # 提交代码
   git commit -m "Initial commit: Learning Loop AI frontend prototype"
   
   # 推送到 GitHub
   git push -u origin main
   ```

### 步骤 2：部署到 Vercel

1. **登录 Vercel**
   - 访问 [Vercel 官网](https://vercel.com/)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 搜索并选择您的 `learning-loop-ai` 仓库
   - 点击 "Import"

3. **配置项目**
   - **Project Name**：保持默认或自定义
   - **Framework Preset**：选择 "Next.js"
   - **Root Directory**：保持默认（`/`）
   - **Build and Output Settings**：
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`
   - **Environment Variables**：不需要额外配置

4. **部署项目**
   - 点击 "Deploy"
   - Vercel 会自动构建和部署项目
   - 部署完成后，会显示部署成功的页面

### 步骤 3：访问部署后的应用

1. **获取部署 URL**
   - 部署完成后，Vercel 会提供一个部署 URL
   - 格式通常为：`https://learning-loop-ai-your-username.vercel.app`

2. **测试访问**
   - 打开部署 URL，确保应用正常加载
   - 测试各个页面和功能

## 项目配置说明

### Vercel 配置文件

项目根目录已包含 `vercel.json` 配置文件：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["hkg1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://learning-loop-ai.vercel.app"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 构建配置

- **Build Command**: `npm run build` - 使用 Next.js 的构建命令
- **Output Directory**: `.next` - Next.js 的默认输出目录
- **Region**: `hkg1` - 香港区域，适合亚洲用户访问

## 部署后维护

### 自动部署

当您向 GitHub 仓库推送新代码时，Vercel 会自动触发重新构建和部署，确保面试官始终看到最新版本。

### 自定义域名（可选）

如果您有自定义域名，可以在 Vercel 项目设置中添加：

1. 进入项目设置 > Domains
2. 添加您的自定义域名
3. 按照提示配置 DNS 记录

### 环境变量（可选）

如果未来需要添加环境变量（如 API 密钥），可以在 Vercel 项目设置 > Environment Variables 中配置。

## 故障排除

### 构建失败

如果构建失败，请检查：
- 依赖项是否正确安装
- 代码是否有语法错误
- 构建命令是否正确

### 页面加载问题

如果页面加载失败，请检查：
- 部署 URL 是否正确
- 网络连接是否正常
- 浏览器控制台是否有错误信息

### 功能异常

如果功能异常，请检查：
- 代码是否有逻辑错误
- API 调用是否正确
- 浏览器兼容性

## 访问地址示例

部署成功后，您可以将以下格式的 URL 分享给面试官：

```
https://learning-loop-ai-your-username.vercel.app
```

例如：
```
https://learning-loop-ai-johndoe.vercel.app
```

## 总结

通过以上步骤，您可以将 Learning Loop AI 前端原型成功部署到 Vercel，让面试官可以直接访问和体验您的项目。部署过程简单快捷，无需复杂的服务器配置，非常适合展示前端原型。

如果在部署过程中遇到任何问题，请参考 Vercel 官方文档或联系 Vercel 支持。