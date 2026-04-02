"use client";

import PrototypeLayout from "../components/PrototypeLayout";

const overviewStats = [
  { label: "总掌握率", value: "65%", compare: "vs 平均 58%", better: true },
  { label: "总答题数", value: "248", compare: "本周 +45", better: true },
  { label: "正确率", value: "68%", compare: "vs 平均 55%", better: true },
  { label: "学习时长", value: "36h", compare: "日均 1.5h", better: null },
  { label: "连续打卡", value: "7天", compare: "最长 12天", better: null },
  { label: "知识点覆盖", value: "45/120", compare: "37.5%", better: false },
];

const moduleAnalysis = [
  { module: "公司金融", mastery: 58, avg: 55, questions: 68, correct: 72 },
  { module: "财务分析", mastery: 78, avg: 60, questions: 52, correct: 85 },
  { module: "投资组合", mastery: 42, avg: 58, questions: 45, correct: 55 },
  { module: "固定收益", mastery: 65, avg: 52, questions: 38, correct: 70 },
  { module: "风险管理", mastery: 38, avg: 50, questions: 35, correct: 45 },
  { module: "道德准则", mastery: 82, avg: 65, questions: 10, correct: 90 },
];

const errorTypes = [
  { type: "理解偏差", count: 45, percentage: 60, color: "#EF4444" },
  { type: "计算错误", count: 18, percentage: 24, color: "#F59E0B" },
  { type: "知识盲点", count: 8, percentage: 11, color: "#3B82F6" },
  { type: "粗心失误", count: 4, percentage: 5, color: "#64748B" },
];

const weeklyData = [
  { day: "周一", study: 45, quiz: 20, mastery: 62 },
  { day: "周二", study: 60, quiz: 35, mastery: 65 },
  { day: "周三", study: 30, quiz: 15, mastery: 60 },
  { day: "周四", study: 90, quiz: 40, mastery: 68 },
  { day: "周五", study: 75, quiz: 50, mastery: 70 },
  { day: "周六", study: 120, quiz: 60, mastery: 75 },
  { day: "周日", study: 45, quiz: 25, mastery: 72 },
];

const radarData = [
  { label: "公司金融", value: 58 },
  { label: "财务分析", value: 78 },
  { label: "投资组合", value: 42 },
  { label: "固定收益", value: 65 },
  { label: "风险管理", value: 38 },
  { label: "道德准则", value: 82 },
];

