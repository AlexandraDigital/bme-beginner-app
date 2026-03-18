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
}

const LessonCard = ({
  title, video, content, keyIdea, example,
  completedLessons, setCompletedLessons, xp, setXp
}: Props) => {
  const [quizCompleted, setQuizCompleted] = useState(false);

  const completeLesson = async () => {
    setQuizCompleted(true);
    setXp(xp + 10);
    setCompletedLessons([...completedLessons, title]);

    await supabase.from("progress").upsert({
      lesson: title,
      xp: 10
    });
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{content}</p>
      <iframe className="w-full h-48 mt-2" src={`https://www.youtube.com/embed/${video}`} />
      <p><b>💡 Key Idea:</b> {keyIdea}</p>
      <p><b>🌍 Example:</b> {example}</p>

      {!quizCompleted && (
        <button className="mt-2" onClick={completeLesson}>Complete Lesson (+10 XP)</button>
      )}

      <AITutor lessonTitle={title} />
    </div>
  );
};

export default LessonCard;
