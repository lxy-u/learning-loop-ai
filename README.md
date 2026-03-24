# Learning Loop AI 🚀

> AI驱动的个人学习系统，通过"讲解 → 出题 → 错题强化"闭环，帮助备考用户从"听懂"到"会做"。

## ✨ 项目亮点

- 🎯 **智能学习闭环**：完整的"讲解 → 出题 → 错题强化"学习流程
- 🎨 **2026年顶级设计**：采用最新设计系统，深色主题 + 动态粒子背景
- ⚡ **流畅交互体验**：现代化动画效果，沉浸式学习环境
- 📱 **响应式布局**：完美适配各种设备
- 🚀 **高性能架构**：基于Next.js 16 + React 19构建

## 🛠️ 技术栈

- **前端框架**: Next.js 16.2.1 (React 19.2.4)
- **样式方案**: 原生CSS + 设计系统
- **后端**: Next.js API Routes
- **部署平台**: Vercel
- **开发工具**: TypeScript, ESLint

## 📱 核心功能

### 1. 智能知识点讲解
- 用户输入任意知识点
- AI生成结构化讲解（通俗解释 + 举例说明 + 常见误区）
- 清晰的知识点呈现

### 2. 智能题目生成
- 基于同一知识点生成选择题
- 4个选项，包含正确答案
- 即时答题反馈

### 3. 错题强化学习
- 错误时展示错因分析
- 提供正确思路指导
- "再来一道"功能，生成相似新题

## 🎨 设计特色

- **深邃黑主题**：#0A0A0A背景，减少视觉疲劳
- **靛蓝色主调**：#6366F1，现代科技感
- **动态粒子背景**：50个浮动粒子，营造沉浸氛围
- **流畅动画效果**：所有交互都有平滑过渡
- **玻璃态设计**：backdrop-filter模糊效果

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm, yarn, pnpm 或 bun

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📖 使用指南

1. **输入知识点**：在输入框中输入你想学习的知识点（如"什么是NPV？"）
2. **生成内容**：点击"生成内容"按钮，系统会生成讲解和题目
3. **学习讲解**：阅读AI生成的知识点讲解
4. **答题练习**：选择你认为正确的答案
5. **查看反馈**：系统会立即判断对错，错误时提供详细分析
6. **错题强化**：如果答错，点击"再来一道"进行强化练习

## 🎯 项目结构

```
learning-loop-ai/
├── app/
│   ├── api/
│   │   └── ask/
│   │       └── route.ts      # API路由，提供假数据
│   ├── page.tsx              # 主页面
│   ├── layout.tsx           # 布局组件
│   └── globals.css          # 全局样式
├── public/                  # 静态资源
├── PRD.md                   # 产品需求文档
├── README.md                # 项目说明
└── package.json             # 项目配置
```

## 🔧 配置说明

项目使用假数据进行演示，无需配置API密钥。如需接入真实AI服务，请修改 `app/api/ask/route.ts` 文件。

## 📊 核心指标

- ✅ 功能完成率：100%（MVP核心功能）
- ✅ 用户流程完整性：讲解 → 出题 → 答题 → 反馈 → 强化
- ✅ 界面设计：2026年顶级设计标准
- ✅ 性能优化：Next.js 16 + React 19

## 🚀 部署到Vercel

### 方法1：通过Vercel CLI

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel
```

### 方法2：通过Vercel Dashboard

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 导入你的GitHub仓库
3. Vercel会自动检测Next.js项目
4. 点击"Deploy"按钮

### 部署配置

项目已包含 `vercel.json` 配置文件，支持：
- 自动构建和部署
- 自定义域名
- 环境变量管理

## 📝 开发说明

### 添加新的知识点

编辑 `app/api/ask/route.ts` 文件，在 `mockData` 对象中添加新的知识点：

```typescript
const mockData: Record<string, any> = {
  "你的知识点": {
    knowledge: "知识点讲解内容",
    question: "题目内容",
    options: ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
    correctAnswer: "A",
    explanation: ""
  }
};
```

### 自定义设计系统

在 `app/page.tsx` 文件中修改 `designSystem` 对象来自定义颜色、字体、间距等。

## 🎓 学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [React 官方文档](https://react.dev)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs)

## 📄 许可证

MIT License

## 👨‍💻 开发者

独立开发 | 2026年

---

**⭐ 如果这个项目对你有帮助，请给个星标！**
