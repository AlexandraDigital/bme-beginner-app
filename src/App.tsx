import React, { useState, useEffect } from "react";
import LessonCard from "./Components/LessonCard";
import { lessons } from "./lessons";
import Dashboard from "./Components/Dashboard";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [xp, setXp] = useState(0);

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

  const maxXp = lessons.length * 10;
  const xpPercent = Math.min((xp / maxXp) * 100, 100);
  const level = Math.floor(xp / 50) + 1;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50" style={{background: 'rgba(15,12,41,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
              🧬
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">BME Learn</h1>
              <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>Biomedical Engineering</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>Level {level}</p>
              <p className="text-sm font-bold" style={{color: '#f093fb'}}>{xp} XP</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{background: 'linear-gradient(135deg, #f093fb, #667eea)'}}>
              {level}
            </div>
          </div>
        </div>
        {/* XP Bar */}
        <div className="h-1 w-full" style={{background: 'rgba(255,255,255,0.1)'}}>
          <div className="h-1 xp-bar-fill" style={{width: `${xpPercent}%`}}></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="lesson-badge px-3 py-1 rounded-full text-white inline-block mb-4">Beginner Course</span>
          <h2 className="text-4xl font-extrabold mb-3" style={{background: 'linear-gradient(135deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Master Biomedical Engineering
          </h2>
          <p className="text-lg" style={{color: 'rgba(255,255,255,0.55)'}}>Learn the fundamentals through interactive lessons, quizzes, and AI-powered guidance.</p>
        </div>

        {/* Dashboard */}
        <Dashboard completedLessons={completedLessons} totalLessons={lessons.length} xp={xp} />

        {/* Lessons */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6" style={{color: 'rgba(255,255,255,0.85)'}}>📚 Course Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson, i) => (
              <LessonCard
                key={i}
                index={i}
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
      </main>
    </div>
  );
}
