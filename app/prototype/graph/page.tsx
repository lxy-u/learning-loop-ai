"use client";

import { useState } from "react";
import PrototypeLayout from "../components/PrototypeLayout";
import AIPanel from "../components/AIPanel";

interface KnowledgeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  mastery: number;
  category: string;
  connections: string[];
}

const nodes: KnowledgeNode[] = [
  { id: "npv", label: "NPV", x: 200, y: 150, mastery: 85, category: "公司金融", connections: ["irr", "wacc", "payback"] },
  { id: "irr", label: "IRR", x: 350, y: 100, mastery: 40, category: "公司金融", connections: ["npv", "capm"] },
  { id: "wacc", label: "WACC", x: 350, y: 220, mastery: 30, category: "公司金融", connections: ["npv", "capm", "beta"] },
  { id: "capm", label: "CAPM", x: 500, y: 150, mastery: 35, category: "投资组合", connections: ["irr", "wacc", "beta", "sml"] },
  { id: "beta", label: "Beta", x: 500, y: 280, mastery: 55, category: "投资组合", connections: ["capm", "wacc"] },
  { id: "sml", label: "SML", x: 650, y: 150, mastery: 20, category: "投资组合", connections: ["capm"] },
  { id: "payback", label: "回收期", x: 200, y: 280, mastery: 72, category: "公司金融", connections: ["npv"] },
  { id: "fs", label: "财务报表", x: 100, y: 380, mastery: 75, category: "财务分析", connections: ["ratio"] },
  { id: "ratio", label: "财务比率", x: 250, y: 400, mastery: 60, category: "财务分析", connections: ["fs", "du pont"] },
  { id: "du pont", label: "杜邦分析", x: 400, y: 380, mastery: 45, category: "财务分析", connections: ["ratio"] },
  { id: "risk", label: "风险管理", x: 600, y: 350, mastery: 50, category: "风险管理", connections: ["var", "capm"] },
  { id: "var", label: "VaR", x: 700, y: 300, mastery: 25, category: "风险管理", connections: ["risk"] },
  { id: "bond", label: "债券定价", x: 150, y: 50, mastery: 68, category: "固定收益", connections: ["duration"] },
  { id: "duration", label: "久期", x: 80, y: 150, mastery: 42, category: "固定收益", connections: ["bond", "convexity"] },
  { id: "convexity", label: "凸性", x: 80, y: 250, mastery: 15, category: "固定收益", connections: ["duration"] },
];

const categoryColors: Record<string, string> = {
  "公司金融": "#6366F1",
  "投资组合": "#8B5CF6",
  "财务分析": "#10B981",
  "风险管理": "#EF4444",
  "固定收益": "#F59E0B",
};

function getMasteryColor(mastery: number) {
  if (mastery >= 70) return "#10B981";
  if (mastery >= 50) return "#F59E0B";
  return "#EF4444";
}

