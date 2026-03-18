import React from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const GRID_SVG = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M0 0h1V40H0zM39 0h1V40H39zM0 0h40V1H0zM0 39h40v1H0z' fill='rgba(255,255,255,0.03)'/%3E%3C/g%3E%3C/svg%3E")`;

const categories = [
  { name: 'Medical Imaging', color: 'from-cyan-500 to-blue-600', icon: '🩻' },
  { name: 'Biomechanics', color: 'from-emerald-500 to-teal-600', icon: '🦴' },
  { name: 'Tissue Engineering', color: 'from-purple-500 to-violet-600', icon: '🧬' },
  { name: 'Neural Engineering', color: 'from-blue-500 to-indigo-600', icon: '🧠' },
  { name: 'Biosensors & Devices', color: 'from-orange-500 to-red-600', icon: '📡' },
  { name: 'Bioinformatics', color: 'from-pink-500 to-rose-600', icon: '💻' },
  { name: 'Rehab Engineering', color: 'from-yellow-500 to-amber-600', icon: '🦾' },
];

const featuredModules = [
  {
    level: 'Intermediate',
    levelColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    title: 'Medical Imaging',
    description: 'Explore the physics and engineering behind MRI, CT, X-ray, PET, and ultrasound imaging systems used in modern diagnostics.',
    lessons: 6,
    hours: 8,
    gradient: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/20',
    icon: '🩻',
  },
  {
    level: 'Intermediate',
    levelColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    title: 'Biomechanics',
    description: 'Study the mechanical principles governing biological systems — from bone fracture mechanics to joint kinematics and gait analysis.',
    lessons: 5,
    hours: 7,
    gradient: 'from-emerald-500/20 to-teal-600/20',
    border: 'border-emerald-500/20',
    icon: '🦴',
  },
  {
    level: 'Advanced',
    levelColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    title: 'Tissue Engineering',
    description: 'Learn how engineers create living tissues and organs by combining cells, scaffolds, and growth factors to repair or replace damaged biological structures.',
    lessons: 5,
    hours: 9,
    gradient: 'from-purple-500/20 to-violet-600/20',
    border: 'border-purple-500/20',
    icon: '🧬',
  },
];

const features = [
  {
    icon: '🤖',
    title: 'AI Tutor',
    description: 'Ask anything about biomedical engineering and get instant, detailed explanations powered by AI.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: '📚',
    title: 'Structured Courses',
    description: '3 tiers covering every major BME discipline — Beginner, Intermediate, and Advanced — with rich lesson content.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: '🧪',
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with 125+ questions and detailed explanations for each answer.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: '⚡',
    title: 'Instant Feedback',
    description: 'Know immediately whether you answered correctly, with explanations to deepen understanding.',
    color: 'from-orange-500 to-red-600',
  },
];

const allTopics = [
  'MRI Physics', 'CT Reconstruction', 'Ultrasound Imaging', 'PET/SPECT',
  'Bone Mechanics', 'Joint Biomechanics', 'Gait Analysis', 'Prosthetics',
  'Stem Cells', 'Bioprinting', 'Scaffolds', 'Organoids',
  'Neural Electrodes', 'BCIs', 'DBS Therapy', 'Cochlear Implants',
  'Glucose Biosensors', 'Wearable Monitors', 'FDA Regulation', 'Lab-on-Chip',
  'Genomics', 'Protein Folding', 'CRISPR', 'Bioreactors',
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#060b18] via-[#0d1832] to-[#060b18]" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: GRID_SVG }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-6">
            <span className="text-xs">⭐</span>
            AI-Powered Biomedical Engineering Learning Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Master </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Biomedical
            </span>
            <br />
            <span className="text-white">Engineering</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Explore MRI physics, tissue engineering, neural BCIs, biosensors, and more —
            guided by an AI tutor that answers your questions in real time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate('courses')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
            >
              Explore Courses →
            </button>
            <button
              onClick={() => onNavigate('ai-tutor')}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all hover:border-white/20"
            >
              🤖 Talk to AI Tutor
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onNavigate('courses')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 hover:text-white transition-all"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '25', label: 'Lessons' },
            { value: '125+', label: 'Quiz Questions' },
            { value: '3', label: 'Final Exams' },
            { value: '3', label: 'Difficulty Tiers' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Modules */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Modules</h2>
            <p className="text-gray-400">Start your journey with these popular courses</p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
          >
            View all →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredModules.map((mod) => (
            <div
              key={mod.title}
              className={`relative rounded-2xl border ${mod.border} bg-gradient-to-br ${mod.gradient} backdrop-blur-sm p-6 hover:scale-[1.02] transition-all cursor-pointer group`}
              onClick={() => onNavigate('courses')}
            >
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium mb-4 ${mod.levelColor}`}>
                {mod.level}
              </div>
              <div className="text-3xl mb-3">{mod.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{mod.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{mod.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📖 {mod.lessons} lessons</span>
                <span>⏱ {mod.hours} hours</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('courses')}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm"
          >
            View all courses →
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-white/5 bg-white/[0.01] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Everything you need to become proficient in biomedical engineering</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.05] transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-600/10" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: GRID_SVG }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join the Next Generation</h2>
          <p className="text-gray-400 text-lg mb-4">
            <span className="text-white font-semibold">The Future of Medicine Needs Engineers</span>
          </p>
          <p className="text-gray-400 mb-8">
            Biomedical engineering bridges medicine and technology — from AI diagnostics to bionic limbs. Start building your expertise today.
          </p>
          <button
            onClick={() => onNavigate('courses')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 hover:scale-105"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">All Topics Covered</h2>
          <p className="text-gray-400 text-center mb-10">Deep dives into every major biomedical engineering discipline</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {allTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 hover:text-white transition-all cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
