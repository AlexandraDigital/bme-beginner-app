import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  initialTopic?: string;
  onClose?: () => void;
}

const SUGGESTED_QUESTIONS = [
  'What is biomedical engineering?',
  'How does an MRI machine work?',
  'What is tissue engineering?',
  'Explain neural interfaces (BCIs)',
  'How are biosensors used in medicine?',
  'What math do I need for BME?',
  'What is biomechanics?',
  'How does CRISPR work?',
];

function generateResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('mri') || q.includes('magnetic resonance')) {
    return `**MRI (Magnetic Resonance Imaging)** works by exploiting the magnetic properties of hydrogen nuclei in your body's water molecules.\n\n**How it works:**\n1. A powerful magnet aligns hydrogen protons in your body\n2. Radiofrequency pulses knock them out of alignment\n3. As protons "relax" back, they emit signals\n4. Computers reconstruct these signals into detailed 3D images\n\n**Key concepts:** Larmor frequency, T1/T2 relaxation times, k-space, gradient fields\n\n**BME relevance:** MRI engineers design coils, improve image reconstruction algorithms, and develop contrast agents. It's a beautiful intersection of physics, signal processing, and medicine! 🧲`;
  }

  if (q.includes('tissue engineer') || q.includes('scaffold') || q.includes('bioprinting')) {
    return `**Tissue Engineering** is one of the most exciting BME frontiers — building living tissues to repair or replace damaged ones.\n\n**The triad:**\n- **Cells**: Stem cells or differentiated cells (cardiomyocytes, chondrocytes, etc.)\n- **Scaffolds**: 3D structures (biodegradable polymers, hydrogels, ECM proteins) that guide cell growth\n- **Signals**: Growth factors, mechanical forces, electrical stimulation\n\n**Cool applications:**\n• Skin grafts for burn patients\n• Lab-grown cartilage for joint repair\n• Bioprinted heart patches\n• Organoids for drug testing\n\n**Challenge:** Vascularization — getting blood vessels to grow into thick tissue constructs remains a major hurdle! 🧬`;
  }

  if (q.includes('bci') || q.includes('neural') || q.includes('brain') || q.includes('electrode')) {
    return `**Neural Engineering & BCIs** (Brain-Computer Interfaces) are at the frontier of merging biology with technology.\n\n**Types of recordings:**\n- **EEG**: Non-invasive scalp electrodes, low resolution\n- **ECoG**: Grid on brain surface, better resolution\n- **Utah Array / Neuropixels**: Penetrating microelectrodes, highest resolution\n\n**Famous BCIs:**\n• Neuralink (Elon Musk's company)\n• BrainGate — paralyzed patients controlling computers\n• Deep Brain Stimulation for Parkinson's\n• Cochlear implants (hearing restoration)\n\n**Key challenge:** The brain-electrode interface degrades over time due to the foreign body response. How do we make long-lasting, biocompatible interfaces? 🧠⚡`;
  }

  if (q.includes('biosensor') || q.includes('glucose') || q.includes('wearable')) {
    return `**Biosensors** convert biological signals into measurable electrical outputs.\n\n**Components:**\n1. **Bioreceptor**: Enzyme, antibody, or nucleic acid that binds the target\n2. **Transducer**: Converts binding event to signal (electrochemical, optical, piezoelectric)\n3. **Electronics**: Amplification, processing, display\n\n**Classic example — Glucose Sensor:**\n- Glucose oxidase enzyme reacts with glucose\n- Produces H₂O₂, detected electrochemically\n- CGMs (Continuous Glucose Monitors) like Dexcom use this!\n\n**Emerging areas:**\n• Sweat-based wearables for metabolite monitoring\n• Lab-on-chip microfluidics\n• Implantable biosensors\n• COVID-19 rapid tests 📡`;
  }

  if (q.includes('biomechanics') || q.includes('bone') || q.includes('joint') || q.includes('gait')) {
    return `**Biomechanics** applies mechanics (statics, dynamics, materials science) to biological systems.\n\n**Key areas:**\n\n**Bone mechanics:** Cortical bone is anisotropic — stronger in compression than tension. Young's modulus ~17 GPa. Wolff's Law: bone remodels in response to mechanical load.\n\n**Joint biomechanics:** The knee transmits 2-3x body weight during walking, up to 7x during running. Understanding this guides implant design.\n\n**Gait analysis:** Force plates + motion capture reveal ground reaction forces, joint moments, and muscle activations — critical for prosthetics design.\n\n**Why it matters:** Every orthopedic implant (hip, knee, spine) is designed using biomechanical principles. Bad mechanics = implant failure! 🦴`;
  }

  if (q.includes('math') || q.includes('calculus') || q.includes('differential') || q.includes('linear algebra')) {
    return `**Math for BME** — here's your roadmap:\n\n**Essential foundations:**\n- **Calculus I & II**: Derivatives, integrals — used in pharmacokinetics, signal analysis\n- **Multivariable Calculus**: Gradients, flux — used in fluid dynamics, heat transfer in tissue\n- **Linear Algebra**: Matrices, eigenvalues — used in image reconstruction, machine learning\n- **Differential Equations**: Modeling physiological systems (drug concentration, action potentials)\n- **Statistics & Probability**: Clinical trials, data analysis, uncertainty quantification\n\n**BME-specific math:**\n- Fourier Analysis (MRI, EEG signal processing)\n- Numerical Methods (finite element analysis for biomechanics)\n- Optimization (device design, ML models)\n\n**Start with**: Khan Academy for Calc, 3Blue1Brown for Linear Algebra intuition, and MIT OCW for rigor! 📐`;
  }

  if (q.includes('crispr') || q.includes('gene') || q.includes('dna') || q.includes('genomics')) {
    return `**CRISPR-Cas9** is the gene editing revolution BME helped enable!\n\n**How it works:**\n1. A **guide RNA (gRNA)** is designed to match a specific DNA sequence\n2. The gRNA directs **Cas9 protein** (molecular scissors) to the exact location\n3. Cas9 cuts both DNA strands (double-strand break)\n4. The cell's repair machinery either disrupts the gene (knockout) or inserts new sequences\n\n**BME applications:**\n• Developing disease models (cell lines, animal models)\n• CAR-T cell therapy for cancer\n• Gene therapy for sickle cell disease\n• Diagnostic tools (SHERLOCK, DETECTR)\n\n**Challenges:** Off-target effects, delivery to the right cells, immune response, ethical considerations\n\n**Resources:** Addgene's CRISPR guide is excellent! 🧬✂️`;
  }

  if (q.includes('what is biomedical') || q.includes('biomedical engineer') || q.includes('bme')) {
    return `**Biomedical Engineering (BME)** is the application of engineering principles and design concepts to medicine and biology.\n\n**Core disciplines:**\n🔬 Bioinstrumentation — sensors, imaging, devices\n🧬 Biomaterials — implants, drug delivery scaffolds\n⚙️ Biomechanics — prosthetics, tissue mechanics\n🧠 Neural Engineering — BCIs, prosthetics, DBS\n📊 Bioinformatics — genomics, computational biology\n🏥 Clinical Engineering — hospital devices, safety\n\n**What BMEs do:**\n• Design pacemakers and artificial hearts\n• Develop MRI and ultrasound machines\n• Create drug delivery systems\n• Engineer prosthetic limbs\n• Build AI diagnostic tools\n\n**Salary range:** $65K–$130K+ entry level, research/industry roles vary widely\n\n**Best programs:** Johns Hopkins, MIT, Georgia Tech, Duke, UIUC\n\nWelcome to the future of medicine! 🏥⚡`;
  }

  // Generic response
  return `Great question about **${question}**!\n\nBiomedical engineering connects this topic to real clinical impact. Here are some key points to explore:\n\n1. **Fundamentals**: Start with the underlying biology and physics\n2. **Engineering application**: How do we measure, model, or manipulate this?\n3. **Clinical translation**: How does this become a product or treatment?\n4. **Current research**: What are the open problems?\n\n**Suggested resources:**\n- Khan Academy for foundational science\n- Crash Course for engaging overviews\n- PubMed for recent research\n- MIT OpenCourseWare for rigorous lectures\n\nWant me to go deeper on any specific aspect? Ask a more specific question and I'll give you a detailed breakdown! 🔬`;
}

