"use client";

import { useState } from "react";
import PrototypeLayout from "../components/PrototypeLayout";
import AIPanel from "../components/AIPanel";

const wrongQuestions = [
  {
    id: 1,
    topic: "CAPM模型",
    question: "根据CAPM模型，如果无风险利率为3%，市场预期收益率为10%，某股票的Beta系数为1.5，则该股票的预期收益率为？",
    userAnswer: "A. 10.5%",
    correctAnswer: "B. 13.5%",
    errorType: "理解偏差",
    exam: "CFA",
    level: "Level 1",
    difficulty: "中等",
    date: "2026-03-28",
    reviewCount: 0,
  },
  {
    id: 2,
    topic: "WACC",
    question: "某公司的债务成本为6%，权益成本为12%，目标资本结构中债务占比40%，则WACC为？",
    userAnswer: "C. 8.8%",
    correctAnswer: "A. 9.6%",
    errorType: "计算错误",
    exam: "CFA",
    level: "Level 1",
    difficulty: "中等",
    date: "2026-03-27",
    reviewCount: 1,
  },
  {
    id: 3,
    topic: "久期",
    question: "债券久期越大，价格对利率变动的敏感度？",
    userAnswer: "A. 越低",
    correctAnswer: "B. 越高",
    errorType: "理解偏差",
    exam: "CFA",
    level: "Level 1",
    difficulty: "简单",
    date: "2026-03-26",
    reviewCount: 2,
  },
  {
    id: 4,
    topic: "VaR",
    question: "95%置信水平下的VaR表示？",
    userAnswer: "C. 95%的概率不会超过该损失",
    correctAnswer: "D. 5%的概率会超过该损失",
    errorType: "知识盲点",
    exam: "FRM",
    level: "Level 1",
    difficulty: "困难",
    date: "2026-03-25",
    reviewCount: 0,
  },
  {
    id: 5,
    topic: "杜邦分析",
    question: "杜邦分析中，ROE可以分解为？",
    userAnswer: "B. 利润率×资产周转率",
    correctAnswer: "A. 利润率×资产周转率×权益乘数",
    errorType: "理解偏差",
    exam: "CPA",
    level: "Level 1",
    difficulty: "中等",
    date: "2026-03-24",
    reviewCount: 1,
  },
];

const errorTypes = ["全部", "理解偏差", "计算错误", "知识盲点", "粗心失误"];
const exams = ["全部", "CFA", "CPA", "FRM"];
const difficulties = ["全部", "简单", "中等", "困难"];

