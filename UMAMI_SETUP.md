# Umami 数据统计设置指南

本指南说明如何为 Learning Loop AI 项目集成 Umami 数据统计。

## 前置要求

- [ ] Umami 账号（免费）
- [ ] 项目已部署到 Vercel
- [ ] 拥有一个域名（可以是 Vercel 提供的 .vercel.app 域名）

## 快速设置步骤

### 1. 创建 Umami 账号

1. 访问 [umami.is](https://umami.is)
2. 点击 "Get started"
3. 使用 GitHub 账号登录
4. 完成账号设置

### 2. 添加网站

在 Umami Dashboard 中：

1. 点击 "Settings" -> "Websites"
2. 点击 "Add website"
3. 填写网站信息：
   - Name: `Learning Loop AI`
   - Domain: `https://your-project.vercel.app`
4. 点击 "Save"

### 3. 获取追踪代码

1. 在 Umami Dashboard 中进入网站设置
2. 点击 "Tracking code"
3. 复制 JavaScript 追踪代码

### 4. 集成到项目

在 `app/layout.tsx` 中添加 Umami 追踪代码：

```typescript
// app/layout.tsx
import React from "react";
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="UTF-8" />
        <title>Learning Loop AI</title>
        {/* Umami 追踪代码 */}
        <Script
          src="https://analytics.umami.is/script.js"
          data-website-id="your-website-id"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

### 5. 验证追踪

1. 访问你的网站
2. 在 Umami Dashboard 中查看实时数据
3. 确认有访问记录

## 事件追踪配置

### 追踪核心用户行为

在应用中添加事件追踪：

```typescript
// 在页面加载时追踪页面访问
useEffect(() => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track('page_view', {
      page: 'home',
      timestamp: new Date().toISOString()
    });
  }
}, []);

// 追踪用户输入知识点
const handleAsk = async () => {
  // ... 原有代码 ...
  
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track('knowledge_input', {
      input_length: input.length,
      timestamp: new Date().toISOString()
    });
  }
};

// 追踪答题行为
const handleAnswer = async (selectedOption: string) => {
  // ... 原有代码 ...
  
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track('answer_submit', {
      is_correct: isCorrect,
      question_length: question.length,
      timestamp: new Date().toISOString()
    });
  }
};

// 追踪错题强化
const handleRetry = async () => {
  // ... 原有代码 ...
  
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track('retry_question', {
      original_question: question,
      timestamp: new Date().toISOString()
    });
  }
};
```

## 核心指标监控

### 关键事件

| 事件名称 | 说明 | 用途 |
|---------|------|------|
| page_view | 页面访问 | 监控用户活跃度 |
| knowledge_input | 知识点输入 | 了解用户学习需求 |
| answer_submit | 答题提交 | 计算正确率 |
| retry_question | 错题强化 | 分析学习效果 |

### 数据分析

在 Umami Dashboard 中可以查看：

1. **访问统计**：
   - 独立访客数
   - 页面浏览量
   - 会话时长

2. **用户行为**：
   - 知识点输入频率
   - 答题正确率
   - 错题强化率

3. **时间分析**：
   - 高峰访问时间
   - 用户停留时长
   - 学习周期分析

## 常见问题

### 数据不显示

**问题**: Umami Dashboard 中没有数据

**解决方案**:
1. 确认追踪代码已正确添加
2. 检查 website-id 是否正确
3. 等待几分钟让数据同步
4. 清除浏览器缓存后重试

### 事件不记录

**问题**: 自定义事件没有记录

**解决方案**:
1. 确认 window.umami 对象存在
2. 检查事件名称拼写
3. 查看浏览器控制台是否有错误
4. 确认事件追踪代码在正确位置

### 域名问题

**问题**: 使用 .vercel.app 域名无法追踪

**解决方案**:
1. 在 Umami 中添加完整的 .vercel.app 域名
2. 确认域名拼写正确
3. 检查 Vercel 部署状态

## 数据隐私说明

Umami 是一个注重隐私的网站分析工具：
- 不使用 cookies
- 不收集个人身份信息
- 所有数据匿名化处理
- 符合 GDPR 和 CCPA 法规

## 下一步

Umami 设置完成后，你可以：
1. 添加用户反馈功能（使用 Tally）
2. 创建数据可视化仪表板
3. 分析用户学习行为模式
4. 优化产品功能和用户体验

## 技术支持

- [Umami 官方文档](https://umami.is/docs)
- [Umami GitHub 仓库](https://github.com/umami-software/umami)
- [Umami 社区论坛](https://github.com/umami-software/umami/discussions)

---

**数据统计设置完成！🎉**