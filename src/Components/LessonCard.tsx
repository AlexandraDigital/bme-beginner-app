import React, { useState } from "react";
import AITutor from "./AI Tutor";
import { supabase } from "../lib/supabaseClient";

// ✅ Props interface defines everything LessonCard needs
interface Props {
  title: string;
  video: string;
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

  // ✅ Function to mark lesson as complete and update XP + Supabase
  const completeLesson = async () => {
    setQuizCompleted(true);
    setXp(xp + 10);
    setCompletedLessons([...completedLessons, title]);

    // Save to Supabase progress table
    await supabase.from("progress").upsert({
      lesson: title,
      xp: 10
    });
  };

  // ✅ Function to handle quiz answers
  const handleQuiz = (i: number) => {
    setSelected(i);
    if (i === answer) {
      setResult("✅ Correct!");
      completeLesson();
    } else {
      setResult("❌ Try again!");
    }
  };

  return (
    <div className="card p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{content}</p>

      <iframe
        className="w-full h-48 mt-2"
        src={`https://www.youtube.com/embed/${video}`}
        allowFullScreen
      ></iframe>

      <p><b>💡 Key Idea:</b> {keyIdea}</p>
      <p><b>🌍 Example:</b> {example}</p>

      {/* ✅ Quiz Section */}
      {!quizCompleted && (
        <>
          <h4 className="mt-2 font-semibold">Quiz</h4>
          <p>{question}</p>
          {options.map((opt, i) => (
            <button
              key={i}
              className="mr-2 mt-1 px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => handleQuiz(i)}
            >
              {opt}
            </button>
          ))}
          <p className="mt-1">{result}</p>
        </>
      )}

      {/* ✅ AI Tutor Section */}
      <AITutor lessonTitle={title} />
    </div>
  );
};

export default LessonCard;
