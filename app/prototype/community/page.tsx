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

const posts = [
  {
    id: 1,
    user: "李同学",
    avatar: "李",
    time: "2小时前",
    content: "刚完成了CAPM模型的学习，感觉理解了很多。分享一个学习心得：一定要结合实际案例来理解公式，这样记忆更深刻！",
    likes: 23,
    comments: 8,
    tags: ["CFA", "CAPM", "学习心得"],
  },
  {
    id: 2,
    user: "王同学",
    avatar: "王",
    time: "4小时前",
    content: "有没有人一起组队学习？我建了一个CFA Level 1的学习小组，每天固定时间一起学习，互相监督！",
    likes: 15,
    comments: 12,
    tags: ["组队学习", "CFA", "学习小组"],
  },
  {
    id: 3,
    user: "张同学",
    avatar: "张",
    time: "1天前",
    content: "模拟考试成绩出来了，比上次提高了10分！分享一下我的备考方法：每天坚持做20道题，周末做一套完整的模拟题。",
    likes: 31,
    comments: 15,
    tags: ["模拟考试", "备考方法", "CFA"],
  },
];

const groups = [
  {
    id: 1,
    name: "CFA Level 1 冲刺群",
    members: 128,
    description: "为CFA Level 1考生提供学习交流的平台",
    tags: ["CFA", "Level 1", "冲刺"],
  },
  {
    id: 2,
    name: "财务分析学习小组",
    members: 89,
    description: "专注于财务分析模块的学习和讨论",
    tags: ["财务分析", "学习小组"],
  },
  {
    id: 3,
    name: "投资组合理论研究",
    members: 67,
    description: "深入探讨投资组合理论和实践应用",
    tags: ["投资组合", "理论研究"],
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [newPost, setNewPost] = useState("");

  return (
    <PrototypeLayout>
      <div style={{ maxWidth: "1000px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>🌍 学习社区</h2>
          <p style={{ fontSize: "12px", color: "#64748B" }}>与其他学习者交流，分享学习心得</p>
        </div>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <button
            onClick={() => setActiveTab("posts")}
            style={{
              padding: "10px 20px",
              background: activeTab === "posts" ? "#3B82F6" : "#F5F7FA",
              border: activeTab === "posts" ? "1px solid #3B82F6" : "1px solid #E0E6ED",
              borderRadius: "8px 0 0 8px",
              color: activeTab === "posts" ? "#FFFFFF" : "#64748B",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            讨论区
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            style={{
              padding: "10px 20px",
              background: activeTab === "groups" ? "#3B82F6" : "#F5F7FA",
              border: activeTab === "groups" ? "1px solid #3B82F6" : "1px solid #E0E6ED",
              borderRadius: "0 8px 8px 0",
              color: activeTab === "groups" ? "#FFFFFF" : "#64748B",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            学习小组
          </button>
        </div>

        {activeTab === "posts" && (
          <div>
            <Card style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  flexShrink: 0,
                }}>
                  U
                </div>
                <div style={{ flex: 1 }}>
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="分享你的学习心得、问题或经验..."
                    style={{
                      width: "100%",
                      minHeight: "80px",
                      padding: "12px",
                      background: "#F5F7FA",
                      border: "1px solid #E0E6ED",
                      borderRadius: "8px",
                      color: "#333333",
                      fontSize: "14px",
                      resize: "vertical",
                      outline: "none",
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{ padding: "6px 12px", background: "#F5F7FA", border: "1px solid #E0E6ED", borderRadius: "6px", color: "#64748B", fontSize: "12px", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                        📷 图片
                      </button>
                      <button style={{ padding: "6px 12px", background: "#F5F7FA", border: "1px solid #E0E6ED", borderRadius: "6px", color: "#64748B", fontSize: "12px", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                        🏷 标签
                      </button>
                    </div>
                    <button style={{
                      padding: "8px 16px",
                      background: "#3B82F6",
                      border: "none",
                      borderRadius: "6px",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }} onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}>
                      发布
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {posts.map((post) => (
                <Card key={post.id}>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
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
                      {post.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#333333" }}>{post.user}</span>
                        <span style={{ fontSize: "12px", color: "#94A3B8" }}>{post.time}</span>
                      </div>
                      <div style={{ fontSize: "14px", lineHeight: "1.5", marginBottom: "12px", color: "#333333" }}>{post.content}</div>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                        {post.tags.map((tag, index) => (
                          <span key={index} style={{
                            fontSize: "11px",
                            padding: "3px 8px",
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3B82F6",
                            borderRadius: "4px",
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#64748B", fontSize: "13px", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#3B82F6"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; }}>
                          👍 {post.likes}
                        </button>
                        <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#64748B", fontSize: "13px", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#3B82F6"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; }}>
                          💬 {post.comments}
                        </button>
                        <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#64748B", fontSize: "13px", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#3B82F6"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; }}>
                          ↗️ 分享
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "groups" && (
          <div>
            <Card style={{ marginBottom: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#333333" }}>创建学习小组</div>
              <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px" }}>创建属于你的学习小组，邀请同学一起学习</p>
              <button style={{
                padding: "10px 24px",
                background: "#3B82F6",
                border: "none",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}>
                + 创建小组
              </button>
            </Card>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {groups.map((group) => (
                <Card key={group.id} style={{ cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "4px", color: "#333333" }}>{group.name}</h3>
                      <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "12px" }}>{group.description}</p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {group.tags.map((tag, index) => (
                          <span key={index} style={{
                            fontSize: "11px",
                            padding: "3px 8px",
                            background: "rgba(16, 185, 129, 0.1)",
                            color: "#10B981",
                            borderRadius: "4px",
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "4px" }}>成员</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", color: "#333333" }}>{group.members}</div>
                      <button style={{
                        marginTop: "12px",
                        padding: "8px 16px",
                        background: "#10B981",
                        border: "none",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }} onMouseEnter={(e) => { e.currentTarget.style.background = "#059669"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#10B981"; }}>
                        加入
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </PrototypeLayout>
  );
}
