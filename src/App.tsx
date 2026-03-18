import React, { useState } from 'react';
import { lessons } from './lessons';
import { finals } from './finals';
import HomePage from './Components/HomePage';
import LessonCard from './Components/LessonCard';
import AITutor from './Components/AITutor';
import FinalExamModal from './Components/FinalExam';
import MindMap from './Components/MindMap';

type Page = 'home' | 'courses' | 'ai-tutor' | 'quiz' | 'mindmap';
type Tier = 'beginner' | 'intermediate' | 'advanced';

const GRID_SVG = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M0 0h1V40H0zM39 0h1V40H39zM0 0h40V1H0zM0 39h40v1H0z' fill='rgba(255,255,255,0.03)'/%3E%3C/g%3E%3C/svg%3E")`;

const tierConfig = {
  beginner: {
    label: '🟢 Beginner',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    unlock: 'Always unlocked',
  },
  intermediate: {
    label: '🔵 Intermediate',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/20',
    unlock: 'Complete 70% of Beginner',
  },
  advanced: {
    label: '🟣 Advanced',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500 to-violet-600',
    glow: 'shadow-purple-500/20',
    unlock: 'Complete 70% of Intermediate',
  },
};

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🧠' },
  { id: 'courses', label: 'Courses', icon: '📚' },
  { id: 'mindmap', label: 'Mind Map', icon: '🗺️' },
  { id: 'ai-tutor', label: 'AI Tutor', icon: '🤖' },
];

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [completedFinals, setCompletedFinals] = useState<Set<Tier>>(new Set());
  const [xp, setXp] = useState(0);
  const [activeFinal, setActiveFinal] = useState<Tier | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiTutorTopic, setAiTutorTopic] = useState('');

  const byTier = {
    beginner: lessons.filter((l) => l.tier === 'beginner'),
    intermediate: lessons.filter((l) => l.tier === 'intermediate'),
    advanced: lessons.filter((l) => l.tier === 'advanced'),
  };

  const tierProgress = (tier: Tier) => {
    const total = byTier[tier].length;
    const done = byTier[tier].filter((l) => completedLessons.has(l.id)).length;
    return total > 0 ? (done / total) * 100 : 0;
  };

  const tierUnlocked = (tier: Tier): boolean => {
    if (tier === 'beginner') return true;
    if (tier === 'intermediate') return tierProgress('beginner') >= 70;
    if (tier === 'advanced') return tierProgress('intermediate') >= 70;
    return false;
  };

  const handleLessonComplete = (lessonId: string, earnedXp: number) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
    setXp((prev) => prev + earnedXp);
  };

  const handleFinalComplete = (tier: Tier, score: number) => {
    setCompletedFinals((prev) => new Set([...prev, tier]));
    const bonusXp = tier === 'beginner' ? 100 : tier === 'intermediate' ? 200 : 300;
    setXp((prev) => prev + Math.round((score / 100) * bonusXp));
    setActiveFinal(null);
  };

  const handleAskTutor = (topic: string) => {
    setAiTutorTopic(topic);
    setPage('ai-tutor');
  };

  const totalLessons = lessons.length;
  const doneCount = completedLessons.size;
  const overallProgress = totalLessons > 0 ? (doneCount / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#060b18] text-white" style={{ backgroundImage: GRID_SVG }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => setPage('home')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/>
                  <path d="M6.453 15h11.094"/>
                  <path d="M8.5 2h7"/>
                </svg>
              </div>
              <div>
                <span className="text-white font-semibold tracking-tight">BioMed</span>
                <span className="text-cyan-400 font-semibold tracking-tight">AI</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all ${
                    page === item.id
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-inner'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* XP + Start Learning */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-yellow-400 text-sm">⚡</span>
                <span className="text-white text-sm font-semibold">{xp} XP</span>
              </div>
              <button
                onClick={() => setPage('courses')}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
              >
                Start Learning →
              </button>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0a0f1e] px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all text-left ${
                  page === item.id ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 py-2 text-yellow-400 text-sm font-semibold">
              ⚡ {xp} XP
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="pt-16">
        {/* Home */}
        {page === 'home' && <HomePage onNavigate={(p) => setPage(p as Page)} />}

        {/* AI Tutor */}
        {page === 'ai-tutor' && (
          <AITutor initialTopic={aiTutorTopic} onClose={() => setPage('courses')} />
        )}

        {/* Mind Map */}
        {page === 'mindmap' && (
          <MindMap lessons={lessons} completedLessons={completedLessons} onSelectLesson={(id) => {
            setPage('courses');
          }} />
        )}

        {/* Courses */}
        {page === 'courses' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            {/* Final Exam overlay — FinalExamModal renders its own fixed backdrop */}
            {activeFinal && finals.find((f) => f.tier === activeFinal) && (
              <FinalExamModal
                exam={finals.find((f) => f.tier === activeFinal)!}
                onComplete={(xp) => {
                  setCompletedFinals((prev) => new Set([...prev, activeFinal!]));
                  setXp((prev) => prev + xp);
                  setActiveFinal(null);
                }}
                onClose={() => setActiveFinal(null)}
              />
            )}

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Your Courses</h1>
              <p className="text-gray-400">Progress through Beginner → Intermediate → Advanced</p>
              {/* Overall progress */}
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 rounded-full"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {doneCount}/{totalLessons} lessons · {xp} XP
                </span>
              </div>
            </div>

            {/* Tier sections */}
            {(['beginner', 'intermediate', 'advanced'] as Tier[]).map((tier) => {
              const config = tierConfig[tier];
              const unlocked = tierUnlocked(tier);
              const progress = tierProgress(tier);
              const tierLessons = byTier[tier];
              const finalDone = completedFinals.has(tier);

              return (
                <div key={tier} className="mb-12">
                  {/* Tier header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.color} ${config.border}`}>
                        {config.label}
                      </div>
                      {!unlocked && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          🔒 {config.unlock}
                        </span>
                      )}
                    </div>
                    <span className={`text-sm ${config.color}`}>{Math.round(progress)}%</span>
                  </div>

                  {/* Tier progress bar */}
                  <div className="h-1.5 rounded-full bg-white/10 mb-6 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${config.gradient} transition-all duration-500 rounded-full`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Lesson grid */}
                  <div className={`grid gap-4 ${unlocked ? '' : 'opacity-40 pointer-events-none'}`}>
                    {tierLessons.map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        isCompleted={completedLessons.has(lesson.id)}
                        tier={tier}
                        tierConfig={config}
                        onComplete={handleLessonComplete}
                        onAskTutor={handleAskTutor}
                      />
                    ))}
                  </div>

                  {/* Final Exam CTA */}
                  {unlocked && progress >= 70 && (
                    <div className={`mt-6 p-5 rounded-2xl border ${config.border} bg-gradient-to-r from-white/[0.03] to-white/[0.01] flex items-center justify-between`}>
                      <div>
                        <div className={`text-sm font-semibold ${config.color} mb-0.5`}>
                          {finalDone ? '✅ Final Exam Passed!' : `🎓 ${tier.charAt(0).toUpperCase() + tier.slice(1)} Final Exam`}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {finalDone ? 'Well done! Move on to the next tier.' : '10 questions · Earn bonus XP'}
                        </div>
                      </div>
                      {!finalDone && (
                        <button
                          onClick={() => setActiveFinal(tier)}
                          className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${config.gradient} text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg ${config.glow}`}
                        >
                          Take Exam →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
