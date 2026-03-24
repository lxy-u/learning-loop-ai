"use client";

import { useState } from "react";

// 用于控制主题
const themes = {
  light: {
    background: "#f4f7fc",
    color: "#333",
    buttonBg: "#4CAF50",
    inputBg: "#fff",
    borderColor: "#ddd",
  },
  dark: {
    background: "#2e2e2e",
    color: "#f4f4f4",
    buttonBg: "#4CAF50",
    inputBg: "#333",
    borderColor: "#666",
  },
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
  const [theme, setTheme] = useState(themes.light);  // 默认主题为 Light

  const handleAsk = async () => {
    setLoading(true);
    // 清空之前的状态
    setKnowledge("");
    setQuestion("");
    setOptions([]);
    setCorrectAnswer("");
    setUserAnswer("");
    setFeedback("");
    setExplanation("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      // 检查是否有知识点内容
      if (!data.knowledge || data.knowledge.includes("暂时没有该问题的答案")) {
        setKnowledge("暂时没有该问题的答案，试试其他问题！");
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

  const handleAnswer = (selectedOption: string) => {
    setUserAnswer(selectedOption);
    // 提取选项的第一个字符（A/B/C/D）进行比较
    const answerKey = selectedOption.charAt(0);
    if (answerKey === correctAnswer) {
      setFeedback("正确！");
    } else {
      setFeedback("错误！");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Arial, sans-serif",
        background: theme.background,
        color: theme.color,
        borderRadius: "10px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        maxWidth: "800px",
        margin: "auto",
        transition: "all 0.3s ease",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "36px", color: "#4A90E2", fontWeight: "bold", marginBottom: "30px" }}>
        Learning Loop AI - 知识点解析助手
      </h1>

      <button
        onClick={toggleTheme}
        style={{
          padding: "12px 20px",
          backgroundColor: theme.buttonBg,
          color: "white",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          border: "none",
          transition: "all 0.3s ease",
        }}
      >
        切换主题
      </button>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入问题，例如：什么是NPV"
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            width: "60%",
            border: `1px solid ${theme.borderColor}`,
            borderRadius: "8px",
            marginRight: "10px",
            backgroundColor: theme.inputBg,
            color: theme.color,
            transition: "all 0.3s ease",
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAsk();
            }
          }}
        />
        <button
          onClick={handleAsk}
          style={{
            padding: "12px 20px",
            backgroundColor: theme.buttonBg,
            color: "white",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
            transition: "all 0.3s ease",
          }}
        >
          提问
        </button>
      </div>

      {loading && <p style={{ textAlign: "center", fontSize: "18px" }}>加载中...</p>}

      {/* 知识点讲解区域 */}
      {knowledge && (
        <div style={{ 
          marginTop: "20px", 
          backgroundColor: theme === themes.light ? "#fff" : "#333",
          borderRadius: "8px", 
          padding: "20px", 
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: `1px solid ${theme.borderColor}`,
        }}>
          <h2 style={{ fontSize: "20px", color: "#4A90E2", marginBottom: "15px", fontWeight: "bold" }}>
            📚 知识点讲解
          </h2>
          <pre style={{ 
            whiteSpace: "pre-wrap", 
            fontSize: "16px", 
            lineHeight: "1.6", 
            fontFamily: "inherit",
            margin: 0,
          }}>
            {knowledge}
          </pre>
        </div>
      )}

      {/* 练习题区域 */}
      {question && (
        <div style={{ 
          marginTop: "30px", 
          backgroundColor: theme === themes.light ? "#fff" : "#333",
          borderRadius: "8px", 
          padding: "20px", 
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: `1px solid ${theme.borderColor}`,
        }}>
          <h3 style={{ fontSize: "22px", color: theme.color, marginBottom: "20px", fontWeight: "bold" }}>
            📝 {question}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== ""}
                style={{
                  padding: "12px 20px",
                  backgroundColor: userAnswer === option 
                    ? (feedback === "正确！" ? "#4CAF50" : "#f44336")
                    : (theme === themes.light ? "#f1f1f1" : "#444"),
                  color: userAnswer === option ? "white" : theme.color,
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: feedback !== "" ? "not-allowed" : "pointer",
                  border: `1px solid ${theme.borderColor}`,
                  transition: "all 0.3s ease",
                  textAlign: "left",
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <p style={{ 
              color: feedback === "正确！" ? "#4CAF50" : "#f44336", 
              fontSize: "20px", 
              textAlign: "center", 
              fontWeight: "bold",
              marginTop: "20px",
            }}>
              {feedback === "正确！" ? "✅ 正确！" : "❌ 错误！"}
            </p>
          )}

          {feedback && explanation && (
            <div style={{ 
              backgroundColor: theme === themes.light ? "#f9f9f9" : "#444", 
              padding: "15px", 
              borderRadius: "5px", 
              marginTop: "20px",
              border: `1px solid ${theme.borderColor}`,
            }}>
              <h4 style={{ fontSize: "18px", color: "#4A90E2", fontWeight: "bold", marginBottom: "10px" }}>
                💡 答案解析
              </h4>
              <p style={{ fontSize: "16px", lineHeight: "1.6", color: theme.color }}>
                {explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}