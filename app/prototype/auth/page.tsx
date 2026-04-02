"use client";

import { useState } from "react";
import PrototypeLayout from "../components/PrototypeLayout";

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "12px",
      padding: "24px",
      border: "1px solid #E0E6ED",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #F5F7FA 0%, #E8EEF5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px", background: "linear-gradient(135deg, #3B82F6, #1E40AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Learning Loop AI
          </div>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>智能学习平台，让学习更高效</p>
        </div>

        <Card>
          <div style={{ display: "flex", marginBottom: "24px", background: "#F5F7FA", borderRadius: "8px", padding: "4px" }}>
            <button
              onClick={() => setActiveTab("login")}
              style={{
                flex: 1,
                padding: "10px",
                background: activeTab === "login" ? "#3B82F6" : "transparent",
                border: "none",
                borderRadius: "6px",
                color: activeTab === "login" ? "#FFFFFF" : "#6B7280",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              登录
            </button>
            <button
              onClick={() => setActiveTab("register")}
              style={{
                flex: 1,
                padding: "10px",
                background: activeTab === "register" ? "#3B82F6" : "transparent",
                border: "none",
                borderRadius: "6px",
                color: activeTab === "register" ? "#FFFFFF" : "#6B7280",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              注册
            </button>
          </div>

          {activeTab === "login" ? (
            <div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1E40AF" }}>
                  邮箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#F5F7FA",
                    border: "1px solid #E0E6ED",
                    borderRadius: "8px",
                    color: "#1E40AF",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  placeholder="请输入邮箱"
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1E40AF" }}>
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#F5F7FA",
                    border: "1px solid #E0E6ED",
                    borderRadius: "8px",
                    color: "#1E40AF",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  placeholder="请输入密码"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input type="checkbox" id="remember" style={{ accentColor: "#3B82F6" }} />
                  <label htmlFor="remember" style={{ fontSize: "13px", color: "#6B7280" }}>记住我</label>
                </div>
                <a href="#" style={{ fontSize: "13px", color: "#3B82F6", textDecoration: "none" }}>忘记密码？</a>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#3B82F6",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginBottom: "20px",
                  transition: "background 0.2s",
                }}
              >
                登录
              </button>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ flex: 1, height: "1px", background: "#E0E6ED" }} />
                <span style={{ fontSize: "12px", color: "#6B7280" }}>其他登录方式</span>
                <div style={{ flex: 1, height: "1px", background: "#E0E6ED" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                <button style={{ width: "48px", height: "48px", background: "#F5F7FA", border: "1px solid #E0E6ED", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
                  📱
                </button>
                <button style={{ width: "48px", height: "48px", background: "#F5F7FA", border: "1px solid #E0E6ED", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
                  🐧
                </button>
                <button style={{ width: "48px", height: "48px", background: "#F5F7FA", border: "1px solid #E0E6ED", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
                  🍎
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1E40AF" }}>
                  姓名
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#F5F7FA",
                    border: "1px solid #E0E6ED",
                    borderRadius: "8px",
                    color: "#1E40AF",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  placeholder="请输入姓名"
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1E40AF" }}>
                  邮箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#F5F7FA",
                    border: "1px solid #E0E6ED",
                    borderRadius: "8px",
                    color: "#1E40AF",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  placeholder="请输入邮箱"
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1E40AF" }}>
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#F5F7FA",
                    border: "1px solid #E0E6ED",
                    borderRadius: "8px",
                    color: "#1E40AF",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  placeholder="请设置密码"
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1E40AF" }}>
                  确认密码
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#F5F7FA",
                    border: "1px solid #E0E6ED",
                    borderRadius: "8px",
                    color: "#1E40AF",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  placeholder="请确认密码"
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                <input type="checkbox" id="agreement" style={{ accentColor: "#3B82F6" }} />
                <label htmlFor="agreement" style={{ fontSize: "13px", color: "#6B7280" }}>我已阅读并同意 <a href="#" style={{ color: "#3B82F6" }}>用户协议</a> 和 <a href="#" style={{ color: "#3B82F6" }}>隐私政策</a></label>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#3B82F6",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                注册
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}