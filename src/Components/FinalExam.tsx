import React, { useState } from "react";
import { FinalExam } from "../finals";

interface Props {
  exam: FinalExam;
  onComplete: (xp: number) => void;
  onClose: () => void;
}

const TIER_COLORS: Record<string, string> = {
  beginner:     "#22c55e",
  intermediate: "#60a5fa",
  advanced:     "#a78bfa",
};

export default function FinalExamModal({ exam, onComplete, onClose }: Props) {
  const [current,  setCurrent]  = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score,    setScore]    = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers,  setAnswers]  = useState<(number | null)[]>(
    Array(exam.questions.length).fill(null)
  );

  const tc   = TIER_COLORS[exam.tier];
  const q    = exam.questions[current];
  const isLast = current === exam.questions.length - 1;
  const pct    = finished ? Math.round((score / exam.questions.length) * 100) : 0;
  const passed = finished && pct >= exam.passingScore;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
    if (idx === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setAnswers(Array(exam.questions.length).fill(null));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #141037 0%, #0f0c29 100%)",
          border: `1px solid ${tc}44`,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: `${tc}0d` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${tc}22`, color: tc }}
                >
                  {exam.tier.toUpperCase()} FINAL EXAM
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{exam.title}</h2>
              {!finished && (
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {exam.description.slice(0, 90)}…
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!finished ? (
            <>
              {/* Progress bar + dots */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">
                  Question {current + 1} / {exam.questions.length}
                </span>
                <div className="flex gap-1.5">
                  {exam.questions.map((qx, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full transition-all"
                      style={{
                        background:
                          answers[i] !== null
                            ? answers[i] === qx.answer
                              ? "#22c55e"
                              : "#ef4444"
                            : i === current
                            ? tc
                            : "rgba(255,255,255,0.12)",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                className="h-1.5 rounded-full mb-5"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${(current / exam.questions.length) * 100}%`,
                    background: tc,
                  }}
                />
              </div>

              {/* Question */}
              <p className="text-base font-semibold text-white mb-4">{q.question}</p>

              {/* Options */}
              <div className="flex flex-col gap-2.5 mb-4">
                {q.options.map((opt, idx) => {
                  let style: React.CSSProperties = {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.8)",
                  };
                  if (answered) {
                    if (idx === q.answer)
                      style = {
                        background: "rgba(34,197,94,0.15)",
                        border: "1px solid rgba(34,197,94,0.4)",
                        color: "#fff",
                      };
                    else if (idx === selected)
                      style = {
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.4)",
                        color: "#fff",
                      };
                  }
                  return (
                    <button
                      key={idx}
                      className="w-full px-4 py-3 rounded-xl text-sm text-left font-medium transition-all"
                      style={style}
                      onClick={() => handleAnswer(idx)}
                      disabled={answered}
                    >
                      <span className="opacity-40 mr-2">{["A", "B", "C", "D"][idx]}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation + Next */}
              {answered && (
                <>
                  <div
                    className="rounded-xl p-3 mb-4"
                    style={{
                      background:
                        selected === q.answer
                          ? "rgba(34,197,94,0.1)"
                          : "rgba(239,68,68,0.1)",
                      border: `1px solid ${
                        selected === q.answer
                          ? "rgba(34,197,94,0.3)"
                          : "rgba(239,68,68,0.3)"
                      }`,
                    }}
                  >
                    <p
                      className="text-xs font-bold mb-1"
                      style={{ color: selected === q.answer ? "#22c55e" : "#ef4444" }}
                    >
                      {selected === q.answer ? "✓ Correct!" : "✗ Incorrect"}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {q.explanation}
                    </p>
                  </div>
                  <button
                    className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${tc}, ${tc}99)`,
                      boxShadow: `0 4px 15px ${tc}33`,
                    }}
                    onClick={handleNext}
                  >
                    {isLast ? "View Results →" : "Next Question →"}
                  </button>
                </>
              )}
            </>
          ) : (
            /* ── Results Screen ── */
            <div className="text-center py-4">
              <div className="text-5xl mb-4">{passed ? "🏆" : "📚"}</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {passed ? "Congratulations!" : "Keep Studying!"}
              </h3>
              <p className="text-3xl font-bold mb-1" style={{ color: tc }}>
                {score}/{exam.questions.length}
              </p>
              <p className="text-lg font-semibold mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                {pct}% · {passed ? "Passed! 🎉" : `Need ${exam.passingScore}% to pass`}
              </p>
              {passed && (
                <p className="text-sm mb-3" style={{ color: "#a78bfa" }}>
                  +{exam.xpReward} XP unlocked
                </p>
              )}

              {/* Answer review dots */}
              <div className="flex justify-center gap-2 mb-6 flex-wrap">
                {exam.questions.map((qx, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full"
                    title={`Q${i + 1}: ${answers[i] === qx.answer ? "Correct" : "Wrong"}`}
                    style={{
                      background: answers[i] === qx.answer ? "#22c55e" : "#ef4444",
                    }}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onClick={onClose}
                >
                  Close
                </button>
                {passed ? (
                  <button
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${tc}, ${tc}99)`,
                      boxShadow: `0 4px 15px ${tc}33`,
                    }}
                    onClick={() => onComplete(exam.xpReward)}
                  >
                    🎉 Claim {exam.xpReward} XP
                  </button>
                ) : (
                  <button
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${tc}, ${tc}99)` }}
                    onClick={reset}
                  >
                    Try Again →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
