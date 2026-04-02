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

const leaderboardData = [
  {
    rank: 1,
    user: "刘同学",
    avatar: "刘",
    score: 980,
    progress: 98,
    trend: "+120",
  },
  {
    rank: 2,
    user: "陈同学",
    avatar: "陈",
    score: 950,
    progress: 95,
    trend: "+90",
  },
  {
    rank: 3,
    user: "林同学",
    avatar: "林",
    score: 920,
    progress: 92,
    trend: "+85",
  },
  {
    rank: 4,
    user: "黄同学",
    avatar: "黄",
    score: 880,
    progress: 88,
    trend: "+75",
  },
  {
    rank: 5,
    user: "赵同学",
    avatar: "赵",
    score: 850,
    progress: 85,
    trend: "+60",
  },
  {
    rank: 6,
    user: "孙同学",
    avatar: "孙",
    score: 820,
    progress: 82,
    trend: "+45",
  },
  {
    rank: 7,
    user: "周同学",
    avatar: "周",
    score: 780,
    progress: 78,
    trend: "+30",
  },
  {
    rank: 8,
    user: "吴同学",
    avatar: "吴",
    score: 750,
    progress: 75,
    trend: "+25",
  },
  {
    rank: 9,
    user: "郑同学",
    avatar: "郑",
    score: 720,
    progress: 72,
    trend: "+20",
  },
  {
    rank: 10,
    user: "王同学",
    avatar: "王",
    score: 680,
    progress: 68,
    trend: "+15",
  },
];

const userRank = {
  rank: 15,
  user: "我",
  avatar: "U",
  score: 620,
  progress: 65,
  trend: "+35",
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <PrototypeLayout>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>🏆 学习排行榜</h2>
          <p style={{ fontSize: "12px", color: "#64748B" }}>查看你的学习排名和进步情况</p>
        </div>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <button
            onClick={() => setActiveTab("weekly")}
            style={{
              padding: "10px 20px",
              background: activeTab === "weekly" ? "#3B82F6" : "#F5F7FA",
              border: activeTab === "weekly" ? "1px solid #3B82F6" : "1px solid #E0E6ED",
              borderRadius: "8px 0 0 8px",
              color: activeTab === "weekly" ? "#FFFFFF" : "#64748B",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            周榜
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            style={{
              padding: "10px 20px",
              background: activeTab === "monthly" ? "#3B82F6" : "#F5F7FA",
              border: activeTab === "monthly" ? "1px solid #3B82F6" : "1px solid #E0E6ED",
              borderRadius: "0",
              color: activeTab === "monthly" ? "#FFFFFF" : "#64748B",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            月榜
          </button>
          <button
            onClick={() => setActiveTab("all")}
            style={{
              padding: "10px 20px",
              background: activeTab === "all" ? "#3B82F6" : "#F5F7FA",
              border: activeTab === "all" ? "1px solid #3B82F6" : "1px solid #E0E6ED",
              borderRadius: "0 8px 8px 0",
              color: activeTab === "all" ? "#FFFFFF" : "#64748B",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            总榜
          </button>
        </div>

        <Card style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#333333" }}>我的排名</div>
            <div style={{ fontSize: "13px", color: "#64748B" }}>本周排名: {userRank.rank}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B82F6, #6366F1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "700",
              color: "#FFFFFF",
              flexShrink: 0,
            }}>
              {userRank.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#333333" }}>{userRank.user}</span>
                <span style={{ fontSize: "13px", color: "#10B981" }}>↑ +{userRank.trend}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "4px" }}>学习积分</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#333333" }}>{userRank.score}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "4px" }}>掌握率</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#333333" }}>{userRank.progress}%</div>
                </div>
              </div>
            </div>
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
              查看详情
            </button>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px", color: "#333333" }}>排行榜</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {leaderboardData.map((item) => (
              <div key={item.rank} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                borderRadius: "8px",
                background: item.rank <= 3 ? "rgba(245, 158, 11, 0.08)" : "transparent",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = item.rank <= 3 ? "rgba(245, 158, 11, 0.12)" : "#F5F7FA"; }} onMouseLeave={(e) => { e.currentTarget.style.background = item.rank <= 3 ? "rgba(245, 158, 11, 0.08)" : "transparent"; }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  background: item.rank === 1 ? "#F59E0B" : item.rank === 2 ? "#9CA3AF" : item.rank === 3 ? "#D97706" : "#F5F7FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: item.rank <= 3 ? "#FFFFFF" : "#64748B",
                  flexShrink: 0,
                }}>
                  {item.rank}
                </div>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10B981, #34D399)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  flexShrink: 0,
                }}>
                  {item.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "2px", color: "#333333" }}>{item.user}</div>
                  <div style={{ fontSize: "12px", color: "#64748B" }}>掌握率: {item.progress}%</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "2px", color: "#333333" }}>{item.score}</div>
                  <div style={{ fontSize: "12px", color: "#10B981" }}>↑ +{item.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PrototypeLayout>
  );
}
