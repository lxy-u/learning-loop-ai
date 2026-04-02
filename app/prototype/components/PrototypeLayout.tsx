"use client";

import { useState, ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AIPanel from "./AIPanel";

const navItems = [
    { key: "dashboard", label: "首页", icon: "🏠", href: "/prototype" },
    { key: "graph", label: "知识图谱", icon: "🧠", href: "/prototype/graph" },
    { key: "course", label: "课程学习", icon: "📖", href: "/prototype/course" },
    { key: "quiz", label: "题库练习", icon: "📝", href: "/prototype/quiz" },
    { key: "exam", label: "模拟考试", icon: "🧪", href: "/prototype/exam" },
    { key: "wrong-questions", label: "错题本", icon: "📌", href: "/prototype/wrong-questions" },
    { key: "community", label: "学习社区", icon: "🌍", href: "/prototype/community" },
    { key: "leaderboard", label: "排行榜", icon: "🏆", href: "/prototype/leaderboard" },
    { key: "profile", label: "个人中心", icon: "👤", href: "/prototype/profile" },
    { key: "membership", label: "会员中心", icon: "💎", href: "/prototype/membership" },
    { key: "settings", label: "设置", icon: "⚙️", href: "/prototype/settings" },
  ];

interface PrototypeLayoutProps {
  children: ReactNode;
  aiPanel?: ReactNode;
}

export default function PrototypeLayout({ children, aiPanel }: PrototypeLayoutProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiOpen, setAiOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeKey = navItems.find(item => pathname === item.href)?.key || "dashboard";

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#F5F7FA",
      color: "#333333",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            position: "fixed",
            top: "12px",
            left: "12px",
            zIndex: 1000,
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            background: "#FFFFFF",
            border: "1px solid #E0E6ED",
            color: "#333333",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          {mobileMenuOpen ? "×" : "☰"}
        </button>
      )}

      {mobileMenuOpen && isMobile && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "260px",
              height: "100%",
              background: "#FFFFFF",
              borderRight: "1px solid #E0E6ED",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderBottom: "1px solid #E0E6ED",
              height: "56px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #1E40AF, #3B82F6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFFFFF",
                flexShrink: 0,
              }}>
                L
              </div>
              <span style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1E40AF",
              }}>
                Learning Loop
              </span>
            </div>

            <div style={{ flex: 1, padding: "8px", overflow: "auto" }}>
              {navItems.map(item => {
                const isActive = activeKey === item.key;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: isActive ? "#1E40AF" : "#6B7280",
                      background: isActive ? "rgba(59, 130, 246, 0.1)" : "transparent",
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 400,
                      marginBottom: "2px",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <nav style={{
        display: isMobile ? "none" : "flex",
        width: sidebarCollapsed ? "64px" : "220px",
        background: "#FFFFFF",
        borderRight: "1px solid #E0E6ED",
        flexDirection: "column",
        transition: "width 0.3s",
        flexShrink: 0,
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
      }}>
        <div style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid #E0E6ED",
          height: "56px",
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #1E40AF, #3B82F6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: 700,
            color: "#FFFFFF",
            flexShrink: 0,
          }}>
            L
          </div>
          {!sidebarCollapsed && (
            <span style={{
              fontSize: "14px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              color: "#1E40AF",
            }}>
              Learning Loop
            </span>
          )}
        </div>

        <div style={{ flex: 1, padding: "8px" }}>
          {navItems.map(item => {
            const isActive = activeKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: isActive ? "#1E40AF" : "#6B7280",
                  background: isActive ? "rgba(59, 130, 246, 0.1)" : "transparent",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.2s",
                  marginBottom: "2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#F5F7FA";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            padding: "12px",
            borderTop: "1px solid #E0E6ED",
            background: "none",
            border: "none",
            color: "#6B7280",
            cursor: "pointer",
            fontSize: "16px",
            textAlign: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F5F7FA";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {sidebarCollapsed ? "→" : "←"}
        </button>
      </nav>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <header style={{
            height: "56px",
            background: "#FFFFFF",
            borderBottom: "1px solid #E0E6ED",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isMobile ? "0 16px" : "0 24px",
            flexShrink: 0,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#1E40AF" }}>
                {navItems.find(item => activeKey === item.key)?.label || "首页"}
              </span>
              <span style={{
                fontSize: "11px",
                color: "#6B7280",
                background: "#F5F7FA",
                padding: "2px 8px",
                borderRadius: "4px",
                border: "1px solid #E0E6ED",
              }}>
                PROTOTYPE
              </span>
            </div>

            {aiPanel && !isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  padding: "6px 12px",
                  background: "#F5F7FA",
                  borderRadius: "16px",
                  border: "1px solid #E0E6ED",
                }}>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>CFA Level 1</span>
                </div>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1E40AF, #3B82F6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}>
                  U
                </div>
              </div>
            )}
          </header>

        <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
          <main style={{
            flex: 1,
            overflow: "auto",
            padding: isMobile ? "16px" : "24px",
            background: "#F5F7FA",
          }}>
            {children}
          </main>

          {!isMobile && aiPanel && (
            <aside style={{
              width: aiOpen ? "320px" : "0px",
              background: "#FFFFFF",
              borderLeft: "1px solid #E0E6ED",
              overflow: "hidden",
              transition: "width 0.3s",
              flexShrink: 0,
              boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.05)",
            }}>
              <div style={{
                width: "320px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{
                  padding: "16px",
                  borderBottom: "1px solid #E0E6ED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>🤖</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#1E40AF" }}>AI 学习助手</span>
                  </div>
                  <button
                    onClick={() => setAiOpen(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6B7280",
                      cursor: "pointer",
                      fontSize: "16px",
                      padding: "4px",
                      borderRadius: "4px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F5F7FA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
                  <AIPanel />
                </div>
              </div>
            </aside>
          )}
        </div>

        {isMobile && aiPanel && (
          <>
            <button
              onClick={() => setAiOpen(!aiOpen)}
              style={{
                position: "fixed",
                right: "16px",
                bottom: "16px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1E40AF, #3B82F6)",
                border: "none",
                color: "#FFFFFF",
                fontSize: "20px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                zIndex: 100,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              🤖
            </button>

            {aiOpen && (
              <div
                onClick={() => setAiOpen(false)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    maxHeight: "70vh",
                    background: "#FFFFFF",
                    borderTop: "1px solid #E0E6ED",
                    borderRadius: "16px 16px 0 0",
                    display: "flex",
                    flexDirection: "column",
                    animation: "slideUp 0.3s ease-out",
                    boxShadow: "0 -2px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div style={{
                    padding: "16px",
                    borderBottom: "1px solid #E0E6ED",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "16px" }}>🤖</span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#1E40AF" }}>AI 学习助手</span>
                    </div>
                    <button
                      onClick={() => setAiOpen(false)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#6B7280",
                        cursor: "pointer",
                        fontSize: "18px",
                        padding: "4px",
                        borderRadius: "4px",
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
                    <AIPanel />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {!isMobile && !aiOpen && aiPanel && (
          <button
            onClick={() => setAiOpen(true)}
            style={{
              position: "fixed",
              right: "24px",
              bottom: "24px",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1E40AF, #3B82F6)",
              border: "none",
              color: "#FFFFFF",
              fontSize: "20px",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
              zIndex: 100,
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            🤖
          </button>
        )}
      </div>
    </div>
  );
}
