# 🚀 Vercel 部署指南

本指南将帮助您将 Learning Loop AI 项目部署到 Vercel 平台。

## 前置要求

- [ ] 一个 Vercel 账号（免费）
- [ ] 一个 GitHub 账号
- [ ] 项目代码已推送到 GitHub 仓库

## 部署步骤

### 方法一：通过 Vercel Dashboard（推荐）

#### 1. 准备 GitHub 仓库

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Learning Loop AI MVP"

# 创建 GitHub 仓库后，关联远程仓库
git remote add origin https://github.com/你的用户名/learning-loop-ai.git

# 推送到 GitHub
git push -u origin main
```

#### 2. 在 Vercel 中导入项目

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 点击 "Import Project" 或 "Import Git Repository"
3. 选择你的 GitHub 仓库
4. Vercel 会自动检测 Next.js 项目

#### 3. 配置项目设置

Vercel 会自动配置以下设置：
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### 4. 部署项目

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常需要 1-2 分钟）
3. 部署成功后会获得一个 `.vercel.app` 域名

### 方法二：通过 Vercel CLI

#### 1. 安装 Vercel CLI

```bash
npm i -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

#### 3. 部署项目

```bash
# 在项目根目录执行
vercel
```

按照提示操作：
1. 选择 "Link to existing project" 或 "Set up and deploy"
2. 选择项目范围
3. 确认项目名称
4. 等待部署完成

## 部署后配置

### 自定义域名

1. 在 Vercel Dashboard 中进入项目设置
2. 点击 "Domains"
3. 添加自定义域名
4. 按照提示配置 DNS 记录

### 环境变量

如果需要添加环境变量：

1. 在 Vercel Dashboard 中进入项目设置
2. 点击 "Environment Variables"
3. 添加所需的变量
4. 重新部署项目

### 生产环境部署

```bash
# 使用 Vercel CLI 部署到生产环境
vercel --prod
```

## 常见问题

### 构建失败

**问题**: 构建过程中出现错误

**解决方案**:
1. 检查 `package.json` 中的依赖是否正确
2. 确保所有依赖都已安装
3. 检查 TypeScript 类型错误
4. 查看 Vercel 构建日志获取详细错误信息

### 部署后页面空白

**问题**: 部署成功但页面显示空白

**解决方案**:
1. 检查浏览器控制台是否有错误
2. 确认 API 路由是否正确配置
3. 检查环境变量是否正确设置
4. 清除浏览器缓存后重试

### 端口冲突

**问题**: 本地开发时端口 3000 被占用

**解决方案**:
```bash
# Vercel 会自动使用其他可用端口
# 或手动指定端口
npm run dev -- -p 3001
```

## 监控和日志

### 查看部署日志

1. 在 Vercel Dashboard 中进入项目
2. 点击 "Deployments"
3. 选择特定的部署
4. 查看 "Build Logs" 和 "Function Logs"

### 性能监控

Vercel 提供内置的性能监控：
- 页面加载时间
- API 响应时间
- 错误率统计

## 更新部署

### 自动部署

每次推送到 GitHub 主分支时，Vercel 会自动触发部署。

### 手动重新部署

```bash
# 使用 Vercel CLI
vercel --prod
```

或在 Vercel Dashboard 中：
1. 进入项目设置
2. 点击 "Deployments"
3. 点击部署右侧的 "..." 菜单
4. 选择 "Redeploy"

## 成功标志

✅ 部署成功后，你应该能够：

1. 访问 `https://你的项目名.vercel.app`
2. 正常使用所有功能
3. 在移动设备上正常访问
4. 看到完整的界面和动画效果

## 下一步

部署成功后，你可以：

1. 分享项目链接到简历或作品集
2. 收集用户反馈
3. 持续优化功能和界面
4. 考虑添加更多功能（如用户认证、数据存储等）

## 技术支持

- [Vercel 官方文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 社区论坛](https://vercel.com/forum)

---

**祝部署顺利！🎉**