export default function GraphPage() {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTranslate({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <PrototypeLayout aiPanel={<AIPanel />}>
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        height: "calc(100vh - 104px)", 
        gap: "20px"
      }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700 }}>知识图谱</h2>
              <p style={{ fontSize: "12px", color: "#9CA3AF" }}>点击节点查看详情 · 鼠标滚轮缩放 · 拖拽移动</p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {Object.entries(categoryColors).map(([cat, color]) => (
                <span key={cat} style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  background: `${color}20`,
                  color,
                  borderRadius: "6px",
                  border: `1px solid ${color}40`,
                }}>
                  {cat}
                </span>
              ))}
              <button
                onClick={handleReset}
                style={{
                  padding: "6px 12px",
                  background: "#F5F7FA",
                  border: "1px solid #E0E6ED",
                  borderRadius: "6px",
                  color: "#64748B",
                  fontSize: "11px",
                  cursor: "pointer",
                  marginLeft: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#E8EEF5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F7FA"; }}
              >
                ↺ 重置
              </button>
            </div>
          </div>

          <div
            style={{ flex: 1, position: "relative", overflow: "hidden", borderRadius: "12px", border: "1px solid #E0E6ED" }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 480"
              style={{
                background: "#F5F7FA",
                cursor: isDragging ? "grabbing" : "grab",
                transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {nodes.map(node =>
                node.connections.map(connId => {
                  const target = nodes.find(n => n.id === connId);
                  if (!target) return null;
                  return (
                    <line
                      key={`${node.id}-${connId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="#E0E6ED"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                  );
                })
              )}

              {nodes.map(node => (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={selectedNode?.id === node.id ? 28 : 22}
                    fill={`${getMasteryColor(node.mastery)}20`}
                    stroke={getMasteryColor(node.mastery)}
                    strokeWidth={selectedNode?.id === node.id ? 3 : 1.5}
                    filter={selectedNode?.id === node.id ? "url(#glow)" : undefined}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill="#1E40AF"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 16}
                    textAnchor="middle"
                    fill={getMasteryColor(node.mastery)}
                    fontSize="9"
                  >
                    {node.mastery}%
                  </text>
                </g>
              ))}
            </svg>

            <div style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              background: "#FFFFFF",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "11px",
              color: "#6B7280",
              border: "1px solid #E0E6ED",
              pointerEvents: "none",
            }}>
              缩放: {Math.round(scale * 100)}%
            </div>
          </div>
        </div>

        {selectedNode && (
          <div style={{
            width: "100%",
            maxHeight: "300px",
            background: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #E0E6ED",
            padding: "20px",
            overflow: "auto",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "#1E40AF" }}>{selectedNode.label}</h3>
                <span style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  background: `${categoryColors[selectedNode.category]}20`,
                  color: categoryColors[selectedNode.category],
                  borderRadius: "4px",
                }}>
                  {selectedNode.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                style={{ background: "none", border: "1px solid #E0E6ED", color: "#6B7280", cursor: "pointer", fontSize: "18px", borderRadius: "4px", padding: "2px 6px" }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                <span style={{ color: "#6B7280" }}>掌握程度</span>
                <span style={{ color: getMasteryColor(selectedNode.mastery), fontWeight: 600 }}>{selectedNode.mastery}%</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "#E0E6ED", borderRadius: "4px" }}>
                <div style={{
                  width: `${selectedNode.mastery}%`,
                  height: "100%",
                  background: getMasteryColor(selectedNode.mastery),
                  borderRadius: "4px",
                  transition: "width 0.5s",
                }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              <button style={{
                flex: 1,
                padding: "10px",
                background: "#3B82F6",
                border: "none",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 500,
              }}>
                📖 看课程
              </button>
              <button style={{
                flex: 1,
                padding: "10px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#1E40AF",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 500,
              }}>
                📝 做题
              </button>
              <button style={{
                flex: 1,
                padding: "10px",
                background: "#F5F7FA",
                border: "1px solid #E0E6ED",
                borderRadius: "8px",
                color: "#1E40AF",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 500,
              }}>
                🤖 AI讲解
              </button>
            </div>

            <div style={{
              background: "#F5F7FA",
              borderRadius: "10px",
              padding: "14px",
              border: "1px solid #E0E6ED",
              marginBottom: "16px",
            }}>
              <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px", color: "#F59E0B" }}>
                🔥 学习对标
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>📊 平均学习次数</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#1E40AF" }}>2.8次</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>⏱ 平均学习时长</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#1E40AF" }}>35min</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>📉 一次掌握率</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#1E40AF" }}>42%</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>👥 学习人数</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#1E40AF" }}>1,234</div>
                </div>
              </div>
            </div>

            <div style={{
              background: "#F5F7FA",
              borderRadius: "10px",
              padding: "14px",
              border: "1px solid #E0E6ED",
              marginBottom: "16px",
            }}>
              <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "8px", color: "#1E40AF" }}>🧠 你的情况</div>
              <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.6" }}>
                学习 <span style={{ color: "#EF4444", fontWeight: 600 }}>1次</span>（偏低）· 正确率 <span style={{ color: "#F59E0B", fontWeight: 600 }}>60%</span>（正常）
              </div>
              <div style={{
                marginTop: "8px",
                padding: "8px 10px",
                background: "rgba(59, 130, 246, 0.1)",
                borderRadius: "6px",
                fontSize: "12px",
                color: "#3B82F6",
              }}>
                👉 建议至少学习2轮
              </div>
            </div>

            <div style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              borderRadius: "10px",
              padding: "14px",
            }}>
              <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#F59E0B" }}>
                🤖 AI 提示
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.6" }}>
                该知识点属于<span style={{ color: "#F59E0B" }}>高理解难度</span>，建议结合案例学习。关联知识点：{selectedNode.connections.map(c => nodes.find(n => n.id === c)?.label).join("、")}
              </div>
            </div>
          </div>
        )}
      </div>
    </PrototypeLayout>
  );
}