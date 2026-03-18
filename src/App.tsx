import React, { useState, useEffect } from "react";
import { lessons } from "./lessons";
import { finals } from "./finals";
import type { FinalExam } from "./finals";
import TierSection from "./Components/TierSection";
import MindMap from "./Components/MindMap";
import AITutor from "./Components/AITutor";
import FinalExamModal from "./Components/FinalExam";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedFinals,  setCompletedFinals]  = useState<string[]>([]);
  const [xp,          setXp]          = useState(0);
  const [view,        setView]        = useState<"learn" | "map">("learn");
  const [tutorOpen,   setTutorOpen]   = useState(false);
  const [tutorLesson, setTutorLesson] = useState("Biomedical Engineering");
  const [activeFinal, setActiveFinal] = useState<FinalExam | null>(null);

  // Load progress from Supabase
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from("progress").select("*");
        if (data) {
          setCompletedLessons(data.filter((d: any) => d.completed).map((d: any) => d.lesson_id));
          setXp(data.reduce((s: number, d: any) => s + (d.xp || 0), 0));
        }
      } catch (e) {
        console.warn("Supabase unavailable:", e);
      }
    })();
  }, []);

  // Tier groupings
  const beginnerLessons     = lessons.filter(l => l.tier === "beginner");
  const intermediateLessons = lessons.filter(l => l.tier === "intermediate");
  const advancedLessons     = lessons.filter(l => l.tier === "advanced");

  const beginnerDone     = completedLessons.filter(id => beginnerLessons.some(l => l.id === id)).length;
  const intermediateDone = completedLessons.filter(id => intermediateLessons.some(l => l.id === id)).length;

  const intermediateUnlocked = beginnerDone     >= Math.ceil(beginnerLessons.length     * 0.7);
  const advancedUnlocked     = intermediateDone >= Math.ceil(intermediateLessons.length * 0.7);

  // XP + level
  const maxXp    = lessons.reduce((s, l) => s + l.xpReward, 0) + finals.reduce((s, f) => s + f.xpReward, 0);
  const xpPct    = Math.min((xp / maxXp) * 100, 100);
  const level    = Math.floor(xp / 100) + 1;

  const handleLessonComplete = async (id: string, xpReward: number) => {
    if (completedLessons.includes(id)) return;
    setCompletedLessons(prev => [...prev, id]);
    setXp(prev => prev + xpReward);
    try {
      await supabase.from("progress").upsert({ lesson_id: id, completed: true, xp: xpReward });
    } catch { /* offline */ }
  };

  const handleFinalComplete = (tier: string, xpReward: number) => {
    setCompletedFinals(prev => [...prev, tier]);
    setXp(prev => prev + xpReward);
    setActiveFinal(null);
  };

  const openTutor = (title: string) => {
    setTutorLesson(title);
    setTutorOpen(true);
  };

  const tierStats = [
    { label: "Beginner",     done: beginnerDone,     total: beginnerLessons.length,     color: "#22c55e", locked: false             },
    { label: "Intermediate", done: intermediateDone, total: intermediateLessons.length, color: "#60a5fa", locked: !intermediateUnlocked },
    { label: "Advanced",     done: completedLessons.filter(id => advancedLessons.some(l => l.id === id)).length,
                                                     total: advancedLessons.length,     color: "#a78bfa", locked: !advancedUnlocked   },
  ];

  return (
    <div className="min-h-screen">

      {/* ══ HEADER ══════════════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(15,12,41,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
            >
              🧬
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold tracking-tight leading-none">BME Learn</h1>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Biomedical Engineering</p>
            </div>
          </div>

          {/* View Toggle */}
          <div
            className="flex gap-1 rounded-xl p-1"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {(["learn", "map"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                style={
                  view === v
                    ? { background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff" }
                    : { color: "rgba(255,255,255,0.45)" }
                }
              >
                {v === "learn" ? "📚 Learn" : "🗺️ Map"}
              </button>
            ))}
          </div>

          {/* XP */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs leading-none" style={{ color: "rgba(255,255,255,0.35)" }}>Level {level}</p>
              <p className="text-sm font-bold leading-tight" style={{ color: "#f093fb" }}>{xp} XP</p>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #f093fb, #667eea)" }}
            >
              {level}
            </div>
          </div>
        </div>

        {/* XP progress bar */}
        <div className="h-1 w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-1 xp-bar-fill" style={{ width: `${xpPct}%` }} />
        </div>
      </header>

      {/* ══ MAIN ════════════════════════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {view === "learn" ? (
          <>
            {/* Hero */}
            <div className="text-center mb-10">
              <span className="lesson-badge px-3 py-1.5 rounded-full text-white inline-block mb-4">
                Beginner → Intermediate → Advanced
              </span>
              <h2
                className="text-4xl font-extrabold mb-3"
                style={{
                  background: "linear-gradient(135deg, #fff 30%, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Master Biomedical Engineering
              </h2>
              <p className="text-base" style={{ color: "rgba(255,255,255,0.45)" }}>
                25 lessons · 125 quizzes · 3 final exams · concept mind map.
                Complete lessons, earn XP, and unlock the next tier.
              </p>
            </div>

            {/* Tier progress cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {tierStats.map(t => (
                <div
                  key={t.label}
                  className="glass rounded-2xl p-4"
                  style={{ opacity: t.locked ? 0.45 : 1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">{t.label}</span>
                    <span className="text-sm font-bold" style={{ color: t.color }}>
                      {t.done}/{t.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${(t.done / t.total) * 100}%`, background: t.color }}
                    />
                  </div>
                  {t.locked && (
                    <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                      🔒 Complete 70% of previous tier
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Tier Sections */}
            <TierSection
              tier="beginner"
              tierLessons={beginnerLessons}
              completedLessons={completedLessons}
              final={finals.find(f => f.tier === "beginner")!}
              finalCompleted={completedFinals.includes("beginner")}
              isLocked={false}
              onLessonComplete={handleLessonComplete}
              onFinalStart={() => setActiveFinal(finals.find(f => f.tier === "beginner")!)}
              openTutor={openTutor}
            />
            <TierSection
              tier="intermediate"
              tierLessons={intermediateLessons}
              completedLessons={completedLessons}
              final={finals.find(f => f.tier === "intermediate")!}
              finalCompleted={completedFinals.includes("intermediate")}
              isLocked={!intermediateUnlocked}
              onLessonComplete={handleLessonComplete}
              onFinalStart={() => setActiveFinal(finals.find(f => f.tier === "intermediate")!)}
              openTutor={openTutor}
            />
            <TierSection
              tier="advanced"
              tierLessons={advancedLessons}
              completedLessons={completedLessons}
              final={finals.find(f => f.tier === "advanced")!}
              finalCompleted={completedFinals.includes("advanced")}
              isLocked={!advancedUnlocked}
              onLessonComplete={handleLessonComplete}
              onFinalStart={() => setActiveFinal(finals.find(f => f.tier === "advanced")!)}
              openTutor={openTutor}
            />
          </>
        ) : (
          <MindMap
            lessons={lessons}
            completedLessons={completedLessons}
            onNodeClick={id => {
              setView("learn");
              setTimeout(() => {
                document.getElementById(`lesson-${id}`)?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 150);
            }}
          />
        )}
      </main>

      {/* ══ AI TUTOR FLOATING TAB ════════════════════════════════════════════════ */}
      {!tutorOpen && (
        <button
          className="fixed right-0 top-1/2 z-40 flex flex-col items-center gap-1.5 shadow-2xl transition-all hover:pr-1"
          onClick={() => setTutorOpen(true)}
          style={{
            transform: "translateY(-50%)",
            background: "linear-gradient(180deg, #667eea, #764ba2)",
            borderRadius: "12px 0 0 12px",
            padding: "14px 10px",
          }}
          title="Open AI Tutor"
        >
          <span style={{ fontSize: "20px" }}>🤖</span>
          <span
            style={{
              color: "#fff",
              fontSize: "9px",
              fontWeight: 800,
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            AI Tutor
          </span>
        </button>
      )}

      {/* ══ FINAL EXAM MODAL ═════════════════════════════════════════════════════ */}
      {activeFinal && (
        <FinalExamModal
          exam={activeFinal}
          onComplete={xpReward => handleFinalComplete(activeFinal.tier, xpReward)}
          onClose={() => setActiveFinal(null)}
        />
      )}

      {/* ══ AI TUTOR DRAWER ══════════════════════════════════════════════════════ */}
      {tutorOpen && (
        <AITutor lessonTitle={tutorLesson} onClose={() => setTutorOpen(false)} />
      )}
    </div>
  );
}
