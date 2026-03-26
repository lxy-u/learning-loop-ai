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

export default function ReportPage() {
  const [learningProgress, setLearningProgress] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    learnedTopics: [] as string[],
    studyTime: 0,
    currentStreak: 0,
    bestStreak: 0
  });

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

  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      try {
        setLearningProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('加载学习进度失败:', error);
      }
    }

    const savedWrongQuestions = localStorage.getItem('wrongQuestions');
    if (savedWrongQuestions) {
      try {
        setWrongQuestions(JSON.parse(savedWrongQuestions));
      } catch (error) {
        console.error('加载错题本失败:', error);
      }
    }
  }, []);

  const correctRate = learningProgress.totalQuestions > 0 
    ? Math.round((learningProgress.correctAnswers / learningProgress.totalQuestions) * 100) 
    : 0;

  const weakTopics = wrongQuestions.reduce((acc, item) => {
    const topic = item.topic || "未知";
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedWeakTopics = Object.entries(weakTopics)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const examDistribution = wrongQuestions.reduce((acc, item) => {
    acc[item.exam] = (acc[item.exam] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const levelDistribution = wrongQuestions.reduce((acc, item) => {
    acc[item.level] = (acc[item.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const difficultyDistribution = wrongQuestions.reduce((acc, item) => {
    acc[item.difficulty] = (acc[item.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleExport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      learningProgress,
      wrongQuestions,
      statistics: {
        correctRate,
        totalWrongQuestions: wrongQuestions.length,
        weakTopics: sortedWeakTopics,
        examDistribution,
        levelDistribution,
        difficultyDistribution
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            📊 学习报告
          </h1>
          <p style={{
            fontSize: designSystem.typography.body.regular,
            color: designSystem.colors.textSecondary,
          }}>
            生成时间：{new Date().toLocaleString('zh-CN')}
          </p>
        </header>

        <div style={{
          display: "grid",
          gap: designSystem.spacing.lg,
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          marginBottom: designSystem.spacing.xl,
        }}>
          <div style={{
            backgroundColor: designSystem.colors.surface,
            borderRadius: designSystem.borderRadius.lg,
            padding: designSystem.spacing.lg,
            border: `1px solid ${designSystem.colors.border}`,
            boxShadow: designSystem.shadows.md,
          }}>
            <h3 style={{
              fontSize: designSystem.typography.heading.h4,
              fontWeight: 600,
              marginBottom: designSystem.spacing.md,
              color: designSystem.colors.text,
            }}>
              总答题数
            </h3>
            <div style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: designSystem.colors.primary,
              textAlign: "center",
            }}>
              {learningProgress.totalQuestions}
            </div>
          </div>

          <div style={{
            backgroundColor: designSystem.colors.surface,
            borderRadius: designSystem.borderRadius.lg,
            padding: designSystem.spacing.lg,
            border: `1px solid ${designSystem.colors.border}`,
            boxShadow: designSystem.shadows.md,
          }}>
            <h3 style={{
              fontSize: designSystem.typography.heading.h4,
              fontWeight: 600,
              marginBottom: designSystem.spacing.md,
              color: designSystem.colors.text,
            }}>
              正确率
            </h3>
            <div style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: correctRate >= 70 ? designSystem.colors.success : correctRate >= 50 ? designSystem.colors.primary : designSystem.colors.error,
              textAlign: "center",
            }}>
              {correctRate}%
            </div>
          </div>

          <div style={{
            backgroundColor: designSystem.colors.surface,
            borderRadius: designSystem.borderRadius.lg,
            padding: designSystem.spacing.lg,
            border: `1px solid ${designSystem.colors.border}`,
            boxShadow: designSystem.shadows.md,
          }}>
            <h3 style={{
              fontSize: designSystem.typography.heading.h4,
              fontWeight: 600,
              marginBottom: designSystem.spacing.md,
              color: designSystem.colors.text,
            }}>
              已学知识点
            </h3>
            <div style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: designSystem.colors.secondary,
              textAlign: "center",
            }}>
              {learningProgress.learnedTopics.length}
            </div>
          </div>

          <div style={{
            backgroundColor: designSystem.colors.surface,
            borderRadius: designSystem.borderRadius.lg,
            padding: designSystem.spacing.lg,
            border: `1px solid ${designSystem.colors.border}`,
            boxShadow: designSystem.shadows.md,
          }}>
            <h3 style={{
              fontSize: designSystem.typography.heading.h4,
              fontWeight: 600,
              marginBottom: designSystem.spacing.md,
              color: designSystem.colors.text,
            }}>
              最佳连续答对
            </h3>
            <div style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: designSystem.colors.primaryLight,
              textAlign: "center",
            }}>
              🔥 {learningProgress.bestStreak}
            </div>
          </div>
        </div>

        {sortedWeakTopics.length > 0 && (
          <div style={{
            backgroundColor: designSystem.colors.surface,
            borderRadius: designSystem.borderRadius.lg,
            padding: designSystem.spacing.lg,
            border: `1px solid ${designSystem.colors.border}`,
            boxShadow: designSystem.shadows.md,
            marginBottom: designSystem.spacing.xl,
          }}>
            <h3 style={{
              fontSize: designSystem.typography.heading.h4,
              fontWeight: 600,
              marginBottom: designSystem.spacing.md,
              color: designSystem.colors.text,
              display: "flex",
              alignItems: "center",
              gap: designSystem.spacing.sm,
            }}>
              📉 薄弱知识点（前5）
            </h3>
            <div style={{
              display: "grid",
              gap: designSystem.spacing.md,
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}>
              {sortedWeakTopics.map(([topic, count], index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: designSystem.colors.surfaceLight,
                    borderRadius: designSystem.borderRadius.md,
                    padding: designSystem.spacing.md,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{
                    fontSize: designSystem.typography.body.regular,
                    fontWeight: 500,
                  }}>
                    {topic}
                  </span>
                  <span style={{
                    fontSize: designSystem.typography.body.regular,
                    fontWeight: 700,
                    color: designSystem.colors.error,
                  }}>
                    {count}次
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(examDistribution).length > 0 && (
          <div style={{
            backgroundColor: designSystem.colors.surface,
            borderRadius: designSystem.borderRadius.lg,
            padding: designSystem.spacing.lg,
            border: `1px solid ${designSystem.colors.border}`,
            boxShadow: designSystem.shadows.md,
            marginBottom: designSystem.spacing.xl,
          }}>
            <h3 style={{
              fontSize: designSystem.typography.heading.h4,
              fontWeight: 600,
              marginBottom: designSystem.spacing.md,
              color: designSystem.colors.text,
              display: "flex",
              alignItems: "center",
              gap: designSystem.spacing.sm,
            }}>
              📚 考试分布
            </h3>
            <div style={{
              display: "grid",
              gap: designSystem.spacing.md,
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}>
              {Object.entries(examDistribution).map(([exam, count]) => (
                <div
                  key={exam}
                  style={{
                    backgroundColor: designSystem.colors.surfaceLight,
                    borderRadius: designSystem.borderRadius.md,
                    padding: designSystem.spacing.md,
                    textAlign: "center",
                  }}
                >
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: designSystem.colors.primary,
                    marginBottom: designSystem.spacing.xs,
                  }}>
                    {count}
                  </div>
                  <div style={{
                    fontSize: designSystem.typography.body.small,
                    color: designSystem.colors.textSecondary,
                  }}>
                    {exam}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(levelDistribution).length > 0 && (
          <div style={{
            backgroundColor: designSystem.colors.surface,
            borderRadius: designSystem.borderRadius.lg,
            padding: designSystem.spacing.lg,
            border: `1px solid ${designSystem.colors.border}`,
            boxShadow: designSystem.shadows.md,
            marginBottom: designSystem.spacing.xl,
          }}>
            <h3 style={{
              fontSize: designSystem.typography.heading.h4,
              fontWeight: 600,
              marginBottom: designSystem.spacing.md,
              color: designSystem.colors.text,
              display: "flex",
              alignItems: "center",
              gap: designSystem.spacing.sm,
            }}>
              📊 级别分布
            </h3>
            <div style={{
              display: "grid",
              gap: designSystem.spacing.md,
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}>
              {Object.entries(levelDistribution).map(([level, count]) => (
                <div
                  key={level}
                  style={{
                    backgroundColor: designSystem.colors.surfaceLight,
                    borderRadius: designSystem.borderRadius.md,
                    padding: designSystem.spacing.md,
                    textAlign: "center",
                  }}
                >
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: designSystem.colors.secondary,
                    marginBottom: designSystem.spacing.xs,
                  }}>
                    {count}
                  </div>
                  <div style={{
                    fontSize: designSystem.typography.body.small,
                    color: designSystem.colors.textSecondary,
                  }}>
                    {level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(difficultyDistribution).length > 0 && (
          <div style={{
            backgroundColor: designSystem.colors.surface,
            borderRadius: designSystem.borderRadius.lg,
            padding: designSystem.spacing.lg,
            border: `1px solid ${designSystem.colors.border}`,
            boxShadow: designSystem.shadows.md,
            marginBottom: designSystem.spacing.xl,
          }}>
            <h3 style={{
              fontSize: designSystem.typography.heading.h4,
              fontWeight: 600,
              marginBottom: designSystem.spacing.md,
              color: designSystem.colors.text,
              display: "flex",
              alignItems: "center",
              gap: designSystem.spacing.sm,
            }}>
              🎯 难度分布
            </h3>
            <div style={{
              display: "grid",
              gap: designSystem.spacing.md,
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}>
              {Object.entries(difficultyDistribution).map(([difficulty, count]) => (
                <div
                  key={difficulty}
                  style={{
                    backgroundColor: designSystem.colors.surfaceLight,
                    borderRadius: designSystem.borderRadius.md,
                    padding: designSystem.spacing.md,
                    textAlign: "center",
                  }}
                >
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: difficulty === "简单" ? designSystem.colors.success : difficulty === "中等" ? designSystem.colors.primary : designSystem.colors.error,
                    marginBottom: designSystem.spacing.xs,
                  }}>
                    {count}
                  </div>
                  <div style={{
                    fontSize: designSystem.typography.body.small,
                    color: designSystem.colors.textSecondary,
                  }}>
                    {difficulty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          display: "flex",
          gap: designSystem.spacing.md,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: designSystem.spacing.xl,
        }}>
          <button
            onClick={handleExport}
            style={{
              padding: `${designSystem.spacing.md} ${designSystem.spacing.xl}`,
              fontSize: designSystem.typography.body.regular,
              borderRadius: designSystem.borderRadius.md,
              border: `1px solid ${designSystem.colors.primary}`,
              backgroundColor: designSystem.colors.primary,
              color: designSystem.colors.text,
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s",
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
            📥 导出报告
          </button>

          <Link
            href="/wrong-questions"
            style={{
              padding: `${designSystem.spacing.md} ${designSystem.spacing.xl}`,
              fontSize: designSystem.typography.body.regular,
              borderRadius: designSystem.borderRadius.md,
              border: `1px solid ${designSystem.colors.secondary}`,
              backgroundColor: designSystem.colors.secondary,
              color: designSystem.colors.text,
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = designSystem.colors.success;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = designSystem.colors.secondary;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            📚 查看错题本
          </Link>

          <Link
            href="/"
            style={{
              padding: `${designSystem.spacing.md} ${designSystem.spacing.xl}`,
              fontSize: designSystem.typography.body.regular,
              borderRadius: designSystem.borderRadius.md,
              border: `1px solid ${designSystem.colors.border}`,
              backgroundColor: "transparent",
              color: designSystem.colors.text,
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = designSystem.colors.surface;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🏠 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}