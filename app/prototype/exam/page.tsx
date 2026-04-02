"use client";

import { useState } from "react";
import PrototypeLayout from "../components/PrototypeLayout";
import AIPanel from "../components/AIPanel";

const examQuestions = [
  { id: 1, topic: "CAPM", content: "CAPM模型中，Beta系数为1表示？", options: ["A. 无风险", "B. 与市场同步", "C. 高于市场风险", "D. 低于市场风险"], correct: "B" },
  { id: 2, topic: "NPV", content: "NPV为正意味着？", options: ["A. 项目亏损", "B. 项目盈亏平衡", "C. 项目创造价值", "D. 项目风险高"], correct: "C" },
  { id: 3, topic: "WACC", content: "WACC的计算中不包括？", options: ["A. 债务成本", "B. 权益成本", "C. 短期借款利率", "D. 资本结构权重"], correct: "C" },
];

const moduleResults = [
  { module: "公司金融", score: 55, avg: 70, color: "#EF4444" },
  { module: "财务分析", score: 78, avg: 65, color: "#10B981" },
  { module: "投资组合", score: 62, avg: 68, color: "#F59E0B" },
  { module: "固定收益", score: 70, avg: 60, color: "#10B981" },
  { module: "风险管理", score: 45, avg: 55, color: "#EF4444" },
];

export default function ExamPage() {
  const [showResult, setShowResult] = useState(true);

  return (
    <PrototypeLayout aiPanel={<AIPanel />}>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1E40AF" }}>模拟考试</h2>
            <span style={{
              fontSize: "11px",
              padding: "4px 10px",
              background: "rgba(239, 68, 68, 0.1)",
              color: "#EF4444",
              borderRadius: "6px",
            }}>
              考试模式
            </span>
          </div>
          {!showResult && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "#64748B" }}>⏱ 剩余 45:00</span>
              <button
                onClick={() => setShowResult(true)}
                style={{
                  padding: "6px 14px",
                  background: "#EF4444",
                  border: "none",
                  borderRadius: "6px",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#DC2626"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#EF4444"; }}
              >
                交卷
              </button>
            </div>
          )}
        </div>

        {showResult ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}>
              <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "8px" }}>考试成绩</div>
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#F59E0B", marginBottom: "4px" }}>62</div>
              <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px" }}>
                满分100 · 平均分 <span style={{ color: "#1E40AF", fontWeight: 600 }}>68</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#10B981" }}>18</div>
                  <div style={{ fontSize: "11px", color: "#94A3B8" }}>正确</div>
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#EF4444" }}>12</div>
                  <div style={{ fontSize: "11px", color: "#94A3B8" }}>错误</div>
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#94A3B8" }}>0</div>
                  <div style={{ fontSize: "11px", color: "#94A3B8" }}>未答</div>
                </div>
              </div>
            </div>

            <div style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #E0E6ED",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#1E40AF" }}>📊 分模块分析</div>
              {moduleResults.map(m => (
                <div key={m.module} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "13px", color: "#333333" }}>{m.module}</span>
                    <div style={{ display: "flex", gap: "12px", fontSize: "12px" }}>
                      <span style={{ color: m.score >= m.avg ? "#10B981" : "#EF4444", fontWeight: 600 }}>
                        你: {m.score}%
                      </span>
                      <span style={{ color: "#64748B" }}>平均: {m.avg}%</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <div style={{ flex: 1, height: "6px", background: "#E0E6ED", borderRadius: "3px", position: "relative" }}>
                      <div style={{
                        position: "absolute",
                        left: `${m.avg}%`,
                        top: "-2px",
                        width: "2px",
                        height: "10px",
                        background: "#94A3B8",
                        borderRadius: "1px",
                      }} />
                      <div style={{
                        width: `${m.score}%`,
                        height: "100%",
                        background: m.color,
                        borderRadius: "3px",
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{
                flex: 1,
                padding: "12px",
                background: "#3B82F6",
                border: "none",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}>
                📖 查看错题解析
              </button>
              <button style={{
                flex: 1,
                padding: "12px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#64748B",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                🧪 再考一次
              </button>
              <button style={{
                flex: 1,
                padding: "12px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#64748B",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                🗺️ 查看学习路径
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #E0E6ED",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontSize: "13px", color: "#64748B" }}>第 1/30 题</span>
              <span style={{
                fontSize: "11px",
                padding: "2px 8px",
                background: "rgba(59, 130, 246, 0.1)",
                color: "#3B82F6",
                borderRadius: "4px",
              }}>
                公司金融
              </span>
            </div>
            <p style={{ fontSize: "15px", lineHeight: "1.7", marginBottom: "20px", color: "#333333" }}>
              {examQuestions[0].content}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {examQuestions[0].options.map(opt => (
                <div key={opt} style={{
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1.5px solid #E0E6ED",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#333333",
                  background: "#F5F7FA",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                  {opt}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PrototypeLayout>
  );
}
