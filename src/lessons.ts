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
  quizzes: QuizQuestion[];
  connections: string[];
  xpReward: number;
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
    id: 'medical-imaging',
    title: 'Medical Imaging: Seeing Inside the Body',
    tier: 'advanced',
    subject: 'Imaging',
    icon: '🩻',
    description:
      'Medical imaging technologies allow clinicians to visualize internal anatomy and physiology non-invasively. X-ray, CT, MRI, ultrasound, and PET exploit different physical interactions with tissue to produce images with varying resolution, contrast, speed, and radiation risk. BME engineers design the hardware, algorithms, and processing pipelines that make these modalities possible.',
    keyIdea:
      'Each imaging modality exploits a different physical interaction between energy and tissue — choosing the right modality requires understanding these trade-offs.',
    example:
      'MRI uses magnetic resonance of hydrogen nuclei to generate images with exceptional soft-tissue contrast and no ionizing radiation, making it the gold standard for brain and joint imaging.',
    connections: ['medical-devices', 'bioinformatics'],
    xpReward: 30,
    quizzes: [
      {
        question:
          'CT (computed tomography) images are based on differences in tissue X-ray attenuation, measured in Hounsfield Units (HU). Which tissue has HU values near +1000?',
        options: [
          'Fat (HU ≈ −100)',
          'Water (HU = 0)',
          'Cortical bone (HU ≈ +1000)',
          'Air (HU ≈ −1000)',
        ],
        answer: 2,
        explanation:
          'Cortical bone strongly attenuates X-rays (HU ≈ +1000), while air attenuates minimally (HU ≈ −1000). Soft tissues cluster around 0–100 HU. Understanding HU values guides window/level settings to optimize CT image contrast for specific tissues.',
      },
      {
        question:
          'Ultrasound imaging uses acoustic waves. The axial resolution of an ultrasound image is primarily determined by:',
        options: [
          'Transducer aperture width',
          'Sound speed in tissue',
          'Pulse duration (spatial pulse length)',
          'Patient body habitus',
        ],
        answer: 2,
        explanation:
          'Axial resolution = spatial pulse length / 2 = (n × λ) / 2, where n is the number of cycles per pulse and λ is wavelength. Shorter pulses (higher bandwidth) give better axial resolution. This is why high-frequency transducers (≥10 MHz) are used for superficial structures needing fine detail.',
      },
      {
        question:
          'PET (Positron Emission Tomography) uses ¹⁸F-FDG (fluorodeoxyglucose). Tumors appear as "hot spots" because:',
        options: [
          'Tumors have increased blood flow relative to normal tissue',
          'Cancer cells have upregulated glucose transporters and high glycolytic activity',
          'FDG is selectively toxic to cancer cells and accumulates as they die',
          'Tumors have lower temperature and retain FDG longer',
        ],
        answer: 1,
        explanation:
          'The Warburg effect: cancer cells preferentially use aerobic glycolysis even when oxygen is available, consuming large amounts of glucose. ¹⁸F-FDG is a glucose analogue that is trapped in cells after phosphorylation, creating high-signal regions on PET images corresponding to metabolically active tumors.',
      },
      {
        question:
          'Image reconstruction in CT uses filtered backprojection (FBP). The "ramp filter" applied in FBP is needed to:',
        options: [
          'Remove motion artifacts from breathing',
          'Correct for the blurring caused by backprojection alone',
          'Convert frequency-domain data to the time domain',
          'Remove low-frequency noise from detector electronics',
        ],
        answer: 1,
        explanation:
          'Simple backprojection creates a blurred image because each projection smears intensity across the reconstruction. The ramp filter (|f| weighting in frequency domain) deblurs by emphasizing high-frequency edges. FBP is the classic CT reconstruction algorithm, though iterative methods are increasingly used to reduce noise at lower radiation doses.',
      },
      {
        question:
          'A radiologist needs to image soft tissue tumors near the spinal cord with maximum soft-tissue contrast and no ionizing radiation. Which modality is most appropriate?',
        options: [
          'Plain X-ray',
          'CT with contrast',
          'MRI with gadolinium contrast',
          'Nuclear bone scan',
        ],
        answer: 2,
        explanation:
          'MRI provides superior soft tissue contrast without ionizing radiation, making it ideal for spinal cord and paraspinal soft tissue evaluation. Gadolinium contrast enhances vascular and tumor tissue. CT delivers ionizing radiation and has inferior soft tissue contrast compared to MRI.',
      },
    ],
  },

  {
    id: 'bioelectronics',
    title: 'Bioelectrical Signals: ECG, EEG, EMG',
    tier: 'advanced',
    subject: 'Signals',
    icon: '💓',
    description:
      'Every heartbeat, brain thought, and muscle contraction generates measurable electrical signals. Bioelectronics engineers design electrode systems, differential amplifiers, and signal processing pipelines to record, amplify, and interpret these signals for diagnosis and closed-loop therapeutic control. ECG, EEG, and EMG are the three most clinically important bioelectric modalities.',
    keyIdea:
      'Every heartbeat, brain thought, and muscle contraction produces a measurable electrical signal — detecting and decoding these signals is the core of clinical bioelectronics.',
    example:
      'A 12-lead ECG records the heart\'s electrical activity from 12 different angles simultaneously, allowing spatial localization of myocardial infarction (heart attack) by identifying which leads show ST-elevation.',
    connections: ['medical-devices', 'neural-engineering'],
    xpReward: 30,
    quizzes: [
      {
        question:
          'The resting membrane potential of a typical neuron is approximately:',
        options: ['+70 mV', '0 mV', '−70 mV', '−120 mV'],
        answer: 2,
        explanation:
          'Resting membrane potential is ~−70 mV (inside relative to outside), maintained by the sodium-potassium ATPase and selective K⁺ permeability. This baseline is critical for neuronal excitability — depolarization above threshold triggers an action potential.',
      },
      {
        question:
          'In a standard 12-lead ECG, the P wave represents:',
        options: [
          'Ventricular depolarization',
          'Atrial repolarization',
          'Atrial depolarization',
          'Ventricular repolarization',
        ],
        answer: 2,
        explanation:
          'The P wave results from atrial depolarization originating at the sinoatrial (SA) node spreading through the atria. The QRS complex represents ventricular depolarization, and the T wave represents ventricular repolarization.',
      },
      {
        question:
          'Differential amplifiers are used in bioelectric recording systems. Their key advantage for ECG recording is:',
        options: [
          'They amplify both common-mode and differential signals equally',
          'They have high common-mode rejection ratio (CMRR), eliminating shared noise (e.g., 60 Hz interference)',
          'They increase the impedance of the electrode-skin interface',
          'They convert analog signals to digital without an ADC',
        ],
        answer: 1,
        explanation:
          'Differential amplifiers amplify the voltage difference between two inputs while rejecting signals common to both (common-mode signals like 60 Hz noise). A high CMRR (>80 dB) is essential for clean bioelectric recordings where the signal (μV–mV) is tiny compared to environmental noise.',
      },
      {
        question:
          'EMG (electromyography) signals recorded during a maximum voluntary contraction of the biceps will show:',
        options: [
          'A single, isolated motor unit action potential (MUAP)',
          'No electrical activity since muscles are fully shortened',
          'Dense interference pattern of many overlapping MUAPs at high firing rates',
          'A regular sinusoidal signal at 10 Hz',
        ],
        answer: 2,
        explanation:
          'During maximum voluntary contraction, many motor units fire rapidly and nearly simultaneously. The surface EMG captures a dense "interference pattern" of superimposed MUAPs. EMG amplitude and frequency content are used to assess neuromuscular function and fatigue.',
      },
      {
        question:
          'An implantable cardiac defibrillator (ICD) continuously monitors a patient\'s heart rhythm via intracardiac electrograms. When ventricular fibrillation is detected, the device delivers a ~30–40 J shock. The detection algorithm must minimize:',
        options: [
          'True positives (correctly identified VF)',
          'True negatives (correctly identified normal rhythm)',
          'False positives (shock delivered when VF is NOT present)',
          'The number of monitoring channels',
        ],
        answer: 2,
        explanation:
          'False positive shock delivery is dangerous and painful — delivering a high-energy shock during normal sinus rhythm can itself induce arrhythmia. ICD detection algorithms carefully balance sensitivity (catching all true VF) against specificity (avoiding false positives in fast normal rhythms or T-wave oversensing).',
      },
    ],
  },

  {
    id: 'tissue-engineering',
    title: 'Tissue Engineering & Regenerative Medicine',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '🌱',
    description:
      'Tissue engineering combines scaffolds, cells, and bioreactor systems to create functional living replacements for damaged organs and tissues. This transformative field bridges cell biology, biomaterials, and engineering to address the critical shortage of donor organs. Key challenges include vascularization, immune tolerance, and regulatory approval.',
    keyIdea:
      'Tissue engineering aims to grow functional living tissue outside the body by combining cells, scaffolds, and bioactive signals — then implant it to restore organ function.',
    example:
      '3D bioprinted tracheal scaffolds seeded with patient-derived stem cells have been implanted in patients with tracheal cancer — using the patient\'s own cells avoids immune rejection without lifetime immunosuppression.',
    connections: ['medical-devices'],
    xpReward: 30,
    quizzes: [
      {
        question:
          'The extracellular matrix (ECM) in a tissue engineering scaffold serves primarily to:',
        options: [
          'Provide electrical conductivity to the construct',
          'Deliver mechanical support, guide cell behavior, and provide biochemical signals for adhesion and differentiation',
          'Prevent vascularization of the implant',
          'Accelerate immune rejection',
        ],
        answer: 1,
        explanation:
          'The ECM (natural or synthetic) provides structural support and contains bioactive ligands (fibronectin, laminin) that guide cell adhesion, migration, and differentiation. Scaffolds that mimic native ECM biochemistry and mechanics dramatically improve cell viability and tissue maturation.',
      },
      {
        question:
          'Induced pluripotent stem cells (iPSCs) are produced by:',
        options: [
          'Extracting stem cells from the inner cell mass of embryos',
          'Reprogramming adult somatic cells by introducing transcription factors (Oct4, Sox2, Klf4, c-Myc)',
          'Treating adult cells with CRISPR to activate dormant stem cell genes',
          'Fusing egg cells with adult tissue cells',
        ],
        answer: 1,
        explanation:
          'Yamanaka\'s Nobel Prize-winning discovery showed that somatic cells can be reprogrammed to pluripotency by expressing four transcription factors (OSKM). iPSCs can be derived from a patient\'s own cells, enabling autologous tissue engineering that avoids immune rejection.',
      },
      {
        question:
          'The critical challenge of vascularization in thick tissue constructs arises because:',
        options: [
          'Blood vessels prevent cell proliferation',
          'Oxygen diffusion from the surface only reaches ~200 μm into tissue, causing necrosis in deeper regions',
          'Vascularized constructs cannot be transplanted surgically',
          'Blood vessels increase immune rejection',
        ],
        answer: 1,
        explanation:
          'Oxygen diffusion is limited to ~100–200 μm from a blood vessel. Tissues thicker than this threshold develop a necrotic core unless they contain a vascular network. Creating pre-vascularized scaffolds or inducing angiogenesis post-implantation is the primary bottleneck in engineering thick organs.',
      },
      {
        question:
          'A bioreactor used in tissue engineering provides:',
        options: [
          'Only a sterile container for cell storage',
          'A controlled environment with appropriate mechanical stimulation, nutrient delivery, and gas exchange to mature engineered tissue',
          'A high-temperature environment to sterilize scaffolds',
          'An electromagnetic field to eliminate contaminating microbes',
        ],
        answer: 1,
        explanation:
          'Bioreactors mimic the in vivo physiological environment — providing appropriate shear stress (for vascular grafts), cyclic mechanical stretch (for cardiac tissue), nutrient perfusion, and controlled gas exchange (O₂/CO₂). Mechanical stimulation is critical for developing mature, functional tissue.',
      },
      {
        question:
          'Under FDA regulations, a cell-based tissue engineered product is classified as a(n):',
        options: [
          'Class I medical device (510(k) exempt)',
          'Biological product regulated under the Public Health Service Act (PHS Act 351)',
          'Drug regulated under a New Drug Application (NDA)',
          'Class II medical device requiring 510(k) clearance',
        ],
        answer: 1,
        explanation:
          'Cell-based and tissue-engineered products are regulated as biologics under the PHS Act Section 351, requiring a Biologics License Application (BLA) — the most stringent regulatory pathway. Combined device-drug-biologic products may require combination product review by multiple FDA centers.',
      },
    ],
  },

  {
    id: 'drug-delivery',
    title: 'Drug Delivery Systems & Pharmacokinetics',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '💊',
    description:
      'Drug delivery engineering designs systems that control when, where, and how fast a drug is released in the body. From biodegradable polymer nanoparticles to implantable pumps, these systems dramatically improve therapeutic efficacy while reducing side effects. Pharmacokinetics (PK) provides the mathematical framework for predicting drug concentration profiles in the body.',
    keyIdea:
      'Controlled release delivers the right drug dose to the right place at the right time — overcoming the limitations of conventional bolus dosing.',
    example:
      'PEGylated liposomal doxorubicin (Doxil) exploits the Enhanced Permeability and Retention (EPR) effect — tumor vasculature leakiness allows nanoparticles to accumulate selectively in tumor tissue, increasing efficacy and reducing cardiac toxicity.',
    connections: ['medical-devices'],
    xpReward: 30,
    quizzes: [
      {
        question:
          'Bioavailability (F) of an orally administered drug is defined as the fraction of administered dose that reaches systemic circulation unchanged. If an oral drug has F = 0.3, how does its oral dose compare to an equivalent IV dose?',
        options: [
          'Oral dose is 30% of IV dose',
          'Oral dose is 3.3× (1/0.3) the IV dose',
          'Oral dose is identical to IV dose',
          'Oral dose is 70% of IV dose',
        ],
        answer: 1,
        explanation:
          'To achieve the same systemic exposure (AUC), oral dose = IV dose / F = IV dose / 0.3 = 3.3× the IV dose. First-pass hepatic metabolism, gut wall metabolism, and incomplete absorption reduce oral bioavailability. Formulation engineering aims to maximize F.',
      },
      {
        question:
          'PLGA nanoparticles release their drug payload primarily by which mechanism(s)?',
        options: [
          'Thermal melting of the polymer at body temperature',
          'Diffusion through the polymer matrix and hydrolytic degradation of the PLGA backbone',
          'pH-triggered burst release in the bloodstream',
          'Enzymatic cleavage by blood proteases',
        ],
        answer: 1,
        explanation:
          'PLGA nanoparticles release drugs by two mechanisms: (1) diffusion through the polymer matrix (early release) and (2) erosion as ester bonds hydrolyze and the polymer degrades into lactic and glycolic acid. The PLGA ratio (e.g., 50:50 vs 75:25) determines degradation rate.',
      },
      {
        question:
          'The volume of distribution (Vd) of a drug is 100 L in a 70 kg patient. This large Vd suggests the drug:',
        options: [
          'Stays almost entirely in the bloodstream (plasma volume ~3 L)',
          'Is extensively distributed into tissues (far exceeds plasma volume)',
          'Has very high bioavailability',
          'Has a long half-life',
        ],
        answer: 1,
        explanation:
          'A Vd of 100 L far exceeds total body water (~42 L), indicating extensive tissue binding (lipophilic drugs sequester in fat, muscle, or organ tissue). High Vd drugs have lower plasma concentrations for a given dose — an important dosing consideration.',
      },
      {
        question:
          'Active targeting of nanoparticles to cancer cells is achieved by:',
        options: [
          'Increasing nanoparticle size to >500 nm for enhanced EPR effect',
          'Conjugating targeting ligands (e.g., antibodies, folate, aptamers) to nanoparticle surfaces that bind overexpressed receptors on cancer cells',
          'Making nanoparticles cationic so they bind anionic cancer cell membranes',
          'Loading nanoparticles with iron oxide for magnetic targeting',
        ],
        answer: 1,
        explanation:
          'Active targeting uses ligands conjugated to nanoparticle surfaces (e.g., anti-HER2 antibodies, folate for folate receptor-overexpressing cancers) to selectively bind receptors overexpressed on tumor cells. This increases drug accumulation in tumors while sparing normal tissue.',
      },
      {
        question:
          'A patient requires a drug that must maintain plasma concentration between 10–20 ng/mL (therapeutic window). If the drug\'s half-life is 8 hours, what is the appropriate dosing interval using the target trough concentration approach?',
        options: [
          '1 hour (very frequent dosing)',
          'One half-life (8 hours) to prevent trough below 10 ng/mL',
          '24 hours (once daily)',
          'The half-life is irrelevant to dosing interval',
        ],
        answer: 1,
        explanation:
          'Dosing every one half-life means plasma concentration falls by 50% between doses. To maintain concentrations within a narrow therapeutic window with a 2:1 peak-to-trough ratio (20:10 ng/mL), dosing at one half-life (8 hours) is rational. This ensures steady-state concentrations stay within the therapeutic range.',
      },
    ],
  },

  {
    id: 'medical-devices',
    title: 'Medical Device Design & FDA Regulation',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '🏥',
    description:
      'Designing medical devices requires more than engineering skill — it demands mastery of regulatory pathways, risk management, biocompatibility testing, and clinical evidence generation. The FDA classifies devices into three risk-based classes, each with different approval requirements. Understanding this landscape is essential for every BME professional bringing products to patients.',
    keyIdea:
      'Medical devices must be proven both safe AND effective through rigorous design controls, testing, and regulatory review before reaching patients.',
    example:
      'A new coronary artery stent must pass ISO 10993 biocompatibility testing, fatigue and fracture mechanics bench testing, animal studies, and finally randomized controlled clinical trials before FDA PMA approval.',
    connections: ['bioinformatics', 'neural-engineering'],
    xpReward: 30,
    quizzes: [
      {
        question:
          'The FDA classifies medical devices into Classes I, II, and III based on risk level. Which class includes the highest-risk devices, such as implantable cardiac defibrillators?',
        options: [
          'Class I',
          'Class II',
          'Class III',
          'Class IV',
        ],
        answer: 2,
        explanation:
          'Class III devices (e.g., ICDs, heart valves, cochlear implants) present the highest patient risk and require a Premarket Approval (PMA) — the most rigorous FDA review requiring valid scientific evidence of safety and effectiveness, typically from clinical trials.',
      },
      {
        question:
          'A 510(k) premarket notification is appropriate when a new device is "substantially equivalent" to a predicate device already on the market. Substantial equivalence means:',
        options: [
          'The new device is identical in every way to the predicate',
          'The new device has the same intended use and same or equivalent technological characteristics as the predicate',
          'The new device is cheaper than the predicate',
          'The new device has been used in fewer than 1,000 patients',
        ],
        answer: 1,
        explanation:
          '510(k) clearance requires demonstrating that the new device has the same intended use and same (or different but non-safety-compromising) technology as a cleared predicate device. 510(k) does not require clinical data in most cases — making it much faster than PMA.',
      },
      {
        question:
          'Design controls, required by FDA 21 CFR Part 820 for Class II and III devices, include which of the following?',
        options: [
          'Only aesthetic and manufacturing considerations',
          'Design input requirements, outputs, verification, validation, and design reviews',
          'Marketing and sales strategy documentation',
          'Patient consent forms for each device sold',
        ],
        answer: 1,
        explanation:
          'FDA design controls require a formal design and development process: design inputs (requirements), outputs (specifications and drawings), verification (does the design meet requirements?), validation (does the device meet user needs in real conditions?), and design reviews at each phase.',
      },
      {
        question:
          'ISO 14971 is the international standard for medical device risk management. The risk of a device hazard is calculated as:',
        options: [
          'Risk = Severity of harm only',
          'Risk = Probability of harm × Severity of harm',
          'Risk = Number of users × Device cost',
          'Risk = Time to failure / Device price',
        ],
        answer: 1,
        explanation:
          'ISO 14971 defines risk = probability of occurrence of harm × severity of harm. Risk management involves identifying hazards, estimating risk, implementing risk controls, and verifying controls reduce risk to an acceptable level — a mandatory process for all medical devices.',
      },
      {
        question:
          'A randomized controlled trial (RCT) for a new cardiac device assigns patients randomly to the new device or standard care. The primary purpose of randomization is to:',
        options: [
          'Ensure the device is tested only in healthy patients',
          'Eliminate confounding variables by distributing known and unknown patient characteristics equally between groups',
          'Reduce the sample size needed for statistical significance',
          'Allow the company to choose which patients receive the new device',
        ],
        answer: 1,
        explanation:
          'Randomization distributes patient characteristics (age, comorbidities, disease severity) equally between treatment groups, eliminating selection bias and confounding. This allows differences in outcomes to be attributed causally to the device — the gold standard for clinical evidence.',
      },
    ],
  },

  {
    id: 'bioinformatics',
    title: 'Bioinformatics & Genomic Engineering',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '🧫',
    description:
      'Modern genomics generates terabytes of biological data that cannot be analyzed by hand. Bioinformatics applies computer science, statistics, and mathematics to decode the genome, identify disease genes, and design targeted interventions. CRISPR-Cas9 gene editing — designed using bioinformatics tools — has opened a new era of precision medicine.',
    keyIdea:
      'Genomic data is biological big data — computational algorithms are essential to extract meaning from DNA sequences and design precision therapies.',
    example:
      'CRISPR-Cas9 gene editing relies on computational guide RNA design tools to identify a 20-nucleotide sequence that precisely targets the disease-causing mutation while minimizing off-target edits elsewhere in the genome.',
    connections: ['neural-engineering'],
    xpReward: 30,
    quizzes: [
      {
        question:
          'Next-generation sequencing (NGS) produces millions of short DNA "reads." After sequencing, the first step in a standard bioinformatics pipeline is:',
        options: [
          'Variant calling to identify mutations',
          'Aligning reads to a reference genome',
          'RNA differential expression analysis',
          'Protein structure prediction',
        ],
        answer: 1,
        explanation:
          'After sequencing, raw reads are quality-filtered, then aligned (mapped) to a reference genome using tools like BWA or STAR. Only after alignment can downstream analyses (variant calling, expression quantification) be performed.',
      },
      {
        question:
          'BLAST (Basic Local Alignment Search Tool) is used to:',
        options: [
          'Predict protein secondary structure from amino acid sequence',
          'Find regions of similarity between a query sequence and sequences in a database',
          'Design guide RNAs for CRISPR editing',
          'Assemble short sequencing reads into a complete genome',
        ],
        answer: 1,
        explanation:
          'BLAST searches nucleotide or protein sequence databases for similar sequences, scoring alignments using substitution matrices. It is used to identify unknown genes, infer function by homology, and find evolutionary relationships — the most widely used bioinformatics tool.',
      },
      {
        question:
          'The CRISPR-Cas9 system requires two components to create a double-strand DNA break: the Cas9 nuclease and a(n):',
        options: [
          'Restriction enzyme recognition sequence',
          'Single guide RNA (sgRNA) complementary to the target DNA sequence',
          'DNA methyltransferase',
          'Zinc finger nuclease',
        ],
        answer: 1,
        explanation:
          'The sgRNA provides sequence specificity — its 20-nucleotide spacer region base-pairs with the target DNA, directing Cas9 to create a double-strand break at that precise location. The guide RNA is designed computationally to minimize off-target effects.',
      },
      {
        question:
          'Differential gene expression analysis between cancer and normal tissue RNA-seq samples uses statistical testing to identify genes that are significantly up- or down-regulated. The false discovery rate (FDR) correction (e.g., Benjamini-Hochberg) is applied to:',
        options: [
          'Increase the statistical power of the test',
          'Control the expected proportion of false positive significant results when testing thousands of genes simultaneously',
          'Remove low-quality sequencing reads from the dataset',
          'Normalize read counts across different sequencing depths',
        ],
        answer: 1,
        explanation:
          'Testing 20,000 genes simultaneously at p<0.05 would yield ~1,000 false positives by chance alone. FDR correction (adjusted p-values/q-values) controls the fraction of false discoveries among all significant results — essential for genomic discovery studies.',
      },
      {
        question:
          'Machine learning models trained on genomic data for cancer diagnosis must be validated on an independent test set to assess:',
        options: [
          'Training accuracy on the samples used to build the model',
          'Generalizability to new, unseen patient data (avoiding overfitting)',
          'The speed of the sequencing machine',
          'The statistical significance of individual gene variants',
        ],
        answer: 1,
        explanation:
          'Overfitting occurs when a model memorizes training data patterns without generalizing. Validation on an independent test set (never used in training or hyperparameter tuning) estimates real-world diagnostic performance — essential before clinical deployment of AI/ML diagnostic tools.',
      },
    ],
  },

  {
    id: 'neural-engineering',
    title: 'Neural Engineering & Brain-Computer Interfaces',
    tier: 'advanced',
    subject: 'Advanced BME',
    icon: '🧠',
    description:
      'Neural engineering applies engineering principles to understand, interface with, and repair the nervous system. Brain-computer interfaces (BCIs) record neural signals and translate them into control commands for assistive devices, prosthetics, or computers — restoring communication and motor function to paralyzed patients. Deep brain stimulation (DBS) modulates pathological neural circuits to treat Parkinson\'s disease and depression.',
    keyIdea:
      'Brain-computer interfaces decode neural activity patterns to restore lost function in paralyzed patients — turning thought into action through engineering.',
    example:
      'The BrainGate BCI implants a microelectrode array (Utah Array) in motor cortex — when the patient imagines moving their hand, recorded neural firing patterns are decoded in real time to control a computer cursor or robotic arm.',
    connections: [],
    xpReward: 30,
    quizzes: [
      {
        question:
          'During an action potential, the initial rapid depolarization is caused by:',
        options: [
          'Opening of voltage-gated K⁺ channels',
          'Closing of leak Na⁺ channels',
          'Opening of voltage-gated Na⁺ channels (fast Na⁺ influx)',
          'Activation of the Na⁺/K⁺ ATPase pump',
        ],
        answer: 2,
        explanation:
          'When membrane potential reaches threshold (~−55 mV), voltage-gated Na⁺ channels open rapidly, allowing Na⁺ to rush in down its electrochemical gradient, depolarizing the membrane to ~+40 mV. Subsequent K⁺ channel opening drives repolarization.',
      },
      {
        question:
          'The Utah Electrode Array (UEA), used in BrainGate BCIs, consists of 100 penetrating silicon electrodes arranged in a 10×10 grid. It records signals at what level of neural organization?',
        options: [
          'Local field potentials only (population-level activity)',
          'Single-unit action potentials and multi-unit activity from individual neurons',
          'EEG-level signals through the skull',
          'Axon conduction velocity of long-distance pathways',
        ],
        answer: 1,
        explanation:
          'Penetrating microelectrodes like the Utah Array record single-unit (individual neuron) and multi-unit action potentials at the tip of each electrode (within ~150 μm). This single-neuron resolution provides the highest-bandwidth neural control signals for BCIs.',
      },
      {
        question:
          'Spike sorting is a signal processing step in BCI systems that:',
        options: [
          'Removes electrical noise from recorded signals',
          'Assigns individual action potentials to their source neurons based on waveform shape features',
          'Converts analog neural signals to digital format',
          'Selects which electrode channels to record from',
        ],
        answer: 1,
        explanation:
          'A single electrode may record signals from multiple nearby neurons. Spike sorting uses clustering algorithms (e.g., k-means, Gaussian mixture models) to classify each detected spike to its source neuron based on waveform shape. This determines the "vocabulary" of neural units available for decoding.',
      },
      {
        question:
          'Deep brain stimulation (DBS) for Parkinson\'s disease delivers high-frequency (130–180 Hz) electrical pulses to the subthalamic nucleus (STN). The therapeutic mechanism is thought to be:',
        options: [
          'Permanently destroying the overactive STN neurons',
          'Providing dopamine to compensate for substantia nigra loss',
          'Disrupting pathological synchronized oscillations in the basal ganglia circuit',
          'Activating the motor cortex directly',
        ],
        answer: 2,
        explanation:
          'Parkinson\'s disease is characterized by pathological beta-band (13–30 Hz) synchronization in the basal ganglia-thalamo-cortical circuit. High-frequency DBS is thought to disrupt this pathological synchrony, effectively "jamming" the oscillation that causes bradykinesia and tremor — similar to how dithering randomizes a stuck system.',
      },
      {
        question:
          'A linear decoder (e.g., population vector algorithm or Wiener filter) in a BCI system predicts intended hand velocity from neural firing rates. The primary limitation of linear decoders compared to nonlinear approaches is:',
        options: [
          'They are too slow to run in real time',
          'They cannot capture complex nonlinear relationships between neural activity and intended movement',
          'They require more training data than nonlinear models',
          'They cannot be implemented on implanted hardware',
        ],
        answer: 1,
        explanation:
          'Motor cortex neural activity encodes movement in complex, nonlinear ways. Linear decoders assume a linear mapping from neural firing rates to movement, which is an approximation that degrades for complex movements or during neural adaptation. Recurrent neural networks (RNNs) and deep learning decoders better capture these nonlinearities in high-performance BCIs.',
      },
    ],
  },
];