export default function ReportPage() {
  return (
    <PrototypeLayout>
      <div style={{ maxWidth: "1000px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>📊 学习报告</h2>
            <p style={{ fontSize: "12px", color: "#64748B" }}>2026年3月 · CFA Level 1</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{
              padding: "6px 14px",
              background: "#3B82F6",
              border: "none",
              borderRadius: "6px",
              color: "#FFFFFF",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; }}>
              本月
            </button>
            <button style={{
              padding: "6px 14px",
              background: "#F5F7FA",
              border: "1px solid #E0E6ED",
              borderRadius: "6px",
              color: "#64748B",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
              上月
            </button>
            <button style={{
              padding: "6px 14px",
              background: "#F5F7FA",
              border: "1px solid #E0E6ED",
              borderRadius: "6px",
              color: "#64748B",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}>
              全部
            </button>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}>
          {overviewStats.map(stat => (
            <div key={stat.label} style={{
              background: "#FFFFFF",
              borderRadius: "10px",
              padding: "16px",
              border: "1px solid #E0E6ED",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }} onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }} onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
              <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "6px" }}>{stat.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "22px", fontWeight: 700, color: "#333333" }}>{stat.value}</span>
                <span style={{
                  fontSize: "10px",
                  color: stat.better === true ? "#10B981" : stat.better === false ? "#F59E0B" : "#64748B",
                }}>
                  {stat.better === true ? "↑" : stat.better === false ? "↓" : ""} {stat.compare}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #E0E6ED",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#333333" }}>📈 掌握率趋势</div>
            <svg width="100%" height="200px" viewBox="0 0 300 200" style={{ background: "#F5F7FA", borderRadius: "8px" }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <g transform="translate(30, 170) scale(1, -1)">
                <line x1="0" y1="0" x2="260" y2="0" stroke="#E0E6ED" strokeWidth="1" />
                <line x1="0" y1="20" x2="260" y2="20" stroke="#E0E6ED" strokeWidth="1" />
                <line x1="0" y1="40" x2="260" y2="40" stroke="#E0E6ED" strokeWidth="1" />
                <line x1="0" y1="60" x2="260" y2="60" stroke="#E0E6ED" strokeWidth="1" />
                <line x1="0" y1="80" x2="260" y2="80" stroke="#E0E6ED" strokeWidth="1" />
                <line x1="0" y1="100" x2="260" y2="100" stroke="#E0E6ED" strokeWidth="1" />
                <line x1="0" y1="120" x2="260" y2="120" stroke="#E0E6ED" strokeWidth="1" />
                <line x1="0" y1="140" x2="260" y2="140" stroke="#E0E6ED" strokeWidth="1" />
                <polyline
                  points="0,124 43,100 86,76 129,52 172,28 215,104 258,80"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {weeklyData.map((d, i) => (
                  <circle
                    key={d.day}
                    cx={i * 43}
                    cy={d.mastery}
                    r="5"
                    fill="#3B82F6"
                    stroke="#F5F7FA"
                    strokeWidth="2"
                  />
                ))}
              </g>
            </svg>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "12px", fontSize: "11px", color: "#64748B" }}>
              <span>掌握率变化：</span>
              <span style={{ color: "#10B981", fontWeight: 600 }}>62% → 75%</span>
              <span style={{ color: "#10B981" }}>（+13%）</span>
            </div>
          </div>

          <div style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #E0E6ED",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#333333" }}>🕸️ 能力分布雷达</div>
            <svg width="100%" height="250px" viewBox="0 0 300 250" style={{ background: "#F5F7FA", borderRadius: "8px" }}>
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
                </linearGradient>
              </defs>
              <g transform="translate(150, 125)">
                {["公司金融", "财务分析", "投资组合", "固定收益", "风险管理", "道德准则"].map((label, i) => {
                  const angle = (i * 72 - 90) * Math.PI / 180;
                  return (
                    <g key={label}>
                      <line
                        x1="0"
                        y1="0"
                        x2={Math.cos(angle) * 100}
                        y2={Math.sin(angle) * 100}
                        stroke="#E0E6ED"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={Math.cos(angle) * 110}
                        y={Math.sin(angle) * 110}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="11"
                        alignmentBaseline="middle"
                        transform={`rotate(${i * 72 - 90}, ${Math.cos(angle) * 110}, ${Math.sin(angle) * 110})`}
                      >
                        {label}
                      </text>
                    </g>
                  );
                })}
                <polygon
                  points={radarData.map((d, i) => {
                    const angle = (i * 72 - 90) * Math.PI / 180;
                    return `${Math.cos(angle) * d.value},${Math.sin(angle) * d.value}`;
                  }).join(" ")}
                  fill="url(#radarFill)"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.8"
                />
                {radarData.map((d, i) => {
                  const angle = (i * 72 - 90) * Math.PI / 180;
                  return (
                    <circle
                      key={d.label}
                      cx={Math.cos(angle) * d.value}
                      cy={Math.sin(angle) * d.value}
                      r="5"
                      fill="#3B82F6"
                      stroke="#F5F7FA"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            </svg>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "12px", fontSize: "11px", color: "#64748B" }}>
              <span>平均：58%</span>
              <span>你的：65%</span>
              <span style={{ color: "#10B981", fontWeight: 600 }}>+7%</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #E0E6ED",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#333333" }}>❌ 错误结构分析</div>
            {errorTypes.map(err => (
              <div key={err.type} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px", color: "#333333" }}>
                  <span>{err.type}</span>
                  <span style={{ color: err.color, fontWeight: 600 }}>{err.count}次 ({err.percentage}%)</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#E0E6ED", borderRadius: "3px" }}>
                  <div style={{ width: `${err.percentage}%`, height: "100%", background: err.color, borderRadius: "3px" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #E0E6ED",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#333333" }}>📊 分模块对标分析</div>
            <div style={{ overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["模块", "掌握率", "平均", "答题数", "正确率"].map(h => (
                      <th key={h} style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        fontSize: "11px",
                        color: "#64748B",
                        fontWeight: 600,
                        borderBottom: "1px solid #E0E6ED",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {moduleAnalysis.map(m => (
                    <tr key={m.module}>
                      <td style={{ padding: "8px 10px", fontSize: "12px", borderBottom: "1px solid #E0E6ED", color: "#333333" }}>
                        {m.module}
                      </td>
                      <td style={{ padding: "8px 10px", borderBottom: "1px solid #E0E6ED" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <div style={{ width: "50px", height: "4px", background: "#E0E6ED", borderRadius: "2px" }}>
                            <div style={{ width: `${m.mastery}%`, height: "100%", background: m.mastery >= m.avg ? "#10B981" : "#EF4444", borderRadius: "2px" }} />
                          </div>
                          <span style={{ fontSize: "11px", fontWeight: 600, color: m.mastery >= m.avg ? "#10B981" : "#EF4444" }}>{m.mastery}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "8px 10px", fontSize: "11px", color: "#64748B", borderBottom: "1px solid #E0E6ED" }}>
                        {m.avg}%
                      </td>
                      <td style={{ padding: "8px 10px", fontSize: "11px", color: "#64748B", borderBottom: "1px solid #E0E6ED" }}>
                        {m.questions}
                      </td>
                      <td style={{ padding: "8px 10px", fontSize: "11px", color: m.correct >= 70 ? "#10B981" : m.correct >= 50 ? "#F59E0B" : "#EF4444", borderBottom: "1px solid #E0E6ED" }}>
                        {m.correct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PrototypeLayout>
  );
}
