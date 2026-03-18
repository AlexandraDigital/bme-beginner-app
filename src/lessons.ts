export interface Lesson {
  id: number;
  title: string;
  description: string;
  keyIdea: string;
  example: string;
  video?: string;
  quiz: {
    question: string;
    options: string[];
    answer: number;
  };
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "What is Biomedical Engineering?",
    description: "Biomedical Engineering (BME) sits at the crossroads of engineering, biology, and medicine. BME engineers design tools, devices, and systems that improve human health — from pacemakers to prosthetic limbs to MRI machines.",
    keyIdea: "BME combines engineering principles with biological and medical sciences to solve healthcare problems.",
    example: "A biomedical engineer might design an artificial heart valve using fluid mechanics, material science, and an understanding of human cardiovascular physiology.",
    video: "ht1fyLgBJQk",
    quiz: {
      question: "Which best describes Biomedical Engineering?",
      options: [
        "The study of computer programming for hospitals",
        "The application of engineering principles to solve medical and biological problems",
        "A branch of chemistry focused on drugs",
        "The design of buildings for healthcare facilities"
      ],
      answer: 1
    }
  },
  {
    id: 2,
    title: "Physics: Mechanics — Forces & Motion",
    description: "Mechanics is the branch of physics that studies how forces affect the motion of objects. In BME, mechanics helps us understand how bones handle stress, how blood flows through vessels, and how prosthetics move.",
    keyIdea: "Newton's 3 Laws: (1) Objects at rest stay at rest. (2) Force = Mass × Acceleration. (3) Every action has an equal and opposite reaction.",
    example: "When a person walks, ground reaction forces travel up through the leg bones. BME engineers use mechanics to design implants that can withstand these forces without breaking.",
    video: "ZM8ECpBuQYE",
    quiz: {
      question: "What does Newton's Second Law state?",
      options: [
        "Objects in motion stay in motion",
        "Force equals mass times acceleration (F = ma)",
        "Every action has an equal and opposite reaction",
        "Energy cannot be created or destroyed"
      ],
      answer: 1
    }
  },
  {
    id: 3,
    title: "Physics: Electricity & Magnetism",
    description: "Electricity and magnetism are foundational to medical devices like ECG machines, defibrillators, and MRI scanners. Understanding voltage, current, and magnetic fields is essential for BME.",
    keyIdea: "Ohm's Law: Voltage (V) = Current (I) × Resistance (R). The body conducts electricity through ions in tissues and fluids.",
    example: "An ECG (electrocardiogram) measures the tiny electrical signals produced by the heart. BME engineers design the electrodes and amplifiers that detect these microvolt-level signals.",
    video: "X_crE-unkFk",
    quiz: {
      question: "What does an ECG machine measure?",
      options: [
        "Blood pressure",
        "Oxygen levels in the blood",
        "Electrical signals produced by the heart",
        "Brain wave activity"
      ],
      answer: 2
    }
  },
  {
    id: 4,
    title: "Chemistry: General Chemistry Basics",
    description: "General chemistry covers atoms, molecules, chemical reactions, and the periodic table. In BME, chemistry helps you understand how materials interact with the body and how drugs work at a molecular level.",
    keyIdea: "Matter is made of atoms bonded together. Chemical reactions break and form bonds, releasing or absorbing energy.",
    example: "Titanium is used in bone implants because it forms a stable oxide layer that resists corrosion and is biocompatible — a property explained by its electron configuration and chemical reactivity.",
    quiz: {
      question: "Why is titanium commonly used in bone implants?",
      options: [
        "It is the cheapest metal available",
        "It is magnetic and easy to monitor",
        "It is biocompatible and resists corrosion in the body",
        "It dissolves safely after healing"
      ],
      answer: 2
    }
  },
  {
    id: 5,
    title: "Chemistry: Organic Chemistry Essentials",
    description: "Organic chemistry studies carbon-based molecules. Since life is built on carbon — DNA, proteins, fats — organic chemistry is central to understanding biology and designing biomaterials and drugs.",
    keyIdea: "Functional groups (like -OH, -COOH, -NH2) determine how organic molecules react. Carbon can form 4 bonds, creating incredibly complex structures.",
    example: "Polymers used in biodegradable sutures, like polylactic acid (PLA), are designed using organic chemistry so they break down safely inside the body over time.",
    quiz: {
      question: "What makes carbon special in organic chemistry?",
      options: [
        "It can form up to 2 bonds with other atoms",
        "It is the only element found in living things",
        "It can form 4 bonds, allowing for complex molecular structures",
        "It is the lightest element on the periodic table"
      ],
      answer: 2
    }
  },
  {
    id: 6,
    title: "Chemistry: Biochemistry Fundamentals",
    description: "Biochemistry bridges chemistry and biology — studying the chemical processes inside living cells. It covers proteins, enzymes, DNA, RNA, carbohydrates, and lipids.",
    keyIdea: "Proteins are made of amino acids and do most of the work in cells — as enzymes, structural components, and signaling molecules. DNA stores genetic information.",
    example: "Biosensors like glucose monitors detect blood sugar by using an enzyme (glucose oxidase) that reacts specifically with glucose. Understanding this enzyme reaction is pure biochemistry.",
    quiz: {
      question: "What are proteins made of?",
      options: [
        "Nucleotides",
        "Fatty acids",
        "Amino acids",
        "Glucose molecules"
      ],
      answer: 2
    }
  },
  {
    id: 7,
    title: "Biology: Human Anatomy",
    description: "Anatomy is the study of the structure of the human body — organs, bones, muscles, nerves, and blood vessels. BME engineers must know what they're designing for before they can design it!",
    keyIdea: "The human body has 11 organ systems (skeletal, muscular, cardiovascular, nervous, etc.) that work together to maintain life.",
    example: "Designing a knee replacement requires detailed knowledge of the knee's anatomy — the femur, tibia, patella, cartilage, ligaments, and the range of motion the joint must support.",
    quiz: {
      question: "How many organ systems does the human body have?",
      options: [
        "5",
        "8",
        "11",
        "14"
      ],
      answer: 2
    }
  },
  {
    id: 8,
    title: "Biology: Physiology",
    description: "Physiology studies how the body's systems function and maintain balance (homeostasis). It explains how the heart pumps blood, how lungs exchange gases, and how muscles contract.",
    keyIdea: "Homeostasis is the body's ability to maintain stable internal conditions (like temperature and pH) despite external changes.",
    example: "A ventilator must mimic lung physiology — delivering the right volume and pressure of air at the right rate to keep blood oxygen levels in the normal range.",
    quiz: {
      question: "What is homeostasis?",
      options: [
        "The process of growing new cells",
        "The body's ability to maintain stable internal conditions",
        "The breakdown of nutrients in the gut",
        "The electrical signaling of the nervous system"
      ],
      answer: 1
    }
  },
  {
    id: 9,
    title: "Biology: Cell Biology",
    description: "Cell biology examines the structure and function of cells — the basic unit of life. Understanding cells is key for tissue engineering, drug delivery, and understanding how diseases develop.",
    keyIdea: "Cells have a nucleus (containing DNA), mitochondria (energy production), and a membrane. Cell signaling allows cells to communicate and respond to their environment.",
    example: "In tissue engineering, BME engineers grow cells on scaffolds to build replacement tissues. They must understand how cells attach, grow, and communicate to guide this process.",
    quiz: {
      question: "What is the role of mitochondria in a cell?",
      options: [
        "Store genetic information",
        "Produce energy (ATP) for the cell",
        "Control what enters and exits the cell",
        "Build proteins from amino acids"
      ],
      answer: 1
    }
  },
  {
    id: 10,
    title: "Mathematics: Calculus for BME",
    description: "Calculus studies change and accumulation — rates (derivatives) and totals (integrals). BME uses calculus constantly: modeling blood flow, drug concentration over time, and signal processing.",
    keyIdea: "A derivative measures how fast something changes. An integral measures the total accumulation. Together they describe dynamic systems.",
    example: "Pharmacokinetics (how drugs move through the body) is modeled with differential equations. The rate a drug clears from the blood = -k × current concentration.",
    quiz: {
      question: "In BME, what does a derivative help us calculate?",
      options: [
        "The total volume of blood in the body",
        "How fast a quantity is changing at a specific moment",
        "The average height of a patient population",
        "The number of cells in a tissue sample"
      ],
      answer: 1
    }
  },
  {
    id: 11,
    title: "Mathematics: Linear Algebra",
    description: "Linear algebra deals with vectors, matrices, and systems of equations. In BME, it's used in medical imaging (CT, MRI reconstruction), machine learning for diagnostics, and biomechanical modeling.",
    keyIdea: "Matrices are grids of numbers that represent transformations or systems of equations. Matrix multiplication is the foundation of 3D modeling and image processing.",
    example: "CT scans reconstruct a 3D image of the body from thousands of 2D X-ray projections. This reconstruction uses a linear algebra technique called filtered back-projection.",
    quiz: {
      question: "Which medical imaging technique relies heavily on linear algebra for image reconstruction?",
      options: [
        "Blood pressure cuffs",
        "Stethoscopes",
        "CT scans",
        "Thermometers"
      ],
      answer: 2
    }
  },
  {
    id: 12,
    title: "Mathematics: Differential Equations",
    description: "Differential equations describe how systems change over time. They're essential in BME for modeling physiological processes like nerve impulses, heart rhythms, and drug delivery.",
    keyIdea: "A differential equation relates a function to its derivatives. The Hodgkin-Huxley model uses 4 differential equations to describe how neurons fire.",
    example: "The spread of a drug through the bloodstream, the decay of a radioactive tracer in a PET scan, and the oscillation of a heartbeat can all be modeled with differential equations.",
    quiz: {
      question: "What famous model uses differential equations to describe how neurons fire?",
      options: [
        "The Newton-Euler Model",
        "The Hodgkin-Huxley Model",
        "The Navier-Stokes Model",
        "The Fourier Transform"
      ],
      answer: 1
    }
  },
  {
    id: 13,
    title: "Programming for BME",
    description: "Programming is one of the most valuable skills a BME can have. Python and MATLAB are most common for data analysis, simulations, and AI. Start with Harvard's free CS50 course!",
    keyIdea: "Python is beginner-friendly and widely used in BME for signal processing, machine learning, and data visualization. Start with CS50: cs50.harvard.edu/x",
    example: "A BME engineer might write Python code to analyze EEG brain signals, detect anomalies in ECG data using machine learning, or simulate drug diffusion in tissue.",
    quiz: {
      question: "Which programming language is most commonly recommended for beginners in BME?",
      options: [
        "Assembly",
        "Java",
        "Python",
        "Fortran"
      ],
      answer: 2
    }
  },
  {
    id: 14,
    title: "CAD & Design Software",
    description: "Computer-Aided Design (CAD) software lets BME engineers create 3D models of devices and implants before manufacturing them. Tools like SolidWorks, AutoCAD, and Fusion 360 are widely used.",
    keyIdea: "CAD models allow engineers to test designs virtually — simulating stress, heat, and fluid flow — before spending money on physical prototypes.",
    example: "Before manufacturing a custom prosthetic hand, a BME engineer creates a detailed 3D CAD model, runs a stress simulation, and refines the design — all before printing a single part.",
    quiz: {
      question: "What is the primary benefit of using CAD software in medical device design?",
      options: [
        "It allows devices to be sold directly to patients",
        "It replaces the need for clinical trials",
        "It lets engineers test and refine designs virtually before manufacturing",
        "It automatically obtains FDA approval"
      ],
      answer: 2
    }
  },
  {
    id: 15,
    title: "Technical Writing & Communication",
    description: "BME engineers must communicate complex ideas clearly — in lab reports, research papers, grant proposals, and to patients or the public. Technical writing and public speaking are career superpowers.",
    keyIdea: "Good technical writing is clear, precise, and structured. Understand your audience: write differently for engineers vs. patients vs. regulators.",
    example: "Submitting a medical device for FDA approval requires detailed technical documentation — design specifications, test results, risk analyses — all written in precise, unambiguous language.",
    quiz: {
      question: "Why is scientific communication important for a BME engineer?",
      options: [
        "It helps them avoid doing experiments",
        "It is only needed for academic professors, not engineers",
        "It allows them to share findings, collaborate, and communicate designs to diverse audiences",
        "It is required only for marketing purposes"
      ],
      answer: 2
    }
  },
  {
    id: 16,
    title: "Networking & Professional Development",
    description: "Building your professional network early gives you access to research opportunities, internships, mentors, and jobs. Join IEEE EMBS (Engineering in Medicine and Biology Society) and attend BME conferences.",
    keyIdea: "Your network is your net worth in engineering. Connect with professors, industry professionals, and alumni. LinkedIn, conferences, and research labs are great starting points.",
    example: "A 1st-year BME student emails a professor whose lab works on neural interfaces. After a meeting, they get a volunteer research position — leading to a publication by their junior year.",
    quiz: {
      question: "What is the main professional society for Biomedical Engineers?",
      options: [
        "AMA (American Medical Association)",
        "IEEE EMBS (Engineering in Medicine and Biology Society)",
        "ACM (Association for Computing Machinery)",
        "ACS (American Chemical Society)"
      ],
      answer: 1
    }
  },
  {
    id: 17,
    title: "Research Opportunities in BME",
    description: "Getting involved in research as early as possible sets you apart. Explore BME subfields — biomaterials, neural engineering, medical imaging, tissue engineering, bioinformatics — to find your passion.",
    keyIdea: "BME subfields include: Biomaterials, Neural Engineering, Medical Imaging, Tissue Engineering, Bioinformatics, Biomechanics, and Drug Delivery.",
    example: "A student interested in neural engineering volunteers in a lab studying brain-computer interfaces (BCIs). They help collect data from EEG experiments and eventually co-author a conference paper.",
    quiz: {
      question: "Which of the following is a subfield of Biomedical Engineering?",
      options: [
        "Astrophysics",
        "Geotechnical Engineering",
        "Tissue Engineering",
        "Supply Chain Management"
      ],
      answer: 2
    }
  }
];
