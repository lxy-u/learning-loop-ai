"use client";

import PrototypeLayout from "./components/PrototypeLayout";

const stats = [
  { label: "总掌握率", value: "65%", trend: "+5%", color: "#3B82F6" },
  { label: "今日学习", value: "45min", trend: "+15min", color: "#10B981" },
  { label: "连续打卡", value: "7天", trend: "🔥", color: "#F59E0B" },
  { label: "待复习", value: "12题", trend: "3新错题", color: "#EF4444" },
];

const currentStage = {
  name: "基础阶段",
  progress: 45,
  description: "掌握核心概念和基本公式",
  startDate: "2026-03-10",
  targetDate: "2026-05-01",
};

const pathCards = [
  {
    id: 1,
    priority: "high",
    title: "CAPM 模型",
    reason: "你在3道题中理解错误，掌握率仅35%",
    steps: ["📖 看课程（15min）", "📝 做5题强化", "🤖 AI复盘"],
    estimatedTime: "40min",
    topic: "投资组合",
  },
  {
    id: 2,
    priority: "high",
    title: "WACC 加权平均资本成本",
    reason: "掌握率30%，低于平均水平42%",
    steps: ["📖 复习公式", "📝 做3题基础", "📝 做3题进阶"],
    estimatedTime: "35min",
    topic: "公司金融",
  },
  {
    id: 3,
    priority: "medium",
    title: "杜邦分析",
    reason: "上次学习已过5天，建议复习巩固",
    steps: ["📖 快速回顾", "📝 做3题测试"],
    estimatedTime: "20min",
    topic: "财务分析",
  },
  {
    id: 4,
    priority: "medium",
    title: "久期与凸性",
    reason: "掌握率42%，需加强理解",
    steps: ["📖 看课程", "📝 做5题练习"],
    estimatedTime: "30min",
    topic: "固定收益",
  },
  {
    id: 5,
    priority: "low",
    title: "VaR 风险价值",
    reason: "尚未学习，建议本周开始",
    steps: ["📖 看课程", "📝 做3题入门"],
    estimatedTime: "25min",
    topic: "风险管理",
  },
];

const recentTopics = [
  { name: "NPV 净现值", mastery: 85, time: "2小时前" },
  { name: "CAPM 模型", mastery: 40, time: "昨天" },
  { name: "财务报表分析", mastery: 72, time: "昨天" },
  { name: "Beta 系数", mastery: 55, time: "2天前" },
  { name: "WACC 加权平均资本成本", mastery: 30, time: "2天前" },
];

function ProgressBar({ value, color = "#3B82F6" }: { value: number; color?: string }) {
  return (
    <div style={{
      width: "100%",
      height: "6px",
      background: "#E0E6ED",
      borderRadius: "3px",
      overflow: "hidden",
    }}>
      <div style={{
        width: `${value}%`,
        height: "100%",
        background: color,
        borderRadius: "3px",
        transition: "width 0.5s",
      }} />
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "12px",
      padding: "20px",
      border: "1px solid #E0E6ED",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      ...style,
    }} onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }} onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
      e.currentTarget.style.transform = "translateY(0)";
    }}>
      {children}
    </div>
  );
}

