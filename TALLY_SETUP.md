# Tally 用户反馈设置指南

本指南说明如何为 Learning Loop AI 项目集成 Tally 用户反馈收集功能。

## 前置要求

- [ ] Tally 账号（免费）
- [ ] 项目已部署到 Vercel
- [ ] 了解基本的 HTML 表单集成

## 快速设置步骤

### 1. 创建 Tally 账号

1. 访问 [tally.so](https://tally.so)
2. 点击 "Sign up"
3. 使用邮箱或 Google 账号注册
4. 完成账号设置

### 2. 创建反馈表单

在 Tally Dashboard 中：

1. 点击 "Create new form"
2. 选择 "Start from scratch"
3. 添加以下问题：

#### 问题 1：整体体验评分
- **类型**: 评分题
- **标题**: "您对 Learning Loop AI 的整体体验如何？"
- **选项**: 1-5 星评分
- **必填**: 是

#### 问题 2：功能建议
- **类型**: 文本题
- **标题**: "您希望添加哪些功能？"
- **占位符**: "例如：错题本、学习统计、多科目支持..."
- **必填**: 否

#### 问题 3：使用频率
- **类型**: 单选题
- **标题**: "您计划多长时间使用一次？"
- **选项": 每天、每周几次、每月几次、偶尔使用
- **必填**: 是

#### 问题 4：其他建议
- **类型**: 文本题
- **标题**: "您还有其他建议或反馈吗？"
- **占位符**: "请分享您的想法..."
- **必填**: 否

4. 点击 "Publish" 发布表单

### 3. 获取表单代码

1. 在 Tally Dashboard 中进入表单设置
2. 点击 "Share"
3. 选择 "Embed"
4. 复制 iframe 或 JavaScript 代码

### 4. 集成到项目

在 `app/page.tsx` 中添加反馈按钮和弹窗：

```typescript
// 添加反馈状态
const [showFeedback, setShowFeedback] = useState(false);

// 反馈按钮
<button
  onClick={() => setShowFeedback(true)}
  style={{
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: designSystem.colors.primary,
    border: `1px solid ${designSystem.colors.primary}`,
    borderRadius: designSystem.borderRadius.lg,
    cursor: 'pointer',
    marginTop: designSystem.spacing.md
  }}
>
  💬 用户反馈
</button>

// 反馈弹窗
{showFeedback && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }}>
    <div style={{
      backgroundColor: designSystem.colors.surface,
      borderRadius: designSystem.borderRadius.xl,
      padding: designSystem.spacing.xl,
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: designSystem.spacing.lg
      }}>
        <h3 style={{
          fontSize: designSystem.typography.heading.h3,
          color: designSystem.colors.text,
          margin: 0
        }}>
          用户反馈
        </h3>
        <button
          onClick={() => setShowFeedback(false)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: designSystem.colors.textSecondary,
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>
      
      {/* Tally 表单 iframe */}
      <iframe
        src="https://tally.so/embed/your-form-id"
        width="100%"
        height="500"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        style={{
          border: `1px solid ${designSystem.colors.border}`,
          borderRadius: designSystem.borderRadius.lg
        }}
      />
    </div>
  </div>
)}
```

### 5. 添加反馈入口

在页面底部添加反馈入口：

```typescript
// 在底部信息区域添加
<div style={{
  marginTop: designSystem.spacing.xl,
  textAlign: 'center',
  padding: designSystem.spacing.lg,
  backgroundColor: `${designSystem.colors.primary}10`,
  borderRadius: designSystem.borderRadius.lg
}}>
  <p style={{
    color: designSystem.colors.textSecondary,
    fontSize: designSystem.typography.body.small,
    marginBottom: designSystem.spacing.sm
  }}>
    您的反馈对我们非常重要！
  </p>
  <button
    onClick={() => setShowFeedback(true)}
    style={{
      padding: '12px 24px',
      backgroundColor: designSystem.colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: designSystem.borderRadius.lg,
      cursor: 'pointer',
      fontWeight: 600
    }}
  >
    提供反馈
  </button>
</div>
```

## 反馈表单设计要点

### 简洁高效
- **问题数量**: 3-4 个核心问题
- **填写时间**: 2-3 分钟完成
- **移动友好**: 在手机上也能轻松填写

### 关键问题
1. **体验评分**: 量化用户满意度
2. **功能建议**: 收集产品改进方向
3. **使用频率**: 了解用户粘性
4. **开放反馈**: 获取深度洞察

### 表单样式
- **品牌一致**: 使用项目的主色调
- **简洁清晰**: 避免复杂的设计
- **即时反馈**: 提交后显示感谢信息

## 数据分析

### 反馈分类

在 Tally Dashboard 中可以：

1. **体验评分分析**：
   - 平均评分
   - 评分分布
   - 趋势变化

2. **功能建议统计**：
   - 高频需求功能
   - 用户痛点分析
   - 优先级排序

3. **使用频率分析**：
   - 用户活跃度
   - 使用习惯
   - 留存率分析

### 数据应用

收集到的反馈可以用于：

1. **产品优化**：根据用户需求调整功能
2. **体验改进**：针对低分项进行优化
3. **功能规划**：优先开发高频需求功能
4. **用户运营**：针对不同活跃度用户制定策略

## 常见问题

### 表单不显示

**问题**: Tally 表单无法正常显示

**解决方案**:
1. 检查 iframe 代码是否正确
2. 确认表单 ID 是否正确
3. 检查网络连接
4. 尝试使用不同的嵌入方式

### 数据不收集

**问题**: 用户提交后没有数据

**解决方案**:
1. 确认表单已发布
2. 检查 Tally Dashboard 中的响应
3. 测试表单提交功能
4. 查看浏览器控制台错误

### 样式冲突

**问题**: 表单样式与项目不匹配

**解决方案**:
1. 使用 Tally 的自定义样式功能
2. 调整 iframe 的高度和宽度
3. 使用 CSS 覆盖默认样式
4. 考虑使用 JavaScript 嵌入方式

## 数据隐私说明

Tally 的数据处理：
- 符合 GDPR 法规
- 数据安全存储
- 用户可随时删除数据
- 透明的数据使用政策

## 下一步

Tally 设置完成后，你可以：
1. 定期查看用户反馈
2. 根据反馈优化产品
3. 建立用户沟通渠道
4. 创建用户社区

## 技术支持

- [Tally 官方文档](https://tally.so/help)
- [Tally 博客](https://tally.so/blog)
- [Tally 社区论坛](https://community.tally.so)

---

**用户反馈设置完成！🎉**