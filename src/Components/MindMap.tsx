import React, { useState } from "react";
import { Lesson } from "../lessons";

interface Props {
  lessons: Lesson[];
  completedLessons: string[];
  onNodeClick: (id: string) => void;
}

// ── Layout ────────────────────────────────────────────────────────────────────
const SVG_W = 1440;
const SVG_H = 680;
const NW    = 110; // node width
const NH    = 54;  // node height
const NR    = 10;  // corner radius

// Centre-x for each lesson id  (top = beginner y=110, mid = intermediate y=330, bot = advanced y=540)
const POSITIONS: Record<string, [number, number]> = {
  // Beginner  (8 nodes)
  "bme-intro":          [  90, 110],
  "units-measurement":  [ 255, 110],
  "physics-mechanics":  [ 420, 110],
  "chemistry-basics":   [ 585, 110],
  "biology-cells":      [ 750, 110],
  "math-calculus":      [ 915, 110],
  "bio-molecules":      [1080, 110],
  "programming-intro":  [1245, 110],

  // Intermediate (10 nodes)
  "physics-em":         [  65, 320],
  "organic-chem":       [ 195, 320],
  "biochemistry":       [ 325, 320],
  "anatomy":            [ 455, 320],
  "physiology":         [ 585, 320],
  "linear-algebra":     [ 715, 320],
  "diff-equations":     [ 845, 320],
  "biomechanics":       [ 975, 320],
  "biomaterials":       [1105, 320],
  "signals-intro":      [1265, 320],

  // Advanced (7 nodes)
  "medical-imaging":    [ 100, 530],
  "bioelectronics":     [ 300, 530],
  "tissue-engineering": [ 500, 530],
  "drug-delivery":      [ 700, 530],
  "medical-devices":    [ 900, 530],
  "bioinformatics":     [1100, 530],
  "neural-engineering": [1300, 530],
};

const TIER_COLORS: Record<string, { main: string; bg: string; border: string }> = {
  beginner:     { main: "#22c55e", bg: "rgba(34,197,94,0.18)",   border: "rgba(34,197,94,0.5)"   },
  intermediate: { main: "#60a5fa", bg: "rgba(96,165,250,0.18)",  border: "rgba(96,165,250,0.5)"  },
  advanced:     { main: "#a78bfa", bg: "rgba(167,139,250,0.18)", border: "rgba(167,139,250,0.5)" },
};

// Build unique edges from each lesson's connections array
function buildEdges(lessons: Lesson[]) {
  const seen = new Set<string>();
  const edges: Array<{ from: string; to: string }> = [];
  lessons.forEach(lesson => {
    lesson.connections.forEach(conn => {
      const key = [lesson.id, conn].sort().join("|");
      if (!seen.has(key) && POSITIONS[lesson.id] && POSITIONS[conn]) {
        seen.add(key);
        edges.push({ from: lesson.id, to: conn });
      }
    });
  });
  return edges;
}

