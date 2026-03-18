import React, { useState, useEffect } from "react";
import LessonCard from "./components/LessonCard";
import Dashboard from "./components/Dashboard";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data } = await supabase.from("progress").select("*");
      if (data) {
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
        <LessonCard
          title="What is Biomedical Engineering?"
          video="WIqZjnmnyZA"
          content="Biomedical engineering combines medicine and engineering to improve health."
          keyIdea="It solves medical problems using technology."
          example="Prosthetic limbs help people walk again."
          completedLessons={completedLessons}
          setCompletedLessons={setCompletedLessons}
          xp={xp}
          setXp={setXp}
        />
        <LessonCard
          title="Biology Basics"
          video="8IlzKri08kk"
          content="The body is made of cells, tissues, and organs."
          keyIdea="Everything starts with cells."
          example="Muscle cells help you move."
          completedLessons={completedLessons}
          setCompletedLessons={setCompletedLessons}
          xp={xp}
          setXp={setXp}
        />
      </div>
    </div>
  );
}
