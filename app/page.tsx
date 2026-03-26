"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// 2026年最先进的设计系统
const designSystem = {
  colors: {
    background: "#0A0A0A", // 深邃黑
    surface: "#1A1A1A", // 深灰
    surfaceLight: "#2D2D2D", // 中灰
    primary: "#6366F1", // 靛蓝色
    primaryLight: "#818CF8", // 浅靛蓝
    secondary: "#10B981", // 祖母绿
    success: "#10B981", // 成功绿
    error: "#EF4444", // 错误红
    text: "#F9FAFB", // 白色
    textSecondary: "#9CA3AF", // 浅灰文字
    border: "#374151", // 边框色
  },
  typography: {
    fontFamily: "Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: {
      h1: "clamp(2rem, 5vw, 3.5rem)",
      h2: "clamp(1.5rem, 3vw, 2.5rem)",
      h3: "clamp(1.25rem, 2.5vw, 1.75rem)",
      h4: "clamp(1rem, 2vw, 1.25rem)",
    },
    body: {
      regular: "1rem",
      small: "0.875rem",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  animations: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
};

// 生成随机粒子背景
const ParticleBackground = () => {
  return (
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      zIndex: -1,
      overflow: "hidden"
    }}>
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            backgroundColor: designSystem.colors.primary,
            borderRadius: "50%",
            opacity: Math.random() * 0.5 + 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-10vh) translateX(100px);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