export default function PrototypeDashboard() {
  return (
    <PrototypeLayout>
      <div style={{ maxWidth: "1200px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>欢迎回来 👋</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>2026年4月2日 · CFA Level 1 · 备考第23天</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}>
          {stats.map(stat => (
            <Card key={stat.label}>
              <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px" }}>{stat.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "28px", fontWeight: 700, color: stat.color }}>{stat.value}</span>
                <span style={{ fontSize: "11px", color: "#6B7280" }}>{stat.trend}</span>
              </div>
            </Card>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px"
        }}>
          <div>
            <div style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px", color: "#1E40AF" }}>📍 当前阶段：{currentStage.name}</div>
                  <div style={{ fontSize: "13px", color: "#6B7280" }}>{currentStage.description}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#3B82F6" }}>{currentStage.progress}%</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>阶段进度</div>
                </div>
              </div>
              <div style={{ width: "100%", height: "8px", background: "#E0E6ED", borderRadius: "4px" }}>
                <div style={{ width: `${currentStage.progress}%`, height: "100%", background: "#3B82F6", borderRadius: "4px" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#6B7280" }}>
                <span>开始：{currentStage.startDate}</span>
                <span>目标：{currentStage.targetDate}</span>
              </div>
            </div>

            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "#1E40AF" }}>🎯 你的学习路径</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {pathCards.map((card, index) => (
                <div key={card.id} style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "20px",
                  border: `1px solid ${card.priority === "high" ? "rgba(239, 68, 68, 0.3)" : card.priority === "medium" ? "rgba(245, 158, 11, 0.2)" : "#E0E6ED"}`,
                  display: "flex",
                  gap: "16px",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: card.priority === "high" ? "rgba(239, 68, 68, 0.15)" : card.priority === "medium" ? "rgba(245, 158, 11, 0.15)" : "rgba(107, 114, 128, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: card.priority === "high" ? "#EF4444" : card.priority === "medium" ? "#F59E0B" : "#6B7280",
                    flexShrink: 0,
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div>
                        <span style={{ fontSize: "15px", fontWeight: 600, color: "#1E40AF" }}>{card.title}</span>
                        <span style={{
                          fontSize: "11px",
                          padding: "3px 8px",
                          background: "rgba(59, 130, 246, 0.15)",
                          color: "#3B82F6",
                          borderRadius: "4px",
                          marginLeft: "8px",
                        }}>
                          {card.topic}
                        </span>
                      </div>
                      <span style={{ fontSize: "12px", color: "#6B7280" }}>⏱ {card.estimatedTime}</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "12px" }}>
                      📌 {card.reason}
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {card.steps.map((step, i) => (
                        <span key={i} style={{
                          fontSize: "12px",
                          padding: "5px 10px",
                          background: "#F5F7FA",
                          borderRadius: "6px",
                          color: "#6B7280",
                          border: "1px solid #E0E6ED",
                        }}>
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button style={{
                    padding: "10px 20px",
                    background: card.priority === "high" ? "#3B82F6" : "#F5F7FA",
                    border: card.priority === "high" ? "none" : "1px solid #E0E6ED",
                    borderRadius: "8px",
                    color: card.priority === "high" ? "#FFFFFF" : "#1E40AF",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontWeight: 500,
                    alignSelf: "center",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}>
                    开始 →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Card>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#1E40AF" }}>🧠 AI 建议</div>
              <div style={{
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
              }}>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "#1E40AF" }}>🔥 优先学习 CAPM</div>
                <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.5" }}>
                  CAPM是你的最大薄弱点，掌握率仅35%。建议今天完成学习路径第1项。
                </div>
              </div>
              <div style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
                borderRadius: "10px",
                padding: "16px",
              }}>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "#1E40AF" }}>⏰ 复习提醒</div>
                <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.5" }}>
                  杜邦分析已过5天，建议今天复习，避免遗忘。
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#1E40AF" }}>📚 最近学习</div>
              {recentTopics.map((topic, i) => (
                <div key={i} style={{
                  padding: "10px 0",
                  borderBottom: i < recentTopics.length - 1 ? "1px solid #E0E6ED" : "none",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "#1E40AF" }}>{topic.name}</span>
                    <span style={{ fontSize: "11px", color: "#6B7280" }}>{topic.time}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <ProgressBar value={topic.mastery} color={topic.mastery >= 70 ? "#10B981" : topic.mastery >= 50 ? "#F59E0B" : "#EF4444"} />
                    <span style={{ fontSize: "11px", color: topic.mastery >= 70 ? "#10B981" : topic.mastery >= 50 ? "#F59E0B" : "#EF4444", fontWeight: 600, minWidth: "36px" }}>
                      {topic.mastery}%
                    </span>
                  </div>
                </div>
              ))}
            </Card>

            <Card>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#1E40AF" }}>🎯 今日目标</div>
              <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.6", marginBottom: "12px" }}>
                根据你的学习进度，今天建议完成：
              </div>
              <div style={{ fontSize: "13px", marginBottom: "8px", color: "#1E40AF" }}>✓ CAPM 模型学习（40min）</div>
              <div style={{ fontSize: "13px", marginBottom: "8px", color: "#1E40AF" }}>✓ 杜邦分析复习（20min）</div>
              <div style={{ fontSize: "13px", color: "#1E40AF" }}>✓ 错题本复习（15min）</div>
              <div style={{ marginTop: "16px", padding: "12px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "8px", fontSize: "12px", color: "#10B981" }}>
                💪 预计今日学习时间：75分钟
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PrototypeLayout>
  );
}