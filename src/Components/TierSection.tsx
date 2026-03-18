import React, { useState } from "react";
import { Lesson } from "../lessons";
import { FinalExam } from "../finals";
import LessonCard from "./LessonCard";

interface Props {
  tier: "beginner" | "intermediate" | "advanced";
  tierLessons: Lesson[];
  completedLessons: string[];
  final: FinalExam;
  finalCompleted: boolean;
  isLocked: boolean;
  onLessonComplete: (id: string, xp: number) => void;
  onFinalStart: () => void;
  openTutor: (title: string) => void;
}

const TIER_CONFIG = {
  beginner: {
    label: "Beginner",
    icon: "🟢",
    color: "#22c55e",
    borderColor: "rgba(34,197,94,0.3)",
    bg: "rgba(34,197,94,0.06)",
    desc: "Foundation sciences — physics, chemistry, biology & maths",
  },
  intermediate: {
    label: "Intermediate",
    icon: "🔵",
    color: "#60a5fa",
    borderColor: "rgba(96,165,250,0.3)",
    bg: "rgba(96,165,250,0.06)",
    desc: "Core BME disciplines — biomechanics, biomaterials, signals & more",
  },
  advanced: {
    label: "Advanced",
    icon: "🟣",
    color: "#a78bfa",
    borderColor: "rgba(167,139,250,0.3)",
    bg: "rgba(167,139,250,0.06)",
    desc: "Specialisations — imaging, devices, neural engineering & beyond",
  },
};

export default function TierSection({
  tier,
  tierLessons,
  completedLessons,
  final,
  finalCompleted,
  isLocked,
  onLessonComplete,
  onFinalStart,
  openTutor,
}: Props) {
  const [collapsed, setCollapsed] = useState(tier !== "beginner");
  const cfg = TIER_CONFIG[tier];

  const completedCount = completedLessons.filter(id =>
    tierLessons.some(l => l.id === id)
  ).length;
  const progress   = completedCount / tierLessons.length;
  const canTakeFinal = progress >= 0.8;
  const remaining  = Math.max(0, Math.ceil(tierLessons.length * 0.8) - completedCount);

  return (
    <section className="mb-10">
      {/* ── Section Header ── */}
      <div
        className="rounded-2xl p-5 mb-4 cursor-pointer transition-all select-none"
        style={{
          background: isLocked ? "rgba(255,255,255,0.02)" : cfg.bg,
          border: `1px solid ${isLocked ? "rgba(255,255,255,0.06)" : cfg.borderColor}`,
        }}
        onClick={() => !isLocked && setCollapsed(c => !c)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{
                background: isLocked ? "rgba(255,255,255,0.04)" : `${cfg.color}22`,
                border: `1px solid ${isLocked ? "rgba(255,255,255,0.08)" : cfg.borderColor}`,
              }}
            >
              {isLocked ? "🔒" : cfg.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2
                  className="text-xl font-bold"
                  style={{ color: isLocked ? "rgba(255,255,255,0.25)" : "#fff" }}
                >
                  {cfg.label} Tier
                </h2>
                {!isLocked && !collapsed && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${cfg.color}22`, color: cfg.color }}
                  >
                    {completedCount}/{tierLessons.length} done
                  </span>
                )}
              </div>
              <p
                className="text-xs"
                style={{ color: isLocked ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.45)" }}
              >
                {isLocked ? "Complete 70% of the previous tier to unlock" : cfg.desc}
              </p>
            </div>
          </div>

          {!isLocked && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold" style={{ color: cfg.color }}>
                {Math.round(progress * 100)}%
              </span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>
                {collapsed ? "▸" : "▾"}
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!isLocked && (
          <div
            className="mt-3 h-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${progress * 100}%`, background: cfg.color }}
            />
          </div>
        )}
      </div>

      {/* ── Lessons + Final ── */}
      {!isLocked && !collapsed && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tierLessons.map(lesson => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isCompleted={completedLessons.includes(lesson.id)}
                onComplete={onLessonComplete}
                openTutor={openTutor}
              />
            ))}
          </div>

          {/* Final Exam Banner */}
          <div
            className="mt-6 rounded-2xl p-5 flex items-center justify-between gap-4"
            style={{
              background: canTakeFinal ? `${cfg.color}0d` : "rgba(255,255,255,0.03)",
              border: `1px solid ${canTakeFinal ? cfg.borderColor : "rgba(255,255,255,0.06)"}`,
              opacity: canTakeFinal || finalCompleted ? 1 : 0.55,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: `${cfg.color}18`,
                  border: `1px solid ${cfg.borderColor}`,
                }}
              >
                {finalCompleted ? "🏆" : "📝"}
              </div>
              <div>
                <h3 className="font-bold text-white">{final.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {finalCompleted
                    ? `Passed! +${final.xpReward} XP earned`
                    : `10 questions · ${final.xpReward} XP · Pass at ${final.passingScore}%`}
                </p>
              </div>
            </div>

            {finalCompleted ? (
              <span
                className="px-4 py-2 rounded-xl text-sm font-bold flex-shrink-0"
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#22c55e",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                ✓ Passed
              </span>
            ) : (
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0 transition-all"
                style={{
                  background: canTakeFinal
                    ? `linear-gradient(135deg, ${cfg.color}, ${cfg.color}99)`
                    : "rgba(255,255,255,0.06)",
                  cursor: canTakeFinal ? "pointer" : "not-allowed",
                  boxShadow: canTakeFinal ? `0 4px 15px ${cfg.color}33` : "none",
                  border: canTakeFinal ? "none" : "1px solid rgba(255,255,255,0.08)",
                  color: canTakeFinal ? "#fff" : "rgba(255,255,255,0.3)",
                }}
                onClick={canTakeFinal ? onFinalStart : undefined}
                disabled={!canTakeFinal}
              >
                {canTakeFinal ? "Take Final →" : `${remaining} more lesson${remaining !== 1 ? "s" : ""} needed`}
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
