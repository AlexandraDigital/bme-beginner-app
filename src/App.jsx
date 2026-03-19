import { useState, useEffect, useRef, useCallback } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&family=Orbitron:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html, body { max-width:100%; overflow-x:hidden; background:#060b18; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
  @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

  /* BASE */
  .app-root { background:#060b18; min-height:100vh; color:white; font-family:'DM Sans',sans-serif; overflow-x:hidden; width:100%; }

  /* NAV */
  .nav-bar { position:fixed; top:0; left:0; right:0; z-index:50; background:rgba(6,11,24,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.07); }
  .nav-inner { max-width:1100px; margin:0 auto; padding:0 20px; height:68px; display:flex; align-items:center; justify-content:space-between; gap:6px; }
  .nav-btn { display:flex; align-items:center; gap:4px; padding:6px 10px; border-radius:8px; background:transparent; border:none; cursor:pointer; font-size:0.8rem; font-weight:500; transition:all 0.15s; white-space:nowrap; color:rgba(255,255,255,0.4); font-family:'DM Sans',sans-serif; }
  .nav-btn:hover { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.8); }
  .nav-btn.active { background:rgba(34,211,238,0.1); color:#22d3ee; }
  .nav-links { display:flex; gap:2px; }
  .xp-badge { display:flex; align-items:center; gap:4px; padding:3px 8px; border-radius:20px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); white-space:nowrap; }
  .hamburger { width:32px; height:32px; display:none; flex-direction:column; align-items:center; justify-content:center; gap:4px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; cursor:pointer; flex-shrink:0; }
  .hamburger span { display:block; width:14px; height:1.5px; background:rgba(255,255,255,0.7); border-radius:2px; transition:all 0.2s; }
  .nav-mobile-menu { border-top:1px solid rgba(255,255,255,0.06); background:rgba(6,11,24,0.98); padding:8px 12px 12px; }
  .nav-mobile-btn { display:flex; align-items:center; gap:10px; width:100%; padding:11px 12px; border-radius:10px; background:transparent; border:none; cursor:pointer; font-size:0.9rem; font-weight:500; text-align:left; margin-bottom:2px; color:rgba(255,255,255,0.6); font-family:'DM Sans',sans-serif; }
  .nav-mobile-btn.active { background:rgba(34,211,238,0.08); color:#22d3ee; }

  /* HERO */
  .hero-section { display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; padding:110px 20px 56px; }
  .hero-inner { position:relative; z-index:1; width:100%; max-width:960px; display:flex; align-items:center; gap:40px; flex-direction:column; }
  .hero-content { width:100%; text-align:center; }
  .hero-visual { display:none; flex-shrink:0; border-radius:16px; padding:20px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); }
  .hero-badge { display:inline-flex; align-items:center; gap:6px; padding:5px 14px; border-radius:20px; background:rgba(34,211,238,0.07); border:1px solid rgba(34,211,238,0.18); color:#22d3ee; font-size:0.8rem; font-weight:500; margin-bottom:16px; }
  .hero-title { font-family:'DM Sans',sans-serif; font-size:clamp(2.6rem,6.5vw,3.6rem); font-weight:700; line-height:1.15; margin-bottom:18px; letter-spacing:-0.02em; }
  .gradient-text { background:linear-gradient(90deg,#22d3ee 0%,#60a5fa 50%,#a78bfa 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:inline-block; }
  .hero-p { color:rgba(255,255,255,0.45); font-size:1.05rem; max-width:520px; margin:0 auto 28px; line-height:1.6; }
  .hero-btns { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:20px; }
  .hero-tags { display:flex; flex-wrap:wrap; gap:5px; justify-content:center; }
  .hero-tag { padding:4px 12px; border-radius:20px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.38); font-size:0.76rem; white-space:nowrap; }

  /* STATS */
  .stats-bar { border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.015); }
  .stats-grid { max-width:760px; margin:0 auto; padding:14px 20px; display:grid; grid-template-columns:repeat(4,1fr); gap:12px; text-align:center; }
  .stat-val { font-family:'DM Sans',sans-serif; font-size:1.2rem; font-weight:700; line-height:1; }
  .stat-lbl { color:rgba(255,255,255,0.35); font-size:0.67rem; margin-top:3px; }

  /* SECTION LAYOUT */
  .page-wrap { width:100%; }
  .page-section { padding:28px 20px; }
  .page-section-alt { padding:28px 20px; border-top:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.01); }
  .content-wrap { max-width:940px; margin:0 auto; width:100%; }
  .section-title { font-family:'DM Sans',sans-serif; font-size:1.2rem; font-weight:700; margin-bottom:5px; letter-spacing:-0.01em; }
  .section-sub { color:rgba(255,255,255,0.38); font-size:0.86rem; }
  .section-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:14px; flex-wrap:wrap; gap:8px; }

  /* GRIDS - mobile-first: 2 col */
  .module-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
  .feature-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }

  /* CARDS */
  .mod-card { border-radius:14px; padding:18px; cursor:pointer; transition:transform 0.2s; }
  .mod-card:hover { transform:scale(1.02); }
  .cta-title { font-family:'DM Sans',sans-serif; font-size:1.05rem; font-weight:700; margin-bottom:8px; letter-spacing:-0.01em; }

  /* LESSON / QUIZ */
  .lesson-row { display:flex; align-items:center; gap:10px; padding:11px 13px; border-radius:11px; background:rgba(255,255,255,0.02); transition:all 0.18s; }
  .lesson-row:hover { background:rgba(255,255,255,0.04); }
  .lesson-title { font-size:0.84rem; font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .opt-btn { padding:12px 13px; border-radius:11px; text-align:left; cursor:pointer; font-size:0.875rem; font-weight:500; transition:all 0.2s; line-height:1.45; width:100%; font-family:'DM Sans',sans-serif; }
  .opt-btn:not(:disabled):hover { background:rgba(255,255,255,0.06) !important; border-color:rgba(255,255,255,0.2) !important; }

  /* TUTOR */
  .tutor-wrap { max-width:760px; margin:0 auto; padding:28px 20px; display:flex; flex-direction:column; height:calc(100dvh - 56px); }
  .msg { animation:fadeIn 0.22s ease forwards; }

  /* BUTTONS */
  .btn-primary { padding:8px 18px; border-radius:10px; background:linear-gradient(135deg,#22d3ee,#3b82f6); color:white; border:none; cursor:pointer; font-weight:600; font-size:0.83rem; box-shadow:0 0 22px rgba(34,211,238,0.2); font-family:'DM Sans',sans-serif; white-space:nowrap; }
  .btn-secondary { padding:8px 18px; border-radius:10px; background:rgba(255,255,255,0.04); color:white; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:600; font-size:0.83rem; font-family:'DM Sans',sans-serif; white-space:nowrap; }

  /* TABLET+ (769px) */
  @media (min-width: 769px) {
    .hero-title { font-size:clamp(3.0rem,4.0vw,3.8rem); }
    .module-grid { grid-template-columns:repeat(3,1fr); gap:12px; }
    .feature-grid { grid-template-columns:repeat(4,1fr); gap:12px; }
    .page-section, .page-section-alt { padding:36px 24px; }
  }

  /* TABLET MID (769-1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    .hero-visual { width:220px; }
    .module-grid { grid-template-columns:repeat(2,1fr); }
  }

  /* DESKTOP (1025px+) */
  @media (min-width: 1025px) {
    .hero-section { padding:120px 56px 72px; }
    .hero-title { font-size:clamp(3.2rem,3.6vw,4.2rem); }
    .module-grid { grid-template-columns:repeat(3,1fr); }
    .page-section, .page-section-alt { padding:40px 24px; }
  }

  /* MOBILE (≤768px) */
  @media (max-width: 768px) {
    .nav-links { display:none; }
    .hamburger { display:flex; }
    .hero-section { padding:58px 16px 22px; }
    .stats-grid { grid-template-columns:repeat(2,1fr); padding:12px 16px; gap:8px; }
    .stat-val { font-size:1.05rem; }
    .stat-lbl { font-size:0.64rem; }
    .lesson-title { white-space:normal; }
    .cta-title { font-size:0.98rem; }
    .tutor-wrap { padding:14px 12px; }
    .section-header { flex-direction:column; align-items:flex-start; gap:4px; }
    .mod-card .mod-emoji { font-size:1.6rem !important; margin-bottom:8px !important; }
    .mod-card h3 { font-size:0.88rem !important; }
  }

  /* SMALL PHONES (≤390px) */
  @media (max-width: 390px) {
    .hero-title { font-size:clamp(2.1rem,7vw,2.7rem); }
    .stat-val { font-size:0.95rem; }
    .module-grid { gap:6px; }
    .mod-card { padding:14px; }
  }

  /* LANDSCAPE PHONE */
  @media (max-height: 500px) and (orientation: landscape) {
    .hero-section { padding:84px 20px 28px; }
    .hero-title { font-size:1.9rem; margin-bottom:16px; }
    .hero-p { margin-bottom:8px; font-size:0.76rem; }
    .hero-btns { margin-bottom:8px; }
    .hero-tags { display:none; }
  }
`

const MODULES = [
  { id:"medical-imaging",title:"Medical Imaging",emoji:"🩻",level:"Intermediate",duration:"8 hours",color:"#22d3ee",grad:"linear-gradient(135deg,#0e7490,#1d4ed8)",
    lessons:[{id:"mi-1",title:"Introduction to Medical Imaging",mins:45},{id:"mi-2",title:"MRI Physics & Principles",mins:90},{id:"mi-3",title:"CT Scanning & Reconstruction",mins:75},{id:"mi-4",title:"Ultrasound Imaging",mins:60},{id:"mi-5",title:"Nuclear Medicine: PET & SPECT",mins:60},{id:"mi-6",title:"X-Ray & Fluoroscopy",mins:50}],
    quiz:[{q:"What phenomenon underlies MRI?",o:["Photoelectric effect","Nuclear magnetic resonance","Compton scattering","Piezoelectric effect"],a:1},{q:"Which modality uses ionizing radiation?",o:["MRI","Ultrasound","CT Scan","Optical coherence tomography"],a:2},{q:"What governs echo intensity in ultrasound?",o:["Magnetic susceptibility","Acoustic impedance mismatch","Radioactivity","Proton density"],a:1},{q:"PET scans detect gamma rays from:",o:["Positron annihilation of radiotracer","External X-ray tubes","Acoustic reflections","Gradient coils"],a:0},{q:"Hounsfield Units (HU) in CT measure:",o:["Proton density","Acoustic impedance","Radiodensity of tissue","Metabolic rate"],a:2}]},
  { id:"biomechanics",title:"Biomechanics",emoji:"🦴",level:"Intermediate",duration:"7 hours",color:"#34d399",grad:"linear-gradient(135deg,#065f46,#0d9488)",
    lessons:[{id:"bm-1",title:"Fundamentals of Biomechanics",mins:50},{id:"bm-2",title:"Bone Mechanics & Fracture",mins:80},{id:"bm-3",title:"Joint Biomechanics & Cartilage",mins:75},{id:"bm-4",title:"Gait Analysis & Locomotion",mins:70},{id:"bm-5",title:"Prosthetics & Orthotics Design",mins:65}],
    quiz:[{q:"Young's modulus describes:",o:["Viscosity","Stiffness (stress/strain ratio)","Shear resistance","Thermal conductivity"],a:1},{q:"Cortical bone forms the:",o:["Bone marrow cavity","Trabecular core","Diaphysis of long bones","Articular surface"],a:2},{q:"The hip joint is classified as:",o:["Hinge joint","Ball and socket","Pivot joint","Condyloid joint"],a:1},{q:"Stance phase in gait is when:",o:["Foot is airborne","Foot contacts the ground","Knee fully flexes","Arm swings forward"],a:1},{q:"Viscoelastic materials exhibit:",o:["Only elastic behavior","Only viscous behavior","Both elastic and viscous behavior","Neither"],a:2}]},
  { id:"tissue-engineering",title:"Tissue Engineering",emoji:"🧬",level:"Advanced",duration:"9 hours",color:"#a78bfa",grad:"linear-gradient(135deg,#4c1d95,#5b21b6)",
    lessons:[{id:"te-1",title:"Introduction to Tissue Engineering",mins:50},{id:"te-2",title:"Stem Cells & Differentiation",mins:90},{id:"te-3",title:"Scaffolds & Biomaterials",mins:85},{id:"te-4",title:"Bioreactors & Culture Systems",mins:70},{id:"te-5",title:"Bioprinting & Organoids",mins:80}],
    quiz:[{q:"The three pillars of tissue engineering are:",o:["Genes, proteins, lipids","Cells, scaffolds, growth factors","Neurons, myocytes, osteoblasts","Polymers, metals, ceramics"],a:1},{q:"Totipotent stem cells can become:",o:["Blood cells only","Any somatic cell","Any cell type including extraembryonic","Bone and cartilage only"],a:2},{q:"Ideal biodegradable scaffolds should:",o:["Remain permanently in the body","Degrade as new tissue forms","Conduct electricity","Generate heat"],a:1},{q:"Bioreactors in tissue engineering provide:",o:["Genetic modification tools","Controlled mechanical/biochemical stimuli","Nuclear imaging","Drug delivery only"],a:1},{q:"Organoids are best defined as:",o:["Synthetic polymers","3D mini-organs grown in vitro from stem cells","Gene editing tools","Mechanical implants"],a:1}]},
  { id:"neural-engineering",title:"Neural Engineering",emoji:"🧠",level:"Advanced",duration:"8 hours",color:"#60a5fa",grad:"linear-gradient(135deg,#1e3a8a,#3730a3)",
    lessons:[{id:"ne-1",title:"Neuroscience for Engineers",mins:60},{id:"ne-2",title:"Neural Electrodes & Recording",mins:85},{id:"ne-3",title:"Brain-Computer Interfaces (BCIs)",mins:90},{id:"ne-4",title:"Deep Brain Stimulation",mins:70},{id:"ne-5",title:"Cochlear & Retinal Implants",mins:65}],
    quiz:[{q:"Action potentials are driven by:",o:["Ca²⁺ channels only","Na⁺/K⁺ ion dynamics","Magnetic fields","Light activation"],a:1},{q:"EEG measures:",o:["Individual neuron spikes","Aggregate scalp electrical activity","Blood oxygenation","Glucose metabolism"],a:1},{q:"BCIs are classified as:",o:["Only implanted devices","Only non-invasive","Invasive, partially-invasive, or non-invasive","Only wireless"],a:2},{q:"DBS most commonly treats:",o:["Alzheimer's disease","Parkinson's disease","Epilepsy only","Narcolepsy"],a:1},{q:"Cochlear implants work by:",o:["Amplifying sound mechanically","Electrically stimulating the auditory nerve","Replacing the ossicles","Using optical pulses"],a:1}]},
  { id:"biosensors",title:"Biosensors & Devices",emoji:"📡",level:"Intermediate",duration:"6 hours",color:"#fb923c",grad:"linear-gradient(135deg,#7c2d12,#c2410c)",
    lessons:[{id:"bs-1",title:"Principles of Biosensors",mins:55},{id:"bs-2",title:"Electrochemical Biosensors",mins:65},{id:"bs-3",title:"Wearable Health Monitors",mins:60},{id:"bs-4",title:"Lab-on-Chip & Microfluidics",mins:70},{id:"bs-5",title:"FDA Regulation & Device Safety",mins:50}],
    quiz:[{q:"A biosensor combines a biological recognition element with:",o:["A camera","A transducer","A centrifuge","A microcontroller only"],a:1},{q:"Glucose biosensors typically use:",o:["Photon detectors","Glucose oxidase enzyme","Piezoelectric crystals","Magnetometers"],a:1},{q:"Microfluidics works with volumes of:",o:["Liters","Milliliters","Nanoliters to microliters","Cubic centimeters"],a:2},{q:"Wearable ECG monitors measure:",o:["Blood glucose","Electrical activity of the heart","Oxygen levels only","Skin conductance only"],a:1},{q:"FDA Class III devices require:",o:["No approval","510(k) clearance","Premarket Approval (PMA)","Labeling requirements only"],a:2}]},
  { id:"bioinformatics",title:"Bioinformatics",emoji:"💻",level:"Intermediate",duration:"7 hours",color:"#f472b6",grad:"linear-gradient(135deg,#831843,#9d174d)",
    lessons:[{id:"bi-1",title:"Genomics & Sequencing Basics",mins:60},{id:"bi-2",title:"Sequence Alignment Algorithms",mins:80},{id:"bi-3",title:"Protein Structure & Folding",mins:85},{id:"bi-4",title:"CRISPR & Gene Editing",mins:75},{id:"bi-5",title:"ML Applications in BME",mins:70}],
    quiz:[{q:"The human genome contains approximately:",o:["3 million base pairs","3 billion base pairs","300 thousand genes","3 trillion cells"],a:1},{q:"BLAST is a tool for:",o:["3D protein visualization","Sequence alignment & database search","Flow cytometry","RNA sequencing only"],a:1},{q:"AlphaFold predicts:",o:["Gene expression levels","Protein 3D structure from sequence","Drug toxicity","DNA methylation"],a:1},{q:"CRISPR-Cas9 cuts DNA at:",o:["Random locations","Guide RNA-specified target sequences","Promoter regions only","Introns only"],a:1},{q:"CNNs in BME are used for:",o:["Sequence alignment","Medical image analysis","PCR amplification","Gel electrophoresis"],a:1}]},
];

const db={async get(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},async set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}};

export default function App(){
  const[page,setPage]=useState("home");
  const[xp,setXp]=useState(0);
  const[done,setDone]=useState([]);
  const[quizLog,setQuizLog]=useState([]);
  const[chat,setChat]=useState([]);
  const[ready,setReady]=useState(false);
  useEffect(()=>{(async()=>{const[x,d,q,c]=await Promise.all([db.get("bme_xp"),db.get("bme_done"),db.get("bme_quizlog"),db.get("bme_chat")]);setXp(x??0);setDone(d??[]);setQuizLog(q??[]);setChat(c??[]);setReady(true);})();},[]);
  const earnXp=useCallback((n)=>{setXp(p=>{const v=p+n;db.set("bme_xp",v);return v;});},[]);
  const completeLesson=useCallback((id)=>{setDone(p=>{if(p.includes(id))return p;const n=[...p,id];db.set("bme_done",n);earnXp(10);return n;});},[earnXp]);
  const logQuiz=useCallback((entry)=>{setQuizLog(p=>{const n=[entry,...p].slice(0,200);db.set("bme_quizlog",n);return n;});earnXp(entry.xp);},[earnXp]);
  const saveChat=useCallback((msgs)=>{const t=msgs.slice(-100);setChat(t);db.set("bme_chat",t);},[]);
  if(!ready)return<div style={{background:"#060b18",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{color:"#22d3ee",fontSize:"0.9rem"}}>Loading…</div></div>;
  const shared={xp,done,quizLog,chat,earnXp,completeLesson,logQuiz,saveChat,setPage};
  return(<div className="app-root"><style>{STYLES}</style><Nav page={page} setPage={setPage} xp={xp}/><main style={{paddingTop:60}}>{page==="home"&&<Home {...shared}/>}{page==="courses"&&<Courses {...shared}/>}{page==="tutor"&&<Tutor chat={chat} saveChat={saveChat}/>}{page==="mindmap"&&<MindMap/>}</main></div>);
}

function Nav({page,setPage,xp}){
  const[menuOpen,setMenuOpen]=useState(false);
  const[installPrompt,setInstallPrompt]=useState(null);
  const[installed,setInstalled]=useState(false);
  const navItems=[["home","🧠","Home"],["courses","📚","Courses"],["mindmap","🗺️","Mind Map"],["tutor","🤖","AI Tutor"]];
  useEffect(()=>{const handler=e=>{e.preventDefault();setInstallPrompt(e);};window.addEventListener("beforeinstallprompt",handler);window.addEventListener("appinstalled",()=>setInstalled(true));if(window.matchMedia("(display-mode: standalone)").matches)setInstalled(true);return()=>window.removeEventListener("beforeinstallprompt",handler);},[]);
  async function install(){if(!installPrompt)return;installPrompt.prompt();const{outcome}=await installPrompt.userChoice;if(outcome==="accepted")setInstalled(true);setInstallPrompt(null);}
  return(<nav className="nav-bar"><div className="nav-inner">
    <button onClick={()=>{setPage("home");setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:0,flexShrink:0}}>
      <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#22d3ee,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 16px rgba(34,211,238,0.22)"}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/></svg></div>
      <span style={{fontFamily:"'Orbitron',monospace",fontWeight:700,fontSize:"0.88rem",letterSpacing:"0.05em"}}><span style={{color:"white"}}>BioMed</span><span style={{color:"#22d3ee"}}>AI</span></span>
    </button>
    <div className="nav-links">{navItems.map(([id,icon,lbl])=>(<button key={id} onClick={()=>setPage(id)} className={`nav-btn${page===id?" active":""}`}>{icon} {lbl}</button>))}</div>
    <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
      <div className="xp-badge"><span style={{fontSize:"0.8rem"}}>⚡</span><span style={{color:"#facc15",fontWeight:700,fontSize:"0.82rem"}}>{xp.toLocaleString()} XP</span></div>
      {!installed&&installPrompt&&<button onClick={install} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:"rgba(34,211,238,0.1)",border:"1px solid rgba(34,211,238,0.3)",color:"#22d3ee",fontSize:"0.75rem",fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",flexShrink:0}}>📲 Install</button>}
      {installed&&<span style={{fontSize:"0.72rem",color:"rgba(34,211,238,0.5)",flexShrink:0}}>✓ Installed</span>}
      <button className="hamburger" onClick={()=>setMenuOpen(p=>!p)} aria-label="Menu"><span style={{transform:menuOpen?"rotate(45deg) translateY(6.5px)":"none"}}/><span style={{opacity:menuOpen?0:1}}/><span style={{transform:menuOpen?"rotate(-45deg) translateY(-6.5px)":"none"}}/></button>
    </div>
  </div>
  {menuOpen&&<div className="nav-mobile-menu">{navItems.map(([id,icon,lbl])=>(<button key={id} onClick={()=>{setPage(id);setMenuOpen(false);}} className={`nav-mobile-btn${page===id?" active":""}`}><span style={{fontSize:"1rem"}}>{icon}</span>{lbl}</button>))}</div>}
  </nav>);
}

function ModCard({mod,done,onClick}){
  const n=mod.lessons.filter(l=>done.includes(l.id)).length;
  const pct=Math.round(n/mod.lessons.length*100);
  return(<div onClick={onClick} className="mod-card" style={{border:`1px solid ${mod.color}22`,background:`linear-gradient(135deg,${mod.color}10,${mod.color}05)`}}>
    <div style={{display:"inline-flex",padding:"4px 10px",borderRadius:20,background:`${mod.color}18`,border:`1px solid ${mod.color}44`,color:mod.color,fontSize:"0.75rem",fontWeight:700,marginBottom:10}}>{mod.level}</div>
    <div className="mod-emoji" style={{fontSize:"2rem",marginBottom:10}}>{mod.emoji}</div>
    <h3 style={{fontWeight:700,fontSize:"1.0rem",marginBottom:8,fontFamily:"'DM Sans',sans-serif"}}>{mod.title}</h3>
    <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:8,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:mod.grad,borderRadius:4,transition:"width 0.4s"}}/></div>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",color:"rgba(255,255,255,0.35)"}}><span>{n}/{mod.lessons.length}</span><span>{pct}%</span></div>
  </div>);
}

function Home({xp,done,quizLog,setPage}){
  const total=MODULES.reduce((s,m)=>s+m.lessons.length,0);
  const pct=total?Math.round(done.length/total*100):0;
  return(<div style={{overflowX:"hidden",width:"100%"}}>
    <section className="hero-section">
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 50% at 30% 20%,rgba(34,211,238,0.06) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 70% 80%,rgba(59,130,246,0.06) 0%,transparent 60%)",pointerEvents:"none"}}/>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">⭐ AI-Powered Biomedical Engineering Platform</div>
          <h1 className="hero-title">Master <span className="gradient-text">Biomedical Engineering</span></h1>
          <p className="hero-p">Explore MRI physics, tissue engineering, neural BCIs, and more — guided by an AI tutor in real time.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={()=>setPage("courses")}>Explore Courses →</button>
            <button className="btn-secondary" onClick={()=>setPage("tutor")}>🤖 AI Tutor</button>
          </div>
          <div className="hero-tags">
            {["🩻 Medical Imaging","🦴 Biomechanics","🧬 Tissue Engineering","🧠 Neural Engineering","📡 Biosensors","💻 Bioinformatics"].map(t=>(<span key={t} className="hero-tag">{t}</span>))}
          </div>
        </div>
        <div className="hero-visual">
          <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.35)",fontWeight:700,letterSpacing:"0.1em",marginBottom:12,textTransform:"uppercase"}}>Your Starting Point</div>
          {[["0","XP Earned","#facc15"],[`0/${total}`,"Lessons Done","#22d3ee"],["0","Quizzes Done","#a78bfa"],["0%","Progress","#34d399"]].map(([v,l,c])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"}}>{l}</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"1.0rem",background:`linear-gradient(135deg,${c},rgba(255,255,255,0.9))`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</span>
            </div>
          ))}
          <button className="btn-primary" onClick={()=>setPage("courses")} style={{width:"100%",marginTop:14,textAlign:"center",display:"block"}}>Start Learning →</button>
        </div>
      </div>
    </section>
    <section className="page-section-alt"><div className="content-wrap">
        <h2 className="section-title" style={{textAlign:"center",marginBottom:6}}>How It Works</h2>
        <p className="section-sub" style={{textAlign:"center",marginBottom:22}}>Everything you need to master biomedical engineering</p>
        <div className="feature-grid">
          {[{e:"🤖",t:"AI Tutor",d:"Ask anything, get expert explanations instantly.",g:"#22d3ee,#3b82f6"},{e:"📚",t:"Structured Courses",d:"Beginner, Intermediate & Advanced tracks.",g:"#34d399,#0d9488"},{e:"🧪",t:"Interactive Quizzes",d:"125+ questions with detailed breakdowns.",g:"#a78bfa,#7c3aed"},{e:"⚡",t:"Track Progress",d:"Earn XP, complete lessons, grow your stats.",g:"#fb923c,#ef4444"}].map(f=>(
            <div key={f.t} style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:18}}>
              <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${f.g})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",marginBottom:10}}>{f.e}</div>
              <h3 style={{fontWeight:700,marginBottom:5,fontSize:"1.0rem",fontFamily:"'DM Sans',sans-serif"}}>{f.t}</h3>
              <p style={{color:"rgba(255,255,255,0.38)",fontSize:"0.84rem",lineHeight:1.55}}>{f.d}</p>
            </div>
          ))}
        </div>
    </div></section>

    <section className="page-section"><div className="content-wrap">
      <div style={{textAlign:"center",marginBottom:18}}><h2 className="section-title">Featured Modules</h2><p className="section-sub">Start your journey with these popular courses</p><button onClick={()=>setPage("courses")} style={{background:"none",border:"none",color:"#22d3ee",cursor:"pointer",fontSize:"0.8rem",whiteSpace:"nowrap",marginTop:6}}>View all →</button></div>
      <div className="module-grid">{MODULES.slice(0,3).map(m=><ModCard key={m.id} mod={m} done={done} onClick={()=>setPage("courses")}/>)}</div>
    </div></section>

    <section className="page-section" style={{textAlign:"center",background:"linear-gradient(135deg,rgba(34,211,238,0.04) 0%,rgba(96,165,250,0.04) 50%,rgba(167,139,250,0.04) 100%)"}}><div className="content-wrap" style={{maxWidth:560}}>
        <p style={{fontSize:"0.65rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(34,211,238,0.55)",marginBottom:6}}>Why It Matters</p>
        <h2 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"clamp(1rem,3vw,1.3rem)",letterSpacing:"-0.01em",marginBottom:8,lineHeight:1.25}}>The Future of Medicine<br/><span style={{background:"linear-gradient(90deg,#22d3ee,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Needs Engineers</span></h2>
        <p style={{color:"rgba(255,255,255,0.38)",fontSize:"0.78rem",lineHeight:1.6,marginBottom:14}}>Biomedical engineering bridges medicine and technology.<br/>Start building your expertise today.</p>
        <button className="btn-primary" onClick={()=>setPage("courses")} style={{padding:"8px 20px",fontSize:"0.82rem"}}>Get Started Free →</button>
    </div></section>
  </div>);
}

function Courses({done,quizLog,completeLesson,logQuiz}){
  const[view,setView]=useState("list");
  const[activeMod,setActiveMod]=useState(null);
  const[quizState,setQuizState]=useState(null);
  if(view==="quiz"&&activeMod)return<Quiz mod={activeMod} qs={quizState} setQs={setQuizState} logQuiz={logQuiz} onBack={()=>setView("module")} onDone={()=>{setView("module");setQuizState(null);}}/>;
  if(view==="module"&&activeMod){const mql=quizLog.filter(q=>q.moduleId===activeMod.id);return<ModDetail mod={activeMod} done={done} completeLesson={completeLesson} quizLog={mql} onBack={()=>setView("list")} onStartQuiz={()=>{setQuizState({idx:0,answers:[],score:0,selected:null,done:false});setView("quiz");}}/>;
  }
  return(<div style={{maxWidth:920,margin:"0 auto",padding:"28px 20px"}}><h1 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"1.2rem",fontWeight:700,marginBottom:4}}>All Courses</h1><p className="section-sub" style={{marginBottom:20}}>Select a module to start learning and earning XP</p><div className="module-grid">{MODULES.map(m=><ModCard key={m.id} mod={m} done={done} onClick={()=>{setActiveMod(m);setView("module");}}/>)}</div></div>);
}

function ModDetail({mod,done,completeLesson,quizLog,onBack,onStartQuiz}){
  const n=mod.lessons.filter(l=>done.includes(l.id)).length;
  const pct=Math.round(n/mod.lessons.length*100);
  const best=quizLog.length?Math.max(...quizLog.map(q=>Math.round(q.score/q.total*100))):null;
  return(<div style={{maxWidth:760,margin:"0 auto",padding:"28px 16px"}}>
    <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:7,background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",marginBottom:18,fontSize:"0.82rem"}}>← Back to Courses</button>
    <div style={{borderRadius:16,border:`1px solid ${mod.color}2a`,padding:20,background:`linear-gradient(135deg,${mod.color}0d,${mod.color}06)`,marginBottom:18}}>
      <div style={{fontSize:"1.8rem",marginBottom:8}}>{mod.emoji}</div>
      <h1 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"1.15rem",fontWeight:700,marginBottom:6}}>{mod.title}</h1>
      <div style={{display:"flex",flexWrap:"wrap",gap:10,color:"rgba(255,255,255,0.38)",fontSize:"0.76rem",marginBottom:12}}><span>📖 {mod.lessons.length} lessons</span><span>⏱ {mod.duration}</span><span style={{color:mod.color,fontWeight:600}}>{mod.level}</span></div>
      <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:3,overflow:"hidden",marginBottom:5}}><div style={{height:"100%",width:`${pct}%`,background:mod.grad,borderRadius:3,transition:"width 0.5s"}}/></div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.74rem",color:"rgba(255,255,255,0.35)"}}><span>{n}/{mod.lessons.length} completed</span><span>{pct}%</span></div>
    </div>
    <h2 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:10}}>Lessons</h2>
    <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:20}}>
      {mod.lessons.map((l,i)=>{const isDone=done.includes(l.id);return(
        <div key={l.id} className="lesson-row" style={{border:`1px solid ${isDone?mod.color+"33":"rgba(255,255,255,0.06)"}`}}>
          <div style={{width:24,height:24,borderRadius:"50%",background:isDone?`${mod.color}1a`:"rgba(255,255,255,0.04)",border:`1.5px solid ${isDone?mod.color:"rgba(255,255,255,0.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.68rem",color:isDone?mod.color:"rgba(255,255,255,0.28)",flexShrink:0,fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>{isDone?"✓":i+1}</div>
          <div style={{flex:1,minWidth:0}}><div className="lesson-title" style={{color:isDone?"rgba(255,255,255,0.88)":"rgba(255,255,255,0.65)"}}>{l.title}</div><div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.28)",marginTop:1}}>{l.mins} min</div></div>
          {isDone?<span style={{fontSize:"0.7rem",color:mod.color,fontWeight:600,flexShrink:0}}>✓ Done</span>:<button onClick={()=>completeLesson(l.id)} style={{padding:"4px 10px",borderRadius:7,background:`${mod.color}12`,border:`1px solid ${mod.color}2e`,color:mod.color,fontSize:"0.7rem",cursor:"pointer",fontWeight:600,flexShrink:0,whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>+10 XP</button>}
        </div>
      );})}
    </div>
    <div style={{borderRadius:14,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",gap:14,flexWrap:"wrap"}}>
      <div><h3 style={{fontWeight:700,marginBottom:3,fontSize:"0.9rem"}}>📝 Module Quiz</h3><p style={{color:"rgba(255,255,255,0.38)",fontSize:"0.74rem"}}>{mod.quiz.length} questions • Up to {mod.quiz.length*5+25} XP</p>{best!==null&&<p style={{color:mod.color,fontSize:"0.74rem",marginTop:2}}>Best: {best}%</p>}{quizLog.length>0&&<p style={{color:"rgba(255,255,255,0.25)",fontSize:"0.7rem"}}>Taken {quizLog.length}×</p>}</div>
      <button onClick={onStartQuiz} style={{padding:"9px 16px",borderRadius:10,background:mod.grad,color:"white",border:"none",cursor:"pointer",fontWeight:700,fontSize:"0.8rem",whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>{quizLog.length>0?"Retake Quiz":"Start Quiz"} →</button>
    </div>
  </div>);
}

function Quiz({mod,qs,setQs,logQuiz,onBack,onDone}){
  const q=mod.quiz[qs.idx];
  function pick(i){if(qs.selected!==null)return;const correct=i===q.a;const newAnswers=[...qs.answers,{sel:i,correct}];const newScore=qs.score+(correct?1:0);const last=newAnswers.length===mod.quiz.length;setQs(p=>({...p,selected:i}));setTimeout(()=>{if(last){const xp=25+newScore*5;logQuiz({moduleId:mod.id,score:newScore,total:mod.quiz.length,xp,date:new Date().toISOString()});setQs({...qs,selected:i,answers:newAnswers,score:newScore,done:true,xpEarned:xp});}else{setQs({idx:qs.idx+1,answers:newAnswers,score:newScore,selected:null,done:false});}},750);}
  if(qs.done){const pct=Math.round(qs.score/mod.quiz.length*100);return(<div style={{maxWidth:500,margin:"0 auto",padding:"48px 20px",textAlign:"center"}}><div style={{fontSize:"2.8rem",marginBottom:12}}>{pct>=80?"🎉":pct>=60?"👍":"📚"}</div><h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"1.3rem",fontWeight:700,marginBottom:7}}>Quiz Complete!</h2><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"2.4rem",fontWeight:700,background:`linear-gradient(135deg,${mod.color},white)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:5}}>{pct}%</div><p style={{color:"rgba(255,255,255,0.45)",marginBottom:8,fontSize:"0.85rem"}}>{qs.score}/{mod.quiz.length} correct</p><div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:20,background:"rgba(250,204,21,0.1)",border:"1px solid rgba(250,204,21,0.2)",color:"#facc15",marginBottom:26,fontSize:"0.83rem",fontWeight:600}}>⚡ +{qs.xpEarned} XP earned!</div><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}><button onClick={onDone} style={{padding:"11px 20px",borderRadius:10,background:mod.grad,color:"white",border:"none",cursor:"pointer",fontWeight:700,fontSize:"0.85rem",fontFamily:"'DM Sans',sans-serif"}}>Back to Module</button><button onClick={()=>setQs({idx:0,answers:[],score:0,selected:null,done:false})} style={{padding:"11px 20px",borderRadius:10,background:"rgba(255,255,255,0.05)",color:"white",border:"1px solid rgba(255,255,255,0.1)",cursor:"pointer",fontWeight:700,fontSize:"0.85rem",fontFamily:"'DM Sans',sans-serif"}}>Retake</button></div></div>);}
  return(<div style={{maxWidth:600,margin:"0 auto",padding:"28px 16px"}}>
    <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:7,background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",marginBottom:18,fontSize:"0.82rem"}}>← Back</button>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:"0.74rem"}}>Question {qs.idx+1} of {mod.quiz.length}</span><div style={{display:"flex",gap:4}}>{mod.quiz.map((_,i)=>(<div key={i} style={{width:7,height:7,borderRadius:"50%",background:i<qs.idx?mod.color:i===qs.idx?`${mod.color}70`:"rgba(255,255,255,0.1)",transition:"all 0.3s"}}/>))}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.05)",borderRadius:2,marginBottom:20,overflow:"hidden"}}><div style={{height:"100%",width:`${qs.idx/mod.quiz.length*100}%`,background:mod.grad,borderRadius:2,transition:"width 0.3s"}}/></div>
    <div style={{borderRadius:14,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",padding:18,marginBottom:12}}><p style={{fontSize:"0.93rem",fontWeight:600,lineHeight:1.55}}>{q.q}</p></div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>{q.o.map((opt,i)=>{let bg="rgba(255,255,255,0.02)",bdr="rgba(255,255,255,0.07)",clr="rgba(255,255,255,0.78)";if(qs.selected!==null){if(i===q.a){bg="rgba(52,211,153,0.1)";bdr="#34d399";clr="#34d399";}else if(i===qs.selected&&qs.selected!==q.a){bg="rgba(248,113,113,0.1)";bdr="#f87171";clr="#f87171";}}return(<button key={i} onClick={()=>pick(i)} disabled={qs.selected!==null} className="opt-btn" style={{background:bg,border:`1px solid ${bdr}`,color:clr,cursor:qs.selected!==null?"default":"pointer"}}><span style={{opacity:0.45,marginRight:8,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"0.72rem"}}>{String.fromCharCode(65+i)}.</span>{opt}</button>);})}</div>
  </div>);
}

function Tutor({chat,saveChat}){
  const[msgs,setMsgs]=useState(chat);
  const[input,setInput]=useState("");
  const[busy,setBusy]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,busy]);
  async function send(){if(!input.trim()||busy)return;const u={role:"user",content:input.trim()};const next=[...msgs,u];setMsgs(next);setInput("");setBusy(true);try{const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"llama-3.3-70b-versatile",max_tokens:1000,messages:[{role:"system",content:"You are an expert Biomedical Engineering tutor. Explain concepts clearly using analogies and clinical context. Be concise but thorough."},...next]})});const data=await res.json();const a={role:"assistant",content:data.choices?.[0]?.message?.content??"Error retrieving response."};const final=[...next,a];setMsgs(final);saveChat(final);}catch{const final=[...next,{role:"assistant",content:"Connection error. Please try again."}];setMsgs(final);}finally{setBusy(false);}}
  const prompts=["Explain MRI physics simply","How do cochlear implants work?","What is CRISPR in BME?","CT vs PET scans?"];
  return(<div className="tutor-wrap">
    <div style={{marginBottom:12,flexShrink:0}}><h1 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"1.1rem",fontWeight:700,marginBottom:2}}>🤖 AI Tutor</h1><p style={{color:"rgba(255,255,255,0.35)",fontSize:"0.74rem"}}>Ask anything • Conversation saved automatically</p></div>
    <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingBottom:8,minHeight:0}}>
      {msgs.length===0&&<div style={{textAlign:"center",paddingTop:40}}><div style={{fontSize:"2.2rem",marginBottom:12}}>🧬</div><h3 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,marginBottom:6,fontSize:"0.9rem"}}>Ask me anything about BME</h3><p style={{color:"rgba(255,255,255,0.3)",fontSize:"0.78rem",marginBottom:18}}>Your personal Biomedical Engineering tutor</p><div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",padding:"0 10px"}}>{prompts.map(p=>(<button key={p} onClick={()=>setInput(p)} style={{padding:"7px 12px",borderRadius:20,background:"rgba(34,211,238,0.07)",border:"1px solid rgba(34,211,238,0.18)",color:"#22d3ee",fontSize:"0.74rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{p}</button>))}</div></div>}
      {msgs.map((m,i)=>(<div key={i} className="msg" style={{display:"flex",gap:8,justifyContent:m.role==="user"?"flex-end":"flex-start"}}>{m.role==="assistant"&&<div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#22d3ee,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",flexShrink:0,marginTop:2}}>🤖</div>}<div style={{maxWidth:"82%",padding:"10px 13px",fontSize:"0.855rem",lineHeight:1.6,borderRadius:m.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",background:m.role==="user"?"linear-gradient(135deg,rgba(34,211,238,0.12),rgba(59,130,246,0.12))":"rgba(255,255,255,0.035)",border:`1px solid ${m.role==="user"?"rgba(34,211,238,0.18)":"rgba(255,255,255,0.06)"}`,color:"rgba(255,255,255,0.88)",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{m.content}</div></div>))}
      {busy&&<div style={{display:"flex",gap:8}}><div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#22d3ee,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",flexShrink:0}}>🤖</div><div style={{padding:"10px 14px",borderRadius:"14px 14px 14px 3px",background:"rgba(255,255,255,0.035)",border:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:5,alignItems:"center"}}>{[0,1,2].map(j=><div key={j} style={{width:5,height:5,borderRadius:"50%",background:"#22d3ee",animation:`bounce 1s ${j*0.18}s infinite`}}/>)}</div></div>}
      <div ref={bottomRef}/>
    </div>
    <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:10,flexShrink:0}}>
      {msgs.length>0&&<button onClick={()=>{setMsgs([]);saveChat([]);}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.2)",fontSize:"0.7rem",cursor:"pointer",marginBottom:7,display:"block",fontFamily:"'DM Sans',sans-serif"}}>🗑 Clear history</button>}
      <div style={{display:"flex",gap:8,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,padding:"8px 12px",alignItems:"flex-end"}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask about MRI, BCIs, biosensors…" rows={2} style={{flex:1,background:"none",border:"none",color:"white",resize:"none",fontSize:"0.875rem",outline:"none",lineHeight:1.5,fontFamily:"'DM Sans',sans-serif",minHeight:42}}/>
        <button onClick={send} disabled={busy||!input.trim()} style={{width:36,height:36,borderRadius:9,flexShrink:0,background:input.trim()&&!busy?"linear-gradient(135deg,#22d3ee,#3b82f6)":"rgba(255,255,255,0.04)",border:"none",cursor:input.trim()&&!busy?"pointer":"default",color:"white",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>→</button>
      </div>
    </div>
  </div>);
}

function MindMap(){
  const topics=[{cat:"Medical Imaging",color:"#22d3ee",items:["MRI Physics","CT Reconstruction","Ultrasound","PET/SPECT","X-Ray","Fluoroscopy","Contrast Agents","Image Segmentation"]},{cat:"Biomechanics",color:"#34d399",items:["Young's Modulus","Bone Fracture","Joint Kinematics","Gait Analysis","Prosthetics","Orthotics","Fluid Mechanics","Viscoelasticity"]},{cat:"Tissue Engineering",color:"#a78bfa",items:["Stem Cells","Scaffolds","Bioprinting","Organoids","Bioreactors","Growth Factors","CRISPR","Biocompatibility"]},{cat:"Neural Engineering",color:"#60a5fa",items:["Action Potentials","EEG/ECoG","BCIs","DBS Therapy","Cochlear Implants","Retinal Implants","Neural Probes","Optogenetics"]},{cat:"Biosensors & Devices",color:"#fb923c",items:["Glucose Sensors","Wearables","Lab-on-Chip","Microfluidics","Impedance Spectroscopy","Optical Biosensors","Point-of-Care","FDA Regulation"]},{cat:"Bioinformatics",color:"#f472b6",items:["Genomics","Proteomics","Protein Folding","Sequence Alignment","ML in BME","Drug Discovery","Systems Biology","CRISPR/Cas9"]},{cat:"Rehab Engineering",color:"#facc15",items:["Exoskeletons","Powered Prosthetics","Functional Stimulation","AFOs","Motor Rehab","EMG Control","Upper Limb","Lower Limb"]},{cat:"Regulatory & Ethics",color:"#94a3b8",items:["FDA PMA","510(k) Clearance","ISO 13485","Clinical Trials","Bioethics","Data Privacy","IP in BME","Post-Market"]}];
  return(<div style={{maxWidth:1060,margin:"0 auto",padding:"28px 16px"}}><h1 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"1.2rem",fontWeight:700,marginBottom:4}}>🗺️ Mind Map</h1><p className="section-sub" style={{marginBottom:20}}>All biomedical engineering topics at a glance</p><div className="module-grid">{topics.map(t=>(<div key={t.cat} style={{borderRadius:12,border:`1px solid ${t.color}20`,background:`${t.color}06`,padding:14}}><h3 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"0.82rem",color:t.color,marginBottom:8}}>{t.cat}</h3><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{t.items.map(item=>(<span key={item} style={{padding:"3px 9px",borderRadius:20,background:`${t.color}10`,border:`1px solid ${t.color}25`,color:"rgba(255,255,255,0.62)",fontSize:"0.7rem"}}>{item}</span>))}</div></div>))}</div></div>);
}
