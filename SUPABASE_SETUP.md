# Supabase 数据库设置指南

本指南说明如何为 Learning Loop AI 项目设置 Supabase 数据库。

## 前置要求

- [ ] Supabase 账号（免费）
- [ ] 项目已部署到 Vercel
- [ ] 已安装 @supabase/supabase-js 依赖

## 快速设置步骤

### 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "New Project"
3. 填写项目信息：
   - Name: `learning-loop-ai`
   - Database Password: 设置强密码并保存
   - Region: 选择最近的区域（推荐：Singapore）
4. 等待项目创建完成（通常需要 1-2 分钟）

### 2. 创建数据库表

在 Supabase Dashboard 中：

1. 进入项目的 "SQL Editor"
2. 点击 "New Query"
3. 粘贴以下 SQL 代码：

```sql
-- 创建学习记录表
CREATE TABLE learning_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_input TEXT NOT NULL,
  question TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提升查询性能
CREATE INDEX idx_user_input ON learning_records(user_input);
CREATE INDEX idx_created_at ON learning_records(created_at);

-- 启用行级安全性
ALTER TABLE learning_records ENABLE ROW LEVEL SECURITY;

-- 允许所有人插入数据（匿名用户）
CREATE POLICY "Allow anonymous inserts" ON learning_records
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 允许所有人查询数据
CREATE POLICY "Allow anonymous selects" ON learning_records
  FOR SELECT
  TO anon
  USING (true);
```

4. 点击 "Run" 执行 SQL
5. 确认表创建成功

### 3. 获取 API 密钥

1. 在 Supabase Dashboard 中进入项目设置
2. 点击左侧菜单的 "API"
3. 复制以下信息：
   - Project URL
   - anon public key
4. 将这些信息添加到项目的 `.env.local` 文件中：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. 验证连接

启动开发服务器并测试：

```bash
npm run dev
```

在应用中：
1. 输入知识点并生成题目
2. 选择答案
3. 检查浏览器控制台是否有错误
4. 在 Supabase Dashboard 的 "Table Editor" 中查看 `learning_records` 表
5. 确认数据已成功插入

## 数据库表结构说明

### learning_records 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键，自动生成 |
| user_input | TEXT | 用户输入的知识点 |
| question | TEXT | 题目内容 |
| user_answer | TEXT | 用户选择的答案 |
| correct_answer | TEXT | 正确答案 |
| is_correct | BOOLEAN | 是否正确 |
| created_at | TIMESTAMP | 创建时间 |

## 常见问题

### 连接失败

**问题**: `Supabase client is not configured`

**解决方案**:
1. 检查 `.env.local` 文件是否存在
2. 确认环境变量名称拼写正确
3. 重启开发服务器
4. 检查 Supabase URL 和 Key 是否正确

### 数据插入失败

**问题**: 数据库记录失败，控制台有错误

**解决方案**:
1. 检查 SQL 执行是否成功
2. 确认 Row Level Security 策略已启用
3. 检查浏览器控制台的具体错误信息
4. 确认表结构和代码中的字段匹配

### 权限错误

**问题**: `new row violates row-level security policy`

**解决方案**:
1. 确认已创建 RLS 策略
2. 检查策略是否允许匿名用户操作
3. 在 Supabase Dashboard 中查看 "Authentication" -> "Policies"

## 数据查询示例

### 查询所有学习记录
```typescript
const { data, error } = await supabase
  .from('learning_records')
  .select('*')
  .order('created_at', { ascending: false });
```

### 查询特定知识点的记录
```typescript
const { data, error } = await supabase
  .from('learning_records')
  .select('*')
  .eq('user_input', '什么是NPV');
```

### 统计正确率
```typescript
const { data, error } = await supabase
  .from('learning_records')
  .select('is_correct');

const correctCount = data?.filter(r => r.is_correct).length || 0;
const totalCount = data?.length || 0;
const accuracy = totalCount > 0 ? (correctCount / totalCount * 100).toFixed(1) : 0;
```

## 下一步

数据库设置完成后，你可以：
1. 添加数据统计功能（使用 Umami）
2. 创建学习记录查询页面
3. 添加数据分析和可视化
4. 实现错题本功能

## 技术支持

- [Supabase 官方文档](https://supabase.com/docs)
- [Supabase JavaScript 客户端文档](https://supabase.com/docs/reference/javascript)
- [Supabase 社区论坛](https://supabase.com/community)

---

**数据库设置完成！🎉**