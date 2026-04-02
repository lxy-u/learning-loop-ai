"use client";

import { useState } from "react";
import PrototypeLayout from "../components/PrototypeLayout";

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

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("U");
  const [name, setName] = useState("张同学");
  const [email, setEmail] = useState("zhang@example.com");
  const [phone, setPhone] = useState("138****8888");
  const [exam, setExam] = useState("CFA Level 1");
  const [studyTime, setStudyTime] = useState("2026-06-01");
  const [bio, setBio] = useState("努力备考CFA，目标一次性通过！");

  return (
    <PrototypeLayout>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>👤 个人资料</h2>
          <p style={{ fontSize: "12px", color: "#64748B" }}>管理你的个人信息和学习设置</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px", marginBottom: "24px" }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "700",
                color: "#FFFFFF",
                margin: "0 auto 16px",
              }}>
                {avatar}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px", color: "#333333" }}>{name}</h3>
              <p style={{ fontSize: "13px", color: "#64748B" }}>{email}</p>
              <button style={{
                marginTop: "16px",
                padding: "8px 16px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#64748B",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                更换头像
              </button>
            </div>
            <div style={{ borderTop: "1px solid #E0E6ED", paddingTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", color: "#64748B" }}>学习天数</span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#333333" }}>23天</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", color: "#64748B" }}>总学习时长</span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#333333" }}>12.5小时</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", color: "#64748B" }}>完成课程</span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#333333" }}>8/24</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", color: "#64748B" }}>掌握率</span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#333333" }}>65%</span>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px", color: "#333333" }}>基本信息</div>
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "16px 20px", marginBottom: "24px" }}>
              <label style={{ fontSize: "13px", color: "#64748B", alignSelf: "center" }}>姓名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: "10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <label style={{ fontSize: "13px", color: "#64748B", alignSelf: "center" }}>邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <label style={{ fontSize: "13px", color: "#64748B", alignSelf: "center" }}>手机号</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  padding: "10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <label style={{ fontSize: "13px", color: "#64748B", alignSelf: "center" }}>目标考试</label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                style={{
                  padding: "10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "14px",
                  outline: "none",
                }}
              >
                <option value="CFA Level 1">CFA Level 1</option>
                <option value="CFA Level 2">CFA Level 2</option>
                <option value="CFA Level 3">CFA Level 3</option>
                <option value="CPA">CPA</option>
                <option value="FRM">FRM</option>
              </select>
              <label style={{ fontSize: "13px", color: "#64748B", alignSelf: "center" }}>考试时间</label>
              <input
                type="date"
                value={studyTime}
                onChange={(e) => setStudyTime(e.target.value)}
                style={{
                  padding: "10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <label style={{ fontSize: "13px", color: "#64748B", alignSelf: "flex-start", paddingTop: "10px" }}>个人简介</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  padding: "10px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#333333",
                  fontSize: "14px",
                  minHeight: "80px",
                  resize: "vertical",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button style={{
                padding: "10px 20px",
                background: "#3B82F6",
                border: "none",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}>
                保存修改
              </button>
              <button style={{
                padding: "10px 20px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#64748B",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                取消
              </button>
            </div>
          </Card>
        </div>

        <Card>
          <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px", color: "#333333" }}>账号安全</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: "#333333" }}>修改密码</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>定期修改密码，保障账号安全</div>
            </div>
            <button style={{
              padding: "8px 16px",
              background: "#F5F7FA",
              border: "1px solid #E0E6ED",
              borderRadius: "8px",
              color: "#64748B",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
              修改
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: "#333333" }}>绑定手机</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>绑定手机号，提升账号安全性</div>
            </div>
            <button style={{
              padding: "8px 16px",
              background: "#10B981",
              border: "none",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#059669"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#10B981"; }}>
              已绑定
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: "#333333" }}>第三方账号</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>绑定第三方账号，方便快捷登录</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ width: "32px", height: "32px", background: "#10B981", border: "none", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#059669"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#10B981"; }}>
                📱
              </button>
              <button style={{ width: "32px", height: "32px", background: "#F5F7FA", border: "1px solid #E0E6ED", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                🐧
              </button>
              <button style={{ width: "32px", height: "32px", background: "#F5F7FA", border: "1px solid #E0E6ED", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                🍎
              </button>
            </div>
          </div>
        </Card>
      </div>
    </PrototypeLayout>
  );
}