export default function MindMap({ lessons, completedLessons, onNodeClick }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const edges = buildEdges(lessons);
  const lessonMap = Object.fromEntries(lessons.map(l => [l.id, l]));

  return (
    <div>
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">🗺️ Concept Map</h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          See how BME topics connect. Click any node to jump to that lesson.
        </p>

        {/* Legend */}
        <div className="flex justify-center flex-wrap gap-5 mt-4 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
          {[
            ["#22c55e", "Beginner"],
            ["#60a5fa", "Intermediate"],
            ["#a78bfa", "Advanced"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: color as string }} />
              {label}
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid #22c55e" }}
            />
            Completed
          </div>
          <div className="flex items-center gap-1.5">
            <div style={{ width: "18px", height: "2px", borderTop: "1.5px dashed rgba(167,139,250,0.45)" }} />
            Connection
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="glass rounded-2xl p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width={SVG_W}
          height={SVG_H}
          style={{ display: "block", minWidth: "720px", maxWidth: "100%" }}
        >
          {/* Tier background bands */}
          <rect x={0} y={82}  width={SVG_W} height={100} fill="rgba(34,197,94,0.03)"   rx={8} />
          <rect x={0} y={292} width={SVG_W} height={100} fill="rgba(96,165,250,0.03)"  rx={8} />
          <rect x={0} y={502} width={SVG_W} height={100} fill="rgba(167,139,250,0.03)" rx={8} />

          {/* Tier labels */}
          <text x={8} y={102} fill="rgba(34,197,94,0.5)"   fontSize={10} fontWeight={700} fontFamily="sans-serif">BEGINNER</text>
          <text x={8} y={312} fill="rgba(96,165,250,0.5)"  fontSize={10} fontWeight={700} fontFamily="sans-serif">INTERMEDIATE</text>
          <text x={8} y={522} fill="rgba(167,139,250,0.5)" fontSize={10} fontWeight={700} fontFamily="sans-serif">ADVANCED</text>

          {/* Connection lines (dashed bezier curves) */}
          {edges.map(({ from, to }) => {
            const [fx, fy] = POSITIONS[from];
            const [tx, ty] = POSITIONS[to];
            const x1 = fx + NW / 2, y1 = fy + NH;
            const x2 = tx + NW / 2, y2 = ty;
            const my = (y1 + y2) / 2;
            const isActive = hovered === from || hovered === to;
            return (
              <path
                key={`${from}-${to}`}
                d={`M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`}
                fill="none"
                stroke={isActive ? "rgba(167,139,250,0.7)" : "rgba(167,139,250,0.2)"}
                strokeWidth={isActive ? 2 : 1.5}
                strokeDasharray="5 4"
              />
            );
          })}

          {/* Nodes */}
          {lessons.map(lesson => {
            if (!POSITIONS[lesson.id]) return null;
            const [x, y] = POSITIONS[lesson.id];
            const completed = completedLessons.includes(lesson.id);
            const isHov = hovered === lesson.id;
            const tc = TIER_COLORS[lesson.tier];

            return (
              <g
                key={lesson.id}
                onClick={() => onNodeClick(lesson.id)}
                onMouseEnter={() => setHovered(lesson.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Glow halo on hover/complete */}
                {(isHov || completed) && (
                  <rect
                    x={x - 3} y={y - 3}
                    width={NW + 6} height={NH + 6}
                    rx={NR + 3}
                    fill="none"
                    stroke={completed ? "rgba(34,197,94,0.35)" : `${tc.main}44`}
                    strokeWidth={3}
                  />
                )}

                {/* Node body */}
                <rect
                  x={x} y={y}
                  width={NW} height={NH}
                  rx={NR}
                  fill={completed ? "rgba(34,197,94,0.18)" : isHov ? `${tc.main}22` : tc.bg}
                  stroke={completed ? "#22c55e" : tc.border}
                  strokeWidth={completed ? 2 : 1.5}
                />

                {/* Emoji icon */}
                <text
                  x={x + 16} y={y + NH / 2 + 6}
                  fontSize={18}
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {lesson.icon}
                </text>

                {/* Title (truncated) */}
                <text
                  x={x + 30} y={y + NH / 2 - 4}
                  fill={completed ? "#22c55e" : "#fff"}
                  fontSize={8.5}
                  fontWeight={700}
                  fontFamily="sans-serif"
                >
                  {lesson.title.length > 16 ? lesson.title.slice(0, 15) + "…" : lesson.title}
                </text>

                {/* Subject label */}
                <text
                  x={x + 30} y={y + NH / 2 + 9}
                  fill={tc.main}
                  fontSize={7.5}
                  fontFamily="sans-serif"
                  opacity={0.8}
                >
                  {lesson.subject}
                </text>

                {/* Checkmark badge */}
                {completed && (
                  <text x={x + NW - 13} y={y + 13} fontSize={9} fill="#22c55e" fontFamily="sans-serif">
                    ✓
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-xs text-center mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>
        Scroll horizontally on smaller screens · Hover to highlight connections
      </p>
    </div>
  );
}
