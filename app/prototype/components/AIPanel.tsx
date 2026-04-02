"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIPanelProps {
  initialContext?: string;
}

export default function AIPanel({ initialContext }: AIPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: initialContext || "你好！我是你的AI学习助手，有什么可以帮助你的吗？",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "zh-CN";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const responses = [
      `关于"${userInput}"，我建议你先复习相关的基础概念，然后通过练习题来巩固理解。`,
      `这是一个很好的问题！让我来解释一下：${userInput}的核心在于理解其背后的逻辑，而不仅仅是记忆公式。`,
      `根据你的学习进度，我建议你重点关注这个知识点，它在考试中经常出现。`,
      `你可以尝试用不同的角度来理解这个问题，比如从实际应用的角度出发。`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("您的浏览器不支持语音识别功能");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleVoiceOutput = (content: string) => {
    if (!("speechSynthesis" in window)) {
      alert("您的浏览器不支持语音播报功能");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = "zh-CN";
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: "10px 12px",
                borderRadius: "12px",
                background: msg.role === "user"
                  ? "#3B82F6"
                  : "#F5F7FA",
                color: msg.role === "user" ? "#FFFFFF" : "#1E40AF",
                fontSize: "13px",
                lineHeight: "1.5",
                wordBreak: "break-word",
                border: msg.role === "assistant" ? "1px solid #E0E6ED" : "none",
              }}
            >
              {msg.content}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {msg.role === "assistant" && (
                <button
                  onClick={() => handleVoiceOutput(msg.content)}
                  style={{
                    padding: "2px 6px",
                    background: isSpeaking ? "rgba(59, 130, 246, 0.2)" : "rgba(107, 114, 128, 0.1)",
                    border: "1px solid #E0E6ED",
                    borderRadius: "4px",
                    color: isSpeaking ? "#3B82F6" : "#6B7280",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                >
                  {isSpeaking ? "🔊" : "🔇"}
                </button>
              )}
              <span style={{ fontSize: "10px", color: "#6B7280" }}>
                {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {showVoiceInput && (
          <div style={{
            padding: "12px",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            borderRadius: "8px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={handleVoiceInput}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: isRecording ? "#EF4444" : "#3B82F6",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isRecording ? "⏹" : "🎤"}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>
                  {isRecording ? "正在录音..." : "点击麦克风开始语音输入"}
                </div>
                {input && (
                  <div style={{ fontSize: "12px", color: "#1E40AF" }}>
                    {input}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="输入问题或使用语音..."
            style={{
              flex: 1,
              padding: "10px 12px",
              background: "#FFFFFF",
              border: "1px solid #E0E6ED",
              borderRadius: "8px",
              color: "#1E40AF",
              fontSize: "13px",
              outline: "none",
            }}
          />
          <button
            onClick={() => setShowVoiceInput(!showVoiceInput)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: showVoiceInput ? "#3B82F6" : "#F5F7FA",
              border: "1px solid #E0E6ED",
              color: showVoiceInput ? "#FFFFFF" : "#6B7280",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            🎤
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            style={{
              padding: "0 16px",
              height: "40px",
              borderRadius: "8px",
              background: input.trim() ? "#3B82F6" : "#F5F7FA",
              border: "1px solid #E0E6ED",
              color: input.trim() ? "#FFFFFF" : "#6B7280",
              fontSize: "13px",
              fontWeight: 600,
              cursor: input.trim() ? "pointer" : "not-allowed",
            }}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}