import React, { useState } from "react";
import AITutor from "./AI Tutor";
import { supabase } from "../lib/supabaseClient";

interface Props {
  index: number;
  title: string;
  video?: string;
  content: string;
  keyIdea: string;
  example: string;
  question: string;
  options: string[];
  answer: number;
  completedLessons: string[];
  setCompletedLessons: Function;
  xp: number;
  setXp: Function;
}

const LessonCard = ({
  index,
  title,
  video,
  content,
  keyIdea,
  example,
  question,
  options,
  answer,
  completedLessons,
  setCompletedLessons,
  xp,
  setXp
}: Props) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState("");
  const [expanded, setExpanded] = useState(false);

  const isCompleted = completedLessons.includes(title);

  const completeLesson = async () => {
    setQuizCompleted(true);
    setXp(xp + 10);
    setCompletedLessons([...completedLessons, title]);
    await supabase.from("progress").upsert({ lesson: title, xp: 10 });
  };

  const handleQuiz = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === answer) {
      setResult("correct");
      completeLesson();
    } else {
      setResult("wrong");
    }
  };

  return (
    <div className={`glass p-6 flex flex-col gap-4 ${isCompleted ? 'ring-1 ring-green-400/30' : ''}`}>
      {/* Card Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
            {index + 1}
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight">{title}</h3>
            {isCompleted && <span className="completed-tag px-2 py-0.5 rounded-full mt-1 inline-block">✓ Completed</span>}
          </div>
        </div>
        <span className="lesson-badge px-2 py-1 rounded-full text-white">+10 XP</span>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed" style={{color: 'rgba(255,255,255,0.7)'}}>{content}</p>

      {/* Video - only show if video ID is provided */}
      {video && (
        <div className="rounded-xl overflow-hidden" style={{border: '1px solid rgba(255,255,255,0.1)'}}>
          <iframe
            className="w-full h-44"
            src={`https://www.youtube.com/embed/${video}`}
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Key Idea & Example */}
      <div className="grid grid-cols-1 gap-3">
        <div className="p-3 rounded-xl" style={{background: 'rgba(102,126,234,0.12)', border: '1px solid rgba(102,126,234,0.2)'}}>
          <p className="text-xs font-semibold mb-1" style={{color: '#a78bfa'}}>💡 Key Idea</p>
          <p className="text-sm" style={{color: 'rgba(255,255,255,0.75)'}}>{keyIdea}</p>
        </div>
        <div className="p-3 rounded-xl" style={{background: 'rgba(56,239,125,0.08)', border: '1px solid rgba(56,239,125,0.15)'}}>
          <p className="text-xs font-semibold mb-1" style={{color: '#38ef7d'}}>🌍 Real World Example</p>
          <p className="text-sm" style={{color: 'rgba(255,255,255,0.75)'}}>{example}</p>
        </div>
      </div>

      {/* Quiz */}
      {!isCompleted && (
        <div className="p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{color: '#a78bfa'}}>Quiz</p>
          <p className="text-sm font-medium mb-3">{question}</p>
          <div className="flex flex-col gap-2">
            {options.map((opt, i) => (
              <button
                key={i}
                className={`option-btn text-left px-4 py-2.5 rounded-xl text-sm font-medium ${
                  selected === i
                    ? i === answer ? 'option-correct' : 'option-wrong'
                    : ''
                }`}
                onClick={() => handleQuiz(i)}
              >
                <span className="mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            ))}
          </div>
          {result && (
            <p className={`mt-3 text-sm font-semibold ${result === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
              {result === 'correct' ? '✅ Correct! +10 XP earned!' : '❌ Not quite — try again!'}
            </p>
          )}
        </div>
      )}

      {isCompleted && (
        <div className="p-3 rounded-xl text-center" style={{background: 'rgba(56,239,125,0.1)', border: '1px solid rgba(56,239,125,0.2)'}}>
          <p className="text-sm font-semibold text-green-400">🎉 Lesson complete! You earned 10 XP</p>
        </div>
      )}

      {/* AI Tutor */}
      <AITutor lessonTitle={title} />
    </div>
  );
};

export default LessonCard;
