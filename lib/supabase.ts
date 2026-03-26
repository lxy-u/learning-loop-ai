import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库表结构说明
// learning_records 表结构：
// - id: UUID (主键)
// - user_input: TEXT (用户输入的知识点)
// - question: TEXT (题目内容)
// - user_answer: TEXT (用户选择的答案)
// - correct_answer: TEXT (正确答案)
// - is_correct: BOOLEAN (是否正确)
// - created_at: TIMESTAMP (创建时间)