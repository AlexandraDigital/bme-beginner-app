import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const MODULES = [
  {
    id:"medical-imaging",title:"Medical Imaging",emoji:"🩻",
    level:"Intermediate",duration:"8 hours",
    color:"#22d3ee",grad:"linear-gradient(135deg,#0e7490,#1d4ed8)",
    lessons:[
      {id:"mi-1",title:"Introduction to Medical Imaging",mins:45},
      {id:"mi-2",title:"MRI Physics & Principles",mins:90},
      {id:"mi-3",title:"CT Scanning & Reconstruction",mins:75},
      {id:"mi-4",title:"Ultrasound Imaging",mins:60},
      {id:"mi-5",title:"Nuclear Medicine: PET & SPECT",mins:60},
      {id:"mi-6",title:"X-Ray & Fluoroscopy",mins:50},
    ],
    quiz:[
      {q:"What phenomenon underlies MRI?",o:["Photoelectric effect","Nuclear magnetic resonance","Compton scattering","Piezoelectric effect"],a:1},
      {q:"Which modality uses ionizing radiation?",o:["MRI","Ultrasound","CT Scan","Optical coherence tomography"],a:2},
      {q:"What governs echo intensity in ultrasound?",o:["Magnetic susceptibility","Acoustic impedance mismatch","Radioactivity","Proton density"],a:1},
      {q:"PET scans detect gamma rays from:",o:["Positron annihilation of radiotracer","External X-ray tubes","Acoustic reflections","Gradient coils"],a:0},
      {q:"Hounsfield Units (HU) in CT measure:",o:["Proton density","Acoustic impedance","Radiodensity of tissue","Metabolic rate"],a:2},
    ]
  },
  {
    id:"biomechanics",title:"Biomechanics",emoji:"🦴",
    level:"Intermediate",duration:"7 hours",
    color:"#34d399",grad:"linear-gradient(135deg,#065f46,#0d9488)",
    lessons:[
      {id:"bm-1",title:"Fundamentals of Biomechanics",mins:50},
      {id:"bm-2",title:"Bone Mechanics & Fracture",mins:80},
      {id:"bm-3",title:"Joint Biomechanics & Cartilage",mins:75},
      {id:"bm-4",title:"Gait Analysis & Locomotion",mins:70},
      {id:"bm-5",title:"Prosthetics & Orthotics Design",mins:65},
    ],
    quiz:[
      {q:"Young's modulus describes:",o:["Viscosity","Stiffness (stress/strain ratio)","Shear resistance","Thermal conductivity"],a:1},
      {q:"Cortical bone forms the:",o:["Bone marrow cavity","Trabecular core","Diaphysis of long bones","Articular surface"],a:2},
      {q:"The hip joint is classified as:",o:["Hinge joint","Ball and socket","Pivot joint","Condyloid joint"],a:1},
      {q:"Stance phase in gait is when:",o:["Foot is airborne","Foot contacts the ground","Knee fully flexes","Arm swings forward"],a:1},
      {q:"Viscoelastic materials exhibit:",o:["Only elastic behavior","Only viscous behavior","Both elastic and viscous behavior","Neither"],a:2},
    ]
  },
  {
    id:"tissue-engineering",title:"Tissue Engineering",emoji:"🧬",
    level:"Advanced",duration:"9 hours",
    color:"#a78bfa",grad:"linear-gradient(135deg,#4c1d95,#5b21b6)",
    lessons:[
      {id:"te-1",title:"Introduction to Tissue Engineering",mins:50},
      {id:"te-2",title:"Stem Cells & Differentiation",mins:90},
      {id:"te-3",title:"Scaffolds & Biomaterials",mins:85},
      {id:"te-4",title:"Bioreactors & Culture Systems",mins:70},
      {id:"te-5",title:"Bioprinting & Organoids",mins:80},
    ],
    quiz:[
      {q:"The three pillars of tissue engineering are:",o:["Genes, proteins, lipids","Cells, scaffolds, growth factors","Neurons, myocytes, osteoblasts","Polymers, metals, ceramics"],a:1},
      {q:"Totipotent stem cells can become:",o:["Blood cells only","Any somatic cell","Any cell type including extraembryonic","Bone and cartilage only"],a:2},
      {q:"Ideal biodegradable scaffolds should:",o:["Remain permanently in the body","Degrade as new tissue forms","Conduct electricity","Generate heat"],a:1},
      {q:"Bioreactors in tissue engineering provide:",o:["Genetic modification tools","Controlled mechanical/biochemical stimuli","Nuclear imaging","Drug delivery only"],a:1},
      {q:"Organoids are best defined as:",o:["Synthetic polymers","3D mini-organs grown in vitro from stem cells","Gene editing tools","Mechanical implants"],a:1},
    ]
  },
  {
    id:"neural-engineering",title:"Neural Engineering",emoji:"🧠",
    level:"Advanced",duration:"8 hours",
    color:"#60a5fa",grad:"linear-gradient(135deg,#1e3a8a,#3730a3)",
    lessons:[
      {id:"ne-1",title:"Neuroscience for Engineers",mins:60},
      {id:"ne-2",title:"Neural Electrodes & Recording",mins:85},
      {id:"ne-3",title:"Brain-Computer Interfaces (BCIs)",mins:90},
      {id:"ne-4",title:"Deep Brain Stimulation",mins:70},
      {id:"ne-5",title:"Cochlear & Retinal Implants",mins:65},
    ],
    quiz:[
      {q:"Action potentials are driven by:",o:["Ca²⁺ channels only","Na⁺/K⁺ ion dynamics","Magnetic fields","Light activation"],a:1},
      {q:"EEG measures:",o:["Individual neuron spikes","Aggregate scalp electrical activity","Blood oxygenation","Glucose metabolism"],a:1},
      {q:"BCIs are classified as:",o:["Only implanted devices","Only non-invasive","Invasive, partially-invasive, or non-invasive","Only wireless"],a:2},
      {q:"DBS most commonly treats:",o:["Alzheimer's disease","Parkinson's disease","Epilepsy only","Narcolepsy"],a:1},
      {q:"Cochlear implants work by:",o:["Amplifying sound mechanically","Electrically stimulating the auditory nerve","Replacing the ossicles","Using optical pulses"],a:1},
    ]
  },
  {
    id:"biosensors",title:"Biosensors & Devices",emoji:"📡",
    level:"Intermediate",duration:"6 hours",
    color:"#fb923c",grad:"linear-gradient(135deg,#7c2d12,#c2410c)",
    lessons:[
      {id:"bs-1",title:"Principles of Biosensors",mins:55},
      {id:"bs-2",title:"Electrochemical Biosensors",mins:65},
      {id:"bs-3",title:"Wearable Health Monitors",mins:60},
      {id:"bs-4",title:"Lab-on-Chip & Microfluidics",mins:70},
      {id:"bs-5",title:"FDA Regulation & Device Safety",mins:50},
    ],
    quiz:[
      {q:"A biosensor combines a biological recognition element with:",o:["A camera","A transducer","A centrifuge","A microcontroller only"],a:1},
      {q:"Glucose biosensors typically use:",o:["Photon detectors","Glucose oxidase enzyme","Piezoelectric crystals","Magnetometers"],a:1},
      {q:"Microfluidics works with volumes of:",o:["Liters","Milliliters","Nanoliters to microliters","Cubic centimeters"],a:2},
      {q:"Wearable ECG monitors measure:",o:["Blood glucose","Electrical activity of the heart","Oxygen levels only","Skin conductance only"],a:1},
      {q:"FDA Class III devices require:",o:["No approval","510(k) clearance","Premarket Approval (PMA)","Labeling requirements only"],a:2},
    ]
  },
  {
    id:"bioinformatics",title:"Bioinformatics",emoji:"💻",
    level:"Intermediate",duration:"7 hours",
    color:"#f472b6",grad:"linear-gradient(135deg,#831843,#9d174d)",
    lessons:[
      {id:"bi-1",title:"Genomics & Sequencing Basics",mins:60},
      {id:"bi-2",title:"Sequence Alignment Algorithms",mins:80},
      {id:"bi-3",title:"Protein Structure & Folding",mins:85},
      {id:"bi-4",title:"CRISPR & Gene Editing",mins:75},
      {id:"bi-5",title:"ML Applications in BME",mins:70},
    ],
    quiz:[
      {q:"The human genome contains approximately:",o:["3 million base pairs","3 billion base pairs","300 thousand genes","3 trillion cells"],a:1},
      {q:"BLAST is a tool for:",o:["3D protein visualization","Sequence alignment & database search","Flow cytometry","RNA sequencing only"],a:1},
      {q:"AlphaFold predicts:",o:["Gene expression levels","Protein 3D structure from sequence","Drug toxicity","DNA methylation"],a:1},
      {q:"CRISPR-Cas9 cuts DNA at:",o:["Random locations","Guide RNA-specified target sequences","Promoter regions only","Introns only"],a:1},
      {q:"CNNs in BME are used for:",o:["Sequence alignment","Medical image analysis","PCR amplification","Gel electrophoresis"],a:1},
    ]
  },
];

