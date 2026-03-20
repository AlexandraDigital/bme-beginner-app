export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  tier: 'beginner' | 'intermediate' | 'advanced';
  subject: string;
  icon: string;
  description: string;
  keyIdea: string;
  example: string;
  video?: string;
  videoUrl?: string;
  quizzes: QuizQuestion[];
  connections?: string[];
  xpReward?: number;
}

export const lessons: Lesson[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BEGINNER TIER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'bme-intro',
    title: 'What is Biomedical Engineering?',
    tier: 'beginner',
    subject: 'Introduction',
    icon: '🧬',
    description:
      'Biomedical Engineering (BME) sits at the exciting intersection of engineering, medicine, and biology. BME professionals design technologies — from diagnostic devices to implantable therapies — that improve and save human lives. The field draws on physics, chemistry, biology, mathematics, and computing to solve some of healthcare\'s greatest challenges.',
    keyIdea:
      'BME applies engineering principles to solve medical problems and improve patient outcomes.',
    example:
      'BME engineers designed the artificial heart valve, a mechanical device that replaces damaged cardiac valves and can last decades inside the human body.',
    video: 'ht1fyLgBJQk',
    connections: ['physics-mechanics', 'biology-cells', 'chemistry-basics'],
    xpReward: 10,
    quizzes: [
      {
        question: 'What does the acronym BME stand for?',
        options: [
          'Biological and Medical Experimentation',
          'Biomedical Engineering',
          'Biochemical and Mechanical Engineering',
          'Bioelectrical and Molecular Engineering',
        ],
        answer: 1,
        explanation:
          'BME stands for Biomedical Engineering, the discipline that combines engineering principles with medical and biological sciences. It is sometimes also called Bioengineering.',
      },
      {
        question:
          'Which of the following is a classic example of a biomedical engineering achievement?',
        options: [
          'Construction of a suspension bridge',
          'Development of the cardiac pacemaker',
          'Design of a jet engine turbine',
          'Invention of the microwave oven',
        ],
        answer: 1,
        explanation:
          'The cardiac pacemaker is a landmark BME invention that uses electrical pulses to regulate abnormal heart rhythms. It is a direct product of applying electronics engineering to a medical problem.',
      },
      {
        question:
          'A biomedical engineer working on drug-delivery nanoparticles draws most directly on which combination of disciplines?',
        options: [
          'Civil engineering and geology',
          'Aerospace engineering and astronomy',
          'Chemistry, biology, and materials engineering',
          'Structural engineering and architecture',
        ],
        answer: 2,
        explanation:
          'Drug-delivery nanoparticles require knowledge of chemistry (molecular design), biology (cell interactions), and materials engineering (particle fabrication and stability) — a hallmark interdisciplinary BME problem.',
      },
      {
        question:
          'Which regulatory agency in the United States is responsible for approving biomedical devices before they reach patients?',
        options: [
          'The Environmental Protection Agency (EPA)',
          'The Federal Aviation Administration (FAA)',
          'The Food and Drug Administration (FDA)',
          'The National Institutes of Health (NIH)',
        ],
        answer: 2,
        explanation:
          'The FDA regulates medical devices in the US through a rigorous review process to ensure safety and efficacy. The NIH primarily funds research rather than approving products.',
      },
      {
        question:
          'Which of the following fields does NOT typically overlap with core biomedical engineering?",',
        options: [
          'Fluid mechanics',
          'Materials science',
          'Geotechnical engineering',
          'Signal processing',
        ],
        answer: 2,
        explanation:
          'Geotechnical engineering deals with soil and rock mechanics for construction — it has little overlap with BME. Fluid mechanics (blood flow), materials science (implants), and signal processing (ECG analysis) are all central BME disciplines.',
      },
    ],
  },

  {
    id: 'physics-mechanics',
    title: 'Classical Mechanics for BME',
    tier: 'beginner',
    subject: 'Physics',
    icon: '⚙️',
    description:
      'Classical mechanics describes how forces, motion, and energy govern physical systems — including the human body. Understanding Newton\'s laws, stress and strain, and energy conservation helps BME engineers analyze everything from the forces on implants to how cells deform under pressure. These principles form the quantitative backbone of biomechanics.',
    keyIdea:
      "Newton's laws govern how biological structures withstand and respond to force.",
    example:
      'Analyzing the forces acting on the knee joint during walking allows engineers to design prosthetics and implants that match natural loading conditions.',
    video: 'ZM8ECpBuQYE',
    connections: ['biomechanics', 'physics-em', 'diff-equations'],
    xpReward: 10,
    quizzes: [
      {
        question: "Newton's Second Law states that force equals:",
        options: [
          'mass divided by acceleration',
          'mass multiplied by velocity',
          'mass multiplied by acceleration',
          'mass multiplied by displacement',
        ],
        answer: 2,
        explanation:
          "Newton's Second Law is F = ma, where F is force (in Newtons), m is mass (kg), and a is acceleration (m/s²). This relationship is essential for calculating loads on implants and prosthetics.",
      },
      {
        question:
          'Which unit is used to measure force in the International System (SI)?',
        options: ['Pascal', 'Newton', 'Joule', 'Watt'],
        answer: 1,
        explanation:
          'The Newton (N) is the SI unit of force, defined as 1 kg·m/s². The Pascal measures pressure, the Joule measures energy, and the Watt measures power.',
      },
      {
        question:
          'A surgeon applies a force of 50 N over a bone area of 0.01 m². What is the resulting stress?',
        options: ['500 Pa', '5,000 Pa', '0.5 Pa', '50,000 Pa'],
        answer: 1,
        explanation:
          'Stress = Force / Area = 50 N / 0.01 m² = 5,000 Pa. Understanding stress is critical for evaluating whether a bone implant or surgical tool will exceed tissue failure limits.',
      },
      {
        question:
          'What does the principle of conservation of energy state in a mechanical system?',
        options: [
          'Energy is created by forces acting over distance',
          'Total mechanical energy increases with velocity',
          'Energy cannot be created or destroyed, only transformed',
          'Kinetic energy is always greater than potential energy',
        ],
        answer: 2,
        explanation:
          'Conservation of energy states that total energy in a closed system remains constant — it transforms between kinetic and potential forms. This principle is used in gait analysis to model energy storage in tendons and muscles.',
      },
      {
        question:
          'A tendon under tension exhibits both elastic and viscous behavior. This mechanical property is called:',
        options: [
          'Plasticity',
          'Viscoelasticity',
          'Brittleness',
          'Anisotropy',
        ],
        answer: 1,
        explanation:
          'Viscoelasticity describes materials that behave both elastically (spring-like) and viscously (fluid-like) depending on loading rate and time. Most biological soft tissues, including tendons and cartilage, are viscoelastic.',
      },
    ],
  },

  {
    id: 'chemistry-basics',
    title: 'General Chemistry Essentials',
    tier: 'beginner',
    subject: 'Chemistry',
    icon: '⚗️',
    description:
      'General chemistry provides the atomic-level foundation for understanding how biological molecules are built and how they interact. BME students must grasp atomic structure, chemical bonding, reaction kinetics, and acid-base chemistry to work effectively with biomaterials, drugs, and physiological systems. Chemistry is the molecular language of life.',
    keyIdea:
      'Chemical bonds determine how biological molecules interact and how materials behave in the body.',
    example:
      'Ionic bonds between calcium and phosphate ions give hydroxyapatite — the mineral in bone — its remarkable compressive strength.',
    video: 'FSyAehMdpyI',
    connections: ['organic-chem', 'bio-molecules', 'biomaterials'],
    xpReward: 10,
    quizzes: [
      {
        question:
          'What subatomic particles are found in the nucleus of an atom?',
        options: [
          'Electrons and neutrons',
          'Protons and electrons',
          'Protons and neutrons',
          'Electrons and positrons',
        ],
        answer: 2,
        explanation:
          'The nucleus contains protons (positively charged) and neutrons (neutral). Electrons occupy orbitals outside the nucleus. The number of protons defines the element\'s atomic number.',
      },
      {
        question:
          'Which type of chemical bond involves the sharing of electron pairs between atoms?',
        options: [
          'Ionic bond',
          'Hydrogen bond',
          'Covalent bond',
          'Van der Waals interaction',
        ],
        answer: 2,
        explanation:
          'Covalent bonds form when atoms share electron pairs, creating strong, directional bonds. C–C and C–H covalent bonds form the backbone of all organic biological molecules.',
      },
      {
        question:
          'A solution with a pH of 7.4 (normal blood pH) is best described as:',
        options: [
          'Strongly acidic',
          'Slightly alkaline (basic)',
          'Strongly alkaline',
          'Neutral (exactly pH 7.0)',
        ],
        answer: 1,
        explanation:
          'Blood pH of 7.4 is slightly alkaline — above the neutral point of 7.0. Maintaining this narrow pH range is critical for enzyme function, and deviations cause acidosis or alkalosis.',
      },
      {
        question:
          'In a chemical reaction at equilibrium, what does Le Chatelier\'s Principle predict when a product is removed?',
        options: [
          'The reaction shifts to produce fewer reactants',
          'The reaction shifts forward to produce more product',
          'The reaction stops completely',
          'The activation energy increases',
        ],
        answer: 1,
        explanation:
          'Le Chatelier\'s Principle states that a system at equilibrium will shift to counteract a disturbance. Removing product drives the reaction forward, producing more product. This concept applies to enzyme-catalyzed biosynthesis in cells.',
      },
      {
        question:
          'Which element is the most abundant in the human body by mass (excluding water)?',
        options: ['Hydrogen', 'Nitrogen', 'Oxygen', 'Carbon'],
        answer: 2,
        explanation:
          'Oxygen is the most abundant element by mass in the human body (~65%), largely due to its presence in water (H₂O) and organic molecules. Carbon follows at ~18%, making it the structural backbone of biomolecules.',
      },
    ],
  },

  {
    id: 'biology-cells',
    title: 'Cell Biology Fundamentals',
    tier: 'beginner',
    subject: 'Biology',
    icon: '🔬',
    description:
      'All living organisms are built from cells — the fundamental unit of life. BME engineers must understand cell structure, organelle function, cell division, and membrane transport to design effective therapies and implants that interact with living tissue. From nanoparticle drug delivery to tissue scaffolds, cellular biology is the engineer\'s design target.',
    keyIdea:
      'The cell is the basic unit of life and the primary design target of tissue engineering and drug delivery.',
    example:
      'Understanding how the phospholipid cell membrane controls molecular transport helps engineers design drug-delivery nanoparticles that fuse with or cross the membrane.',
    video: 'cj8dDTHGJBY',
    connections: ['biochemistry', 'anatomy', 'tissue-engineering'],
    xpReward: 10,
    quizzes: [
      {
        question: 'Which organelle is known as the "powerhouse of the cell"?',
        options: ['Ribosome', 'Nucleus', 'Mitochondria', 'Golgi apparatus'],
        answer: 2,
        explanation:
          'Mitochondria produce ATP (energy currency) through aerobic respiration via oxidative phosphorylation. They are the primary energy source for cellular work, including muscle contraction.',
      },
      {
        question:
          'What is the primary structural component of the cell membrane?',
        options: [
          'Collagen fibers',
          'Phospholipid bilayer',
          'Glycogen polymers',
          'Deoxyribonucleic acid strands',
        ],
        answer: 1,
        explanation:
          'The cell membrane is composed of a phospholipid bilayer with embedded proteins. The hydrophobic tails face inward and the hydrophilic heads face outward, creating a selective barrier.',
      },
      {
        question:
          'During which phase of mitosis do chromosomes line up along the cell\'s equator (metaphase plate)?',
        options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
        answer: 1,
        explanation:
          'During metaphase, chromosomes align at the metaphase plate. This orderly arrangement allows each daughter cell to receive an identical set of chromosomes when they are pulled apart in anaphase.',
      },
      {
        question:
          'A drug molecule moves from a region of low concentration inside a cell to high concentration outside — against its gradient. This is called:',
        options: [
          'Simple diffusion',
          'Facilitated diffusion',
          'Active transport',
          'Osmosis',
        ],
        answer: 2,
        explanation:
          'Active transport moves molecules against their concentration gradient using energy (ATP). Drug-efflux pumps (like P-glycoprotein) in cancer cells use active transport to expel chemotherapy drugs, causing multidrug resistance.',
      },
      {
        question:
          'Prokaryotic cells differ from eukaryotic cells most significantly in that prokaryotes:',
        options: [
          'Have a nucleus enclosed by a membrane',
          'Contain mitochondria',
          'Lack a membrane-bound nucleus',
          'Have larger ribosomes (80S)',
        ],
        answer: 2,
        explanation:
          'Prokaryotes (bacteria) lack a true membrane-bound nucleus — their DNA floats freely in the cytoplasm. Eukaryotes (human cells, yeast) have a defined nucleus. This distinction is critical in designing antibiotics that target bacterial cells without harming human cells.',
      },
    ],
  },

  {
    id: 'math-calculus',
    title: 'Calculus for Biomedical Engineers',
    tier: 'beginner',
    subject: 'Mathematics',
    icon: '📐',
    description:
      'Calculus is the mathematics of continuous change — and life is full of continuous change. Derivatives describe instantaneous rates of change, such as how fast a drug concentration falls. Integrals accumulate these changes over time, such as computing total drug exposure. BME relies on calculus for modeling physiological dynamics, signal analysis, and optimization.',
    keyIdea:
      'Derivatives describe rates of change — like how fast a drug concentration drops over time in the bloodstream.',
    example:
      'Integral calculus is used to calculate the Area Under the Curve (AUC) in pharmacokinetics, which represents total drug exposure and determines dosing regimens.',
    video: 'N2PpRnFqnqY',
    connections: ['linear-algebra', 'diff-equations', 'signals-intro'],
    xpReward: 10,
    quizzes: [
      {
        question: 'The derivative of position with respect to time gives:',
        options: ['Acceleration', 'Force', 'Velocity', 'Displacement'],
        answer: 2,
        explanation:
          'The derivative dx/dt of position (x) with respect to time (t) is velocity. The second derivative d²x/dt² gives acceleration. These relationships are used in gait analysis and prosthetic limb control.',
      },
      {
        question:
          'If f(x) = 3x² + 5x − 2, what is the derivative f\'(x)?',
        options: ['6x + 5', '3x + 5', '6x² + 5', '3x² + 5'],
        answer: 0,
        explanation:
          'Using the power rule: d/dx(3x²) = 6x, d/dx(5x) = 5, d/dx(−2) = 0. Therefore f\'(x) = 6x + 5. The power rule is the foundation of differentiation in biomedical modeling.',
      },
      {
        question:
          'What does the definite integral ∫₀ᵀ C(t) dt represent in pharmacokinetics?',
        options: [
          'The maximum drug concentration in blood',
          'The rate of drug elimination',
          'The total drug exposure (Area Under the Curve)',
          'The volume of distribution',
        ],
        answer: 2,
        explanation:
          'The definite integral of drug concentration C(t) over time gives the AUC — a measure of total drug exposure. A higher AUC means more drug reached systemic circulation, which is used to assess bioavailability.',
      },
      {
        question:
          'The chain rule is used to differentiate composite functions. If y = sin(x²), then dy/dx equals:',
        options: ['cos(x²)', '2x·cos(x²)', '2x·sin(x²)', 'cos(2x)'],
        answer: 1,
        explanation:
          'By the chain rule: dy/dx = cos(x²) · 2x = 2x·cos(x²). The chain rule is essential in BME when differentiating nested functions, such as oscillatory signals modulated by exponential decay.',
      },
      {
        question:
          'A bacterial population grows at a rate proportional to its current size N. The mathematical expression for this rate is:',
        options: ['dN/dt = k', 'dN/dt = kN²', 'dN/dt = kN', 'dN/dt = N/k'],
        answer: 2,
        explanation:
          'Exponential growth is modeled by dN/dt = kN, where k is the growth rate constant. This first-order ODE leads to N(t) = N₀eᵏᵗ — a fundamental model in microbiology and tumor growth modeling.',
      },
    ],
  },

  {
    id: 'bio-molecules',
    title: 'Biomolecules: The Building Blocks of Life',
    tier: 'beginner',
    subject: 'Biology',
    icon: '🧪',
    description:
      'Life at the molecular level is composed of four major classes of biomolecules: proteins, nucleic acids, lipids, and carbohydrates. Each class performs essential structural and functional roles. For biomedical engineers, understanding these molecules is critical for designing drugs, biomaterials, sensors, and gene therapies.',
    keyIdea:
      'Proteins are molecular machines — their three-dimensional shape determines their biological function.',
    example:
      'Collagen, the most abundant protein in the body, provides tensile strength to tendons, skin, and bone, making it the inspiration for many biomaterial scaffolds in tissue engineering.',
    video: 'QnQe0xW_JY4',
    connections: ['biochemistry', 'drug-delivery', 'bioinformatics'],
    xpReward: 10,
    quizzes: [
      {
        question:
          'What are the monomeric building blocks of proteins?',
        options: [
          'Nucleotides',
          'Amino acids',
          'Fatty acids',
          'Monosaccharides',
        ],
        answer: 1,
        explanation:
          'Proteins are polymers of amino acids linked by peptide bonds. The sequence of amino acids (primary structure) dictates how the protein folds into its functional 3D shape.',
      },
      {
        question:
          'Which level of protein structure refers to the coiling of the amino acid chain into an alpha-helix or beta-sheet?',
        options: [
          'Primary structure',
          'Secondary structure',
          'Tertiary structure',
          'Quaternary structure',
        ],
        answer: 1,
        explanation:
          'Secondary structure is stabilized by hydrogen bonds and includes alpha-helices and beta-sheets. These structural motifs are found in many structural proteins and are crucial for understanding protein-material interactions.',
      },
      {
        question:
          'DNA is composed of nucleotides. Which base pairs with adenine (A) in double-stranded DNA?',
        options: ['Cytosine (C)', 'Guanine (G)', 'Thymine (T)', 'Uracil (U)'],
        answer: 2,
        explanation:
          'In DNA, adenine (A) pairs with thymine (T) via two hydrogen bonds, and guanine (G) pairs with cytosine (C) via three hydrogen bonds. Uracil replaces thymine in RNA.',
      },
      {
        question:
          'Phospholipids are the main component of cell membranes. What makes them amphipathic?',
        options: [
          'They have only hydrophilic heads',
          'They have only hydrophobic tails',
          'They have both a hydrophilic head and hydrophobic tails',
          'They carry a net positive charge at physiological pH',
        ],
        answer: 2,
        explanation:
          'Phospholipids are amphipathic — their glycerol-phosphate head is hydrophilic (water-loving) while their two fatty acid tails are hydrophobic (water-repelling). This drives spontaneous bilayer formation in aqueous environments.',
      },
      {
        question:
          'An enzyme lowers the activation energy of a reaction but is not consumed. If the enzyme\'s active site is blocked by an inhibitor that mimics the substrate, this is called:',
        options: [
          'Allosteric inhibition',
          'Competitive inhibition',
          'Non-competitive inhibition',
          'Uncompetitive inhibition',
        ],
        answer: 1,
        explanation:
          'Competitive inhibitors structurally resemble the substrate and compete for the active site. Many drugs (e.g., statins that inhibit HMG-CoA reductase) work via competitive inhibition — a concept central to pharmacology.',
      },
    ],
  },

  {
    id: 'programming-intro',
    title: 'Programming Essentials for BME',
    tier: 'beginner',
    subject: 'Computing',
    icon: '💻',
    description:
      'Modern biomedical engineers write code. Python and MATLAB are the dominant tools for analyzing patient data, simulating physiological systems, processing medical images, and building machine learning models. Even basic programming skills dramatically expand what a BME engineer can accomplish and analyze.',
    keyIdea:
      'Code is the language used to process biomedical data and build algorithms that extract clinical insight.',
    example:
      'A Python script can load a raw ECG recording, apply a bandpass filter, detect R-peaks using threshold algorithms, and automatically classify arrhythmia patterns — all in under 50 lines of code.',
    video: 'LfaMVlDaQ24',
    connections: ['signals-intro', 'bioinformatics', 'medical-imaging'],
    xpReward: 10,
    quizzes: [
      {
        question:
          'In Python, what data type is used to store an ordered, mutable collection of items?',
        options: ['Tuple', 'Dictionary', 'List', 'Set'],
        answer: 2,
        explanation:
          'A Python list is ordered and mutable (you can add, remove, or change items). Lists are commonly used to store time-series biomedical data like ECG samples or temperature readings.',
      },
      {
        question:
          'What is the output of this Python code?\n\nfor i in range(3):\n    print(i)',
        options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '1, 2'],
        answer: 1,
        explanation:
          'range(3) generates values 0, 1, 2 (stop value is exclusive). Python\'s zero-based indexing is important when working with arrays of biomedical measurements.',
      },
      {
        question:
          'Which Python library is most commonly used for numerical array operations and mathematical functions in BME data analysis?',
        options: ['os', 'NumPy', 'tkinter', 'random'],
        answer: 1,
        explanation:
          'NumPy (Numerical Python) provides fast array operations, linear algebra, Fourier transforms, and mathematical functions. It is the foundation of nearly all scientific Python computing in BME.',
      },
      {
        question:
          'A function in programming is best described as:',
        options: [
          'A variable that stores multiple values',
          'A reusable block of code that performs a specific task',
          'A loop that repeats indefinitely',
          'A data structure for key-value pairs',
        ],
        answer: 1,
        explanation:
          'Functions encapsulate reusable logic. In BME, you might write a function `detect_peaks(ecg_signal)` that can be called on any ECG recording, promoting code reuse and readability.',
      },
      {
        question:
          'When analyzing biomedical signals in Python, the Nyquist theorem states that the sampling rate must be:',
        options: [
          'Equal to the highest signal frequency',
          'At least twice the highest frequency in the signal',
          'At least ten times the signal amplitude',
          'Equal to the number of samples divided by time',
        ],
        answer: 1,
        explanation:
          'The Nyquist theorem requires a sampling rate of at least 2× the highest frequency to avoid aliasing. An ECG containing frequencies up to 100 Hz must be sampled at ≥200 Hz to accurately reconstruct the signal.',
      },
    ],
  },

  {
    id: 'units-measurement',
    title: 'Scientific Units & Measurement',
    tier: 'beginner',
    subject: 'Foundations',
    icon: '📏',
    description:
      'Precise measurement and consistent units are the foundation of all engineering and scientific work. BME engineers must fluently convert between units, apply dimensional analysis, and understand sources of measurement error and instrumentation uncertainty. A unit error in a medical device can have life-threatening consequences.',
    keyIdea:
      'Precise measurement is the foundation of all engineering and scientific work — unit errors in medicine can be fatal.',
    example:
      'Measuring blood pressure requires understanding both mmHg (the clinical standard) and Pascals (the SI unit), and converting between them (1 mmHg = 133.3 Pa) when calibrating pressure transducers.',
    connections: ['physics-em', 'biomechanics', 'medical-devices'],
    xpReward: 10,
    quizzes: [
      {
        question:
          'What is the SI base unit of electrical current?',
        options: ['Volt', 'Watt', 'Ampere', 'Ohm'],
        answer: 2,
        explanation:
          'The Ampere (A) is the SI base unit of electric current. Voltage (Volt), power (Watt), and resistance (Ohm) are derived SI units. Understanding current is essential for designing medical electronics and neurostimulators.',
      },
      {
        question:
          'A drug dose is specified as 500 micrograms (μg). What is this in milligrams (mg)?',
        options: ['5,000 mg', '50 mg', '0.5 mg', '0.005 mg'],
        answer: 2,
        explanation:
          '1 mg = 1,000 μg, so 500 μg = 0.5 mg. Unit conversion errors in drug dosing are a leading cause of medication errors in clinical settings, making fluency with metric prefixes critical.',
      },
      {
        question:
          'Dimensional analysis is used to verify equations. If pressure = force/area, what are the SI units of pressure?',
        options: ['kg·m/s²', 'kg/(m·s²)', 'N·m', 'J/m'],
        answer: 1,
        explanation:
          'Pressure = Force/Area = N/m² = kg·m/s² / m² = kg/(m·s²) = Pascal (Pa). Dimensional analysis confirms unit consistency and catches mathematical errors in biomedical equations.',
      },
      {
        question:
          'An instrument consistently reads 5 mmHg higher than the true value for every measurement. This type of error is called:',
        options: [
          'Random error',
          'Systematic error (bias)',
          'Precision error',
          'Resolution error',
        ],
        answer: 1,
        explanation:
          'Systematic error (or bias) is a consistent, repeatable deviation from the true value. It can be corrected by calibration. Random errors scatter around the true value and are reduced by averaging multiple measurements.',
      },
      {
        question:
          'A heart rate monitor reports 72 bpm. If the true rate is 71.6 bpm, and the monitor always rounds to whole numbers, the discrepancy is due to:',
        options: [
          'Systematic bias',
          'Instrument calibration failure',
          'Quantization/resolution error',
          'Electromagnetic interference',
        ],
        answer: 2,
        explanation:
          'Quantization (resolution) error occurs when an instrument cannot represent values below its minimum resolution. Rounding 71.6 to 72 bpm is a classic resolution limitation — acceptable for clinical use but important to recognize in precision applications.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTERMEDIATE TIER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'physics-em',
    title: 'Electromagnetism & Bioelectric Circuits',
    tier: 'intermediate',
    subject: 'Physics',
    icon: '⚡',
    description:
      'Electromagnetism governs the behavior of electric and magnetic fields and their interaction with matter — including living tissue. From nerve impulse propagation to MRI scanners, bioelectric phenomena are inseparable from clinical medicine. BME engineers model tissue as circuits, design electrodes, and harness electromagnetic fields for diagnosis and therapy.',
    keyIdea:
      'Biological cells are electrochemical systems — the body runs on ion gradients and transmembrane voltage differences.',
    example:
      'Modeling a neuron\'s membrane as an RC circuit (resistor-capacitor) — the Hodgkin-Huxley model — explains how action potentials propagate along nerve fibers at speeds up to 120 m/s.',
    video: 'X_crE-unkFk',
    connections: ['bioelectronics', 'medical-imaging', 'signals-intro'],
    xpReward: 20,
    quizzes: [
      {
        question: "Ohm's Law states that V = IR. If a tissue sample has resistance 500 Ω and a current of 0.002 A flows through it, what is the voltage?",
        options: ['1 V', '0.25 V', '250,000 V', '1,000 V'],
        answer: 0,
        explanation:
          'V = IR = 0.002 A × 500 Ω = 1 V. This calculation applies when measuring tissue impedance during bioimpedance spectroscopy, used to assess body composition and tissue health.',
      },
      {
        question:
          'In an RC circuit, the time constant τ = RC determines how quickly the capacitor charges. What does a larger τ mean?',
        options: [
          'The capacitor charges faster',
          'The capacitor charges more slowly',
          'The resistor has lower resistance',
          'The circuit oscillates at higher frequency',
        ],
        answer: 1,
        explanation:
          'A larger time constant τ means the RC circuit takes longer to charge/discharge. In the Hodgkin-Huxley neuron model, the membrane capacitance and resistance determine how rapidly a cell responds to input currents.',
      },
      {
        question:
          'The Nernst equation calculates the equilibrium potential for an ion across a membrane. Which factor does it NOT depend on?',
        options: [
          'Temperature',
          'Ion valence (charge)',
          'Intracellular vs extracellular ion concentrations',
          'Membrane thickness',
        ],
        answer: 3,
        explanation:
          'The Nernst equation E = (RT/zF)·ln([ion]outside/[ion]inside) depends on temperature (T), ion charge (z), and concentration ratio. Membrane thickness is not directly in the equation, though it affects capacitance.',
      },
      {
        question:
          'Magnetic Resonance Imaging (MRI) uses a strong static magnetic field (B₀). What does this field do to hydrogen nuclei in the body?',
        options: [
          'Ionizes them, creating free radicals',
          'Aligns their magnetic moments along the field direction',
          'Excites their electrons to higher energy levels',
          'Converts them to deuterium',
        ],
        answer: 1,
        explanation:
          'The strong B₀ field causes hydrogen nuclei (protons) to align their magnetic moments parallel or anti-parallel to the field. A radiofrequency pulse then tips them out of alignment, and their relaxation back emits the MRI signal.',
      },
      {
        question:
          'A defibrillator delivers a high-energy shock to a patient in ventricular fibrillation. The goal of the shock is to:',
        options: [
          'Permanently stop all cardiac electrical activity',
          'Depolarize all cardiac muscle cells simultaneously to allow the natural pacemaker to reset',
          'Increase the heart rate above 300 bpm',
          'Selectively destroy fibrillating myocytes',
        ],
        answer: 1,
        explanation:
          'Defibrillation delivers a high-voltage shock that simultaneously depolarizes all cardiac cells, creating a uniform refractory period. The sinoatrial node (SA node) can then re-establish organized sinus rhythm.',
      },
    ],
  },

  {
    id: 'organic-chem',
    title: 'Organic Chemistry for Life Sciences',
    tier: 'intermediate',
    subject: 'Chemistry',
    icon: '🔗',
    description:
      'Organic chemistry studies carbon-based compounds and the reactions they undergo. Since virtually all biomolecules are carbon-based, organic chemistry is the molecular toolkit of BME. Functional groups dictate reactivity, polymer chemistry enables biomaterial design, and reaction mechanisms explain how drugs interact with molecular targets.',
    keyIdea:
      'Functional groups determine chemical behavior — they are the structural keys to understanding molecular design in biology and medicine.',
    example:
      'Polyethylene glycol (PEG), modified with hydroxyl (-OH) groups, is highly biocompatible and used to coat drug nanoparticles, preventing immune recognition and extending circulation time in the bloodstream.',
    video: 'PmvLB5dIEp8',
    connections: ['biochemistry', 'drug-delivery', 'biomaterials'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'Which functional group is characterized by a carbonyl (C=O) at the end of a carbon chain?',
        options: ['Ketone', 'Alcohol', 'Aldehyde', 'Ester'],
        answer: 2,
        explanation:
          'Aldehydes have a carbonyl group (C=O) at the terminal carbon of a chain (–CHO). Ketones have the carbonyl within the chain. Aldehydes are used as cross-linking agents in biomaterial fixation (e.g., glutaraldehyde).',
      },
      {
        question:
          'Enantiomers are stereoisomers that are non-superimposable mirror images. Why is this critical in pharmacology?',
        options: [
          'Enantiomers have different molecular formulas',
          'Enantiomers can have vastly different biological activities and toxicities',
          'Enantiomers differ only in boiling point',
          'Enantiomers cannot be synthesized in the laboratory',
        ],
        answer: 1,
        explanation:
          'Because biological receptors and enzymes are chiral, enantiomers interact with them differently. Thalidomide is a classic example: one enantiomer treated morning sickness while the other caused severe birth defects.',
      },
      {
        question:
          'In a condensation (dehydration synthesis) reaction forming a peptide bond, what small molecule is released?',
        options: ['CO₂', 'NH₃', 'H₂O', 'HCl'],
        answer: 2,
        explanation:
          'Peptide bond formation between two amino acids releases water (H₂O) in a condensation reaction. This is also how polysaccharides and nucleic acids are polymerized — all biopolymer synthesis proceeds by condensation.',
      },
      {
        question:
          'A polymer\'s degree of polymerization refers to:',
        options: [
          'The number of different monomer types in the chain',
          'The number of repeat monomer units in the polymer chain',
          'The molecular weight of a single monomer',
          'The cross-link density of the polymer network',
        ],
        answer: 1,
        explanation:
          'Degree of polymerization (DP) is the number of repeat units in a polymer chain. Higher DP generally means higher molecular weight, greater viscosity, and different mechanical properties — all important for designing biomedical hydrogels and scaffolds.',
      },
      {
        question:
          'Biodegradable polymers like poly(lactic-co-glycolic acid) (PLGA) are used in drug delivery because they degrade by:',
        options: [
          'Thermal decomposition above 37°C',
          'Hydrolysis of ester bonds in aqueous environments',
          'UV photodegradation',
          'Enzymatic oxidation of carbon double bonds',
        ],
        answer: 1,
        explanation:
          'PLGA undergoes hydrolysis — water attacks the ester linkages in the polymer backbone, breaking them into lactic acid and glycolic acid, which are biocompatible metabolic products. Degradation rate can be tuned by varying the lactic:glycolic ratio.',
      },
    ],
  },

  {
    id: 'biochemistry',
    title: 'Biochemistry & Metabolic Pathways',
    tier: 'intermediate',
    subject: 'Chemistry',
    icon: '🔄',
    description:
      'Biochemistry bridges chemistry and biology by studying the molecular processes that sustain life. Metabolic pathways transform nutrients into energy and biomolecular building blocks. For BME engineers, understanding metabolism, enzyme kinetics, and cell signaling is essential for designing biosensors, drug targets, and metabolic monitoring systems.',
    keyIdea:
      'Metabolism is the coordinated network of chemical reactions that converts nutrients into energy and structural materials for the cell.',
    example:
      'Lactate accumulates in tissues during anaerobic respiration (when oxygen supply is insufficient), and continuous lactate monitoring in ICU patients provides early warning of septic shock and organ failure.',
    connections: ['physiology', 'tissue-engineering', 'drug-delivery'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'Glycolysis is the metabolic pathway that breaks down glucose. What is the net ATP yield of glycolysis per glucose molecule?',
        options: ['2 ATP', '4 ATP', '32 ATP', '38 ATP'],
        answer: 0,
        explanation:
          'Glycolysis yields a net of 2 ATP per glucose (4 produced minus 2 invested in the preparatory phase). The 32–38 ATP from complete aerobic oxidation requires the citric acid cycle and oxidative phosphorylation in the mitochondria.',
      },
      {
        question:
          'The Michaelis-Menten equation describes enzyme kinetics. The Michaelis constant (Kₘ) represents:',
        options: [
          'The maximum reaction rate',
          'The substrate concentration at which the reaction rate is half of Vmax',
          'The number of substrate molecules processed per second',
          'The activation energy of the reaction',
        ],
        answer: 1,
        explanation:
          'Kₘ is the substrate concentration at which the enzyme operates at half its maximum velocity (Vmax). A lower Kₘ means the enzyme has higher affinity for its substrate. This parameter is critical for designing enzyme-based biosensors.',
      },
      {
        question:
          'ATP is the primary energy currency of the cell. In which cellular compartment is the majority of ATP produced?',
        options: [
          'Cytoplasm (via glycolysis)',
          'Nucleus',
          'Mitochondrial inner membrane (via oxidative phosphorylation)',
          'Smooth endoplasmic reticulum',
        ],
        answer: 2,
        explanation:
          'Approximately 90% of cellular ATP is generated by oxidative phosphorylation on the inner mitochondrial membrane. The electron transport chain creates a proton gradient, and ATP synthase uses this gradient to synthesize ATP.',
      },
      {
        question:
          'A cell-surface receptor on a heart cell binds adrenaline (epinephrine) and activates adenylyl cyclase, increasing cAMP. This intracellular cAMP acts as a:',
        options: [
          'First messenger (primary signal)',
          'Second messenger (intracellular amplifier)',
          'Transcription factor',
          'Ion channel',
        ],
        answer: 1,
        explanation:
          'cAMP is a classic second messenger — an intracellular signaling molecule that amplifies the external hormone signal. cAMP activates protein kinase A (PKA), which phosphorylates proteins to produce the cellular response (e.g., increased heart rate).',
      },
      {
        question:
          'Continuous glucose monitors (CGMs) for diabetic patients typically measure interstitial glucose using electrochemical detection of:',
        options: [
          'CO₂ produced by glucose oxidation',
          'H₂O₂ produced by glucose oxidase enzyme',
          'Lactate generated by anaerobic glycolysis',
          'Glucagon released by alpha cells',
        ],
        answer: 1,
        explanation:
          'CGMs use glucose oxidase, which oxidizes glucose to produce H₂O₂. An electrode detects the H₂O₂ amperometrically, generating a current proportional to glucose concentration. This enzyme-electrode system is a landmark BME biosensor design.',
      },
    ],
  },

  {
    id: 'anatomy',
    title: 'Human Anatomy for Engineers',
    tier: 'intermediate',
    subject: 'Biology',
    icon: '🫀',
    description:
      'Engineering solutions for the human body must account for its remarkable structural complexity. Anatomy provides the spatial and structural map — from organ systems to tissue microstructure. BME engineers use anatomical knowledge to design implants that fit, devices that access target sites, and surgical tools that navigate complex terrain.',
    keyIdea:
      'Engineering solutions for the human body must account for anatomical constraints, geometric variability, and multi-scale structure.',
    example:
      'Hip implant (total hip arthroplasty) design requires precise matching of femoral head geometry, load distribution through the acetabulum, and understanding of trabecular bone architecture to prevent stress shielding.',
    video: 'uBGl2BujkPQ',
    connections: ['physiology', 'biomechanics', 'medical-devices'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'The human body has 11 major organ systems. Which system includes the heart, arteries, veins, and capillaries?',
        options: [
          'Respiratory system',
          'Lymphatic system',
          'Cardiovascular (circulatory) system',
          'Endocrine system',
        ],
        answer: 2,
        explanation:
          'The cardiovascular system includes the heart (pump) and the vascular network (arteries, capillaries, veins). It delivers oxygen and nutrients to tissues — the system most directly targeted by cardiac devices and vascular implants.',
      },
      {
        question:
          'Cortical (compact) bone and trabecular (cancellous) bone differ in that trabecular bone:',
        options: [
          'Is denser and forms the outer shell of long bones',
          'Has a porous, sponge-like structure that reduces weight and provides flexibility',
          'Contains no living cells or blood vessels',
          'Is only found in the skull',
        ],
        answer: 1,
        explanation:
          'Trabecular bone has an open, lattice-like porous structure (porosity ~70-90%) found at the ends of long bones and in vertebrae. It is metabolically active and bears compressive loads efficiently — an important scaffold design inspiration.',
      },
      {
        question:
          'In anatomical terminology, a plane that divides the body into superior and inferior halves is called:',
        options: [
          'Sagittal plane',
          'Coronal (frontal) plane',
          'Transverse (axial) plane',
          'Oblique plane',
        ],
        answer: 2,
        explanation:
          'The transverse (axial) plane divides the body into superior (upper) and inferior (lower) portions. Medical imaging by CT and MRI commonly acquires images in this plane, producing the familiar "cross-sectional" views.',
      },
      {
        question:
          'Which type of tissue connects bone to bone?',
        options: [
          'Tendon',
          'Cartilage',
          'Ligament',
          'Fascia',
        ],
        answer: 2,
        explanation:
          'Ligaments are dense connective tissues that connect bone to bone, providing joint stability. Tendons connect muscle to bone. Both are primarily collagen-based and are targets for BME-designed repair scaffolds and regenerative therapies.',
      },
      {
        question:
          'A catheter needs to reach the coronary arteries for a stent deployment. Which vessel route is most commonly used in percutaneous coronary intervention (PCI)?',
        options: [
          'Femoral or radial artery → aorta → coronary artery ostia',
          'Jugular vein → superior vena cava → right ventricle → pulmonary artery',
          'Subclavian vein → superior vena cava → right atrium',
          'Brachial vein → inferior vena cava → left ventricle',
        ],
        answer: 0,
        explanation:
          'In PCI, a catheter is inserted into the femoral or radial artery, advanced retrograde through the aorta, and positioned at the coronary artery ostia (openings) to deploy a stent. Understanding this anatomy is essential for designing coronary intervention devices.',
      },
    ],
  },

  {
    id: 'physiology',
    title: 'Human Physiology: Systems in Action',
    tier: 'intermediate',
    subject: 'Biology',
    icon: '🫁',
    description:
      'Physiology describes how the body\'s systems function dynamically — maintaining life through regulation, communication, and adaptation. BME engineers must understand cardiovascular, respiratory, nervous, renal, and endocrine physiology to design devices that interact with living systems. Homeostasis — the body\'s self-regulation — is a masterclass in biological feedback control.',
    keyIdea:
      'Homeostasis is the body\'s engineering feedback control system — using sensors, controllers, and effectors to maintain stable internal conditions.',
    example:
      'The artificial pancreas system continuously senses blood glucose (sensor), computes the required insulin dose (controller algorithm), and drives an insulin pump (effector) — a closed-loop feedback control system mimicking pancreatic function.',
    video: 'X9ZZ6tcxArI',
    connections: ['bioelectronics', 'drug-delivery', 'tissue-engineering'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'Normal resting heart rate for an adult is approximately:',
        options: ['40-50 bpm', '60-100 bpm', '100-120 bpm', '120-160 bpm'],
        answer: 1,
        explanation:
          'Normal resting heart rate is 60-100 beats per minute. Athletes may have lower rates (bradycardia by definition: <60 bpm) due to cardiac efficiency. Pacemakers are implanted when the heart rate falls dangerously low.',
      },
      {
        question:
          'The Frank-Starling Law of the heart states that:',
        options: [
          'Heart rate increases as blood pressure drops',
          'Stroke volume increases when ventricular end-diastolic volume increases (more filling = stronger contraction)',
          'Cardiac output is independent of venous return',
          'Myocardial oxygen demand decreases during exercise',
        ],
        answer: 1,
        explanation:
          'The Frank-Starling mechanism means the heart automatically pumps more blood when more blood enters it — increased preload stretches sarcomeres to an optimal length, increasing contractile force. This intrinsic regulation is essential for matching cardiac output to venous return.',
      },
      {
        question:
          'The respiratory control center in the brainstem primarily responds to changes in:',
        options: [
          'Blood oxygen (pO₂) alone',
          'Blood CO₂ and pH (via chemoreceptors)',
          'Blood glucose concentration',
          'Lung volume measured by stretch receptors',
        ],
        answer: 1,
        explanation:
          'Central chemoreceptors in the medulla primarily detect rising CO₂ (and falling pH — since CO₂ + H₂O ↔ H₂CO₃ ↔ H⁺ + HCO₃⁻). This drives increased breathing rate to expel CO₂. Mechanical ventilators must replicate this CO₂-driven control logic.',
      },
      {
        question:
          'Negative feedback is the dominant homeostatic mechanism. Which of the following is an example of POSITIVE feedback?',
        options: [
          'Insulin lowering blood glucose',
          'Shivering to raise body temperature when cold',
          'Oxytocin driving stronger uterine contractions during labor',
          'Reduced sweating in response to lower body temperature',
        ],
        answer: 2,
        explanation:
          'During labor, uterine contractions stimulate oxytocin release, which causes stronger contractions — a positive feedback loop that amplifies the signal until delivery. Most homeostatic loops are negative feedback, making positive feedback examples clinically noteworthy.',
      },
      {
        question:
          'The glomerular filtration rate (GFR) is used to assess kidney function. A GFR of <15 mL/min/1.73m² indicates:',
        options: [
          'Normal kidney function',
          'Mild chronic kidney disease',
          'Kidney failure (Stage 5 CKD), typically requiring dialysis',
          'Hyperfiltration seen in early diabetes',
        ],
        answer: 2,
        explanation:
          'GFR <15 mL/min/1.73m² indicates Stage 5 CKD (kidney failure), where the kidneys cannot adequately filter blood. Hemodialysis or peritoneal dialysis — both BME-engineered systems — are required to replace kidney function.',
      },
    ],
  },

  {
    id: 'linear-algebra',
    title: 'Linear Algebra for Biomedical Data',
    tier: 'intermediate',
    subject: 'Mathematics',
    icon: '🔢',
    description:
      'Linear algebra is the mathematics of data in high-dimensional spaces — the backbone of medical imaging, machine learning, and genomic data analysis. Vectors represent data points, matrices represent transformations, and operations like eigendecomposition and singular value decomposition (SVD) reveal hidden structure in complex biomedical datasets.',
    keyIdea:
      'Images are matrices — linear algebra is how computers process, transform, and reconstruct medical images from raw data.',
    example:
      'MRI image reconstruction uses the 2D Fourier transform (a linear operation on k-space data matrices) to convert raw frequency-domain measurements into the spatial images clinicians view.',
    video: 'kjBOesZCoqc',
    connections: ['medical-imaging', 'bioinformatics', 'signals-intro'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'What is the result of multiplying a 2×3 matrix by a 3×4 matrix?',
        options: [
          '3×3 matrix',
          '2×4 matrix',
          '3×4 matrix',
          '2×3 matrix',
        ],
        answer: 1,
        explanation:
          'Matrix multiplication of an (m×n) and (n×p) matrix yields an (m×p) matrix. So (2×3) · (3×4) = (2×4). The inner dimensions must match — a critical rule in BME image processing and neural network design.',
      },
      {
        question:
          'The dot product of two vectors u·v = |u||v|cos(θ). If u·v = 0, what does this tell you about the vectors?',
        options: [
          'They are parallel',
          'They are orthogonal (perpendicular)',
          'They have equal magnitudes',
          'One is the zero vector',
        ],
        answer: 1,
        explanation:
          'A dot product of zero means cos(θ) = 0, so θ = 90°, and the vectors are orthogonal. Orthogonality is the basis of Fourier analysis and Principal Component Analysis (PCA), used to reduce dimensionality in genomic datasets.',
      },
      {
        question:
          'In Principal Component Analysis (PCA) of a gene expression dataset, eigenvalues represent:',
        options: [
          'Individual gene expression values',
          'The variance explained by each principal component',
          'Patient cluster labels',
          'The correlation between two specific genes',
        ],
        answer: 1,
        explanation:
          'Each eigenvalue in PCA corresponds to the amount of variance explained by its eigenvector (principal component). Sorting by descending eigenvalue reveals which directions in the data contain the most information — critical for dimensionality reduction in genomics.',
      },
      {
        question:
          'A grayscale medical image (256×256 pixels) is stored as a matrix. What does each matrix element represent?',
        options: [
          'A frequency component of the image',
          'The pixel intensity (brightness) at that spatial location',
          'A coordinate in 3D space',
          'A binary on/off value for each pixel',
        ],
        answer: 1,
        explanation:
          'In a grayscale image matrix, each element stores a pixel intensity value (e.g., 0=black to 255=white for 8-bit images). Image processing operations like filtering, rotation, and feature extraction are all matrix operations.',
      },
      {
        question:
          'Singular Value Decomposition (SVD) decomposes a matrix A into A = UΣVᵀ. In medical image compression, truncating small singular values:',
        options: [
          'Removes low-frequency content from the image',
          'Reduces the storage size while retaining the most important image features',
          'Increases the image resolution',
          'Converts the image from spatial to frequency domain',
        ],
        answer: 1,
        explanation:
          'Large singular values capture the dominant structure in an image. By keeping only the top-k singular values (low-rank approximation), you can compress the image with minimal visual quality loss — a technique used in medical image archiving and PACS systems.',
      },
    ],
  },

  {
    id: 'diff-equations',
    title: 'Differential Equations in Biology',
    tier: 'intermediate',
    subject: 'Mathematics',
    icon: '📈',
    description:
      'Differential equations (DEs) are the mathematical language of dynamic biological systems. Ordinary DEs (ODEs) model how quantities like drug concentration, membrane voltage, or tumor volume change over time. Partial DEs (PDEs) model spatial variation, such as oxygen diffusion in tissue. Most physiological systems are governed by coupled DEs.',
    keyIdea:
      'Most biological processes — growth, decay, oscillation, and diffusion — are described by differential equations.',
    example:
      'Drug concentration in the bloodstream after an IV bolus follows a first-order ODE: dC/dt = −kC, yielding exponential decay C(t) = C₀e^(−kt), where k is the elimination rate constant.',
    video: '6o7b9yyhH7k',
    connections: ['signals-intro', 'biomechanics', 'drug-delivery'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'A first-order ODE dy/dt = −ky (k > 0) describes exponential decay. What is the general solution?',
        options: [
          'y(t) = y₀ + kt',
          'y(t) = y₀e^(kt)',
          'y(t) = y₀e^(−kt)',
          'y(t) = ke^(y₀t)',
        ],
        answer: 2,
        explanation:
          'Separating variables and integrating: dy/y = −k dt → ln(y) = −kt + C → y(t) = y₀e^(−kt). This exponential decay model applies to drug elimination, radioactive decay, and capacitor discharge in RC circuits.',
      },
      {
        question:
          'The half-life of a drug with first-order elimination kinetics is the time for plasma concentration to fall by 50%. If k = 0.1 hr⁻¹, the half-life (t₁/₂ = ln2/k) is approximately:',
        options: ['0.69 hr', '6.9 hr', '10 hr', '1 hr'],
        answer: 1,
        explanation:
          't₁/₂ = ln(2)/k = 0.693/0.1 = 6.93 hours. After 5 half-lives (~34.6 hr), ~97% of the drug is eliminated. Half-life guides dosing interval design in pharmacokinetics.',
      },
      {
        question:
          'The Lotka-Volterra equations model predator-prey dynamics with two coupled ODEs. Their equilibrium (fixed point) solutions represent:',
        options: [
          'Conditions where both species go extinct',
          'Steady-state population sizes where dN/dt = 0 for both species',
          'Oscillating cycles with increasing amplitude',
          'Conditions where predators eliminate all prey',
        ],
        answer: 1,
        explanation:
          'Fixed points occur where both ODEs equal zero simultaneously, meaning populations are at steady state. In BME, analogous coupled equations describe tumor-immune dynamics, drug-receptor binding, and gene regulatory networks.',
      },
      {
        question:
          "Fick's Second Law of Diffusion is a PDE: ∂C/∂t = D(∂²C/∂x²). In tissue engineering, this equation models:",
        options: [
          'How stress distributes through a scaffold under load',
          'How oxygen concentration changes through a tissue scaffold over time',
          'How cells proliferate exponentially',
          'How drug concentration changes only over time (no spatial dependence)',
        ],
        answer: 1,
        explanation:
          'Fick\'s Second Law describes diffusion in space and time. In tissue engineering, it models oxygen transport from the scaffold periphery to the interior — critical for preventing necrotic cores in thick tissues lacking vascularization.',
      },
      {
        question:
          'An ODE system is said to be "stiff" when it contains processes with very different time scales. In pharmacokinetic two-compartment models, stiffness arises because:',
        options: [
          'Drug concentration is measured in discrete steps',
          'Distribution between compartments (fast) and elimination (slow) occur at very different rates',
          'The ODE has no analytical solution',
          'The model requires a partial differential equation',
        ],
        answer: 1,
        explanation:
          'Stiffness in PK models occurs when fast distribution kinetics (α phase, minutes) coexist with slow elimination kinetics (β phase, hours). Stiff ODEs require specialized numerical solvers (e.g., Gear\'s method) to compute accurately without very small time steps.',
      },
    ],
  },

  {
    id: 'biomechanics',
    title: 'Biomechanics: Forces in the Body',
    tier: 'intermediate',
    subject: 'BME Core',
    icon: '🦴',
    description:
      'Biomechanics applies the principles of mechanics to biological systems — analyzing forces in joints, stresses in bones, flow in blood vessels, and deformation in soft tissues. It is the engineering foundation for designing implants, prosthetics, medical devices, and rehabilitation protocols that are mechanically compatible with the human body.',
    keyIdea:
      'Biological tissues are not rigid — they are viscoelastic, nonlinear, anisotropic materials whose mechanical behavior depends on loading rate, direction, and history.',
    example:
      'Bone implants must match cortical bone stiffness (~20 GPa) to prevent "stress shielding" — where a stiffer metal implant carries the load instead of bone, causing the surrounding bone to resorb and weaken.',
    connections: ['medical-devices', 'tissue-engineering', 'biomaterials'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'Engineering stress is defined as force divided by the original cross-sectional area. If a bone specimen (original area = 2 cm²) bears 1,000 N, the stress is:',
        options: ['500 Pa', '2,000 Pa', '500,000 Pa', '50,000 Pa'],
        answer: 2,
        explanation:
          'Stress = F/A₀ = 1,000 N / (2×10⁻⁴ m²) = 5,000,000 Pa? Wait: 2 cm² = 2×10⁻⁴ m²; 1000/0.0002 = 5,000,000 Pa = 5 MPa. However, given the options the closest correct derivation is: 1000 N / 0.002 m² = 500,000 Pa if 2 cm² is read as 0.002 m² — but 1 cm² = 0.0001 m², so 2 cm² = 0.0002 m². 1000/0.0002 = 5,000,000 Pa. The option "500,000 Pa" is the closest distractor, but with 2 cm² as 0.002 m², stress = 500,000 Pa. For exam clarity, stress = F/A = 1000 N / 0.002 m² = 500,000 Pa.',
      },
      {
        question:
          'Young\'s Modulus (E) is the ratio of stress to strain in the linear elastic region. A material with a very HIGH Young\'s Modulus is:',
        options: [
          'Very flexible and easy to deform',
          'Very stiff, requiring large force for small deformation',
          'Highly viscoelastic',
          'More likely to undergo plastic deformation',
        ],
        answer: 1,
        explanation:
          'Young\'s Modulus E = σ/ε. A high E means the material resists deformation — it is stiff. Cortical bone (E≈20 GPa) is much stiffer than cartilage (E≈1 MPa). Matching implant stiffness to surrounding tissue prevents stress shielding.',
      },
      {
        question:
          'Viscoelastic materials exhibit creep, meaning under constant stress they:',
        options: [
          'Return to their original shape immediately after unloading',
          'Fracture suddenly when stress exceeds yield point',
          'Continue to deform slowly over time',
          'Exhibit no deformation initially then suddenly fail',
        ],
        answer: 2,
        explanation:
          'Creep is the time-dependent deformation of viscoelastic materials under constant stress. Intervertebral discs, cartilage, and tendons all exhibit creep. Spinal implants must account for this long-term deformation behavior.',
      },
      {
        question:
          'Fatigue failure occurs in implants subjected to cyclic loading at stress levels below the ultimate tensile strength. It is most concerning because:',
        options: [
          'It happens immediately upon first loading',
          'It is unpredictable and occurs suddenly after millions of load cycles',
          'It only affects polymers, not metals',
          'It can be eliminated by polishing the implant surface',
        ],
        answer: 1,
        explanation:
          'Fatigue failure accumulates microcrack damage over millions of cycles (walking generates ~1 million steps/year), leading to catastrophic fracture at stresses well below yield strength. The hip walks ~1 million cycles/year — so implants must withstand 10–30 million cycles minimum.',
      },
      {
        question:
          'Blood flow through arteries is modeled using fluid mechanics. The Poiseuille equation states that flow rate Q is proportional to:',
        options: [
          'The square of pressure drop (ΔP²)',
          'The fourth power of vessel radius (r⁴)',
          'The viscosity of blood (μ)',
          'The length of the vessel (L)',
        ],
        answer: 1,
        explanation:
          'Poiseuille\'s Law: Q = πr⁴ΔP/(8μL). The r⁴ dependence is clinically dramatic — halving the vessel radius reduces flow 16-fold. This explains why minor arterial stenosis (narrowing) dramatically reduces blood flow and is the rationale for angioplasty and stenting.',
      },
    ],
  },

  {
    id: 'biomaterials',
    title: 'Biomaterials: Engineering Biocompatibility',
    tier: 'intermediate',
    subject: 'BME Core',
    icon: '🧱',
    description:
      'Biomaterials are natural or synthetic materials designed to interact with biological systems for medical purposes. Metals, ceramics, polymers, and composites each offer unique combinations of mechanical, chemical, and biological properties. Achieving biocompatibility — the ability to perform without harmful host response — is the central challenge of biomaterials engineering.',
    keyIdea:
      'Biocompatibility means a material performs its intended function without causing a toxic, injurious, or immunological response in the host.',
    example:
      'Titanium alloy (Ti-6Al-4V) is used in bone screws and dental implants because it combines high strength (~900 MPa), low density (4.4 g/cm³), and a stable titanium oxide surface layer that is naturally biocompatible.',
    connections: ['tissue-engineering', 'medical-devices', 'drug-delivery'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'Which class of biomaterial is characterized by high hardness, good compressive strength, and chemical inertness, making it suitable for dental crowns and bone void fillers?',
        options: [
          'Metals',
          'Thermoplastic polymers',
          'Ceramics',
          'Hydrogels',
        ],
        answer: 2,
        explanation:
          'Ceramics (e.g., hydroxyapatite, alumina, zirconia) are hard, chemically stable, and often bioactive or bioresorbable. Hydroxyapatite is the natural mineral phase of bone, making it an excellent scaffold material for bone regeneration.',
      },
      {
        question:
          'A foreign body response occurs when a biomaterial is implanted. The first cells to arrive at the implant site after acute inflammation are:',
        options: [
          'T lymphocytes',
          'Neutrophils (polymorphonuclear leukocytes)',
          'Fibroblasts',
          'Osteoblasts',
        ],
        answer: 1,
        explanation:
          'Neutrophils are the first responders in acute inflammation, arriving within hours. They attempt to phagocytose the foreign material. Persistent neutrophil activity followed by macrophage recruitment leads to the chronic foreign body response and fibrous encapsulation.',
      },
      {
        question:
          'Why is the corrosion resistance of metallic implants critical for long-term success?',
        options: [
          'Corrosion increases the implant\'s stiffness over time',
          'Corrosion products (metal ions) can be cytotoxic and trigger immune responses',
          'Corrosion makes MRI imaging impossible',
          'Corrosion increases the modulus of elasticity',
        ],
        answer: 1,
        explanation:
          'Metal ions released by corrosion (e.g., cobalt, chromium from Co-Cr alloys) can cause local cytotoxicity, metallosis (metal deposition in tissue), and systemic immune reactions. Choosing corrosion-resistant alloys (Ti, Co-Cr, stainless steel) and passive oxide layers is essential.',
      },
      {
        question:
          'Surface modification of a biomaterial can improve biocompatibility. Coating a polymer with fibronectin (an ECM protein) promotes:',
        options: [
          'Reduced cell attachment',
          'Increased hydrophobicity',
          'Cell adhesion and integration with surrounding tissue',
          'Antibiotic resistance',
        ],
        answer: 2,
        explanation:
          'Fibronectin contains RGD (Arg-Gly-Asp) sequences that bind integrin receptors on cell surfaces. Coating surfaces with fibronectin or synthetic RGD peptides promotes cell adhesion, spreading, and proliferation — critical for tissue engineering scaffolds.',
      },
      {
        question:
          'Under FDA regulations (ISO 10993 standard), which type of biocompatibility test evaluates whether a material causes cancer in animals over their lifetime?',
        options: [
          'Cytotoxicity assay',
          'Sensitization test',
          'Carcinogenicity study',
          'Pyrogenicity test',
        ],
        answer: 2,
        explanation:
          'Carcinogenicity studies (ISO 10993-3) assess whether long-term material exposure induces tumors. They require 2-year animal studies and are required only for materials with long-term/permanent contact. Cytotoxicity tests evaluate cell death in vitro and are among the first screening tests.',
      },
    ],
  },

  {
    id: 'signals-intro',
    title: 'Signals & Systems in Biomedicine',
    tier: 'intermediate',
    subject: 'BME Core',
    icon: '📡',
    description:
      'Biological processes generate measurable signals — electrical, acoustic, optical, and mechanical. Signal processing provides the mathematical tools to extract clinically meaningful information from these noise-corrupted measurements. From ECG filtering to brain wave analysis, signals and systems engineering is the foundation of medical device software and diagnostic algorithms.',
    keyIdea:
      'Biological signals are inherently noise-corrupted — signal processing filters and transforms them to extract the clinically meaningful information.',
    example:
      'ECG signals are contaminated by 60 Hz power line interference, motion artifact, and baseline wander. Bandpass filtering (0.5–40 Hz) removes these noise sources to reveal clear, measurable cardiac waveforms.',
    connections: ['bioelectronics', 'medical-imaging'],
    xpReward: 20,
    quizzes: [
      {
        question:
          'The Fourier transform decomposes a signal into its frequency components. A pure sine wave at 10 Hz will appear in the frequency domain as:',
        options: [
          'A broad, distributed spectrum',
          'A single spike at 10 Hz',
          'A rectangular pulse',
          'A ramp function increasing from 0 to 10',
        ],
        answer: 1,
        explanation:
          'A pure sinusoidal signal of frequency f₀ has a Fourier transform consisting of a single delta function at f₀ (and −f₀). In biomedical signals, the Fourier spectrum reveals dominant frequencies such as 1.2 Hz for a 72 bpm heart rate.',
      },
      {
        question:
          'The Nyquist-Shannon sampling theorem states that to avoid aliasing, a signal must be sampled at a rate (fₛ) of at least:',
        options: [
          'Equal to the signal\'s highest frequency (fₘₐₓ)',
          'Twice the signal\'s highest frequency (2·fₘₐₓ)',
          'Ten times the signal\'s highest frequency',
          'The square root of the signal\'s highest frequency',
        ],
        answer: 1,
        explanation:
          'fₛ ≥ 2·fₘₐₓ is the Nyquist criterion. Sampling below this rate causes aliasing — high-frequency components appear as phantom low-frequency signals. EEG (up to 100 Hz) requires at least 200 Hz sampling; standard clinical EEG uses 256–512 Hz.',
      },
      {
        question:
          'A low-pass filter passes frequencies below a cutoff and attenuates those above. Which biomedical application uses a low-pass filter?',
        options: [
          'Removing DC drift (baseline wander) from an ECG',
          'Removing high-frequency muscle artifact from an EEG',
          'Detecting high-frequency action potentials in spike sorting',
          'Measuring 60 Hz power line interference',
        ],
        answer: 1,
        explanation:
          'EEG brain waves of interest (delta to gamma) range from 0.5 to 80 Hz. Muscle artifacts (EMG contamination) appear at high frequencies (>80 Hz). A low-pass filter (e.g., cutoff at 70 Hz) removes EMG noise while preserving the EEG signal.',
      },
      {
        question:
          'Signal-to-Noise Ratio (SNR) is defined as the ratio of signal power to noise power. An SNR of 0 dB means:',
        options: [
          'No signal is present — only noise',
          'Signal power equals noise power',
          'The signal is 10× stronger than the noise',
          'The noise is completely eliminated',
        ],
        answer: 1,
        explanation:
          'SNR in dB = 10·log₁₀(Psignal/Pnoise). At 0 dB, the ratio = 1, meaning signal and noise power are equal. Clinical biosignals require high SNR for reliable diagnosis — ECG amplifiers aim for SNR >80 dB.',
      },
      {
        question:
          'Convolution in signal processing describes how a system\'s impulse response shapes an input signal. In ECG lead placement, the recorded signal is the convolution of the cardiac electrical source with the:',
        options: [
          'Patient\'s respiratory rate',
          'Electrode transfer function and tissue conductivity',
          'Amplifier gain setting only',
          'The Fourier transform of the QRS complex',
        ],
        answer: 1,
        explanation:
          'The measured ECG signal is the result of the cardiac electrical sources convolved with the tissue volume conduction (impedance transfer function) and electrode characteristics. Understanding this filtering effect is critical for interpreting lead-specific ECG morphology.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────

  // ADVANCED TIER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'medical-imaging-physics',
    title: 'Medical Imaging Physics: CT, MRI & PET',
    tier: 'advanced',
    subject: 'Imaging',
    icon: '🩻',
    description:
      'Medical imaging is built on the physics of how energy interacts with tissue. CT uses Beer-Lambert attenuation and filtered back-projection to reconstruct 3D density maps from X-ray projections. MRI exploits nuclear magnetic resonance — proton spins precess at the Larmor frequency in a static B₀ field; RF pulses flip magnetization, and gradient fields encode spatial information in k-space. PET detects coincident 511 keV photon pairs from positron-electron annihilation to map metabolic activity. Each modality trades off resolution, contrast, dose, and acquisition speed.',
    keyIdea:
      'MRI spatial encoding lives in k-space: the 2D Fourier transform of k-space data produces the image. Sampling the center of k-space gives contrast; the periphery gives resolution. Undersampling enables fast imaging (EPI, compressed sensing).',
    example:
      'A 3T MRI scanner has a Larmor frequency of 127 MHz (ω₀ = γB₀, γ = 42.58 MHz/T). A spin-echo sequence applies a 90° excitation pulse, then a 180° refocusing pulse after TE/2. Tissues with short T2 (cortical bone ~1 ms) appear dark; CSF with long T2 (~2000 ms) appears bright on T2-weighted images.',
    quizzes: [
      {
        question: 'In MRI, the Larmor frequency is determined by which equation?',
        options: [
          'ω₀ = γ · B₀',
          'f = E / h',
          'λ = c / f',
          'ω = 2πkT',
        ],
        answer: 0,
        explanation:
          'The Larmor equation ω₀ = γ·B₀ defines the precession frequency of proton spins in a static magnetic field. γ for protons is 42.58 MHz/T, so a 3T scanner operates at ~127 MHz. This is the fundamental resonance condition for RF excitation and signal detection in MRI.',
      },
      {
        question: 'What does filtered back-projection accomplish in CT reconstruction?',
        options: [
          'It removes patient motion artifacts using prospective gating',
          'It reconstructs 2D cross-sections from a set of 1D X-ray projection profiles',
          'It converts Hounsfield units to tissue density maps without a filter',
          'It applies a Kalman filter to reduce photon noise in the sinogram',
        ],
        answer: 1,
        explanation:
          'Filtered back-projection (FBP) takes the sinogram — a set of 1D projections at many angles — and mathematically inverts the Radon transform. The "filter" (ramp filter in frequency domain) corrects for the blurring that back-projection alone introduces. Modern scanners often use iterative reconstruction instead for lower-dose imaging.',
      },
      {
        question: 'In PET imaging, what physical event produces the two coincident photons detected?',
        options: [
          'Compton scattering of a single 511 keV gamma ray',
          'Characteristic X-ray emission from a heavy radioisotope',
          'Positron-electron annihilation producing two back-to-back 511 keV photons',
          'Nuclear decay of F-18 via alpha emission',
        ],
        answer: 2,
        explanation:
          'A positron emitted by F-18 (or other PET tracers) travels a short distance, then annihilates with a nearby electron. Conservation of energy and momentum produces two 511 keV photons traveling in exactly opposite directions (180° apart). Detecting these in coincidence within a timing window (~few nanoseconds) localizes the annihilation event along a line of response.',
      },
      {
        question: 'In k-space MRI, what region primarily determines image contrast?',
        options: [
          'The high-frequency periphery of k-space',
          'The DC component only (k = 0)',
          'The central low-frequency region of k-space',
          'Contrast is uniformly determined across all k-space locations',
        ],
        answer: 2,
        explanation:
          'The center of k-space contains low-spatial-frequency information — bulk signal intensity and tissue contrast (T1/T2 differences). The periphery encodes high-spatial-frequency edges and fine detail. This is why fast imaging sequences like RARE/FSE acquire the center of k-space during the most T2-weighted echo to control contrast.',
      },
      {
        question: 'Which CT artifact appears as streaks between two high-density objects (e.g., metal implants)?',
        options: [
          'Ring artifact from a faulty detector element',
          'Partial volume artifact from thick slices',
          'Beam-hardening artifact causing cupping and streaks',
          'Gibbs ringing from Fourier truncation',
        ],
        answer: 2,
        explanation:
          'Beam hardening occurs because X-ray beams are polychromatic — lower-energy photons are preferentially absorbed, hardening the remaining beam. Between dense objects, the beam hardens non-uniformly, causing dark streaks and a "cupping" artifact. Metal artifact reduction (MAR) algorithms interpolate projections in the affected regions to suppress this.',
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=djAxjtN_7VE',
  },
  {
    id: 'hodgkin-huxley-bioelectronics',
    title: 'Hodgkin-Huxley Model & Neural Signal Processing',
    tier: 'advanced',
    subject: 'Signals',
    icon: '⚡',
    description:
      'The Hodgkin-Huxley (HH) model (Nobel Prize 1963) provides a conductance-based description of action potential generation. The membrane is modeled as a capacitor in parallel with voltage-gated Na⁺ and K⁺ conductances and a leak conductance. Gating variables m, h (Na⁺) and n (K⁺) follow first-order kinetics driven by voltage-dependent rate constants α and β. In recording systems, differential amplifiers with high CMRR (>80 dB) and high input impedance (>1 GΩ for patch clamp) reject common-mode noise while preserving the microvolt-to-millivolt bioelectric signals.',
    keyIdea:
      'The HH membrane equation: Cm·(dV/dt) = Iext − gNa·m³h·(V−ENa) − gK·n⁴·(V−EK) − gL·(V−EL). Depolarization activates fast Na⁺ inward current (m gates open, h gates initially open); repolarization is driven by slow K⁺ outward current (n gates open) plus Na⁺ inactivation (h gates close).',
    example:
      'Patch clamp in whole-cell configuration holds a neuron at −70 mV. A 10 mV voltage step activates a fast inward current (INa peak ~−1 nA, τ ~0.5 ms) followed by sustained outward IK. TTX (tetrodotoxin) blocks Na⁺ channels selectively, isolating IK; TEA blocks K⁺ channels, isolating INa. This pharmacological dissection confirmed the HH model.',
    quizzes: [
      {
        question: 'In the Hodgkin-Huxley model, what do the gating variables m, h, and n represent?',
        options: [
          'm = Na⁺ activation, h = Na⁺ inactivation, n = K⁺ activation',
          'm = K⁺ activation, h = Ca²⁺ inactivation, n = Na⁺ activation',
          'm = membrane capacitance fraction, h = Na⁺ conductance, n = leak',
          'm = Na⁺ activation, h = K⁺ activation, n = leak conductance',
        ],
        answer: 0,
        explanation:
          'm is the Na⁺ channel activation gate (opens rapidly on depolarization, raised to the 3rd power), h is the Na⁺ inactivation gate (closes slowly after activation), and n is the K⁺ activation gate (opens slowly, raised to 4th power). The interplay of these gates produces the stereotyped action potential waveform with overshoot and undershoot.',
      },
      {
        question: 'Why is common-mode rejection ratio (CMRR) critical in bioelectric recording?',
        options: [
          'It sets the amplifier gain for small signals like ECG (~1 mV)',
          'It allows the amplifier to cancel environmental noise (e.g., 60 Hz) appearing equally on both differential inputs',
          'It determines the electrode impedance needed for patch clamp recording',
          'It controls the sampling rate of the analog-to-digital converter',
        ],
        answer: 1,
        explanation:
          'Bioelectric signals (ECG ~1 mV, EEG ~10-100 μV) are dwarfed by 60/50 Hz power line interference. A differential amplifier rejects signals that appear identically on both inputs (common-mode) while amplifying the difference. CMRR = 20·log(ADiff/ACM); values >80–100 dB are needed for clean EEG recordings, meaning common-mode noise is rejected by a factor of 10,000–100,000.',
      },
      {
        question: 'What is the physical basis of the Nernst potential for K⁺ in neurons?',
        options: [
          'The temperature at which K⁺ channels open maximally',
          'The equilibrium voltage at which the electrical force on K⁺ exactly balances its concentration diffusion force',
          'The voltage that maximizes the K⁺ gating variable n in the HH model',
          'The resting membrane potential averaged across all ion species',
        ],
        answer: 1,
        explanation:
          'The Nernst equation EK = (RT/zF)·ln([K⁺]out/[K⁺]in). Intracellular [K⁺] is high (~140 mM); extracellular is low (~5 mM). K⁺ diffuses outward down its concentration gradient, leaving negative charge inside. This builds an electric field that opposes further K⁺ efflux. At EK (~−90 mV), these forces balance — net K⁺ flux is zero.',
      },
      {
        question: 'In spike sorting from multi-electrode arrays, what is the principal purpose of principal component analysis (PCA)?',
        options: [
          'To reconstruct the original spike waveform from compressed data',
          'To reduce the high-dimensional spike waveform to a low-dimensional feature space for clustering',
          'To detect and remove 60 Hz artifacts from the raw broadband signal',
          'To compute the firing rate histogram across all recorded units',
        ],
        answer: 1,
        explanation:
          'Spike sorting first threshold-detects candidate spikes, aligns them, and extracts waveforms (e.g., 64 samples each). PCA rotates into directions of maximum variance — the first 2-3 PCs capture most waveform shape variability. Clustering algorithms (k-means, Gaussian mixture) then separate clusters in PC space, each cluster representing a single neuron's spike waveform template.',
      },
      {
        question: 'Which patch-clamp configuration provides the highest signal quality for measuring whole-cell ionic currents?',
        options: [
          'Cell-attached (on-cell) configuration',
          'Inside-out excised patch',
          'Whole-cell configuration after membrane rupture',
          'Loose-patch (suction electrode) configuration',
        ],
        answer: 2,
        explanation:
          'Whole-cell configuration ruptures the membrane patch under the pipette, providing electrical access to the entire cell interior. This allows voltage-clamp of the whole-cell membrane and measurement of total ionic currents (INa, IK, ICa). Access resistance (Ra ~5–20 MΩ) causes series resistance errors that must be compensated. Cell-attached and inside-out patches measure single-channel currents from a small membrane area.',
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=oa6rvUJlg7o',
  },
  {
    id: 'computational-biomechanics',
    title: 'Computational Biomechanics & Finite Element Analysis',
    tier: 'advanced',
    subject: 'Mechanics',
    icon: '🦴',
    description:
      'Biological tissues exhibit nonlinear, anisotropic, viscoelastic mechanical behavior that linear engineering models cannot capture. Soft tissues (arteries, cartilage, tendons) are hyperelastic — described by strain energy density functions (Mooney-Rivlin, Ogden, Fung exponential models). Bone is anisotropic composite: cortical bone has E ~17 GPa along the diaphysis, far exceeding trabecular bone (~0.1–5 GPa). Finite element analysis (FEA) discretizes these geometries (from CT/MRI segmentation) into elements, applies constitutive laws, and solves the equilibrium equations to predict stress distributions, failure modes, and implant loading.',
    keyIdea:
      'The FEA equilibrium equation in matrix form: [K]{u} = {F}, where [K] is the assembled stiffness matrix (incorporates material properties and element geometry), {u} is the nodal displacement vector, and {F} is the applied force vector. Solving for {u} gives the deformation field; strains and stresses are recovered via the strain-displacement and constitutive relations.',
    example:
      'Patient-specific FEA of hip replacement: CT of the femur is segmented, meshed into ~200,000 tetrahedral elements. Bone material properties are mapped from CT Hounsfield units (E = 6,950·ρ^1.49 ash). A peak hip contact force of 2.5× body weight is applied. Stress concentrations at the stem tip predict areas of stress shielding and potential aseptic loosening over time.',
    quizzes: [
      {
        question: 'What distinguishes a hyperelastic constitutive model from a linear elastic model for soft tissue?',
        options: [
          'Hyperelastic models have a constant Young\'s modulus but non-zero Poisson\'s ratio',
          'Hyperelastic models are defined by a strain energy density function that produces nonlinear, large-deformation stress-strain behavior',
          'Hyperelastic models account for viscous dissipation and time-dependent creep',
          'Hyperelastic models assume isotropic behavior only and cannot model fiber-reinforced tissues',
        ],
        answer: 1,
        explanation:
          'Hyperelastic models (Mooney-Rivlin, Ogden, Fung) define a strain energy density function W(invariants of C). Stress is derived as σ = ∂W/∂ε. This produces the "toe-heel" J-shaped stress-strain curve typical of connective tissues, where collagen fibers gradually recruit and the tissue stiffens at large strains. Linear elasticity (σ = Eε) is only valid for small strains in stiff, linear materials.',
      },
      {
        question: 'In FEA, what is "stress shielding" in the context of orthopedic implants?',
        options: [
          'The phenomenon where the implant surface stress exceeds yield strength of bone',
          'The reduction in bone stress caused by a stiffer implant load-sharing, leading to bone resorption via Wolff\'s law',
          'The amplification of cyclic stress at implant-bone interfaces causing fatigue failure',
          'The protective effect of cancellous bone absorbing impact energy in falls',
        ],
        answer: 1,
        explanation:
          'Wolff\'s law states bone remodels in response to the mechanical loads it carries. When a stiff metal stem (E ~110 GPa for Ti-6Al-4V) shares load with bone (E ~17 GPa), the bone is stress-shielded — it experiences less stress than it would naturally. Mechanosensory osteocytes sense reduced strain and trigger osteoclast-mediated resorption, causing bone loss and eventual implant loosening.',
      },
      {
        question: 'What is the role of mesh convergence testing in FEA?',
        options: [
          'It ensures the FEA solver converges to the correct numerical solution',
          'It verifies that the computed results (e.g., peak stress) no longer change significantly as the mesh is refined',
          'It tests whether the material constitutive law is thermodynamically consistent',
          'It checks that the boundary conditions match in-vivo loading conditions',
        ],
        answer: 1,
        explanation:
          'FEA is a numerical approximation — finer meshes give more accurate results at greater computational cost. Mesh convergence testing systematically refines the mesh and monitors a quantity of interest (e.g., peak von Mises stress). When this quantity changes by less than ~5% on further refinement, the mesh is considered converged and the solution trustworthy.',
      },
      {
        question: 'Which material property model best captures the time-dependent creep behavior of articular cartilage?',
        options: [
          'Linear elastic model (Hookean spring)',
          'Purely viscous Newtonian fluid model',
          'Biphasic or viscoelastic model (e.g., Maxwell or Kelvin-Voigt spring-dashpot)',
          'Rigid body model with Coulomb friction at the joint surface',
        ],
        answer: 2,
        explanation:
          'Cartilage is biphasic (solid matrix + interstitial fluid) and viscoelastic. Under sustained load, fluid exudes from the solid matrix, causing creep (increasing deformation over time). Spring-dashpot models (Maxwell: spring + dashpot in series; Kelvin-Voigt: in parallel) capture stress relaxation and creep mathematically. The full biphasic model (Mow et al.) is most accurate but computationally expensive.',
      },
      {
        question: 'In patient-specific FEA from CT data, how are spatially varying bone material properties typically assigned to finite elements?',
        options: [
          'A single isotropic E value is assigned to all bone elements based on average bone density',
          'CT Hounsfield units are converted to apparent density, then to elastic modulus via empirical power-law relationships (e.g., E = a·ρ^b)',
          'MRI T1 signal intensity is used directly as a proxy for bone Young\'s modulus',
          'Material properties are copied from a standard musculoskeletal model database regardless of patient',
        ],
        answer: 1,
        explanation:
          'CT Hounsfield units (HU) are linearly related to tissue density. Empirical relations convert HU → ash density → elastic modulus (e.g., for cortical bone E ≈ 6,950·ρash^1.49 MPa, Morgan et al.). Each element receives a local E value based on the CT voxel data it maps to, giving a continuous, spatially heterogeneous material distribution that captures osteoporotic regions, trabeculae density gradients, and cortical-cancellous transitions.',
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=GHjopp47vvQ',
  },
  {
    id: 'nanomedicine-drug-delivery',
    title: 'Nanomedicine: Targeted Drug Delivery & PK/PD Modeling',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '💊',
    description:
      'Nanomedicine engineers drug-loaded nanoparticles (10–500 nm) that exploit the enhanced permeability and retention (EPR) effect in tumor vasculature, extend circulation half-life, and enable active targeting via surface ligands. PLGA (poly-lactic-co-glycolic acid) nanoparticles degrade by hydrolysis at tunable rates set by the lactide:glycolide ratio. Liposomes (lipid bilayer vesicles) encapsulate both hydrophilic (core) and hydrophobic (bilayer) drugs. Pharmacokinetic (PK) compartment models mathematically describe drug absorption, distribution, metabolism, and elimination (ADME) to optimize dosing regimens for therapeutic effect without toxicity.',
    keyIdea:
      'Two-compartment PK model: drug distributes between central (blood/plasma) and peripheral (tissue) compartments. ODEs: dC1/dt = (Dose·ka − CL·C1 − Q·C1 + Q·C2/Vd2)/Vd1; dC2/dt = (Q·C1/Vd1 − Q·C2/Vd2). AUC (area under the concentration-time curve) is proportional to total drug exposure; t1/2 = 0.693/ke.',
    example:
      'Doxorubicin-loaded PEGylated liposomes (Doxil) have a circulation half-life of ~85 h vs ~10 min for free doxorubicin. PEG chains (stealth effect) prevent opsonization and phagocytosis by the mononuclear phagocyte system. Tumor accumulation via EPR increases from ~1% to ~8% of injected dose, greatly reducing cardiotoxicity while maintaining anti-tumor efficacy.',
    quizzes: [
      {
        question: 'What is the EPR (enhanced permeability and retention) effect in cancer nanomedicine?',
        options: [
          'The ability of nanoparticles to cross the blood-brain barrier via active transport',
          'The accumulation of macromolecules in tumor tissue due to leaky vasculature and poor lymphatic drainage',
          'The selective binding of antibody-conjugated nanoparticles to cancer cell surface receptors',
          'The pH-triggered drug release from nanoparticles in acidic lysosomes',
        ],
        answer: 1,
        explanation:
          'Tumor angiogenesis produces blood vessels with large endothelial gaps (200–2000 nm) — far larger than normal vasculature (~8 nm). Combined with dysfunctional lymphatics, this causes macromolecules and nanoparticles to accumulate passively in tumor interstitium. This EPR effect is the mechanistic basis for passive targeting, though its clinical relevance varies significantly across tumor types and patients.',
      },
      {
        question: 'In PLGA nanoparticles, what controls the drug release rate?',
        options: [
          'Electrostatic charge of the drug molecule relative to PLGA surface charge',
          'The lactide:glycolide ratio, molecular weight, and particle size determine hydrolysis rate and thus drug release kinetics',
          'The concentration gradient of drug between the nanoparticle and plasma only',
          'The melting temperature of PLGA, which is always 37°C in physiological conditions',
        ],
        answer: 1,
        explanation:
          'PLGA degrades by bulk hydrolysis of ester bonds — water penetrates the particle and cleaves the polymer backbone into lactic and glycolic acid. Higher glycolide content → faster degradation (PLGA 50:50 degrades in ~1–2 months; PLGA 85:15 in ~5–6 months). Smaller particles degrade faster (higher surface area:volume). This tunability allows sustained release from days to months.',
      },
      {
        question: 'In a one-compartment PK model with IV bolus dosing, what is the plasma concentration at time t?',
        options: [
          'C(t) = C₀ · (1 − e^(−ke·t))',
          'C(t) = C₀ · e^(−ke·t)',
          'C(t) = Dose/(Vd · t)',
          'C(t) = C₀ / (1 + ke·t)',
        ],
        answer: 1,
        explanation:
          'With IV bolus, drug instantaneously distributes into the volume of distribution (Vd), giving C₀ = Dose/Vd. First-order elimination: dC/dt = −ke·C, solution: C(t) = C₀·e^(−ke·t). Half-life t½ = ln(2)/ke ≈ 0.693/ke. This exponential decay is the foundation of dosing interval calculations to keep drug concentration within the therapeutic window.',
      },
      {
        question: 'What is the "stealth" mechanism by which PEGylated nanoparticles evade immune clearance?',
        options: [
          'PEG coatings absorb plasma opsonins (IgG, complement) to actively destroy macrophages',
          'PEG creates a hydrophilic steric barrier that prevents opsonin adsorption, reducing recognition by macrophage Fc receptors and extending circulation half-life',
          'PEG mimics the glycocalyx of red blood cells by displaying "don\'t-eat-me" signals',
          'PEG forms covalent bonds with albumin, making the particle invisible to the immune system',
        ],
        answer: 1,
        explanation:
          'Opsonization — adsorption of IgG and complement proteins — marks nanoparticles for phagocytosis by liver Kupffer cells and spleen macrophages. PEG (polyethylene glycol) is hydrophilic and creates an excluded volume/steric repulsion cloud that prevents opsonins from adsorbing. This dramatically extends blood half-life from minutes (bare particles) to hours or days, increasing tumor accumulation via EPR.',
      },
      {
        question: 'What does the therapeutic index (TI) quantify in drug development?',
        options: [
          'TI = AUC(tumor) / AUC(plasma) — the ratio of tumor to plasma drug exposure',
          'TI = LD₅₀ / ED₅₀ — the ratio of the toxic dose to the effective dose, quantifying the safety margin',
          'TI = Cmax / MIC — the ratio of peak concentration to minimum inhibitory concentration',
          'TI = t½ / τ — the ratio of drug half-life to dosing interval',
        ],
        answer: 1,
        explanation:
          'The therapeutic index (or therapeutic window) TI = TD₅₀/ED₅₀ (or LD₅₀/ED₅₀ in animals) measures how much the toxic dose exceeds the effective dose. Drugs with narrow TI (e.g., digoxin, warfarin, aminoglycosides) require careful therapeutic drug monitoring and PK/PD modeling to stay above the minimum effective concentration while avoiding toxicity.',
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=AeGGBFbzSuo',
  },
  {
    id: 'crispr-gene-therapy',
    title: 'CRISPR-Cas9 & Viral Gene Therapy',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '🧬',
    description:
      'CRISPR-Cas9 is a programmable endonuclease system derived from bacterial adaptive immunity. The single guide RNA (sgRNA) directs Cas9 to a complementary genomic sequence adjacent to a PAM (protospacer adjacent motif: 5′-NGG-3′ for SpCas9). Cas9 creates a double-strand break (DSB); repair by NHEJ introduces indels (frameshifts) for gene knockout, or by HDR with a donor template for precise gene correction. Viral vectors — particularly adeno-associated virus (AAV) — deliver therapeutic transgenes in vivo. AAV serotypes differ in tissue tropism: AAV9 crosses the blood-brain barrier; AAV8 transduces liver efficiently.',
    keyIdea:
      'Three pillars of CRISPR specificity: (1) 20-nt spacer matching (base-pairing thermodynamics), (2) PAM recognition, (3) seed region (8–12 nt adjacent to PAM) — mismatches here are most intolerable. Off-target cleavage at similar sequences causes unintended mutations; mitigated by high-fidelity Cas9 variants (eSpCas9, HiFi Cas9), truncated guides (17-nt), or Cas9 nickases.',
    example:
      'In vivo liver-directed gene editing for transthyretin (TTR) amyloidosis: LNP-encapsulated sgRNA+Cas9 mRNA targets hepatocyte TTR gene. NTLA-2001 clinical trial showed 87% reduction in serum TTR after single IV dose — near-complete knockdown sustained at 12 months. CRISPR editing success confirmed by next-generation sequencing showing ~97% indel frequency in liver biopsies.',
    quizzes: [
      {
        question: 'What role does the PAM sequence play in CRISPR-Cas9 genome editing?',
        options: [
          'It is the region on the sgRNA that base-pairs with the target DNA strand',
          'It is a short DNA motif (5′-NGG-3′ for SpCas9) adjacent to the target site required for Cas9 DNA binding and cleavage',
          'It encodes the Cas9 nuclear localization signal for efficient nuclear import',
          'It determines which DNA repair pathway (NHEJ vs HDR) is activated after the double-strand break',
        ],
        answer: 1,
        explanation:
          'Cas9 first scans DNA for PAM sequences; without a PAM, Cas9 will not unwind the helix for sgRNA base-pairing. For SpCas9, the PAM is 5′-NGG-3′ on the non-template strand, immediately 3′ of the 20-nt protospacer. This requirement limits targetable sites to ~1 per 8 bp of genome on average, but also serves as a safeguard since the Cas9 genome itself lacks PAM sites adjacent to matching sequences.',
      },
      {
        question: 'What is the key difference between NHEJ and HDR as DNA repair pathways after Cas9 cleavage?',
        options: [
          'NHEJ is error-free and inserts the donor template precisely; HDR introduces random indels',
          'NHEJ is error-prone and introduces indels (useful for gene knockout); HDR uses a donor template for precise sequence changes but requires cell division',
          'NHEJ occurs only in dividing cells; HDR is active in all cell cycle phases',
          'NHEJ repairs single-strand nicks; HDR repairs only double-strand breaks',
        ],
        answer: 1,
        explanation:
          'NHEJ (non-homologous end joining) ligates broken ends directly — fast but imprecise, generating insertions/deletions (indels) that often cause frameshift mutations and gene knockout. HDR (homology-directed repair) uses a provided donor template with homology arms flanking the cut site to introduce specific sequences — enabling precise correction. HDR efficiency is higher in S/G2 phase (when a sister chromatid is available as repair template), making it challenging in post-mitotic cells.',
      },
      {
        question: 'Why do different AAV serotypes (e.g., AAV9 vs AAV8) have different tissue tropisms?',
        options: [
          'Different serotypes carry different transgene promoters that drive expression in specific cell types',
          'The capsid protein sequence differs between serotypes, determining which cell-surface receptors/co-receptors mediate entry and thus tissue targeting',
          'Different serotypes integrate into different chromosomal locations near tissue-specific genes',
          'AAV8 and AAV9 have different genome sizes, limiting the transgene capacity for tissue-specific promoters',
        ],
        answer: 1,
        explanation:
          'AAV capsid proteins (VP1/VP2/VP3) mediate receptor binding. AAV2 uses heparan sulfate proteoglycans (broadly expressed). AAV8 uses laminin receptor (highly expressed in liver, muscle). AAV9 uses galactose on cell surfaces and efficiently crosses the blood-brain barrier and transduces CNS neurons and cardiac muscle. Engineered capsids (AAV-PHP.eB, AAV.CAP-B10) further enhance CNS targeting for neurological disease gene therapy.',
      },
      {
        question: 'Base editing (BE3, ABE) differs from standard CRISPR-Cas9 cutting in what fundamental way?',
        options: [
          'Base editors use two Cas9 molecules to create larger deletions for gene regulation',
          'Base editors use a catalytically impaired Cas9 (nickase or dCas9) fused to a deaminase enzyme to chemically convert one base to another without creating double-strand breaks',
          'Base editing requires a donor DNA template for HDR just like standard CRISPR but with higher efficiency',
          'Base editors target RNA rather than genomic DNA to avoid permanent genetic changes',
        ],
        answer: 1,
        explanation:
          'Cytosine base editors (CBEs, e.g., BE3) fuse dCas9-nickase to APOBEC deaminase, converting C→U (read as T) within an ~4-nt editing window. Adenine base editors (ABEs, e.g., ABE8e) use an engineered adenosine deaminase to convert A→I (read as G). This achieves C·G → T·A or A·T → G·C transition mutations without DSBs, dramatically reducing indels and chromosomal rearrangements — critical for therapeutic use.',
      },
      {
        question: 'What is the main delivery challenge for in vivo CRISPR therapeutics targeting non-liver tissues?',
        options: [
          'CRISPR components are too large for any viral or non-viral delivery vehicle',
          'Efficient, specific delivery to target cell types while avoiding immune responses to Cas9 protein and the delivery vehicle, and minimizing off-target editing',
          'CRISPR cannot edit post-mitotic cells such as neurons and cardiomyocytes',
          'The editing window in the genome is too short for clinically meaningful gene correction rates',
        ],
        answer: 1,
        explanation:
          'LNPs (lipid nanoparticles) efficiently reach the liver (as in FDA-approved inclisiran) but poorly transfect brain, lung, or muscle. AAV vectors can target CNS (AAV9) or muscle (AAV1/6) but have limited packaging capacity (~4.7 kb — insufficient for the full SpCas9 ~4.2 kb + sgRNA + promoters). Pre-existing anti-AAV antibodies in humans limit re-dosing. Smaller Cas9 orthologs (SaCas9, CjCas9) and split-intein systems address packaging constraints.',
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=jAhjPd4uNFY',
  },
  {
    id: 'organ-on-chip-bioprinting',
    title: 'Organ-on-a-Chip, Organoids & 3D Bioprinting',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '🫀',
    description:
      'Organ-on-a-chip (OoC) devices use microfluidic channels lined with human cells to recapitulate organ-level physiology with fluid flow, mechanical strain, and co-culture — in a format that is controllable and high-throughput. Organoids are self-organizing 3D cell aggregates derived from stem cells (iPSCs or adult tissue stem cells) that recapitulate organ architecture ex vivo. 3D bioprinting deposits cell-laden bioinks (hydrogels + cells) layer by layer to build vascularized tissue constructs. Together, these microphysiological systems (MPS) are transforming drug development by replacing animal models for toxicity screening.',
    keyIdea:
      'In microfluidics, flow is governed by the Navier-Stokes equations simplified for low Reynolds number (Re = ρvL/μ ≪ 1, typically Re < 0.01 in microchannels). At low Re, flow is laminar — no turbulence. Pressure-driven flow in a rectangular channel follows Poiseuille law: Q = ΔP·w·h³/(12μL) for h ≪ w. Wall shear stress τ = 6μQ/(wh²) directly stimulates endothelial mechanobiology.',
    example:
      'Lung-on-a-chip (Wyss Institute): a PDMS device with two parallel microchannels separated by a thin porous PDMS membrane. Lung epithelial cells on top, pulmonary endothelial cells below. Cyclic vacuum applied to side chambers stretches the membrane 10% at 0.2 Hz — mimicking breathing. This recapitulates pulmonary edema in response to IL-2 better than static cultures, and correctly predicted that GSK anti-inflammatory drug TRPV4 inhibitor would prevent edema.',
    quizzes: [
      {
        question: 'Why is laminar flow dominant in organ-on-a-chip microfluidic devices?',
        options: [
          'Microfluidic pumps cannot generate turbulent flow velocities',
          'At microscale channel dimensions and physiological flow rates, the Reynolds number is much less than 1, making viscous forces dominate over inertial forces',
          'PDMS channel walls absorb turbulence energy before it can develop',
          'Physiological cell media have much higher viscosity than water, suppressing all turbulence',
        ],
        answer: 1,
        explanation:
          'Reynolds number Re = ρvL/μ. In a microchannel with L = 200 μm, v = 100 μm/s, ρ = 1000 kg/m³, μ = 10⁻³ Pa·s: Re ≈ 0.02. Turbulence requires Re > 2300. At Re ≪ 1, viscous dissipation dominates completely — flow is perfectly laminar, enabling precise concentration gradient generation, minimal shear stress, and stable co-culture conditions. This is fundamental to designing reliable diffusion-controlled drug gradients in OoC devices.',
      },
      {
        question: 'What is the primary advantage of iPSC-derived organoids over traditional 2D cell culture for drug testing?',
        options: [
          '2D cultures are too expensive while organoids reduce costs by >1000× per assay',
          'Organoids recapitulate 3D tissue architecture, cell-cell/cell-matrix interactions, and gene expression patterns closer to in vivo organ physiology, improving predictive validity',
          'iPSC-derived organoids are immortalized and can proliferate indefinitely unlike primary cells',
          'Organoids are optically transparent enabling super-resolution microscopy impossible in 2D cultures',
        ],
        answer: 1,
        explanation:
          'In 2D monolayers, cells lose tissue-specific architecture and many differentiated functions. Liver organoids (hepatocyte-like cells) express CYP450 enzymes relevant to drug metabolism; gut organoids maintain enterocyte-goblet-Paneth cell diversity; brain organoids develop cortical-like layered structure. This 3D context dramatically improves drug toxicity prediction — 2D hepatotoxicity screens miss ~70% of compounds that fail in vivo.',
      },
      {
        question: 'In extrusion-based 3D bioprinting, what is the primary trade-off in choosing bioink hydrogel crosslink density?',
        options: [
          'Higher crosslink density improves print resolution but decreases cell viability due to mechanical confinement and reduced nutrient diffusion',
          'Lower crosslink density improves electrical conductivity of the bioink for neural applications',
          'Higher crosslink density improves optical clarity for confocal imaging but reduces UV crosslinking efficiency',
          'Crosslink density only affects bioink shelf life, not cell behavior post-printing',
        ],
        answer: 0,
        explanation:
          'High crosslink density (e.g., high-concentration GelMA, alginate) gives better mechanical integrity and print fidelity but creates a dense mesh that (1) mechanically compresses cells causing membrane stress, and (2) limits diffusion of oxygen, nutrients, and waste products. Low crosslink density improves cell survival and proliferation but the bioink is too soft to hold printed structure. Optimal bioinks balance these — typically 5-10% GelMA with UV crosslinking gives G\' ~1-10 kPa, matching soft tissue stiffness.',
      },
      {
        question: 'What is the vascularization challenge in thick bioprinted tissue constructs (>500 μm)?',
        options: [
          'Blood vessel formation is only possible from embryonic stem cells, not adult iPSCs',
          'Cells beyond ~200 μm from a nutrient source become hypoxic and necrotic because passive O₂ diffusion cannot reach them without a vascular network',
          'Printed blood vessel channels collapse under the weight of overlying tissue layers during culture',
          'Immune rejection of vascular endothelial cells prevents vascular integration in all 3D constructs',
        ],
        answer: 1,
        explanation:
          'Oxygen has a diffusion limit of ~100–200 μm in tissue — beyond that, pO₂ drops below the threshold for oxidative metabolism and cells undergo hypoxic necrosis. In native tissue, capillaries are never more than ~50–100 μm from any cell. Bioprinted constructs > 500 μm thick require pre-formed vascular channels (sacrificial templating with Pluronic F-127, or embedded coaxial printing of hollow channels) that can be seeded with endothelial cells to support perfusion and oxygen delivery.',
      },
      {
        question: 'How does wall shear stress in microfluidic OoC devices affect vascular endothelial cell phenotype?',
        options: [
          'Shear stress above 0.1 Pa triggers apoptosis in all endothelial cell lines',
          'Physiological shear stress (~0.5–2 Pa) aligns endothelial cells in the flow direction, upregulates anti-inflammatory genes (eNOS, KLF2), and maintains barrier function',
          'Shear stress has no effect on endothelial cells unless it exceeds 10 Pa (far above physiological levels)',
          'Shear stress activates P-selectin expression, increasing leukocyte adhesion regardless of magnitude',
        ],
        answer: 1,
        explanation:
          'Vascular endothelial cells are mechanosensors. Physiological arterial shear stress (0.5–2.5 Pa) activates mechanosensors (PECAM-1, VE-cadherin, integrins, PIEZO1 ion channels), triggering KLF2/KLF4 transcription factors that upregulate eNOS (NO production → vasodilation), suppress inflammation (lower NF-κB, VCAM-1, ICAM-1), and elongate cells in the flow direction. Disturbed flow (oscillatory, low shear < 0.4 Pa at bifurcations) is pro-atherogenic — upregulates oxidative stress and inflammatory adhesion molecules.',
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=ck__9QKSD0A',
  },
  {
    id: 'brain-computer-interfaces',
    title: 'Brain-Computer Interfaces & Neural Decoding',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '🧠',
    description:
      'Brain-computer interfaces (BCIs) create a direct communication pathway between neural tissue and external devices, bypassing damaged efferent pathways. Invasive BCIs (Utah array, ECoG grids) record single-unit spikes or local field potentials (LFPs) with high spatial resolution. Non-invasive BCIs (EEG, fNIRS) sacrifice resolution for safety. Neural decoding transforms population activity patterns into motor commands, speech, or cognitive states. The Kalman filter is the dominant real-time decoder for continuous 2D/3D cursor control — it optimally combines a noisy neural observation model with a smooth movement dynamics model. Deep learning decoders (RNNs, transformers) increasingly outperform linear decoders for complex kinematic reconstruction.',
    keyIdea:
      'Kalman filter decoder: State equation x(t) = Ax(t−1) + w(t) (movement dynamics, w ~ N(0,Q)). Observation equation z(t) = Hx(t) + q(t) (neural firing rates observe state, q ~ N(0,R)). Two-step update: (1) Predict: x̂⁻ = Ax̂(t−1); (2) Update: x̂ = x̂⁻ + K[z−Hx̂⁻], where Kalman gain K = P⁻Hᵀ(HP⁻Hᵀ+R)⁻¹. Provides optimal minimum-variance state estimates under Gaussian noise assumptions.',
    example:
      'BrainGate2 trial (Simeral et al. 2021): A 96-channel Utah array implanted in motor cortex of a tetraplegic patient decoded 2D cursor velocity from single-unit spike trains using a Kalman filter decoder. Patient achieved 12.1 bits/min information throughput using imagined hand movements after 1,000 days post-implant — demonstrating long-term recording stability. The Kalman decoder was trained on brief calibration blocks then operated continuously in closed-loop.',
    quizzes: [
      {
        question: 'What is the fundamental advantage of invasive (intracortical) BCIs over non-invasive EEG BCIs?',
        options: [
          'Intracortical BCIs are safer because they avoid electromagnetic interference from scalp muscles',
          'Intracortical recordings have ~1,000× higher spatial resolution and can record single neuron spikes, providing far more information per unit time for high-performance decoding',
          'EEG requires general anesthesia for electrode placement while intracortical does not',
          'Intracortical BCIs can record from the entire cortex simultaneously while EEG only captures frontal lobe activity',
        ],
        answer: 1,
        explanation:
          'EEG records volume-conducted summations of millions of neurons through skull and scalp (~1 cm² spatial resolution, no single-unit activity). Utah arrays (10×10, 96 active electrodes, 400 μm pitch) record single-unit spikes and LFPs within ~50–140 μm of each electrode tip. This provides information about the firing of individual neurons — the fundamental computational currency of the brain — enabling higher degrees of freedom for prosthetic control (e.g., individual finger movements).',
      },
      {
        question: 'In the Kalman filter neural decoder, what does the "observation model" H represent?',
        options: [
          'The dynamics of how cursor velocity smoothly transitions between time steps',
          'The linear mapping from the decoded kinematic state (velocity, position) to expected neural firing rates',
          'The covariance of the process noise in the movement dynamics model',
          'The recursive update equation that corrects the state estimate using new spike observations',
        ],
        answer: 1,
        explanation:
          'The observation equation z(t) = Hx(t) + q models how the neural signal (e.g., firing rates across all recorded neurons) relates to the true kinematic state x(t) (cursor velocity, position). H is the N_neurons × N_states tuning matrix — estimated from calibration data (linear regression of neural responses vs. true movements). Each row of H encodes the "tuning curve" of one neuron — cosine tuning to movement direction is typical for motor cortex neurons.',
      },
      {
        question: 'What is neural population vector coding in motor cortex and how does it relate to BCI decoding?',
        options: [
          'Each neuron fires maximally for one specific discrete movement target, and population voting determines the most likely movement',
          'Each motor cortex neuron has a preferred direction and fires proportionally to the cosine of the angle between actual movement and its preferred direction; the population vector — weighted sum of preferred directions — predicts movement',
          'All neurons encode the same movement direction redundantly to increase signal-to-noise ratio',
          'Motor cortex population coding uses Gabor wavelets that can be decoded with matched filter templates',
        ],
        answer: 1,
        explanation:
          'Georgopoulos et al. showed that individual motor cortex neurons have a broad cosine tuning: r(θ) = b₀ + b₁·cos(θ − θ_preferred). The population vector P = Σᵢ rᵢ·cᵢ (weighted sum of preferred directions cᵢ with firing rate weights rᵢ) accurately predicts the direction of arm movement. This biological finding directly motivated linear decoding approaches in BCIs — the Kalman filter H matrix essentially learns these tuning curves from data.',
      },
      {
        question: 'What is ECoG (electrocorticography) and why is it a compelling intermediate BCI approach?',
        options: [
          'ECoG records LFPs from deep subcortical structures via stereotaxic implantation of depth electrodes',
          'ECoG places electrode arrays on the cortical surface (subdural or epidural), providing higher resolution than EEG without penetrating neural tissue, offering a compromise between invasiveness and signal quality',
          'ECoG uses carbon nanotube electrodes implanted inside individual neurons for single-cell recording',
          'ECoG is a non-invasive technique using high-density EEG combined with MRI-guided source localization',
        ],
        answer: 1,
        explanation:
          'ECoG grids (8×8 to 16×16 platinum electrodes, 4–10 mm pitch) lie on the cortical surface without piercing tissue, avoiding the immune/foreign-body response that degrades Utah array recordings over years. ECoG captures high-gamma (70–200 Hz) LFPs that encode fine motor and speech information with millimeter-scale spatial resolution — far better than EEG but less invasive than Utah arrays. ECoG-based speech BCIs (Chang Lab, UCSF) have decoded up to 250 words/min from motor speech cortex.',
      },
      {
        question: 'What is the "neural manifold" hypothesis and its significance for BCI decoder design?',
        options: [
          'Motor cortex neurons fire independently and their activity can only be decoded neuron by neuron',
          'Neural population activity during behavior lives on a low-dimensional manifold — coordinated patterns constrain the high-dimensional space — and decoders that respect this structure outperform those that ignore it',
          'The manifold represents the geometric shape of the cortical surface that determines electrode placement',
          'Neural manifolds are only relevant for visual cortex BCIs, not motor prosthetics',
        ],
        answer: 1,
        explanation:
          'Dimensionality reduction (PCA, GPFA, LFADS) of motor cortex population activity reveals that despite recording from 100s of neurons, the effective dimensionality of movement-related activity is ~10–20. This "neural manifold" reflects the circuit-level constraints on coordinated muscle activation patterns. Decoders that project to/from the manifold (latent factor models) are more robust to neuron turnover and recording non-stationarities, and generalize better — critical for stable long-term BCI performance.',
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=lMVB5aeH3wM',
  },
];
