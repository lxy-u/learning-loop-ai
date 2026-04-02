"use client";

import { useState } from "react";
import PrototypeLayout from "../components/PrototypeLayout";
import AIPanel from "../components/AIPanel";

const question = {
  id: 1,
  topic: "CAPM模型",
  difficulty: "中等",
  content: "根据CAPM模型，如果无风险利率为3%，市场预期收益率为10%，某股票的Beta系数为1.5，则该股票的预期收益率为？",
  options: [
    { key: "A", text: "10.5%" },
    { key: "B", text: "13.5%" },
    { key: "C", text: "15.0%" },
    { key: "D", text: "18.0%" },
  ],
  correctAnswer: "B",
  explanation: "根据CAPM公式：E(Ri) = Rf + βi × (E(Rm) - Rf) = 3% + 1.5 × (10% - 3%) = 3% + 10.5% = 13.5%",
};

export default function QuizPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const isCorrect = selected === question.correctAnswer;

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <PrototypeLayout aiPanel={<AIPanel />}>
      <div style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1E40AF" }}>题库练习</h2>
            <span style={{
              fontSize: "11px",
              padding: "4px 10px",
              background: "rgba(59, 130, 246, 0.1)",
              color: "#3B82F6",
              borderRadius: "6px",
            }}>
              练习模式
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "12px", color: "#64748B" }}>第 3/10 题</span>
            <span style={{
              fontSize: "11px",
              padding: "4px 10px",
              background: "rgba(245, 158, 11, 0.1)",
              color: "#F59E0B",
              borderRadius: "6px",
            }}>
              {question.difficulty}
            </span>
          </div>
        </div>

        <div style={{
          width: "100%",
          height: "4px",
          background: "#E0E6ED",
          borderRadius: "2px",
          marginBottom: "24px",
        }}>
          <div style={{ width: "30%", height: "100%", background: "#3B82F6", borderRadius: "2px" }} />
        </div>

        <div style={{
          background: "#FFFFFF",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #E0E6ED",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          marginBottom: "20px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{
                fontSize: "11px",
                padding: "2px 8px",
                background: "rgba(59, 130, 246, 0.1)",
                color: "#3B82F6",
                borderRadius: "4px",
              }}>
                {question.topic}
              </span>
              <span style={{
                fontSize: "11px",
                padding: "2px 8px",
                background: "rgba(245, 158, 11, 0.1)",
                color: "#F59E0B",
                borderRadius: "4px",
              }}>
                {question.difficulty}
              </span>
            </div>
            <button
              onClick={toggleFavorite}
              style={{
                padding: "8px 12px",
                background: isFavorited ? "rgba(245, 158, 11, 0.1)" : "#F5F7FA",
                border: isFavorited ? "1px solid #F59E0B" : "1px solid #E0E6ED",
                borderRadius: "6px",
                color: isFavorited ? "#F59E0B" : "#64748B",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isFavorited ? "rgba(245, 158, 11, 0.2)" : "#E8EEF5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isFavorited ? "rgba(245, 158, 11, 0.1)" : "#F5F7FA";
              }}
            >
              {isFavorited ? "⭐ 已收藏" : "☆ 收藏"}
            </button>
          </div>

          <p style={{ fontSize: "15px", lineHeight: "1.7", marginBottom: "24px", color: "#333333" }}>
            {question.content}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {question.options.map(opt => {
              let borderColor = "#E0E6ED";
              let bgColor = "#F5F7FA";
              let textColor = "#333333";

              if (submitted) {
                if (opt.key === question.correctAnswer) {
                  borderColor = "#10B981";
                  bgColor = "rgba(16, 185, 129, 0.1)";
                  textColor = "#10B981";
                } else if (opt.key === selected && !isCorrect) {
                  borderColor = "#EF4444";
                  bgColor = "rgba(239, 68, 68, 0.1)";
                  textColor = "#EF4444";
                }
              } else if (selected === opt.key) {
                borderColor = "#3B82F6";
                bgColor = "rgba(59, 130, 246, 0.1)";
              }

              return (
                <div
                  key={opt.key}
                  onClick={() => !submitted && setSelected(opt.key)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: `1.5px solid ${borderColor}`,
                    background: bgColor,
                    color: textColor,
                    cursor: submitted ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!submitted && selected !== opt.key) {
                      e.currentTarget.style.background = "#E8EEF5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitted && selected !== opt.key) {
                      e.currentTarget.style.background = "#F5F7FA";
                    }
                  }}
                >
                  <span style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: `1.5px solid ${borderColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}>
                    {opt.key}
                  </span>
                  <span style={{ fontSize: "14px" }}>{opt.text}</span>
                  {submitted && opt.key === question.correctAnswer && (
                    <span style={{ marginLeft: "auto", fontSize: "14px" }}>✓</span>
                  )}
                  {submitted && opt.key === selected && !isCorrect && (
                    <span style={{ marginLeft: "auto", fontSize: "14px" }}>✗</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!selected}
            style={{
              width: "100%",
              padding: "14px",
              background: selected ? "#3B82F6" : "#F5F7FA",
              border: selected ? "none" : "1px solid #E0E6ED",
              borderRadius: "10px",
              color: selected ? "#FFFFFF" : "#94A3B8",
              fontSize: "14px",
              cursor: selected ? "pointer" : "not-allowed",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (selected) {
                e.currentTarget.style.background = "#2563EB";
              }
            }}
            onMouseLeave={(e) => {
              if (selected) {
                e.currentTarget.style.background = "#3B82F6";
              }
            }}
          >
            提交答案
          </button>
        ) : (
          <>
            <div style={{
              background: isCorrect ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              border: `1px solid ${isCorrect ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "16px",
            }}>
              <div style={{
                fontSize: "14px",
                fontWeight: 600,
                color: isCorrect ? "#10B981" : "#EF4444",
                marginBottom: "8px",
              }}>
                {isCorrect ? "✅ 回答正确！" : "❌ 回答错误"}
              </div>
              <div style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.6" }}>
                {question.explanation}
              </div>
            </div>

            {showNoteInput ? (
              <div style={{
                background: "#F5F7FA",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #E0E6ED",
                marginBottom: "16px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#1E40AF" }}>📝 添加笔记</span>
                  <button
                    onClick={() => setShowNoteInput(false)}
                    style={{
                      background: "none",
                      border: "1px solid #E0E6ED",
                      color: "#64748B",
                      cursor: "pointer",
                      fontSize: "16px",
                      borderRadius: "4px",
                      padding: "2px 6px",
                    }}
                  >
                    ×
                  </button>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="记录你的理解、易错点、记忆方法..."
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "12px",
                    background: "#FFFFFF",
                    border: "1px solid #E0E6ED",
                    borderRadius: "8px",
                    color: "#333333",
                    fontSize: "13px",
                    resize: "vertical",
                    fontFamily: "inherit",
                    lineHeight: "1.5",
                  }}
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                  <button
                    onClick={() => {
                      if (note.trim()) {
                        alert("笔记已保存");
                        setShowNoteInput(false);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "#3B82F6",
                      border: "none",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}
                  >
                    保存笔记
                  </button>
                  <button
                    onClick={() => setShowNoteInput(false)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "#F5F7FA",
                      border: "1px solid #E0E6ED",
                      borderRadius: "8px",
                      color: "#64748B",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowNoteInput(true)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "8px",
                  color: "#64748B",
                  fontSize: "13px",
                  cursor: "pointer",
                  marginBottom: "16px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}
              >
                📝 添加笔记
              </button>
            )}

            {note && !showNoteInput && (
              <div style={{
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "16px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", color: "#3B82F6", fontWeight: 600 }}>📝 我的笔记</span>
                  <button
                    onClick={() => setShowNoteInput(true)}
                    style={{
                      background: "none",
                      border: "1px solid #E0E6ED",
                      color: "#64748B",
                      cursor: "pointer",
                      fontSize: "12px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    编辑
                  </button>
                </div>
                <p style={{ fontSize: "12px", color: "#333333", lineHeight: "1.6", margin: 0 }}>
                  {note}
                </p>
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
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
                🔄 重新做题
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
                📖 查看解析
              </button>
              <button style={{
                flex: 1,
                padding: "12px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "8px",
                color: "#EF4444",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"; }}>
                📌 加入错题本
              </button>
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
                下一题 →
              </button>
            </div>
          </>
        )}
      </div>
    </PrototypeLayout>
  );
}
