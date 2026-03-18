import React, { useState } from 'react';

interface Quiz {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface Lesson {
  id: string;
  title: string;
  tier: string;
  description: string;
  keyIdea: string;
  example: string;
  quizzes: Quiz[];
  video?: string;
}

interface TierConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
  gradient: string;
  glow: string;
}

interface Props {
  lesson: Lesson;
  isCompleted: boolean;
  tier: string;
  tierConfig: TierConfig;
  onComplete: (lessonId: string, xp: number) => void;
  onAskTutor: (topic: string) => void;
}

export default function LessonCard({ lesson, isCompleted, tier, tierConfig, onComplete, onAskTutor }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizzes = lesson.quizzes || [];
  const quiz = quizzes[currentQuiz];

  const xpReward = tier === 'beginner' ? 10 : tier === 'intermediate' ? 20 : 30;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === quiz.answer) {
      setQuizScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz((q) => q + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      if (!isCompleted) {
        onComplete(lesson.id, xpReward);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelected(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizComplete(false);
  };

  return (
    <div className={`rounded-2xl border bg-white/[0.03] backdrop-blur-sm transition-all duration-300 ${
      isCompleted
        ? `${tierConfig.border} bg-gradient-to-br from-white/[0.05] to-white/[0.02]`
        : 'border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
    }`}>
      {/* Card header */}
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Completion indicator */}
          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border ${
            isCompleted
              ? `bg-gradient-to-br ${tierConfig.gradient} border-transparent`
              : 'border-white/20'
          }`}>
            {isCompleted && <span className="text-white text-xs">✓</span>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-white font-semibold text-base">{lesson.title}</h3>
              {isCompleted && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${tierConfig.bg} ${tierConfig.color} border ${tierConfig.border}`}>
                  +{xpReward} XP ✓
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm line-clamp-2">{lesson.description}</p>
          </div>
        </div>
        <div className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          {/* Video */}
          {lesson.video && (
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${lesson.video}`}
                title={lesson.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}

          {/* Key Idea */}
          <div className={`rounded-xl p-4 border ${tierConfig.border} bg-gradient-to-r from-white/[0.03] to-white/[0.01]`}>
            <div className={`text-xs font-semibold ${tierConfig.color} mb-1.5 flex items-center gap-1.5`}>
              <span>💡</span> Key Idea
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">{lesson.keyIdea}</p>
          </div>

          {/* Example */}
          <div className="rounded-xl p-4 border border-white/10 bg-white/[0.02]">
            <div className="text-xs font-semibold text-orange-400 mb-1.5 flex items-center gap-1.5">
              <span>🔬</span> Real-World Example
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{lesson.example}</p>
          </div>

          {/* Ask AI Tutor */}
          <button
            onClick={() => onAskTutor(lesson.title)}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-gray-300 hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-all"
          >
            <span>🤖</span>
            Ask AI Tutor about "{lesson.title}"
            <span className="ml-auto text-gray-500">→</span>
          </button>

          {/* Quiz section */}
          {quizzes.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>🧪</span> Quiz
                </span>
                {!quizComplete && (
                  <span className="text-xs text-gray-500">
                    {currentQuiz + 1} / {quizzes.length}
                  </span>
                )}
              </div>

              {quizComplete ? (
                <div className="p-5 text-center">
                  <div className="text-4xl mb-3">{quizScore === quizzes.length ? '🏆' : quizScore >= quizzes.length * 0.7 ? '🎉' : '📚'}</div>
                  <div className="text-white font-semibold text-lg mb-1">
                    {quizScore}/{quizzes.length} correct
                  </div>
                  <div className="text-gray-400 text-sm mb-4">
                    {quizScore === quizzes.length
                      ? 'Perfect score! Outstanding!'
                      : quizScore >= quizzes.length * 0.7
                      ? 'Great job! Lesson complete.'
                      : 'Keep studying — you got this!'}
                  </div>
                  <button
                    onClick={resetQuiz}
                    className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${tierConfig.gradient} text-white text-sm font-medium hover:opacity-90 transition-all`}
                  >
                    Retake Quiz
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {/* Quiz progress bar */}
                  <div className="h-1 rounded-full bg-white/10 mb-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${tierConfig.gradient} transition-all`}
                      style={{ width: `${((currentQuiz) / quizzes.length) * 100}%` }}
                    />
                  </div>

                  <p className="text-white text-sm font-medium leading-relaxed">{quiz.question}</p>

                  <div className="space-y-2 mt-3">
                    {quiz.options.map((opt, i) => {
                      const isSelected = selected === i;
                      const isCorrect = i === quiz.answer;
                      let style = 'border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]';
                      if (selected !== null) {
                        if (isCorrect) style = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300';
                        else if (isSelected) style = 'border-red-500/50 bg-red-500/10 text-red-300';
                        else style = 'border-white/5 bg-white/[0.01] text-gray-500';
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={selected !== null}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${style}`}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                          {selected !== null && isCorrect && <span className="float-right">✅</span>}
                          {selected !== null && isSelected && !isCorrect && <span className="float-right">❌</span>}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && quiz.explanation && (
                    <div className="mt-2 p-3 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 text-xs leading-relaxed">
                      <span className="text-cyan-400 font-semibold">💬 </span>
                      {quiz.explanation}
                    </div>
                  )}

                  {selected !== null && (
                    <button
                      onClick={handleNext}
                      className={`w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r ${tierConfig.gradient} text-white text-sm font-medium hover:opacity-90 transition-all`}
                    >
                      {currentQuiz < quizzes.length - 1 ? 'Next Question →' : 'Finish Quiz ✓'}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
