import React, { useState } from "react";
import { Lesson } from "../lessons";

interface Props {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: (id: string, xp: number) => void;
  openTutor: (title: string) => void;
}

const TIER_COLORS = {
  beginner:     { color: "#22c55e", bg: "rgba(34,197,94,0.12)",    border: "rgba(34,197,94,0.3)"    },
  intermediate: { color: "#60a5fa", bg: "rgba(96,165,250,0.12)",   border: "rgba(96,165,250,0.3)"   },
  advanced:     { color: "#a78bfa", bg: "rgba(167,139,250,0.12)",  border: "rgba(167,139,250,0.3)"  },
};

export default function LessonCard({ lesson, isCompleted, onComplete, openTutor }: Props) {
  const [expanded, setExpanded]       = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selected, setSelected]       = useState<number | null>(null);
  const [answered, setAnswered]       = useState(false);

  const tc       = TIER_COLORS[lesson.tier];
  const quiz     = lesson.quizzes[currentQuiz];
  const isLastQ  = currentQuiz === lesson.quizzes.length - 1;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
  };

  const handleNext = () => {
    if (isLastQ) {
      onComplete(lesson.id, lesson.xpReward);
      setQuizStarted(false);
      setCurrentQuiz(0);
      setSelected(null);
      setAnswered(false);
    } else {
      setCurrentQuiz(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuiz(0);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div
      id={`lesson-${lesson.id}`}
      className="glass rounded-2xl transition-all duration-300"
      style={{
        border: isCompleted ? `1px solid ${tc.border}` : "1px solid rgba(255,255,255,0.1)",
        boxShadow: isCompleted ? `0 0 20px ${tc.color}18` : "none",
      }}
    >
      {/* ── Card Header ── */}
      <button
        className="w-full p-5 text-left flex items-start gap-4"
        onClick={() => setExpanded(e => !e)}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: tc.bg, border: `1px solid ${tc.border}` }}
        >
          {lesson.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: tc.bg, color: tc.color }}
            >
              {lesson.tier}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              {lesson.subject}
            </span>
            {isCompleted && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
              >
                ✓ Done
              </span>
            )}
          </div>
          <h3 className="font-bold text-white text-base leading-snug">{lesson.title}</h3>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            {lesson.quizzes.length} quizzes · +{lesson.xpReward} XP
          </p>
        </div>

        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>
          {expanded ? "▴" : "▾"}
        </span>
      </button>

      {/* ── Expanded Body ── */}
      {expanded && (
        <div className="px-5 pb-5">
          {/* Description */}
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            {lesson.description}
          </p>

          {/* Video */}
          {lesson.video && (
            <div
              className="mb-4 rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${lesson.video}`}
                title={lesson.title}
                allowFullScreen
                style={{ border: "none", display: "block" }}
              />
            </div>
          )}

          {/* Key Idea */}
          <div
            className="rounded-xl p-4 mb-3"
            style={{
              background: "rgba(102,126,234,0.12)",
              border: "1px solid rgba(102,126,234,0.25)",
            }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#667eea" }}>
              💡 KEY IDEA
            </p>
            <p className="text-sm font-medium text-white">{lesson.keyIdea}</p>
          </div>

          {/* BME Example */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "rgba(240,147,251,0.1)",
              border: "1px solid rgba(240,147,251,0.2)",
            }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#f093fb" }}>
              🔬 BME EXAMPLE
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              {lesson.example}
            </p>
          </div>

          {/* Connected Concepts */}
          {lesson.connections.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                🔗 CONNECTS TO
              </p>
              <div className="flex flex-wrap gap-2">
                {lesson.connections.map(conn => (
                  <span
                    key={conn}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {conn.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Quiz Section ── */}
          {isCompleted ? (
            <div
              className="rounded-2xl p-4 text-center mb-3"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
              }}
            >
              <p className="text-2xl mb-1">🎉</p>
              <p className="font-bold text-white">Lesson Complete!</p>
              <p className="text-sm mt-0.5" style={{ color: "#22c55e" }}>
                +{lesson.xpReward} XP earned
              </p>
            </div>
          ) : !quizStarted ? (
            <button
              className="glow-btn w-full py-3 rounded-xl text-sm font-bold text-white mb-3"
              onClick={startQuiz}
            >
              🧠 Take Quiz ({lesson.quizzes.length} questions)
            </button>
          ) : (
            <div
              className="rounded-2xl p-4 mb-3"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Progress dots */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Question {currentQuiz + 1} / {lesson.quizzes.length}
                </span>
                <div className="flex gap-1.5">
                  {lesson.quizzes.map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background:
                          i < currentQuiz
                            ? "#22c55e"
                            : i === currentQuiz
                            ? "#667eea"
                            : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <p className="text-sm font-semibold text-white mb-3">{quiz.question}</p>

              {/* Options */}
              <div className="flex flex-col gap-2 mb-3">
                {quiz.options.map((opt, idx) => {
                  let cls = "option-btn";
                  if (answered) {
                    if (idx === quiz.answer) cls = "option-correct";
                    else if (idx === selected) cls = "option-wrong";
                  }
                  return (
                    <button
                      key={idx}
                      className={`${cls} w-full px-4 py-2.5 rounded-xl text-sm text-left text-white font-medium`}
                      onClick={() => handleAnswer(idx)}
                      disabled={answered}
                    >
                      <span className="opacity-50 mr-2">{["A", "B", "C", "D"][idx]}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation + Next */}
              {answered && (
                <>
                  <div
                    className="rounded-xl p-3 mb-3"
                    style={{
                      background:
                        selected === quiz.answer
                          ? "rgba(34,197,94,0.1)"
                          : "rgba(239,68,68,0.1)",
                      border: `1px solid ${
                        selected === quiz.answer
                          ? "rgba(34,197,94,0.35)"
                          : "rgba(239,68,68,0.35)"
                      }`,
                    }}
                  >
                    <p
                      className="text-xs font-bold mb-1"
                      style={{ color: selected === quiz.answer ? "#22c55e" : "#ef4444" }}
                    >
                      {selected === quiz.answer ? "✓ Correct!" : "✗ Not quite!"}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {quiz.explanation}
                    </p>
                  </div>
                  <button
                    className="glow-btn w-full py-2.5 rounded-xl text-sm font-bold text-white"
                    onClick={handleNext}
                  >
                    {isLastQ ? "🎉 Complete Lesson" : "Next Question →"}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Ask AI Tutor */}
          <button
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-80"
            style={{
              background: "rgba(102,126,234,0.15)",
              border: "1px solid rgba(102,126,234,0.25)",
            }}
            onClick={() => openTutor(lesson.title)}
          >
            🤖 Ask AI Tutor about this lesson
          </button>
        </div>
      )}
    </div>
  );
}