export default function WrongQuestionsPage() {
  const [filterErrorType, setFilterErrorType] = useState("全部");
  const [filterExam, setFilterExam] = useState("全部");
  const [filterDifficulty, setFilterDifficulty] = useState("全部");
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const filteredQuestions = wrongQuestions.filter(q => {
    if (filterErrorType !== "全部" && q.errorType !== filterErrorType) return false;
    if (filterExam !== "全部" && q.exam !== filterExam) return false;
    if (filterDifficulty !== "全部" && q.difficulty !== filterDifficulty) return false;
    return true;
  });

  const toggleSelect = (id: number) => {
    setSelectedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map(q => q.id));
    }
  };

  return (
    <PrototypeLayout aiPanel={<AIPanel />}>
      <div style={{ maxWidth: "1000px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>📌 错题本</h2>
            <p style={{ fontSize: "12px", color: "#64748B" }}>共 {filteredQuestions.length} 道错题 · 已选 {selectedQuestions.length} 题</p>
          </div>
          <button
            onClick={() => {
              if (confirm("确定清空所有错题吗？")) {
                alert("错题已清空");
              }
            }}
            style={{
              padding: "8px 14px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "6px",
              color: "#EF4444",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"; }}
          >
            🗑️ 清空错题本
          </button>
        </div>

        <div style={{
          background: "#FFFFFF",
          borderRadius: "10px",
          padding: "16px",
          border: "1px solid #E0E6ED",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          marginBottom: "16px",
        }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#64748B" }}>错误类型：</span>
              <select
                value={filterErrorType}
                onChange={(e) => setFilterErrorType(e.target.value)}
                style={{
                  padding: "6px 10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {errorTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#64748B" }}>考试：</span>
              <select
                value={filterExam}
                onChange={(e) => setFilterExam(e.target.value)}
                style={{
                  padding: "6px 10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {exams.map(exam => (
                  <option key={exam} value={exam}>{exam}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#64748B" }}>难度：</span>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                style={{
                  padding: "6px 10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleSelectAll}
              style={{
                padding: "6px 12px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "6px",
                color: "#64748B",
                fontSize: "12px",
                cursor: "pointer",
                marginLeft: "auto",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}
            >
              {selectedQuestions.length === filteredQuestions.length ? "取消全选" : "全选"}
            </button>
          </div>
        </div>

        {filteredQuestions.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#64748B",
            background: "#F5F7FA",
            borderRadius: "12px",
            border: "1px solid #E0E6ED",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <div style={{ fontSize: "14px" }}>暂无错题</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredQuestions.map(q => (
              <div
                key={q.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  padding: "16px",
                  border: selectedQuestions.includes(q.id) ? "2px solid #3B82F6" : "1px solid #E0E6ED",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
                onClick={() => toggleSelect(q.id)}
                onMouseEnter={(e) => {
                  if (!selectedQuestions.includes(q.id)) {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedQuestions.includes(q.id)) {
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                  }
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(q.id)}
                      onChange={() => toggleSelect(q.id)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ marginTop: "2px", cursor: "pointer" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
                        <span style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "#3B82F6",
                          borderRadius: "4px",
                        }}>
                          {q.topic}
                        </span>
                        <span style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          background: q.difficulty === "简单" ? "rgba(16, 185, 129, 0.1)" : q.difficulty === "中等" ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)",
                          color: q.difficulty === "简单" ? "#10B981" : q.difficulty === "中等" ? "#F59E0B" : "#EF4444",
                          borderRadius: "4px",
                        }}>
                          {q.difficulty}
                        </span>
                        <span style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          background: "rgba(107, 114, 128, 0.1)",
                          color: "#64748B",
                          borderRadius: "4px",
                        }}>
                          {q.exam} {q.level}
                        </span>
                      </div>
                      <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#333333" }}>
                        {q.question}
                      </p>
                    </div>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94A3B8", whiteSpace: "nowrap", marginLeft: "12px" }}>
                    {q.date}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "center", paddingLeft: "26px" }}>
                  <div style={{ flex: 1, display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "12px", color: "#64748B" }}>
                      你的答案：<span style={{ color: "#EF4444", fontWeight: 600 }}>{q.userAnswer}</span>
                    </span>
                    <span style={{ fontSize: "12px", color: "#64748B" }}>
                      正确答案：<span style={{ color: "#10B981", fontWeight: 600 }}>{q.correctAnswer}</span>
                    </span>
                    <span style={{ fontSize: "12px", color: "#64748B" }}>
                      错误类型：<span style={{ color: "#F59E0B", fontWeight: 600 }}>{q.errorType}</span>
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("重新练习：" + q.topic);
                      }}
                      style={{
                        padding: "6px 10px",
                        background: "#F5F7FA",
                        border: "1px solid #E0E6ED",
                        borderRadius: "6px",
                        color: "#64748B",
                        fontSize: "11px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}
                    >
                      🔄 重做
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("确定删除这道错题吗？")) {
                          alert("已删除");
                        }
                      }}
                      style={{
                        padding: "6px 10px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "6px",
                        color: "#EF4444",
                        fontSize: "11px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"; }}
                    >
                      🗑️ 删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedQuestions.length > 0 && (
          <div style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#3B82F6",
            borderRadius: "10px",
            padding: "12px 20px",
            display: "flex",
            gap: "12px",
            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
            zIndex: 100,
          }}>
            <button
              onClick={() => alert("已删除 " + selectedQuestions.length + " 道错题")}
              style={{
                padding: "8px 16px",
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "6px",
                color: "#EF4444",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"; }}
            >
              删除选中
            </button>
            <button
              onClick={() => alert("开始练习 " + selectedQuestions.length + " 道错题")}
              style={{
                padding: "8px 16px",
                background: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                color: "#1E40AF",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
            >
              开始练习
            </button>
          </div>
        )}
      </div>
    </PrototypeLayout>
  );
}
