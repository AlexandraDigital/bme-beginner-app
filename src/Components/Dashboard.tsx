import React from "react";

interface Props {
  completedLessons: string[];
  totalLessons: number;
  xp: number;
}

const Dashboard = ({ completedLessons, totalLessons, xp }: Props) => {
  const percent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="glass p-6">
      <h2 className="text-lg font-bold mb-5" style={{color: 'rgba(255,255,255,0.9)'}}>Your Progress</h2>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="text-center p-4 rounded-xl" style={{background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.3)'}}>
          <p className="text-3xl font-extrabold" style={{color: '#667eea'}}>{completedLessons.length}</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.5)'}}>Completed</p>
        </div>
        <div className="text-center p-4 rounded-xl" style={{background: 'rgba(240,147,251,0.15)', border: '1px solid rgba(240,147,251,0.3)'}}>
          <p className="text-3xl font-extrabold" style={{color: '#f093fb'}}>{xp}</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.5)'}}>Total XP</p>
        </div>
        <div className="text-center p-4 rounded-xl" style={{background: 'rgba(56,239,125,0.15)', border: '1px solid rgba(56,239,125,0.3)'}}>
          <p className="text-3xl font-extrabold" style={{color: '#38ef7d'}}>{percent}%</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.5)'}}>Complete</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1" style={{color: 'rgba(255,255,255,0.5)'}}>
          <span>Course Progress</span>
          <span>{completedLessons.length}/{totalLessons} lessons</span>
        </div>
        <div className="h-2 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}>
          <div className="h-2 rounded-full xp-bar-fill" style={{width: `${percent}%`}}></div>
        </div>
      </div>

      {completedLessons.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {completedLessons.map((l, i) => (
            <span key={i} className="completed-tag px-2 py-1 rounded-full">✓ {l}</span>
          ))}
        </div>
      )}

      {completedLessons.length === 0 && (
        <p className="text-sm" style={{color: 'rgba(255,255,255,0.4)'}}>Complete your first lesson to start tracking progress!</p>
      )}
    </div>
  );
};

export default Dashboard;
