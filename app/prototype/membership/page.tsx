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

export default function MembershipPage() {
  const [activePlan, setActivePlan] = useState("annual");

  return (
    <PrototypeLayout>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>💎 会员中心</h2>
          <p style={{ fontSize: "12px", color: "#64748B" }}>解锁高级功能，提升学习效率</p>
        </div>

        <Card style={{ marginBottom: "24px", background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px", color: "#333333" }}>当前状态</div>
              <div style={{ fontSize: "13px", color: "#64748B" }}>免费用户</div>
            </div>
            <button style={{
              padding: "8px 16px",
              background: "#3B82F6",
              border: "none",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}>
              升级会员
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "4px" }}>已解锁功能</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#333333" }}>5/15</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "4px" }}>学习天数</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#333333" }}>23天</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "4px" }}>会员专属</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#F59E0B" }}>💎</div>
            </div>
          </div>
        </Card>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <button
            onClick={() => setActivePlan("monthly")}
            style={{
              padding: "10px 20px",
              background: activePlan === "monthly" ? "#3B82F6" : "#F5F7FA",
              border: activePlan === "monthly" ? "1px solid #3B82F6" : "1px solid #E0E6ED",
              borderRadius: "8px 0 0 8px",
              color: activePlan === "monthly" ? "#FFFFFF" : "#64748B",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            月付
          </button>
          <button
            onClick={() => setActivePlan("annual")}
            style={{
              padding: "10px 20px",
              background: activePlan === "annual" ? "#3B82F6" : "#F5F7FA",
              border: activePlan === "annual" ? "1px solid #3B82F6" : "1px solid #E0E6ED",
              borderRadius: "0 8px 8px 0",
              color: activePlan === "annual" ? "#FFFFFF" : "#64748B",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            年付 (省30%)
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "24px" }}>
          <Card style={{ border: "1px solid #E0E6ED" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px", color: "#333333" }}>免费版</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#333333" }}>¥0</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>永久免费</div>
            </div>
            <div style={{ borderTop: "1px solid #E0E6ED", paddingTop: "16px", marginBottom: "20px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, gap: "8px", display: "flex", flexDirection: "column" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 基础学习功能
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 100道练习题
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 基础学习报告
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#94A3B8" }}>
                  <span>✗</span> 高级AI推荐
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#94A3B8" }}>
                  <span>✗</span> 无限练习题
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#94A3B8" }}>
                  <span>✗</span> 专业学习路径
                </li>
              </ul>
            </div>
            <button style={{
              width: "100%",
              padding: "10px",
              background: "#F5F7FA",
              border: "1px solid #E0E6ED",
              borderRadius: "8px",
              color: "#64748B",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
              当前版本
            </button>
          </Card>

          <Card style={{ border: "2px solid #3B82F6", position: "relative" }}>
            <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: "#3B82F6", color: "#FFFFFF", fontSize: "11px", padding: "2px 12px", borderRadius: "10px", fontWeight: "600" }}>
              推荐
            </div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px", color: "#333333" }}>高级版</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#333333" }}>{activePlan === "monthly" ? "¥99" : "¥899"}</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>{activePlan === "monthly" ? "每月" : "每年"}</div>
            </div>
            <div style={{ borderTop: "1px solid #E0E6ED", paddingTop: "16px", marginBottom: "20px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, gap: "8px", display: "flex", flexDirection: "column" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 全部基础功能
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 无限练习题
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 高级学习报告
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 高级AI推荐
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 专业学习路径
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 优先客服支持
                </li>
              </ul>
            </div>
            <button style={{
              width: "100%",
              padding: "10px",
              background: "#3B82F6",
              border: "none",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}>
              立即升级
            </button>
          </Card>

          <Card style={{ border: "1px solid #E0E6ED" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px", color: "#333333" }}>专业版</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#333333" }}>{activePlan === "monthly" ? "¥199" : "¥1799"}</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>{activePlan === "monthly" ? "每月" : "每年"}</div>
            </div>
            <div style={{ borderTop: "1px solid #E0E6ED", paddingTop: "16px", marginBottom: "20px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, gap: "8px", display: "flex", flexDirection: "column" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 全部高级功能
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 1对1专家辅导
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 定制学习计划
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 模拟考试批改
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 考试报名指导
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#333333" }}>
                  <span style={{ color: "#10B981" }}>✓</span> 专属学习群
                </li>
              </ul>
            </div>
            <button style={{
              width: "100%",
              padding: "10px",
              background: "#F5F7FA",
              border: "1px solid #E0E6ED",
              borderRadius: "8px",
              color: "#64748B",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
              了解详情
            </button>
          </Card>
        </div>

        <Card>
          <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px", color: "#333333" }}>常见问题</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: "#333333" }}>如何取消订阅？</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>你可以在会员中心随时取消订阅，取消后当前会员权益将持续到订阅周期结束。</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: "#333333" }}>会员权益是否可以退款？</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>订阅后7天内可申请全额退款，超过7天后将不予退款。</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: "#333333" }}>不同考试类型的会员权益是否相同？</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>是的，会员权益适用于所有考试类型，包括CFA、CPA、FRM等。</div>
            </div>
          </div>
        </Card>
      </div>
    </PrototypeLayout>
  );
}