/* ══════════════════════════════════════════════════════════════
   STORAGE
══════════════════════════════════════════════════════════════ */
const db = {
  async get(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},
  async set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}
};

/* ══════════════════════════════════════════════════════════════
   RESPONSIVE HOOK
══════════════════════════════════════════════════════════════ */
function useIsMobile(bp=640){
  const [mobile,setMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<bp);
  useEffect(()=>{
    const fn=()=>setMobile(window.innerWidth<bp);
    window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);
  },[bp]);
  return mobile;
}

/* ══════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════ */
export default function App(){
  const [page,setPage]=useState("home");
  const [xp,setXp]=useState(0);
  const [done,setDone]=useState([]);
  const [quizLog,setQuizLog]=useState([]);
  const [chat,setChat]=useState([]);
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    (async()=>{
      const[x,d,q,c]=await Promise.all([db.get("bme_xp"),db.get("bme_done"),db.get("bme_quizlog"),db.get("bme_chat")]);
      setXp(x??0);setDone(d??[]);setQuizLog(q??[]);setChat(c??[]);setReady(true);
    })();
  },[]);

  const earnXp=useCallback((n)=>{setXp(p=>{const v=p+n;db.set("bme_xp",v);return v;});},[]);
  const completeLesson=useCallback((id)=>{
    setDone(p=>{if(p.includes(id))return p;const n=[...p,id];db.set("bme_done",n);earnXp(10);return n;});
  },[earnXp]);
  const logQuiz=useCallback((entry)=>{
    setQuizLog(p=>{const n=[entry,...p].slice(0,200);db.set("bme_quizlog",n);return n;});
    earnXp(entry.xp);
  },[earnXp]);
  const saveChat=useCallback((msgs)=>{const t=msgs.slice(-100);setChat(t);db.set("bme_chat",t);},[]);

  if(!ready)return(
    <div style={{background:"#060b18",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{color:"#22d3ee",fontSize:"0.9rem"}}>Loading your progress…</div>
    </div>
  );

  const shared={xp,done,quizLog,chat,earnXp,completeLesson,logQuiz,saveChat,setPage};
  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{max-width:100%;overflow-x:hidden;}
        body{background:#060b18;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .msg{animation:fadeIn 0.22s ease forwards;}
        .nav-btn:hover{background:rgba(255,255,255,0.06)!important;color:rgba(255,255,255,0.8)!important;}
        .lesson-row:hover{background:rgba(255,255,255,0.04)!important;}
        .mod-card:hover{transform:scale(1.025);}
        .opt-btn:not(:disabled):hover{background:rgba(255,255,255,0.06)!important;border-color:rgba(255,255,255,0.2)!important;}
        .hero-section{min-height:88vh;padding:40px 20px;display:flex;align-items:center;justify-content:center;}
        @media(max-width:640px){.hero-section{min-height:auto !important;padding:28px 20px 36px !important;display:block !important;}}
        .stats-grid{grid-template-columns:repeat(4,1fr);}
        @media(max-width:640px){.stats-grid{grid-template-columns:repeat(2,1fr) !important;}}
        .hero-p{font-size:1.05rem;}
        @media(max-width:640px){.hero-p{font-size:0.9rem !important;}}
        .cta-title{font-size:2rem;}
        @media(max-width:640px){.cta-title{font-size:1.5rem !important;}}
        .lesson-title{white-space:nowrap;}
        @media(max-width:640px){.lesson-title{white-space:normal !important;}}
        .tutor-wrap{padding:28px 20px;}
        @media(max-width:640px){.tutor-wrap{padding:16px 14px !important;}}
      `}</style>
      <div style={{background:"#060b18",minHeight:"100vh",color:"white",fontFamily:"'DM Sans',sans-serif",overflowX:"hidden"}}>
        <Nav page={page} setPage={setPage} xp={xp}/>
        <main style={{paddingTop:60}}>
          {page==="home"    &&<Home {...shared}/>}
          {page==="courses" &&<Courses {...shared}/>}
          {page==="tutor"   &&<Tutor chat={chat} saveChat={saveChat}/>}
          {page==="mindmap" &&<MindMap/>}
        </main>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════════ */
function Nav({page,setPage,xp}){
  const isMobile=useIsMobile();
  const [menuOpen,setMenuOpen]=useState(false);
  const navItems=[["home","🧠","Home"],["courses","📚","Courses"],["mindmap","🗺️","Mind Map"],["tutor","🤖","AI Tutor"]];

  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:"rgba(6,11,24,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        {/* Logo */}
        <button onClick={()=>{setPage("home");setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:0,flexShrink:0}}>
          <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#22d3ee,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 16px rgba(34,211,238,0.22)"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/></svg>
          </div>
          <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"0.95rem",letterSpacing:"-0.01em"}}>
            <span style={{color:"white"}}>BioMed</span><span style={{color:"#22d3ee"}}>AI</span>
          </span>
        </button>

        {/* Desktop nav */}
        {!isMobile&&(
          <div style={{display:"flex",gap:2}}>
            {navItems.map(([id,icon,lbl])=>(
              <button key={id} onClick={()=>setPage(id)} className="nav-btn" style={{display:"flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:8,background:page===id?"rgba(34,211,238,0.1)":"transparent",color:page===id?"#22d3ee":"rgba(255,255,255,0.4)",border:"none",cursor:"pointer",fontSize:"0.82rem",fontWeight:500,transition:"all 0.15s",whiteSpace:"nowrap"}}>
                {icon} {lbl}
              </button>
            ))}
          </div>
        )}

        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          {/* XP badge */}
          <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <span style={{fontSize:"0.8rem"}}>⚡</span>
            <span style={{color:"#facc15",fontWeight:700,fontSize:"0.82rem"}}>{xp.toLocaleString()} XP</span>
          </div>
          {/* Hamburger */}
          {isMobile&&(
            <button onClick={()=>setMenuOpen(p=>!p)} style={{width:34,height:34,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,cursor:"pointer",padding:0}}>
              <span style={{display:"block",width:16,height:1.5,background:"rgba(255,255,255,0.7)",borderRadius:2,transition:"all 0.2s",transform:menuOpen?"rotate(45deg) translateY(6.5px)":"none"}}/>
              <span style={{display:"block",width:16,height:1.5,background:"rgba(255,255,255,0.7)",borderRadius:2,transition:"all 0.2s",opacity:menuOpen?0:1}}/>
              <span style={{display:"block",width:16,height:1.5,background:"rgba(255,255,255,0.7)",borderRadius:2,transition:"all 0.2s",transform:menuOpen?"rotate(-45deg) translateY(-6.5px)":"none"}}/>
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobile&&menuOpen&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",background:"rgba(6,11,24,0.98)",padding:"8px 12px 12px"}}>
          {navItems.map(([id,icon,lbl])=>(
            <button key={id} onClick={()=>{setPage(id);setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 12px",borderRadius:10,background:page===id?"rgba(34,211,238,0.08)":"transparent",color:page===id?"#22d3ee":"rgba(255,255,255,0.6)",border:"none",cursor:"pointer",fontSize:"0.9rem",fontWeight:500,textAlign:"left",marginBottom:2}}>
              <span style={{fontSize:"1rem"}}>{icon}</span>{lbl}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════
   MODULE CARD
══════════════════════════════════════════════════════════════ */
function ModCard({mod,done,onClick}){
  const n=mod.lessons.filter(l=>done.includes(l.id)).length;
  const pct=Math.round(n/mod.lessons.length*100);
  return(
    <div onClick={onClick} className="mod-card" style={{borderRadius:16,border:`1px solid ${mod.color}22`,padding:20,cursor:"pointer",background:`linear-gradient(135deg,${mod.color}10,${mod.color}05)`,transition:"transform 0.2s"}}>
      <div style={{display:"inline-flex",padding:"3px 10px",borderRadius:20,background:`${mod.color}18`,border:`1px solid ${mod.color}44`,color:mod.color,fontSize:"0.72rem",fontWeight:700,marginBottom:10}}>{mod.level}</div>
      <div style={{fontSize:"1.9rem",marginBottom:8}}>{mod.emoji}</div>
      <h3 style={{fontWeight:700,fontSize:"0.95rem",marginBottom:10,fontFamily:"Syne,sans-serif"}}>{mod.title}</h3>
      <div style={{height:3,background:"rgba(255,255,255,0.07)",borderRadius:2,marginBottom:6,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:mod.grad,borderRadius:2,transition:"width 0.4s"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"rgba(255,255,255,0.35)"}}>
        <span>{n}/{mod.lessons.length} lessons</span><span>{pct}%</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════════════════ */
function Home({xp,done,quizLog,setPage}){
  const total=MODULES.reduce((s,m)=>s+m.lessons.length,0);
  const pct=total?Math.round(done.length/total*100):0;
  const isMobile=useIsMobile();

  return(
    <div>
      {/* Hero */}
      <section className="hero-section" style={{position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 50% at 30% 20%,rgba(34,211,238,0.06) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 70% 80%,rgba(59,130,246,0.06) 0%,transparent 60%)"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:780,width:"100%",textAlign:"center",margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",borderRadius:20,background:"rgba(34,211,238,0.07)",border:"1px solid rgba(34,211,238,0.18)",color:"#22d3ee",fontSize:"0.75rem",marginBottom:20,fontWeight:500}}>
            ⭐ AI-Powered Biomedical Engineering Platform
          </div>
          <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(2rem,7vw,4.8rem)",fontWeight:800,lineHeight:1.1,marginBottom:16,letterSpacing:"-0.025em"}}>
            <span>Master </span>
            <span style={{background:"linear-gradient(90deg,#22d3ee 0%,#60a5fa 50%,#a78bfa 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Biomedical</span>
            <br/><span>Engineering</span>
          </h1>
          <p className="hero-p" style={{color:"rgba(255,255,255,0.45)",maxWidth:520,margin:"0 auto 26px",lineHeight:1.65}}>
            Explore MRI physics, tissue engineering, neural BCIs, and more — guided by an AI tutor in real time.
          </p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:28}}>
            <button onClick={()=>setPage("courses")} style={{padding:"12px 22px",borderRadius:12,background:"linear-gradient(135deg,#22d3ee,#3b82f6)",color:"white",border:"none",cursor:"pointer",fontWeight:600,fontSize:"0.9rem",boxShadow:"0 0 28px rgba(34,211,238,0.2)"}}>Explore Courses →</button>
            <button onClick={()=>setPage("tutor")} style={{padding:"12px 22px",borderRadius:12,background:"rgba(255,255,255,0.04)",color:"white",border:"1px solid rgba(255,255,255,0.1)",cursor:"pointer",fontWeight:600,fontSize:"0.9rem"}}>🤖 AI Tutor</button>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center"}}>
            {["🩻 Medical Imaging","🦴 Biomechanics","🧬 Tissue Engineering","🧠 Neural Engineering","📡 Biosensors","💻 Bioinformatics"].map(t=>(
              <span key={t} style={{padding:"5px 11px",borderRadius:20,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",fontSize:"0.75rem"}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats — 2×2 on mobile, 4×1 on desktop */}
      <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",borderBottom:"1px solid rgba(255,255,255,0.05)",background:"rgba(255,255,255,0.015)"}}>
        <div className="stats-grid" style={{maxWidth:900,margin:"0 auto",padding:"24px 20px",display:"grid",gap:16,textAlign:"center"}}>
          {[[xp.toLocaleString(),"XP Earned","#facc15"],[`${done.length}/${total}`,"Lessons Done","#22d3ee"],[quizLog.length,"Quizzes Taken","#a78bfa"],[`${pct}%`,"Progress","#34d399"]].map(([v,l,c])=>(
            <div key={l}>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:"1.9rem",fontWeight:800,background:`linear-gradient(135deg,${c},rgba(255,255,255,0.9))`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</div>
              <div style={{color:"rgba(255,255,255,0.35)",fontSize:"0.75rem",marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <section style={{maxWidth:1000,margin:"0 auto",padding:"48px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:22,flexWrap:"wrap",gap:10}}>
          <div>
            <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"1.5rem",fontWeight:800,marginBottom:4}}>Featured Modules</h2>
            <p style={{color:"rgba(255,255,255,0.38)",fontSize:"0.82rem"}}>Start your journey with these popular courses</p>
          </div>
          <button onClick={()=>setPage("courses")} style={{background:"none",border:"none",color:"#22d3ee",cursor:"pointer",fontSize:"0.82rem",flexShrink:0}}>View all →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
          {MODULES.slice(0,3).map(m=><ModCard key={m.id} mod={m} done={done} onClick={()=>setPage("courses")}/>)}
        </div>
      </section>

      {/* How it works */}
      <section style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"48px 20px",background:"rgba(255,255,255,0.01)"}}>
        <div style={{maxWidth:920,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"1.5rem",fontWeight:800,textAlign:"center",marginBottom:5}}>How It Works</h2>
          <p style={{color:"rgba(255,255,255,0.38)",textAlign:"center",marginBottom:28,fontSize:"0.82rem"}}>Everything you need to master biomedical engineering</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:12}}>
            {[{e:"🤖",t:"AI Tutor",d:"Ask anything, get expert explanations instantly.",g:"#22d3ee,#3b82f6"},{e:"📚",t:"Structured Courses",d:"Beginner, Intermediate & Advanced tracks.",g:"#34d399,#0d9488"},{e:"🧪",t:"Interactive Quizzes",d:"125+ questions with detailed answer breakdowns.",g:"#a78bfa,#7c3aed"},{e:"⚡",t:"Track Progress",d:"Earn XP, complete lessons, grow your stats.",g:"#fb923c,#ef4444"}].map(f=>(
              <div key={f.t} style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16}}>
                <div style={{width:40,height:40,borderRadius:10,background:`linear-gradient(135deg,${f.g})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",marginBottom:10}}>{f.e}</div>
                <h3 style={{fontWeight:700,marginBottom:4,fontSize:"0.88rem",fontFamily:"Syne,sans-serif"}}>{f.t}</h3>
                <p style={{color:"rgba(255,255,255,0.38)",fontSize:"0.78rem",lineHeight:1.5}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"60px 20px",textAlign:"center"}}>
        <h2 className="cta-title" style={{fontFamily:"Syne,sans-serif",fontWeight:800,marginBottom:10}}>The Future of Medicine Needs Engineers</h2>
        <p style={{color:"rgba(255,255,255,0.4)",margin:"0 auto 24px",maxWidth:460,fontSize:"0.88rem",padding:"0 10px"}}>Biomedical engineering bridges medicine and technology. Start building your expertise today.</p>
        <button onClick={()=>setPage("courses")} style={{padding:"13px 28px",borderRadius:12,background:"linear-gradient(135deg,#22d3ee,#3b82f6)",color:"white",border:"none",cursor:"pointer",fontWeight:700,fontSize:"0.95rem"}}>Get Started Free →</button>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COURSES
══════════════════════════════════════════════════════════════ */
function Courses({done,quizLog,completeLesson,logQuiz}){
  const [view,setView]=useState("list");
  const [activeMod,setActiveMod]=useState(null);
  const [quizState,setQuizState]=useState(null);

  if(view==="quiz"&&activeMod){
    return<Quiz mod={activeMod} qs={quizState} setQs={setQuizState} logQuiz={logQuiz}
      onBack={()=>setView("module")} onDone={()=>{setView("module");setQuizState(null);}}/>;
  }
  if(view==="module"&&activeMod){
    const mql=quizLog.filter(q=>q.moduleId===activeMod.id);
    return<ModDetail mod={activeMod} done={done} completeLesson={completeLesson} quizLog={mql}
      onBack={()=>setView("list")}
      onStartQuiz={()=>{setQuizState({idx:0,answers:[],score:0,selected:null,done:false});setView("quiz");}}/>;
  }
  return(
    <div style={{maxWidth:1000,margin:"0 auto",padding:"36px 20px"}}>
      <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"1.7rem",fontWeight:800,marginBottom:5}}>All Courses</h1>
      <p style={{color:"rgba(255,255,255,0.38)",marginBottom:24,fontSize:"0.83rem"}}>Select a module to start learning and earning XP</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
        {MODULES.map(m=><ModCard key={m.id} mod={m} done={done} onClick={()=>{setActiveMod(m);setView("module");}}/>)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MODULE DETAIL
══════════════════════════════════════════════════════════════ */
function ModDetail({mod,done,completeLesson,quizLog,onBack,onStartQuiz}){
  const n=mod.lessons.filter(l=>done.includes(l.id)).length;
  const pct=Math.round(n/mod.lessons.length*100);
  const best=quizLog.length?Math.max(...quizLog.map(q=>Math.round(q.score/q.total*100))):null;
  const isMobile=useIsMobile();
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"28px 16px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:7,background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",marginBottom:18,fontSize:"0.82rem"}}>
        ← Back to Courses
      </button>
      <div style={{borderRadius:16,border:`1px solid ${mod.color}2a`,padding:20,background:`linear-gradient(135deg,${mod.color}0d,${mod.color}06)`,marginBottom:18}}>
        <div style={{fontSize:"2rem",marginBottom:8}}>{mod.emoji}</div>
        <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"1.3rem",fontWeight:800,marginBottom:6}}>{mod.title}</h1>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,color:"rgba(255,255,255,0.38)",fontSize:"0.78rem",marginBottom:12}}>
          <span>📖 {mod.lessons.length} lessons</span><span>⏱ {mod.duration}</span>
          <span style={{color:mod.color,fontWeight:600}}>{mod.level}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:3,overflow:"hidden",marginBottom:5}}>
          <div style={{height:"100%",width:`${pct}%`,background:mod.grad,borderRadius:3,transition:"width 0.5s"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.75rem",color:"rgba(255,255,255,0.35)"}}>
          <span>{n}/{mod.lessons.length} completed</span><span>{pct}%</span>
        </div>
      </div>

      <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.95rem",marginBottom:10}}>Lessons</h2>
      <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:20}}>
        {mod.lessons.map((l,i)=>{
          const isDone=done.includes(l.id);
          return(
            <div key={l.id} className="lesson-row" style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:11,background:"rgba(255,255,255,0.02)",border:`1px solid ${isDone?mod.color+"33":"rgba(255,255,255,0.06)"}`,transition:"all 0.18s"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:isDone?`${mod.color}1a`:"rgba(255,255,255,0.04)",border:`1.5px solid ${isDone?mod.color:"rgba(255,255,255,0.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.68rem",color:isDone?mod.color:"rgba(255,255,255,0.28)",flexShrink:0,fontFamily:"Syne,sans-serif",fontWeight:800}}>
                {isDone?"✓":i+1}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div className="lesson-title" style={{fontSize:"0.85rem",fontWeight:500,color:isDone?"rgba(255,255,255,0.88)":"rgba(255,255,255,0.65)",overflow:"hidden",textOverflow:"ellipsis"}}>{l.title}</div>
                <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.28)",marginTop:1}}>{l.mins} min</div>
              </div>
              {isDone
                ?<span style={{fontSize:"0.7rem",color:mod.color,fontWeight:600,flexShrink:0}}>✓ Done</span>
                :<button onClick={()=>completeLesson(l.id)} style={{padding:"4px 10px",borderRadius:7,background:`${mod.color}12`,border:`1px solid ${mod.color}2e`,color:mod.color,fontSize:"0.7rem",cursor:"pointer",fontWeight:600,flexShrink:0,whiteSpace:"nowrap"}}>
                  +10 XP
                </button>
              }
            </div>
          );
        })}
      </div>

      <div style={{borderRadius:14,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <div>
          <h3 style={{fontWeight:700,marginBottom:3,fontSize:"0.92rem"}}>📝 Module Quiz</h3>
          <p style={{color:"rgba(255,255,255,0.38)",fontSize:"0.76rem"}}>{mod.quiz.length} questions • Up to {mod.quiz.length*5+25} XP</p>
          {best!==null&&<p style={{color:mod.color,fontSize:"0.76rem",marginTop:2}}>Best: {best}%</p>}
          {quizLog.length>0&&<p style={{color:"rgba(255,255,255,0.25)",fontSize:"0.72rem"}}>Taken {quizLog.length}×</p>}
        </div>
        <button onClick={onStartQuiz} style={{padding:"9px 16px",borderRadius:10,background:mod.grad,color:"white",border:"none",cursor:"pointer",fontWeight:700,fontSize:"0.82rem",whiteSpace:"nowrap"}}>
          {quizLog.length>0?"Retake Quiz":"Start Quiz"} →
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   QUIZ
══════════════════════════════════════════════════════════════ */
function Quiz({mod,qs,setQs,logQuiz,onBack,onDone}){
  const q=mod.quiz[qs.idx];

  function pick(i){
    if(qs.selected!==null)return;
    const correct=i===q.a;
    const newAnswers=[...qs.answers,{sel:i,correct}];
    const newScore=qs.score+(correct?1:0);
    const last=newAnswers.length===mod.quiz.length;
    setQs(p=>({...p,selected:i}));
    setTimeout(()=>{
      if(last){
        const xp=25+newScore*5;
        logQuiz({moduleId:mod.id,score:newScore,total:mod.quiz.length,xp,date:new Date().toISOString()});
        setQs({...qs,selected:i,answers:newAnswers,score:newScore,done:true,xpEarned:xp});
      } else {
        setQs({idx:qs.idx+1,answers:newAnswers,score:newScore,selected:null,done:false});
      }
    },750);
  }

  if(qs.done){
    const pct=Math.round(qs.score/mod.quiz.length*100);
    return(
      <div style={{maxWidth:500,margin:"0 auto",padding:"48px 20px",textAlign:"center"}}>
        <div style={{fontSize:"3rem",marginBottom:12}}>{pct>=80?"🎉":pct>=60?"👍":"📚"}</div>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"1.7rem",fontWeight:800,marginBottom:7}}>Quiz Complete!</h2>
        <div style={{fontFamily:"Syne,sans-serif",fontSize:"3rem",fontWeight:800,background:`linear-gradient(135deg,${mod.color},white)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:5}}>{pct}%</div>
        <p style={{color:"rgba(255,255,255,0.45)",marginBottom:8,fontSize:"0.88rem"}}>{qs.score}/{mod.quiz.length} correct</p>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:20,background:"rgba(250,204,21,0.1)",border:"1px solid rgba(250,204,21,0.2)",color:"#facc15",marginBottom:26,fontSize:"0.85rem",fontWeight:600}}>
          ⚡ +{qs.xpEarned} XP earned!
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={onDone} style={{padding:"11px 20px",borderRadius:10,background:mod.grad,color:"white",border:"none",cursor:"pointer",fontWeight:700,fontSize:"0.875rem"}}>Back to Module</button>
          <button onClick={()=>setQs({idx:0,answers:[],score:0,selected:null,done:false})} style={{padding:"11px 20px",borderRadius:10,background:"rgba(255,255,255,0.05)",color:"white",border:"1px solid rgba(255,255,255,0.1)",cursor:"pointer",fontWeight:700,fontSize:"0.875rem"}}>Retake</button>
        </div>
      </div>
    );
  }

  return(
    <div style={{maxWidth:600,margin:"0 auto",padding:"28px 16px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:7,background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",marginBottom:18,fontSize:"0.82rem"}}>← Back</button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{color:"rgba(255,255,255,0.35)",fontSize:"0.76rem"}}>Question {qs.idx+1} of {mod.quiz.length}</span>
        <div style={{display:"flex",gap:4}}>
          {mod.quiz.map((_,i)=>(
            <div key={i} style={{width:7,height:7,borderRadius:"50%",background:i<qs.idx?mod.color:i===qs.idx?`${mod.color}70`:"rgba(255,255,255,0.1)",transition:"all 0.3s"}}/>
          ))}
        </div>
      </div>
      <div style={{height:3,background:"rgba(255,255,255,0.05)",borderRadius:2,marginBottom:20,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${qs.idx/mod.quiz.length*100}%`,background:mod.grad,borderRadius:2,transition:"width 0.3s"}}/>
      </div>
      <div style={{borderRadius:14,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",padding:20,marginBottom:12}}>
        <p style={{fontSize:"0.97rem",fontWeight:600,lineHeight:1.55}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {q.o.map((opt,i)=>{
          let bg="rgba(255,255,255,0.02)",bdr="rgba(255,255,255,0.07)",clr="rgba(255,255,255,0.78)";
          if(qs.selected!==null){
            if(i===q.a){bg="rgba(52,211,153,0.1)";bdr="#34d399";clr="#34d399";}
            else if(i===qs.selected&&qs.selected!==q.a){bg="rgba(248,113,113,0.1)";bdr="#f87171";clr="#f87171";}
          }
          return(
            <button key={i} onClick={()=>pick(i)} disabled={qs.selected!==null} className="opt-btn" style={{padding:"13px 14px",borderRadius:11,background:bg,border:`1px solid ${bdr}`,color:clr,textAlign:"left",cursor:qs.selected!==null?"default":"pointer",fontSize:"0.875rem",fontWeight:500,transition:"all 0.2s",lineHeight:1.45,width:"100%"}}>
              <span style={{opacity:0.45,marginRight:8,fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"0.75rem"}}>{String.fromCharCode(65+i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   AI TUTOR
══════════════════════════════════════════════════════════════ */
function Tutor({chat,saveChat}){
  const [msgs,setMsgs]=useState(chat);
  const [input,setInput]=useState("");
  const [busy,setBusy]=useState(false);
  const bottomRef=useRef(null);
  const isMobile=useIsMobile();

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,busy]);

  async function send(){
    if(!input.trim()||busy)return;
    const u={role:"user",content:input.trim()};
    const next=[...msgs,u];
    setMsgs(next);setInput("");setBusy(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:"You are an expert Biomedical Engineering tutor. Explain concepts clearly using analogies and clinical context. Be concise but thorough. Use occasional line breaks for readability.",
          messages:next,
        })
      });
      const data=await res.json();
      const a={role:"assistant",content:data.content?.[0]?.text??"Error retrieving response."};
      const final=[...next,a];setMsgs(final);saveChat(final);
    }catch{
      const final=[...next,{role:"assistant",content:"Connection error. Please try again."}];
      setMsgs(final);
    }finally{setBusy(false);}
  }

  const prompts=["Explain MRI physics simply","How do cochlear implants work?","What is CRISPR in BME?","CT vs PET scans?"];
  return(
    <div className="tutor-wrap" style={{maxWidth:760,margin:"0 auto",display:"flex",flexDirection:"column",height:"calc(100dvh - 60px)"}}>
      <div style={{marginBottom:12,flexShrink:0}}>
        <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"1.4rem",fontWeight:800,marginBottom:2}}>🤖 AI Tutor</h1>
        <p style={{color:"rgba(255,255,255,0.35)",fontSize:"0.76rem"}}>Ask anything • Conversation saved automatically</p>
      </div>

      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingBottom:8,minHeight:0}}>
        {msgs.length===0&&(
          <div style={{textAlign:"center",paddingTop:40}}>
            <div style={{fontSize:"2.5rem",marginBottom:12}}>🧬</div>
            <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,marginBottom:6,fontSize:"1rem"}}>Ask me anything about BME</h3>
            <p style={{color:"rgba(255,255,255,0.3)",fontSize:"0.8rem",marginBottom:18}}>Your personal Biomedical Engineering tutor</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",padding:"0 10px"}}>
              {prompts.map(p=>(
                <button key={p} onClick={()=>setInput(p)} style={{padding:"7px 12px",borderRadius:20,background:"rgba(34,211,238,0.07)",border:"1px solid rgba(34,211,238,0.18)",color:"#22d3ee",fontSize:"0.76rem",cursor:"pointer"}}>{p}</button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m,i)=>(
          <div key={i} className="msg" style={{display:"flex",gap:8,justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            {m.role==="assistant"&&(
              <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#22d3ee,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",flexShrink:0,marginTop:2}}>🤖</div>
            )}
            <div style={{maxWidth:"82%",padding:"10px 13px",fontSize:"0.855rem",lineHeight:1.6,borderRadius:m.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",background:m.role==="user"?"linear-gradient(135deg,rgba(34,211,238,0.12),rgba(59,130,246,0.12))":"rgba(255,255,255,0.035)",border:`1px solid ${m.role==="user"?"rgba(34,211,238,0.18)":"rgba(255,255,255,0.06)"}`,color:"rgba(255,255,255,0.88)",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
              {m.content}
            </div>
          </div>
        ))}
        {busy&&(
          <div style={{display:"flex",gap:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#22d3ee,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",flexShrink:0}}>🤖</div>
            <div style={{padding:"10px 14px",borderRadius:"14px 14px 14px 3px",background:"rgba(255,255,255,0.035)",border:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:5,alignItems:"center"}}>
              {[0,1,2].map(j=><div key={j} style={{width:5,height:5,borderRadius:"50%",background:"#22d3ee",animation:`bounce 1s ${j*0.18}s infinite`}}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:10,flexShrink:0}}>
        {msgs.length>0&&(
          <button onClick={()=>{setMsgs([]);saveChat([]);}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.2)",fontSize:"0.7rem",cursor:"pointer",marginBottom:7,display:"block"}}>
            🗑 Clear history
          </button>
        )}
        <div style={{display:"flex",gap:8,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,padding:"8px 12px",alignItems:"flex-end"}}>
          <textarea value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder="Ask about MRI, BCIs, biosensors…" rows={isMobile?2:2}
            style={{flex:1,background:"none",border:"none",color:"white",resize:"none",fontSize:"0.875rem",outline:"none",lineHeight:1.5,fontFamily:"'DM Sans',sans-serif",minHeight:42}}
          />
          <button onClick={send} disabled={busy||!input.trim()} style={{width:36,height:36,borderRadius:9,flexShrink:0,background:input.trim()&&!busy?"linear-gradient(135deg,#22d3ee,#3b82f6)":"rgba(255,255,255,0.04)",border:"none",cursor:input.trim()&&!busy?"pointer":"default",color:"white",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>→</button>
        </div>
        {!isMobile&&<div style={{textAlign:"center",marginTop:5,color:"rgba(255,255,255,0.15)",fontSize:"0.68rem"}}>Enter to send • Shift+Enter for new line</div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MIND MAP
══════════════════════════════════════════════════════════════ */
function MindMap(){
  const topics=[
    {cat:"Medical Imaging",color:"#22d3ee",items:["MRI Physics","CT Reconstruction","Ultrasound","PET/SPECT","X-Ray","Fluoroscopy","Contrast Agents","Image Segmentation"]},
    {cat:"Biomechanics",color:"#34d399",items:["Young's Modulus","Bone Fracture","Joint Kinematics","Gait Analysis","Prosthetics","Orthotics","Fluid Mechanics","Viscoelasticity"]},
    {cat:"Tissue Engineering",color:"#a78bfa",items:["Stem Cells","Scaffolds","Bioprinting","Organoids","Bioreactors","Growth Factors","CRISPR","Biocompatibility"]},
    {cat:"Neural Engineering",color:"#60a5fa",items:["Action Potentials","EEG/ECoG","BCIs","DBS Therapy","Cochlear Implants","Retinal Implants","Neural Probes","Optogenetics"]},
    {cat:"Biosensors & Devices",color:"#fb923c",items:["Glucose Sensors","Wearables","Lab-on-Chip","Microfluidics","Impedance Spectroscopy","Optical Biosensors","Point-of-Care","FDA Regulation"]},
    {cat:"Bioinformatics",color:"#f472b6",items:["Genomics","Proteomics","Protein Folding","Sequence Alignment","ML in BME","Drug Discovery","Systems Biology","CRISPR/Cas9"]},
    {cat:"Rehab Engineering",color:"#facc15",items:["Exoskeletons","Powered Prosthetics","Functional Stimulation","AFOs","Motor Rehab","EMG Control","Upper Limb","Lower Limb"]},
    {cat:"Regulatory & Ethics",color:"#94a3b8",items:["FDA PMA","510(k) Clearance","ISO 13485","Clinical Trials","Bioethics","Data Privacy","IP in BME","Post-Market"]},
  ];
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"36px 16px"}}>
      <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"1.7rem",fontWeight:800,marginBottom:4}}>🗺️ Mind Map</h1>
      <p style={{color:"rgba(255,255,255,0.38)",marginBottom:24,fontSize:"0.83rem"}}>All biomedical engineering topics at a glance</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:13}}>
        {topics.map(t=>(
          <div key={t.cat} style={{borderRadius:14,border:`1px solid ${t.color}20`,background:`${t.color}06`,padding:16}}>
            <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"0.88rem",color:t.color,marginBottom:10}}>{t.cat}</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {t.items.map(item=>(
                <span key={item} style={{padding:"3px 9px",borderRadius:20,background:`${t.color}10`,border:`1px solid ${t.color}25`,color:"rgba(255,255,255,0.62)",fontSize:"0.73rem"}}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
