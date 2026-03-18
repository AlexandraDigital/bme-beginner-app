import React, { useState, useEffect } from "react";
import LessonCard from "./Components/LessonCard";
import { lessons } from "./lessons";
import Dashboard from "./Components/Dashboard";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [xp, setXp] = useState(0);

  // Load progress from Supabase on mount
  useEffect(() => {
    const fetchProgress = async () => {
      const { data, error } = await supabase.from("progress").select("*");
      if (error) {
        console.error("Supabase error:", error);
      } else {
        setCompletedLessons(data.map((d: any) => d.lesson));
        setXp(data.reduce((sum: number, d: any) => sum + (d.xp || 0), 0));
      }
    };
    fetchProgress();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">🧠 BME Beginner Learning App</h1>
      <p className="mb-5 text-lg">⭐ XP: {xp}</p>

      <Dashboard completedLessons={completedLessons} />

      <h2 className="text-2xl font-semibold mt-8 mb-3">Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson, i) => (
          <LessonCard
            key={i}
            title={lesson.title}
            video={lesson.video}
            content={lesson.content}
            keyIdea={lesson.key}
            example={lesson.example}
            question={lesson.question}
            options={lesson.options}
            answer={lesson.answer}
            completedLessons={completedLessons}
            setCompletedLessons={setCompletedLessons}
            xp={xp}
            setXp={setXp}
          />
        ))}
      </div>
    </div>
  );
}