// 加载动画组件
const LoadingAnimation = () => {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: designSystem.spacing.xxl,
    }}>
      <div style={{ 
        width: "60px", 
        height: "60px", 
        borderRadius: designSystem.borderRadius.full,
        border: `3px solid ${designSystem.colors.surfaceLight}`,
        borderTop: `3px solid ${designSystem.colors.primary}`,
        animation: "spin 1s linear infinite",
        marginBottom: designSystem.spacing.lg,
      }} />
      <p style={{ 
        color: designSystem.colors.textSecondary,
        fontSize: designSystem.typography.body.regular,
        fontWeight: 500,
      }}>
        正在生成学习内容...
      </p>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [input, setInput] = useState("");  // 存储用户输入
  const [knowledge, setKnowledge] = useState("");  // 存储知识点讲解
  const [loading, setLoading] = useState(false);  // 加载状态
  const [question, setQuestion] = useState("");  // 存储问题
  const [options, setOptions] = useState<string[]>([]);  // 存储选项
  const [correctAnswer, setCorrectAnswer] = useState("");  // 正确答案
  const [userAnswer, setUserAnswer] = useState("");  // 用户选择的答案
  const [feedback, setFeedback] = useState("");  // 错误/正确反馈
  const [explanation, setExplanation] = useState("");  // 答案解析
  const [showKnowledge, setShowKnowledge] = useState(false);  // 控制知识点讲解的显示动画
  const [showQuestion, setShowQuestion] = useState(false);  // 控制题目区域的显示动画

  useEffect(() => {
    if (knowledge) {
      setTimeout(() => setShowKnowledge(true), 100);
    }
  }, [knowledge]);

  useEffect(() => {
    if (question) {
      setTimeout(() => setShowQuestion(true), 300);
    }
  }, [question]);

  const handleAsk = async () => {
    setLoading(true);
    setShowKnowledge(false);
    setShowQuestion(false);
    // 清空之前的状态
    setKnowledge("");
    setQuestion("");
    setOptions([]);
    setCorrectAnswer("");
    setUserAnswer("");
    setFeedback("");
    setExplanation("");

    // Plausible 事件追踪：知识点输入
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('knowledge_input', {
        props: {
          input_length: input.length,
          timestamp: new Date().toISOString()
        }
      });
    }

    try {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      // 检查是否有知识点内容
      if (!data.knowledge || data.knowledge.includes("出错了")) {
        setKnowledge(data.knowledge || "暂时没有该问题的答案，试试其他问题！");
        setLoading(false);
        return;
      }

      // 设置知识点讲解
      setKnowledge(data.knowledge);

      // 如果有题目，设置题目相关数据
      if (data.question) {
        setQuestion(data.question);
        setOptions(data.options || []);
        setCorrectAnswer(data.correctAnswer || "");
        setExplanation(data.explanation || "");
      }

    } catch (error) {
      setKnowledge("请求出错了，请稍后重试");
      console.error(error);
    }

    setLoading(false);
  };

  const handleAnswer = async (selectedOption: string) => {
    console.log('=== handleAnswer 函数被调用 ===');
    console.log('选择的选项:', selectedOption);
    
    setUserAnswer(selectedOption);
    // 提取选项的第一个字符（A/B/C/D）进行比较
    const answerKey = selectedOption.charAt(0);
    const isCorrect = answerKey === correctAnswer;
    
    if (isCorrect) {
      setFeedback("正确！");
    } else {
      setFeedback("错误！");
    }

    console.log('准备记录到数据库...');
    console.log('用户输入:', input);
    console.log('题目:', question);
    console.log('用户答案:', selectedOption);
    console.log('正确答案:', correctAnswer);
    console.log('是否正确:', isCorrect);

    // Plausible 事件追踪：答题提交
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('answer_submit', {
        props: {
          is_correct: isCorrect,
          question_length: question.length,
          timestamp: new Date().toISOString()
        }
      });
    }

    // 记录到数据库
    try {
      console.log('开始调用 Supabase API...');
      const { error } = await supabase
        .from('learning_records')
        .insert({
          user_input: input,
          question: question,
          user_answer: selectedOption,
          correct_answer: correctAnswer,
          is_correct: isCorrect,
          created_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('数据库记录失败:', error);
      } else {
        console.log('✅ 数据库记录成功！');
      }
    } catch (error) {
      console.error('数据库操作错误:', error);
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    setShowQuestion(false);
    // 清空答题状态
    setUserAnswer("");
    setFeedback("");

    // Plausible 事件追踪：错题强化
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('retry_question', {
        props: {
          original_question: question,
          timestamp: new Date().toISOString()
        }
      });
    }

    try {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          retry: true,
          previousQuestion: question,
          previousAnswer: correctAnswer,
          userAnswer: userAnswer.charAt(0)
        }),
      });

      const data = await res.json();

      // 更新题目相关数据
      if (data.question) {
        setQuestion(data.question);
        setOptions(data.options || []);
        setCorrectAnswer(data.correctAnswer || "");
        setExplanation(data.explanation || "");
      }

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: designSystem.typography.fontFamily,
        background: designSystem.colors.background,
        color: designSystem.colors.text,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 渐变叠加层 */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(26,26,26,0.8) 100%)",
        zIndex: -1,
      }} />

      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "2rem",
        position: "relative",
        zIndex: 1,
      }}>
        {/* 顶部标题区域 */}
        <header style={{ 
          textAlign: "center", 
          marginBottom: designSystem.spacing.xxl,
          paddingTop: designSystem.spacing.xxl,
        }}>
          <h1 style={{ 
            fontSize: designSystem.typography.heading.h1,
            fontWeight: 700,
            background: "linear-gradient(135deg, #6366F1 0%, #818CF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: designSystem.spacing.sm,
            letterSpacing: "-0.025em",
          }}>
            Learning Loop AI
          </h1>
          <p style={{ 
            fontSize: designSystem.typography.body.regular,
            color: designSystem.colors.textSecondary,
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}>
            智能学习闭环系统 | 从理解到掌握的完美体验
          </p>
        </header>

        {/* 输入区域 */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          marginBottom: designSystem.spacing.xxl,
          gap: designSystem.spacing.md,
          flexWrap: "wrap",
        }}>
          <div style={{ 
            position: "relative",
            flex: "1",
            minWidth: "300px",
            maxWidth: "600px",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入知识点，例如：什么是NPV？"
              style={{
                width: "100%",
                padding: `${designSystem.spacing.lg} ${designSystem.spacing.xl}`,
                fontSize: designSystem.typography.body.regular,
                borderRadius: designSystem.borderRadius.xl,
                border: `1px solid ${designSystem.colors.border}`,
                backgroundColor: designSystem.colors.surface,
                color: designSystem.colors.text,
                transition: designSystem.animations.transition,
                fontFamily: designSystem.typography.fontFamily,
                boxShadow: designSystem.shadows.sm,
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAsk();
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = designSystem.colors.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(99, 102, 241, 0.1)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = designSystem.colors.border;
                e.currentTarget.style.boxShadow = designSystem.shadows.sm;
              }}
            />
            <div style={{
              position: "absolute",
              left: designSystem.spacing.lg,
              top: "50%",
              transform: "translateY(-50%)",
              color: designSystem.colors.textSecondary,
            }}>
              🎯
            </div>
          </div>
          <button
            onClick={handleAsk}
            style={{
              padding: `${designSystem.spacing.lg} ${designSystem.spacing.xl}`,
              backgroundColor: designSystem.colors.primary,
              color: designSystem.colors.text,
              fontSize: designSystem.typography.body.regular,
              fontWeight: 600,
              borderRadius: designSystem.borderRadius.xl,
              cursor: "pointer",
              border: "none",
              transition: designSystem.animations.transition,
              fontFamily: designSystem.typography.fontFamily,
              boxShadow: designSystem.shadows.md,
              display: "flex",
              alignItems: "center",
              gap: designSystem.spacing.sm,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = designSystem.colors.primaryLight;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = designSystem.shadows.lg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = designSystem.colors.primary;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = designSystem.shadows.md;
            }}
          >
            🚀 生成内容
          </button>
        </div>

        {/* 加载状态 */}
        {loading && <LoadingAnimation />}

        {/* 知识点讲解区域 */}
        {knowledge && (
          <div 
            style={{
              marginTop: designSystem.spacing.xxl,
              opacity: showKnowledge ? 1 : 0,
              transform: showKnowledge ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div style={{ 
              backgroundColor: designSystem.colors.surface,
              borderRadius: designSystem.borderRadius.xl,
              padding: designSystem.spacing.xl,
              boxShadow: designSystem.shadows.lg,
              border: `1px solid ${designSystem.colors.border}`,
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: designSystem.spacing.md,
                marginBottom: designSystem.spacing.lg,
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: designSystem.borderRadius.lg,
                  backgroundColor: `${designSystem.colors.primary}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  📚
                </div>
                <h2 style={{ 
                  fontSize: designSystem.typography.heading.h3,
                  fontWeight: 600,
                  color: designSystem.colors.text,
                  margin: 0,
                }}>
                  知识点讲解
                </h2>
              </div>
              <div style={{ 
                whiteSpace: "pre-wrap", 
                fontSize: designSystem.typography.body.regular,
                lineHeight: "1.6", 
                color: designSystem.colors.text,
                padding: designSystem.spacing.md,
                backgroundColor: designSystem.colors.surfaceLight,
                borderRadius: designSystem.borderRadius.lg,
              }}>
                {knowledge}
              </div>
            </div>
          </div>
        )}

        {/* 练习题区域 */}
        {question && (
          <div 
            style={{
              marginTop: designSystem.spacing.xxl,
              opacity: showQuestion ? 1 : 0,
              transform: showQuestion ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div style={{ 
              backgroundColor: designSystem.colors.surface,
              borderRadius: designSystem.borderRadius.xl,
              padding: designSystem.spacing.xl,
              boxShadow: designSystem.shadows.lg,
              border: `1px solid ${designSystem.colors.border}`,
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: designSystem.spacing.md,
                marginBottom: designSystem.spacing.lg,
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: designSystem.borderRadius.lg,
                  backgroundColor: `${designSystem.colors.secondary}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  📝
                </div>
                <h3 style={{ 
                  fontSize: designSystem.typography.heading.h3,
                  fontWeight: 600,
                  color: designSystem.colors.text,
                  margin: 0,
                }}>
                  巩固练习
                </h3>
              </div>
              
              <p style={{ 
                fontSize: designSystem.typography.body.regular,
                lineHeight: "1.6",
                color: designSystem.colors.text,
                marginBottom: designSystem.spacing.lg,
                fontWeight: 500,
              }}>
                {question}
              </p>

              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: designSystem.spacing.md,
                marginBottom: designSystem.spacing.lg,
              }}>
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      console.log('=== 按钮被点击了 ===');
                      console.log('选项:', option);
                      handleAnswer(option);
                    }}
                    disabled={feedback !== ""}
                    style={{
                      padding: designSystem.spacing.lg,
                      backgroundColor: userAnswer === option 
                        ? (feedback === "正确！" ? designSystem.colors.success : designSystem.colors.error)
                        : designSystem.colors.surfaceLight,
                      color: userAnswer === option ? designSystem.colors.text : designSystem.colors.text,
                      borderRadius: designSystem.borderRadius.lg,
                      fontSize: designSystem.typography.body.regular,
                      cursor: feedback !== "" ? "not-allowed" : "pointer",
                      border: `1px solid ${userAnswer === option ? (feedback === "正确！" ? designSystem.colors.success : designSystem.colors.error) : designSystem.colors.border}`,
                      transition: designSystem.animations.transition,
                      textAlign: "left",
                      fontFamily: designSystem.typography.fontFamily,
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      if (feedback === "" && userAnswer !== option) {
                        e.currentTarget.style.backgroundColor = `${designSystem.colors.primary}10`;
                        e.currentTarget.style.borderColor = designSystem.colors.primary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (feedback === "" && userAnswer !== option) {
                        e.currentTarget.style.backgroundColor = designSystem.colors.surfaceLight;
                        e.currentTarget.style.borderColor = designSystem.colors.border;
                      }
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {feedback && (
                <div style={{ 
                  marginTop: designSystem.spacing.lg,
                  padding: designSystem.spacing.lg,
                  borderRadius: designSystem.borderRadius.lg,
                  borderLeft: `4px solid ${feedback === "正确！" ? designSystem.colors.success : designSystem.colors.error}`,
                  backgroundColor: feedback === "正确！" ? `${designSystem.colors.success}10` : `${designSystem.colors.error}10`,
                  marginBottom: designSystem.spacing.lg,
                }}>
                  <p style={{ 
                    color: feedback === "正确！" ? designSystem.colors.success : designSystem.colors.error, 
                    fontSize: designSystem.typography.body.regular,
                    fontWeight: 600,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: designSystem.spacing.sm,
                  }}>
                    {feedback === "正确！" ? "✅ 回答正确！" : "❌ 回答错误！"}
                  </p>
                </div>
              )}

              {feedback && explanation && (
                <div style={{ 
                  backgroundColor: designSystem.colors.surfaceLight, 
                  padding: designSystem.spacing.lg,
                  borderRadius: designSystem.borderRadius.lg,
                  marginTop: designSystem.spacing.lg,
                  marginBottom: designSystem.spacing.lg,
                  border: `1px solid ${designSystem.colors.border}`,
                }}>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: designSystem.spacing.sm,
                    marginBottom: designSystem.spacing.md,
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: designSystem.borderRadius.full,
                      backgroundColor: `${designSystem.colors.primary}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      💡
                    </div>
                    <h4 style={{ 
                      fontSize: designSystem.typography.heading.h4,
                      color: designSystem.colors.text, 
                      fontWeight: 600, 
                      margin: 0,
                    }}>
                      错因分析与正确思路
                    </h4>
                  </div>
                  <div style={{ 
                    fontSize: designSystem.typography.body.regular, 
                    lineHeight: "1.6", 
                    color: designSystem.colors.text
                  }}>
                    {explanation}
                  </div>
                </div>
              )}

              {feedback === "错误！" && (
                <div style={{ marginTop: designSystem.spacing.lg, textAlign: "center" }}>
                  <button
                    onClick={handleRetry}
                    style={{
                      padding: `${designSystem.spacing.md} ${designSystem.spacing.xl}`,
                      backgroundColor: "transparent",
                      color: designSystem.colors.primary,
                      fontSize: designSystem.typography.body.regular,
                      fontWeight: 600,
                      borderRadius: designSystem.borderRadius.lg,
                      cursor: "pointer",
                      border: `1px solid ${designSystem.colors.primary}`,
                      transition: designSystem.animations.transition,
                      fontFamily: designSystem.typography.fontFamily,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: designSystem.spacing.sm,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${designSystem.colors.primary}10`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    🔄 再来一道
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 底部信息 */}
        <footer style={{ 
          marginTop: designSystem.spacing.xxl,
          textAlign: "center",
          padding: designSystem.spacing.xl,
          color: designSystem.colors.textSecondary,
          fontSize: designSystem.typography.body.small,
        }}>
          <p>© 2026 Learning Loop AI | 智能学习闭环系统</p>
          <p style={{ marginTop: designSystem.spacing.xs }}>使用先进AI技术，打造沉浸式学习体验</p>
          <a
            href="/feedback"
            style={{
              display: "inline-block",
              marginTop: designSystem.spacing.md,
              color: designSystem.colors.primary,
              textDecoration: "none",
              fontWeight: "500",
              transition: `color ${designSystem.animations.transition}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = designSystem.colors.primaryLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = designSystem.colors.primary;
            }}
          >
            📝 用户反馈
          </a>
        </footer>

        {/* 浮动反馈按钮 */}
        <a
          href="/feedback"
          style={{
            position: "fixed",
            bottom: designSystem.spacing.xl,
            right: designSystem.spacing.xl,
            backgroundColor: designSystem.colors.primary,
            color: designSystem.colors.text,
            padding: `${designSystem.spacing.md} ${designSystem.spacing.lg}`,
            borderRadius: designSystem.borderRadius.full,
            boxShadow: designSystem.shadows.xl,
            textDecoration: "none",
            fontWeight: "600",
            fontSize: designSystem.typography.body.regular,
            transition: `all ${designSystem.animations.transition}`,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: designSystem.spacing.sm,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = designSystem.colors.primaryLight;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = designSystem.colors.primary;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          💬 反馈
        </a>
      </div>
    </div>
  );
}