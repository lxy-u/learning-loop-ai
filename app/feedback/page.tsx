"use client";

import React from "react";

// 2026年最先进的设计系统
const designSystem = {
  colors: {
    background: "#0A0A0A",
    surface: "#1A1A1A",
    surfaceLight: "#2D2D2D",
    primary: "#6366F1",
    primaryLight: "#818CF8",
    secondary: "#10B981",
    success: "#10B981",
    error: "#EF4444",
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    border: "#374151",
  },
  typography: {
    fontFamily: "Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: {
      h1: "clamp(2rem, 5vw, 3.5rem)",
      h2: "clamp(1.5rem, 3vw, 2.5rem)",
      h3: "clamp(1.25rem, 2.5vw, 1.75rem)",
      h4: "clamp(1rem, 2vw, 1.25rem)",
    },
    body: {
      regular: "1rem",
      small: "0.875rem",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  transitions: {
    fast: "150ms ease-in-out",
    normal: "200ms ease-in-out",
    slow: "300ms ease-in-out",
  },
};

export default function FeedbackPage() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: designSystem.colors.background,
      color: designSystem.colors.text,
      fontFamily: designSystem.typography.fontFamily,
      padding: `${designSystem.spacing.xl} ${designSystem.spacing.md}`,
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        <div style={{
          marginBottom: designSystem.spacing.xl,
          textAlign: "center",
        }}>
          <h1 style={{
            fontSize: designSystem.typography.heading.h1,
            fontWeight: "700",
            marginBottom: designSystem.spacing.md,
            background: `linear-gradient(135deg, ${designSystem.colors.primary}, ${designSystem.colors.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            用户反馈
          </h1>
          <p style={{
            fontSize: designSystem.typography.body.regular,
            color: designSystem.colors.textSecondary,
            maxWidth: "600px",
            margin: "0 auto",
          }}>
            您的意见对我们非常重要，帮助我们不断改进 Learning Loop AI
          </p>
        </div>

        <div style={{
          backgroundColor: designSystem.colors.surface,
          borderRadius: designSystem.borderRadius.lg,
          boxShadow: designSystem.shadows.xl,
          overflow: "hidden",
          border: `1px solid ${designSystem.colors.border}`,
        }}>
          <iframe
            src="https://tally.so/embed/MeL87E?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            width="100%"
            height="1000"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Learning Loop AI 用户反馈"
            style={{
              display: "block",
            }}
          />
        </div>

        <div style={{
          marginTop: designSystem.spacing.xl,
          textAlign: "center",
          padding: designSystem.spacing.lg,
          backgroundColor: designSystem.colors.surface,
          borderRadius: designSystem.borderRadius.md,
          border: `1px solid ${designSystem.colors.border}`,
        }}>
          <p style={{
            fontSize: designSystem.typography.body.regular,
            color: designSystem.colors.textSecondary,
            marginBottom: designSystem.spacing.sm,
          }}>
            感谢您的反馈！
          </p>
          <a
            href="/"
            style={{
              color: designSystem.colors.primary,
              textDecoration: "none",
              fontWeight: "500",
              transition: `color ${designSystem.transitions.normal}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = designSystem.colors.primaryLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = designSystem.colors.primary;
            }}
          >
            返回学习页面 →
          </a>
        </div>
      </div>
    </div>
  );
}
