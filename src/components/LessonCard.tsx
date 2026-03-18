import React, { useState } from "react";
import AITutor from "./AITutor";
import { supabase } from "../lib/supabaseClient";

interface Props {
  title: string;
  video: string;
  content: string;
  keyIdea: string;
  example: string;
  completedLessons: string[];
  setCompletedLessons: Function;
  xp: number;
  setXp: Function;
  question: string;
  options: string[];
  answer: number;
}

const LessonCard = ({
  title, video, content, keyIdea, example,
  completedLessons, setCompletedLessons, xp, setXp,
  question, options, answer
}: Props) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState("");

  const completeLesson = async () => {
    setQuizCompleted(true);
    setXp(xp + 10);
    setCompletedLessons([...completedLessons, title]);

    await supabase.from("progress").upsert({
      lesson: title,
      xp: 10
    });
  };

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
    <div className="card">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{content}</p>
      <iframe className="w-full h-48 mt-2" src={`https://www.youtube.com/embed/${video}`} />
      <p><b>💡 Key Idea:</b> {keyIdea}</p>
      <p><b>🌍 Example:</b> {example}</p>

      {!quizCompleted && (
        <>
          <h4 className="mt-2 font-semibold">Quiz</h4>
          <p>{question}</p>
          {options.map((opt, i) => (
            <button key={i} className="mr-2 mt-1" onClick={() => handleQuiz(i)}>
              {opt}
            </button>
          ))}
          <p className="mt-1">{result}</p>
        </>
      )}

      <AITutor lessonTitle={title} />
    </div>
  );
};

export default LessonCard;