export default function AITutor({ initialTopic = '', onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: initialTopic
        ? `Hi! I'm your BME AI Tutor 🤖\n\nYou want to learn about **${initialTopic}** — great choice! Ask me anything specific and I'll explain it in depth.`
        : `Hi! I'm your BME AI Tutor 🤖\n\nI can explain any biomedical engineering concept — from MRI physics to neural interfaces, tissue engineering, biosensors, biomechanics, and more.\n\nWhat would you like to learn today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const formatMessage = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-bold text-white mt-2">{line.slice(2, -2)}</p>;
        }
        // Bold inline
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const formatted = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <li key={i} className="ml-4 text-gray-300 text-sm">{formatted}</li>;
        }
        if (line.match(/^\d+\./)) {
          return <li key={i} className="ml-4 list-decimal text-gray-300 text-sm">{formatted}</li>;
        }
        if (!line.trim()) return <br key={i} />;
        return <p key={i} className="text-gray-300 text-sm">{formatted}</p>;
      });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30">
          🤖
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Tutor</h1>
          <p className="text-gray-400 text-sm">Ask anything about biomedical engineering</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            ✕ Back to Courses
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[400px] max-h-[60vh]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
                msg.role === 'assistant'
                  ? 'bg-gradient-to-br from-cyan-400 to-blue-600'
                  : 'bg-gradient-to-br from-purple-500 to-violet-600'
              }`}>
                {msg.role === 'assistant' ? '🤖' : '👤'}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'assistant'
                  ? 'bg-white/[0.05] border border-white/10 rounded-tl-none'
                  : 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 rounded-tr-none'
              }`}>
                <div className="space-y-1 leading-relaxed">
                  {formatMessage(msg.content)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm">🤖</div>
              <div className="bg-white/[0.05] border border-white/10 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        {messages.length <= 1 && (
          <div className="px-5 py-3 border-t border-white/5 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-3 py-1.5 rounded-full text-xs bg-white/[0.05] border border-white/10 text-gray-300 hover:bg-white/[0.08] hover:text-white transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Ask about MRI physics, neural interfaces, biosensors..."
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
            >
              Send →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
