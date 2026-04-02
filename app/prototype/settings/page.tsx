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

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    study: true,
    quiz: true,
    reminder: false,
    achievement: true,
    community: false,
  });

  const [privacy, setPrivacy] = useState({
    profile: true,
    progress: true,
    ranking: true,
    activity: false,
  });

  const [dailyReminder, setDailyReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState("20:00");
  const [language, setLanguage] = useState("zh-CN");
  const [difficulty, setDifficulty] = useState("adaptive");
  const [sound, setSound] = useState(true);
  const [voice, setVoice] = useState(false);

  return (
    <PrototypeLayout>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>⚙️ 设置</h2>
          <p style={{ fontSize: "12px", color: "#64748B" }}>个性化你的学习体验</p>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          <Card>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "20px", color: "#333333" }}>🔔 通知设置</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>学习提醒</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>每天提醒你开始学习</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={dailyReminder}
                    onChange={(e) => setDailyReminder(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: dailyReminder ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: dailyReminder ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
              {dailyReminder && (
                <div style={{ marginLeft: "0", marginTop: "8px" }}>
                  <label style={{ fontSize: "12px", color: "#64748B", marginBottom: "6px", display: "block" }}>提醒时间</label>
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      background: "#F5F7FA",
                      border: "1px solid #E0E6ED",
                      borderRadius: "6px",
                      color: "#333333",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>练习完成通知</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>练习完成后推送结果</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={notifications.quiz}
                    onChange={(e) => setNotifications({ ...notifications, quiz: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: notifications.quiz ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: notifications.quiz ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>成就解锁</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>解锁成就时立即通知</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={notifications.achievement}
                    onChange={(e) => setNotifications({ ...notifications, achievement: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: notifications.achievement ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: notifications.achievement ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>社区互动</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>收到点赞、评论时通知</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={notifications.community}
                    onChange={(e) => setNotifications({ ...notifications, community: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: notifications.community ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: notifications.community ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "20px", color: "#333333" }}>🎨 学习偏好</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, marginBottom: "8px", display: "block", color: "#333333" }}>界面语言</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    background: "#F5F7FA",
                    border: "1px solid #E0E6ED",
                    borderRadius: "6px",
                    color: "#333333",
                    fontSize: "13px",
                    outline: "none",
                  }}
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="zh-TW">繁體中文</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, marginBottom: "8px", display: "block", color: "#333333" }}>题目难度</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setDifficulty("simple")}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: difficulty === "simple" ? "#3B82F6" : "#F5F7FA",
                      border: difficulty === "simple" ? "none" : "1px solid #E0E6ED",
                      borderRadius: "6px",
                      color: difficulty === "simple" ? "#FFFFFF" : "#64748B",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    简单
                  </button>
                  <button
                    onClick={() => setDifficulty("medium")}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: difficulty === "medium" ? "#3B82F6" : "#F5F7FA",
                      border: difficulty === "medium" ? "none" : "1px solid #E0E6ED",
                      borderRadius: "6px",
                      color: difficulty === "medium" ? "#FFFFFF" : "#64748B",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    中等
                  </button>
                  <button
                    onClick={() => setDifficulty("hard")}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: difficulty === "hard" ? "#3B82F6" : "#F5F7FA",
                      border: difficulty === "hard" ? "none" : "1px solid #E0E6ED",
                      borderRadius: "6px",
                      color: difficulty === "hard" ? "#FFFFFF" : "#64748B",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    困难
                  </button>
                  <button
                    onClick={() => setDifficulty("adaptive")}
                    style={{
                      flex: 1.5,
                      padding: "10px",
                      background: difficulty === "adaptive" ? "#3B82F6" : "#F5F7FA",
                      border: difficulty === "adaptive" ? "none" : "1px solid #E0E6ED",
                      borderRadius: "6px",
                      color: difficulty === "adaptive" ? "#FFFFFF" : "#64748B",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    智能自适应
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>音效</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>开启界面交互音效</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={sound}
                    onChange={(e) => setSound(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: sound ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: sound ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>语音输入</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>支持语音输入笔记和提问</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={voice}
                    onChange={(e) => setVoice(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: voice ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: voice ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "20px", color: "#333333" }}>🔒 隐私设置</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>公开个人资料</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>其他用户可以查看你的基本信息</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={privacy.profile}
                    onChange={(e) => setPrivacy({ ...privacy, profile: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: privacy.profile ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: privacy.profile ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>显示学习进度</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>在排行榜上展示你的进度</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={privacy.progress}
                    onChange={(e) => setPrivacy({ ...privacy, progress: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: privacy.progress ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: privacy.progress ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>参与排行榜</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>你的排名会出现在排行榜上</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={privacy.ranking}
                    onChange={(e) => setPrivacy({ ...privacy, ranking: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: privacy.ranking ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: privacy.ranking ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "#333333" }}>显示动态</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>你的学习动态会出现在社区</div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={privacy.activity}
                    onChange={(e) => setPrivacy({ ...privacy, activity: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: privacy.activity ? "#3B82F6" : "#E0E6ED",
                    transition: "all 0.3s ease",
                    borderRadius: "24px",
                  }}>
                    <span style={{
                      position: "absolute",
                      content: "",
                      height: "18px",
                      width: "18px",
                      left: privacy.activity ? "24px" : "3px",
                      bottom: "3px",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.3s ease",
                      borderRadius: "50%",
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "20px", color: "#333333" }}>📂 数据管理</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button style={{
                padding: "12px 20px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#64748B",
                fontSize: "13px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                📤 导出学习数据
              </button>
              <button style={{
                padding: "12px 20px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#64748B",
                fontSize: "13px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
                📥 导入学习数据
              </button>
              <button style={{
                padding: "12px 20px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "8px",
                color: "#EF4444",
                fontSize: "13px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"; }}>
                🗑️ 清除学习记录
              </button>
            </div>
          </Card>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "8px" }}>
            <button style={{
              padding: "12px 24px",
              background: "#3B82F6",
              border: "none",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}>
              保存设置
            </button>
            <button style={{
              padding: "12px 24px",
              background: "#F5F7FA",
              border: "1px solid #E0E6ED",
              borderRadius: "8px",
              color: "#64748B",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
              恢复默认
            </button>
          </div>
        </div>
      </div>
    </PrototypeLayout>
  );
}
