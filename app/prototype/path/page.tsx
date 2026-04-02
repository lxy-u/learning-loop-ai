"use client";

import PrototypeLayout from "../components/PrototypeLayout";

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

export default function PathPage() {
  return (
    <PrototypeLayout>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>🗺️ 学习路径</h2>
          <p style={{ fontSize: "12px", color: "#64748B" }}>AI 根据你的学习数据智能推荐</p>
        </div>

        <div style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px", color: "#333333" }}>📍 当前阶段：{currentStage.name}</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>{currentStage.description}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#3B82F6" }}>{currentStage.progress}%</div>
              <div style={{ fontSize: "11px", color: "#64748B" }}>阶段进度</div>
            </div>
          </div>
          <div style={{ width: "100%", height: "6px", background: "#E0E6ED", borderRadius: "3px" }}>
            <div style={{ width: `${currentStage.progress}%`, height: "100%", background: "#3B82F6", borderRadius: "3px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "11px", color: "#64748B" }}>
            <span>开始：{currentStage.startDate}</span>
            <span>目标：{currentStage.targetDate}</span>
          </div>
        </div>

        <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#333333" }}>🎯 推荐学习路径</div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {pathCards.map((card, index) => (
            <div key={card.id} style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "20px",
              border: `1px solid ${card.priority === "high" ? "rgba(239, 68, 68, 0.2)" : card.priority === "medium" ? "rgba(245, 158, 11, 0.2)" : "#E0E6ED"}`,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              display: "flex",
              gap: "16px",
            }} onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }} onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: card.priority === "high" ? "rgba(239, 68, 68, 0.1)" : card.priority === "medium" ? "rgba(245, 158, 11, 0.1)" : "rgba(107, 114, 128, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
                color: card.priority === "high" ? "#EF4444" : card.priority === "medium" ? "#F59E0B" : "#64748B",
                flexShrink: 0,
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#333333" }}>{card.title}</span>
                    <span style={{
                      fontSize: "10px",
                      padding: "2px 6px",
                      background: "rgba(59, 130, 246, 0.1)",
                      color: "#3B82F6",
                      borderRadius: "4px",
                      marginLeft: "8px",
                    }}>
                      {card.topic}
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#64748B" }}>⏱ {card.estimatedTime}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "10px" }}>
                  📌 {card.reason}
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {card.steps.map((step, i) => (
                    <span key={i} style={{
                      fontSize: "11px",
                      padding: "4px 8px",
                      background: "#F5F7FA",
                      borderRadius: "4px",
                      color: "#333333",
                    }}>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
              <button style={{
                padding: "8px 16px",
                background: card.priority === "high" ? "#3B82F6" : "#F5F7FA",
                border: card.priority === "high" ? "none" : "1px solid #E0E6ED",
                borderRadius: "8px",
                color: card.priority === "high" ? "#FFFFFF" : "#64748B",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 500,
                alignSelf: "center",
                flexShrink: 0,
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = card.priority === "high" ? "#2563EB" : "#E8EEF5";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = card.priority === "high" ? "#3B82F6" : "#F5F7FA";
              }}>
                开始 →
              </button>
            </div>
          ))}
        </div>
      </div>
    </PrototypeLayout>
  );
}
