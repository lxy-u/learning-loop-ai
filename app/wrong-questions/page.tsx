"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const designSystem = {
  colors: {
    background: "#0A0A0A",
    surface: "#1A1A1A",
    surfaceLight: "#2D2D2D",
    primary: "#6366F1",
    primaryLight: "#818CF8",
    secondary: "#10B981",
    success: "#10B981",
    error: "#EF4444",
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    border: "#374151",
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
  },
};

export default function WrongQuestionsPage() {
  const [wrongQuestions, setWrongQuestions] = useState<{
    question: string;
    options: string[];
    correctAnswer: string;
    userAnswer: string;
    explanation: string;
    topic: string;
    exam: string;
    level: string;
    difficulty: string;
    timestamp: string;
  }[]>([]);

  const [filterExam, setFilterExam] = useState("全部");
  const [filterLevel, setFilterLevel] = useState("全部");
  const [filterDifficulty, setFilterDifficulty] = useState("全部");

  useEffect(() => {
    const savedWrongQuestions = localStorage.getItem('wrongQuestions');
    if (savedWrongQuestions) {
      try {
        setWrongQuestions(JSON.parse(savedWrongQuestions));
      } catch (error) {
        console.error('加载错题本失败:', error);
      }
    }
  }, []);

  const filteredQuestions = wrongQuestions.filter(q => {
    if (filterExam !== "全部" && q.exam !== filterExam) return false;
    if (filterLevel !== "全部" && q.level !== filterLevel) return false;
    if (filterDifficulty !== "全部" && q.difficulty !== filterDifficulty) return false;
    return true;
  });

  const handleDelete = (index: number) => {
    const newQuestions = wrongQuestions.filter((_, i) => i !== index);
    setWrongQuestions(newQuestions);
    localStorage.setItem('wrongQuestions', JSON.stringify(newQuestions));
  };

  const handleClearAll = () => {
    if (confirm("确定要清空所有错题吗？")) {
      setWrongQuestions([]);
      localStorage.setItem('wrongQuestions', JSON.stringify([]));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: designSystem.colors.background,
      color: designSystem.colors.text,
      fontFamily: designSystem.typography.fontFamily,
      padding: designSystem.spacing.xl,
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <header style={{
          marginBottom: designSystem.spacing.xxl,
          textAlign: "center",
        }}>
          <h1 style={{
            fontSize: designSystem.typography.heading.h2,
            fontWeight: 700,
            marginBottom: designSystem.spacing.md,
            background: "linear-gradient(135deg, #6366F1 0%, #818CF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            📚 错题本
          </h1>
          <p style={{
            fontSize: designSystem.typography.body.regular,
            color: designSystem.colors.textSecondary,
          }}>
            共 {wrongQuestions.length} 道错题
          </p>
        </header>

        <div style={{
          display: "flex",
          gap: designSystem.spacing.md,
          marginBottom: designSystem.spacing.xl,
          flexWrap: "wrap",
        }}>
          <select
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
            style={{
              padding: `${designSystem.spacing.sm} ${designSystem.spacing.md}`,
              fontSize: designSystem.typography.body.regular,
              borderRadius: designSystem.borderRadius.md,
              border: `1px solid ${designSystem.colors.border}`,
              backgroundColor: designSystem.colors.surface,
              color: designSystem.colors.text,
              cursor: "pointer",
            }}
          >
            <option value="全部">全部考试</option>
            <option value="CFA">CFA</option>
            <option value="CPA">CPA</option>
            <option value="FRM">FRM</option>
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            style={{
              padding: `${designSystem.spacing.sm} ${designSystem.spacing.md}`,
              fontSize: designSystem.typography.body.regular,
              borderRadius: designSystem.borderRadius.md,
              border: `1px solid ${designSystem.colors.border}`,
              backgroundColor: designSystem.colors.surface,
              color: designSystem.colors.text,
              cursor: "pointer",
            }}
          >
            <option value="全部">全部级别</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            style={{
              padding: `${designSystem.spacing.sm} ${designSystem.spacing.md}`,
              fontSize: designSystem.typography.body.regular,
              borderRadius: designSystem.borderRadius.md,
              border: `1px solid ${designSystem.colors.border}`,
              backgroundColor: designSystem.colors.surface,
              color: designSystem.colors.text,
              cursor: "pointer",
            }}
          >
            <option value="全部">全部难度</option>
            <option value="简单">简单</option>
            <option value="中等">中等</option>
            <option value="困难">困难</option>
          </select>

          {wrongQuestions.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{
                padding: `${designSystem.spacing.sm} ${designSystem.spacing.md}`,
                fontSize: designSystem.typography.body.regular,
                borderRadius: designSystem.borderRadius.md,
                border: `1px solid ${designSystem.colors.error}`,
                backgroundColor: "transparent",
                color: designSystem.colors.error,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = designSystem.colors.error;
                e.currentTarget.style.color = designSystem.colors.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = designSystem.colors.error;
              }}
            >
              清空错题本
            </button>
          )}
        </div>

        {filteredQuestions.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: designSystem.spacing.xxl,
            color: designSystem.colors.textSecondary,
          }}>
            <p style={{ fontSize: designSystem.typography.body.regular }}>
              {wrongQuestions.length === 0 ? "还没有错题记录" : "没有符合条件的错题"}
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                marginTop: designSystem.spacing.lg,
                padding: `${designSystem.spacing.md} ${designSystem.spacing.xl}`,
                backgroundColor: designSystem.colors.primary,
                color: designSystem.colors.text,
                borderRadius: designSystem.borderRadius.md,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              开始学习
            </Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gap: designSystem.spacing.lg,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}>
            {filteredQuestions.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: designSystem.colors.surface,
                  borderRadius: designSystem.borderRadius.lg,
                  padding: designSystem.spacing.lg,
                  border: `1px solid ${designSystem.colors.border}`,
                  boxShadow: designSystem.shadows.md,
                  transition: "all 0.3s",
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: designSystem.spacing.md,
                }}>
                  <div>
                    <span style={{
                      display: "inline-block",
                      padding: `${designSystem.spacing.xs} ${designSystem.spacing.sm}`,
                      backgroundColor: designSystem.colors.primary,
                      color: designSystem.colors.text,
                      borderRadius: designSystem.borderRadius.sm,
                      fontSize: designSystem.typography.body.small,
                      marginRight: designSystem.spacing.xs,
                    }}>
                      {item.exam}
                    </span>
                    <span style={{
                      display: "inline-block",
                      padding: `${designSystem.spacing.xs} ${designSystem.spacing.sm}`,
                      backgroundColor: designSystem.colors.secondary,
                      color: designSystem.colors.text,
                      borderRadius: designSystem.borderRadius.sm,
                      fontSize: designSystem.typography.body.small,
                      marginRight: designSystem.spacing.xs,
                    }}>
                      {item.level}
                    </span>
                    <span style={{
                      display: "inline-block",
                      padding: `${designSystem.spacing.xs} ${designSystem.spacing.sm}`,
                      backgroundColor: designSystem.colors.surfaceLight,
                      color: designSystem.colors.text,
                      borderRadius: designSystem.borderRadius.sm,
                      fontSize: designSystem.typography.body.small,
                    }}>
                      {item.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      background: "none",
                      border: "none",
                      color: designSystem.colors.textSecondary,
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      padding: designSystem.spacing.xs,
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = designSystem.colors.error;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = designSystem.colors.textSecondary;
                    }}
                  >
                    ×
                  </button>
                </div>

                <div style={{
                  marginBottom: designSystem.spacing.md,
                }}>
                  <p style={{
                    fontSize: designSystem.typography.body.regular,
                    fontWeight: 600,
                    marginBottom: designSystem.spacing.sm,
                  }}>
                    {item.question}
                  </p>
                  {item.topic && (
                    <p style={{
                      fontSize: designSystem.typography.body.small,
                      color: designSystem.colors.textSecondary,
                      margin: 0,
                    }}>
                      知识点：{item.topic}
                    </p>
                  )}
                </div>

                <div style={{
                  marginBottom: designSystem.spacing.md,
                }}>
                  <p style={{
                    fontSize: designSystem.typography.body.small,
                    color: designSystem.colors.textSecondary,
                    marginBottom: designSystem.spacing.xs,
                  }}>
                    你的答案：
                  </p>
                  <p style={{
                    fontSize: designSystem.typography.body.regular,
                    color: designSystem.colors.error,
                    fontWeight: 600,
                    margin: 0,
                  }}>
                    {item.userAnswer}
                  </p>
                </div>

                <div style={{
                  marginBottom: designSystem.spacing.md,
                }}>
                  <p style={{
                    fontSize: designSystem.typography.body.small,
                    color: designSystem.colors.textSecondary,
                    marginBottom: designSystem.spacing.xs,
                  }}>
                    正确答案：
                  </p>
                  <p style={{
                    fontSize: designSystem.typography.body.regular,
                    color: designSystem.colors.success,
                    fontWeight: 600,
                    margin: 0,
                  }}>
                    {item.correctAnswer}
                  </p>
                </div>

                {item.explanation && (
                  <div style={{
                    backgroundColor: designSystem.colors.surfaceLight,
                    borderRadius: designSystem.borderRadius.md,
                    padding: designSystem.spacing.md,
                  }}>
                    <p style={{
                      fontSize: designSystem.typography.body.small,
                      color: designSystem.colors.textSecondary,
                      margin: 0,
                      whiteSpace: "pre-wrap",
                    }}>
                      {item.explanation}
                    </p>
                  </div>
                )}

                <p style={{
                  fontSize: designSystem.typography.body.small,
                  color: designSystem.colors.textSecondary,
                  marginTop: designSystem.spacing.md,
                  marginBottom: 0,
                }}>
                  {new Date(item.timestamp).toLocaleString('zh-CN')}
                </p>
              </div>
            ))}
          </div>
        )}

        <div style={{
          marginTop: designSystem.spacing.xxl,
          textAlign: "center",
        }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: `${designSystem.spacing.md} ${designSystem.spacing.xl}`,
              backgroundColor: designSystem.colors.primary,
              color: designSystem.colors.text,
              borderRadius: designSystem.borderRadius.md,
              textDecoration: "none",
              fontWeight: 600,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = designSystem.shadows.lg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}