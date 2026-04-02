"use client";

import { useState } from "react";
import PrototypeLayout from "../components/PrototypeLayout";
import AIPanel from "../components/AIPanel";

const chapters = [
  { id: "ch1", title: "公司金融", lessons: [
    { id: "l1", title: "NPV与IRR", duration: "15min", completed: true },
    { id: "l2", title: "CAPM模型", duration: "20min", completed: false },
    { id: "l3", title: "WACC计算", duration: "18min", completed: false },
  ]},
  { id: "ch2", title: "财务分析", lessons: [
    { id: "l4", title: "三大报表", duration: "25min", completed: true },
    { id: "l5", title: "财务比率分析", duration: "20min", completed: true },
    { id: "l6", title: "杜邦分析", duration: "15min", completed: false },
  ]},
  { id: "ch3", title: "投资组合", lessons: [
    { id: "l7", title: "现代投资组合理论", duration: "22min", completed: false },
    { id: "l8", title: "Beta与系统性风险", duration: "18min", completed: false },
  ]},
  { id: "ch4", title: "固定收益", lessons: [
    { id: "l9", title: "债券定价", duration: "20min", completed: true },
    { id: "l10", title: "久期与凸性", duration: "22min", completed: false },
  ]},
];

export default function CoursePage() {
  const [activeLesson, setActiveLesson] = useState("l2");

  return (
    <PrototypeLayout aiPanel={<AIPanel />}>
      <div style={{ display: "flex", height: "calc(100vh - 104px)", gap: "0" }}>
        <div style={{
          width: "260px",
          background: "#FFFFFF",
          borderRight: "1px solid #E0E6ED",
          overflow: "auto",
          flexShrink: 0,
        }}>
          <div style={{ padding: "16px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#1E40AF" }}>📖 课程目录</h3>
            {chapters.map(ch => (
              <div key={ch.id} style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase" }}>
                  {ch.title}
                </div>
                {ch.lessons.map(lesson => (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "6px",
                      marginBottom: "2px",
                      cursor: "pointer",
                      background: activeLesson === lesson.id ? "rgba(59, 130, 246, 0.1)" : "#F5F7FA",
                      borderLeft: activeLesson === lesson.id ? "2px solid #3B82F6" : "2px solid transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (activeLesson !== lesson.id) {
                        e.currentTarget.style.background = "#E8EEF5";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeLesson !== lesson.id) {
                        e.currentTarget.style.background = "#F5F7FA";
                      }
                    }}
                  >
                    <span style={{ fontSize: "12px", color: lesson.completed ? "#10B981" : "#64748B" }}>
                      {lesson.completed ? "✓" : "○"}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "12px",
                        fontWeight: activeLesson === lesson.id ? 600 : 400,
                        color: activeLesson === lesson.id ? "#1E40AF" : "#333333",
                      }}>
                        {lesson.title}
                      </div>
                      <div style={{ fontSize: "10px", color: "#94A3B8" }}>{lesson.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
          <div style={{ padding: "24px", flex: 1 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>CAPM 模型</h2>
                <p style={{ fontSize: "12px", color: "#64748B" }}>资本资产定价模型 · 公司金融 · 20min</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "#EF4444",
                  borderRadius: "6px",
                }}>
                  🔥 高频考点
                </span>
                <span style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  background: "rgba(245, 158, 11, 0.1)",
                  color: "#F59E0B",
                  borderRadius: "6px",
                }}>
                  ⚠️ 理解难度高
                </span>
              </div>
            </div>

            <div style={{
              width: "100%",
              aspectRatio: "16/9",
              background: "#F5F7FA",
              borderRadius: "12px",
              border: "1px solid #E0E6ED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>▶️</div>
                <div style={{ fontSize: "14px", color: "#64748B" }}>课程视频播放区域</div>
                <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>CAPM 模型详解 · 20:00</div>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "12px", color: "#1E40AF" }}>📝 课程讲义</h3>
              <div style={{
                background: "#F5F7FA",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid #E0E6ED",
                lineHeight: "1.8",
                fontSize: "13px",
                color: "#333333",
              }}>
                <p style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#1E40AF" }}>CAPM（资本资产定价模型）</strong>是现代金融理论中最重要的模型之一，用于确定资产的预期收益率。
                </p>
                <p style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#3B82F6" }}>核心公式：</strong>
                </p>
                <div style={{
                  background: "#E8EEF5",
                  padding: "16px",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#3B82F6",
                  marginBottom: "12px",
                  fontFamily: "monospace",
                }}>
                  E(Ri) = Rf + βi × (E(Rm) - Rf)
                </div>
                <p style={{ marginBottom: "8px" }}>其中：</p>
                <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
                  <li><strong style={{ color: "#1E40AF" }}>E(Ri)</strong> — 资产i的预期收益率</li>
                  <li><strong style={{ color: "#1E40AF" }}>Rf</strong> — 无风险利率</li>
                  <li><strong style={{ color: "#1E40AF" }}>βi</strong> — 资产i的Beta系数</li>
                  <li><strong style={{ color: "#1E40AF" }}>E(Rm)</strong> — 市场组合的预期收益率</li>
                </ul>
                <p>
                  <strong style={{ color: "#F59E0B" }}>关键理解：</strong>CAPM的核心思想是，投资者承担的额外风险（系统性风险）应该获得额外的风险溢价补偿。
                </p>
              </div>
            </div>

            <div style={{
              display: "flex",
              gap: "12px",
              padding: "16px",
              background: "#F5F7FA",
              borderRadius: "12px",
              border: "1px solid #E0E6ED",
            }}>
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
                📝 做题练习
              </button>
              <button style={{
                flex: 1,
                padding: "12px",
                background: "#FFFFFF",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#1E40AF",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}>
                📖 下一节：WACC计算
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrototypeLayout>
  );
}
