import { QuizQuestion } from './lessons';

export interface FinalExam {
  tier: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  xpReward: number;
}

export const finals: FinalExam[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BEGINNER FINAL — covers lessons 1-8
  // ─────────────────────────────────────────────────────────────────────────
  {
    tier: 'beginner',
    title: 'Foundations of BME',
    description:
      'A comprehensive test of your foundational knowledge spanning all beginner-level topics: what BME is, classical mechanics, general chemistry, cell biology, calculus, biomolecules, programming, and scientific measurement. Questions test connections between topics and your ability to apply concepts in simple biomedical contexts.',
    passingScore: 70,
    xpReward: 100,
    questions: [
      {
        question:
          'A biomedical engineer is designing a drug-delivery nanoparticle that must enter a cell via endocytosis. Which cell biology concept is MOST directly relevant to the design of the particle\'s surface chemistry?',
        options: [
          'Mitotic spindle formation during cell division',
          'The phospholipid bilayer composition and membrane receptor-ligand interactions',
          'The function of ribosomes in protein synthesis',
          'The role of the Golgi apparatus in vesicle trafficking',
        ],
        answer: 1,
        explanation:
          'Endocytosis is mediated by specific membrane receptors and lipid bilayer mechanics. Engineering nanoparticle surfaces with receptor-targeting ligands exploits the same molecular interactions that govern how cells normally internalize large molecules.',
      },
      {
        question:
          'The derivative of drug concentration C(t) = C₀e^(−kt) with respect to time gives the rate of change of concentration. Which of the following correctly represents dC/dt?',
        options: [
          'C₀e^(kt)',
          '−kC₀e^(−kt)',
          'kC₀e^(kt)',
          '−C₀/k',
        ],
        answer: 1,
        explanation:
          'By the chain rule, d/dt[C₀e^(−kt)] = C₀ · (−k) · e^(−kt) = −kC₀e^(−kt). This negative rate confirms the concentration is falling — the foundation of first-order pharmacokinetics.',
      },
      {
        question:
          'Classical mechanics tells us stress = force/area. Cell biology tells us that cells sense mechanical stress through membrane proteins called mechanoreceptors. Which functional group on a mechanoreceptor protein would most likely form a reversible non-covalent interaction with a ligand?',
        options: [
          'A peptide bond backbone',
          'A disulfide bond in the extracellular domain',
          'Hydrogen-bond donor/acceptor groups in the binding pocket (e.g., −OH, −NH)',
          'The hydrophobic transmembrane helix',
        ],
        answer: 2,
        explanation:
          'Non-covalent receptor-ligand interactions rely on hydrogen bonds, electrostatic interactions, and van der Waals forces between functional groups in the binding site. Hydroxyl (−OH) and amine (−NH) groups are key hydrogen-bond participants — a chemistry concept applied directly to the biological receptor question.',
      },
      {
        question:
          'A scientist measures the pH of a cell culture medium and finds it is 6.8 instead of the target 7.4. By what factor has the hydrogen ion [H⁺] concentration changed compared to normal blood pH?',
        options: [
          '[H⁺] is 4× lower',
          '[H⁺] is 4× higher',
          '[H⁺] is approximately 4× higher (10^(7.4−6.8) ≈ 4)',
          '[H⁺] is 0.6× higher',
        ],
        answer: 2,
        explanation:
          'pH = −log[H⁺], so a pH drop of 0.6 units corresponds to [H⁺] increasing by 10^0.6 ≈ 4-fold. This pH shift would denature enzymes and impair cell function — relevant when designing buffered culture media and implant microenvironments.',
      },
      {
        question:
          'In a Python script analyzing ECG data, a variable `ecg_signal` stores 5,000 data points sampled at 500 Hz. The total recording duration is:',
        options: ['10 seconds', '5 seconds', '500 seconds', '0.1 seconds'],
        answer: 0,
        explanation:
          'Duration = number of samples / sampling rate = 5,000 / 500 Hz = 10 seconds. Calculating recording duration from sample counts and sampling rate is a fundamental step in any biomedical signal analysis script.',
      },
      {
        question:
          'A bone implant exerts a force on the surrounding cortical bone. Using Newton\'s Third Law, which statement is TRUE?',
        options: [
          'The implant exerts a force on the bone, but the bone exerts no force on the implant',
          'The bone exerts an equal and opposite force on the implant',
          'The implant force is always greater than the bone reaction force',
          'Forces only act on the bone — implants transmit load without experiencing stress',
        ],
        answer: 1,
        explanation:
          "Newton's Third Law: for every force, there is an equal and opposite reaction force. The bone pushes back on the implant with the same magnitude — which is why implant materials must withstand the mechanical loads from the tissue they support.",
      },
      {
        question:
          'DNA encodes the sequence of amino acids in proteins via the genetic code. If a mutation changes one codon from UUU (Phe) to UUG (Leu), this is called a:',
        options: [
          'Nonsense (stop) mutation',
          'Frameshift mutation',
          'Missense mutation',
          'Silent (synonymous) mutation',
        ],
        answer: 2,
        explanation:
          'A missense mutation changes one nucleotide, causing a different amino acid to be incorporated into the protein. This can alter protein folding and function — the molecular basis of many genetic diseases targeted by gene therapy.',
      },
      {
        question:
          'An engineer measures blood pressure three times and gets: 122, 118, and 120 mmHg. The true pressure is known to be 115 mmHg. What can be said about these measurements?',
        options: [
          'They are accurate (close to true value) and precise (consistent)',
          'They are precise (consistent with each other) but not accurate (systematically offset from true value)',
          'They are accurate but imprecise',
          'They are neither accurate nor precise',
        ],
        answer: 1,
        explanation:
          'The measurements cluster tightly around 120 mmHg (precise) but are consistently ~5 mmHg above the true value of 115 mmHg (not accurate — systematic bias). Distinguishing precision from accuracy is fundamental to instrument calibration and measurement error analysis.',
      },
      {
        question:
          'The integral ∫₀^∞ C₀e^(−kt) dt represents the total AUC of a drug following first-order elimination. Evaluating this integral yields:',
        options: ['C₀/k²', 'C₀k', 'C₀/k', 'k/C₀'],
        answer: 2,
        explanation:
          '∫₀^∞ C₀e^(−kt) dt = C₀ · [−e^(−kt)/k]₀^∞ = C₀ · (0 − (−1/k)) = C₀/k. AUC = C₀/k is the fundamental pharmacokinetic result — total drug exposure is the initial concentration divided by the elimination rate constant.',
      },
      {
        question:
          'BME combines multiple disciplines. A BME engineer designing a cochlear implant must draw on which set of fields?',
        options: [
          'Only audiology and surgery',
          'Electrical engineering (signal processing, microelectronics), anatomy (cochlear geometry), materials science (electrode biocompatibility), and physiology (auditory nerve function)',
          'Only mechanical engineering and chemistry',
          'Computer science and genomics exclusively',
        ],
        answer: 1,
        explanation:
          'The cochlear implant is a perfect BME case study: electrode arrays (materials + biocompatibility), signal processing chips (electrical engineering), surgical placement (anatomy), and neural stimulation protocols (neurophysiology). This multidisciplinary integration is the defining characteristic of BME.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTERMEDIATE FINAL — covers lessons 9-18
  // ─────────────────────────────────────────────────────────────────────────
  {
    tier: 'intermediate',
    title: 'Core BME Sciences',
    description:
      'A challenging test integrating intermediate-level BME knowledge across electromagnetism, organic and biochemistry, anatomy, physiology, linear algebra, differential equations, biomechanics, biomaterials, and signals processing. Questions require you to apply concepts from multiple topics simultaneously in realistic biomedical scenarios.',
    passingScore: 70,
    xpReward: 200,
    questions: [
      {
        question:
          'A neuron\'s membrane can be modeled as an RC circuit. If membrane capacitance C = 100 pF and resistance R = 100 MΩ, the membrane time constant τ = RC is:',
        options: ['1 μs', '10 ms', '1 ms', '100 ms'],
        answer: 1,
        explanation:
          'τ = RC = 100×10⁻¹² F × 100×10⁶ Ω = 10×10⁻³ s = 10 ms. This 10 ms time constant determines how quickly the neuron integrates incoming synaptic inputs before firing — connecting electromagnetism directly to physiology.',
      },
      {
        question:
          'In biomechanics, the Poiseuille equation predicts that atherosclerotic plaque reducing an artery\'s radius by 50% will reduce blood flow by:',
        options: [
          '50%',
          '75%',
          '87.5%',
          '93.75% (flow reduced to 1/16 of original)',
        ],
        answer: 3,
        explanation:
          'Poiseuille\'s Law: Q ∝ r⁴. If r is halved (×0.5), Q decreases by 0.5⁴ = 1/16 = 6.25% of original, meaning 93.75% reduction. This dramatic r⁴ dependence explains why even moderate arterial stenosis significantly impairs perfusion.',
      },
      {
        question:
          'A bioengineer is developing a PLGA scaffold for cartilage tissue engineering. They know cartilage is avascular and that PLGA degrades by hydrolysis. Which differential equation best models oxygen concentration C(x,t) diffusing through the scaffold while being consumed by cells?',
        options: [
          'dC/dt = kC (exponential growth)',
          '∂C/∂t = D(∂²C/∂x²) − Qcell (reaction-diffusion PDE)',
          'C = C₀e^(−kt) (first-order decay)',
          'd²C/dx² = 0 (Laplace equation, no time dependence)',
        ],
        answer: 1,
        explanation:
          'Oxygen transport in tissue combines diffusion (Fick\'s Second Law) with cellular consumption: ∂C/∂t = D·∂²C/∂x² − Qcell. This reaction-diffusion PDE explains why cells at the scaffold center become hypoxic — the oxygen concentration gradient steepens with distance from the surface.',
      },
      {
        question:
          'A biomaterial is implanted subcutaneously. The host response follows the sequence: protein adsorption → acute inflammation → chronic inflammation → foreign body giant cell formation → fibrous encapsulation. Which protein adsorption event MOST influences subsequent cell adhesion?',
        options: [
          'Albumin adsorption (passivates the surface)',
          'Fibrinogen adsorption and conversion to fibrin (activates platelet and inflammatory cell adhesion)',
          'Immunoglobulin G adsorption (triggers B-cell response)',
          'Collagen adsorption (attracts fibroblasts only)',
        ],
        answer: 1,
        explanation:
          'Fibrinogen rapidly adsorbs onto implant surfaces from plasma and converts to fibrin. Fibrin activates the clotting cascade and complement, recruits platelets, and promotes neutrophil/macrophage adhesion through integrin receptors — initiating the entire foreign body cascade.',
      },
      {
        question:
          'Principal Component Analysis (PCA) is applied to an ECG dataset with 100 patients × 500 time-point features. After PCA, the first 3 principal components explain 92% of variance. This means:',
        options: [
          '92% of patients have normal ECGs',
          'The 500-dimensional ECG data can be compressed to 3 dimensions while retaining 92% of the information content',
          '8% of ECG signals are corrupted by noise',
          'The dataset contains 92 statistically significant features',
        ],
        answer: 1,
        explanation:
          'PCA identifies orthogonal directions of maximum variance. Retaining only the top 3 PCs (dimensionality reduction from 500 to 3) captures 92% of the total data variance — a dramatic compression that simplifies classification and visualization of ECG patterns.',
      },
      {
        question:
          'The Michaelis-Menten equation for enzyme kinetics is v = Vmax·[S]/(Kₘ + [S]). At very high substrate concentrations ([S] >> Kₘ), the reaction rate approaches:',
        options: [
          'Zero (substrate inhibition)',
          'Vmax/2',
          'Vmax (zero-order kinetics)',
          'Infinite velocity',
        ],
        answer: 2,
        explanation:
          'When [S] >> Kₘ, v ≈ Vmax·[S]/[S] = Vmax. The enzyme is saturated — all active sites are occupied and rate is independent of further [S] increase (zero-order kinetics). This saturation kinetics concept also applies to drug transporter systems (e.g., renal tubular secretion) and drug-receptor interactions.',
      },
      {
        question:
          'The autonomic nervous system regulates homeostasis. During acute hemorrhage (blood loss), the sympathetic nervous system activates to:',
        options: [
          'Decrease heart rate and dilate blood vessels to reduce cardiac workload',
          'Increase heart rate, increase vascular resistance, and redistribute blood to vital organs',
          'Activate the parasympathetic "rest and digest" response',
          'Increase gastrointestinal motility',
        ],
        answer: 1,
        explanation:
          'Hemorrhage triggers sympathetic activation: baroreceptors detect falling blood pressure, triggering tachycardia (increased HR), vasoconstriction (increased SVR), and splanchnic blood redistribution to maintain perfusion to brain and heart. This physiological response guides the design of fluid resuscitation and vasopressor drug delivery systems.',
      },
      {
        question:
          'A bandpass filter is designed to pass ECG signals between 0.5 Hz and 40 Hz. At 60 Hz, the filter should exhibit:',
        options: [
          'Maximum gain (pass-band)',
          'Unity gain (0 dB)',
          'High attenuation (stop-band) to reject power line interference',
          'Phase reversal only, without amplitude change',
        ],
        answer: 2,
        explanation:
          '60 Hz is above the ECG bandpass filter\'s upper cutoff of 40 Hz, placing it in the stop band. The filter attenuates 60 Hz power line interference to prevent it from obscuring clinically important ECG features. A notch filter at 60 Hz can also be added for additional rejection.',
      },
      {
        question:
          'Fick\'s Law of diffusion states J = −D(dC/dx). A larger diffusion coefficient D for a drug through a PLGA membrane means:',
        options: [
          'The drug diffuses more slowly through the polymer',
          'The drug is more strongly bound to the polymer chains',
          'The drug diffuses faster, requiring thicker membrane or lower D polymer for sustained release',
          'The drug has a higher molecular weight',
        ],
        answer: 2,
        explanation:
          'Larger D means faster diffusion flux (J). For a sustained-release implant, high D is problematic — the drug would elute too quickly. Engineers select polymers with appropriate D values (tuned by crystallinity, cross-link density, and hydrophilicity) to achieve target release kinetics.',
      },
      {
        question:
          'In tissue engineering of a vascular graft, the construct must withstand pulsatile blood flow (systolic pressure ~120 mmHg). The compliance mismatch between a rigid synthetic graft and the native artery (which expands/contracts with each heartbeat) causes:',
        options: [
          'Improved blood flow due to reduced resistance',
          'Intimal hyperplasia and thrombosis at the anastomotic junction due to disturbed flow',
          'Faster endothelialization of the graft lumen',
          'Reduced platelet activation',
        ],
        answer: 1,
        explanation:
          'Compliance mismatch at graft-artery junctions creates disturbed (turbulent, oscillatory) blood flow and abnormal wall shear stress. This stimulates smooth muscle cell proliferation (intimal hyperplasia) and platelet activation, leading to graft failure — a key motivation for developing compliant tissue-engineered vascular grafts.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADVANCED FINAL — covers lessons 19-25
  // ─────────────────────────────────────────────────────────────────────────
  {
    tier: 'advanced',
    title: 'BME Mastery Challenge',
    description:
      'The ultimate BME test: case-study style questions and clinical scenarios that require you to integrate knowledge from medical imaging, bioelectronics, tissue engineering, drug delivery, medical device regulation, bioinformatics, and neural engineering. These questions mirror real-world BME decision-making and research challenges.',
    passingScore: 70,
    xpReward: 300,
    questions: [
      {
        question:
          'CLINICAL SCENARIO: A 65-year-old patient with a newly implanted titanium hip prosthesis needs imaging to evaluate periprosthetic joint infection (PJI). Which imaging modality is MOST appropriate, and why?',
        options: [
          'MRI — best soft tissue contrast and no radiation, but the titanium implant causes no issues',
          'CT with metal artifact reduction algorithm — CT is less affected by titanium than MRI, and MARS sequences minimize streak artifacts to allow periprosthetic soft tissue evaluation',
          'Plain X-ray — provides detailed soft tissue resolution around the implant',
          'PET-CT with ¹⁸F-FDG — gold standard for all joint infections due to high specificity',
        ],
        answer: 1,
        explanation:
          'Titanium causes susceptibility artifacts on MRI that obscure periprosthetic structures. CT with metal artifact reduction sequences (MARS/O-MAR) is preferred for evaluating bone and soft tissue near metallic implants. ¹⁸F-FDG PET-CT has variable specificity for PJI due to non-specific FDG uptake in post-surgical inflammation.',
      },
      {
        question:
          'DEVICE DESIGN: An implantable BCI requires electrodes that remain functional for >10 years in the brain. The primary long-term failure mode of silicon microelectrode arrays (like the Utah Array) is:',
        options: [
          'Electromagnetic interference from MRI scanners',
          'Neuroinflammation-driven glial scarring that encapsulates electrodes and increases impedance, reducing signal quality',
          'Corrosion of the titanium connector',
          'Battery depletion within 2 years',
        ],
        answer: 1,
        explanation:
          'The blood-brain barrier response to implanted microelectrodes triggers astrocyte and microglia activation, forming a glial scar (gliosis) around each electrode. This encapsulation increases electrode impedance and pushes neurons away from recording sites, causing progressive signal degradation — the primary chronic failure mode of BCI implants.',
      },
      {
        question:
          'REGULATORY SCENARIO: A startup develops a wearable continuous ECG patch that detects atrial fibrillation (AF) using a novel AI algorithm. The device is intended for prescription use in patients at risk for AF. No substantially equivalent predicate exists. Which FDA pathway is required?',
        options: [
          '510(k) clearance — all wearable ECG devices are Class II',
          'De Novo classification request — for novel, moderate-risk devices with no predicate, establishing a new device type and special controls',
          'Humanitarian Device Exemption (HDE) — for devices treating rare conditions',
          'Investigational Device Exemption (IDE) only — wearables never receive marketing approval',
        ],
        answer: 1,
        explanation:
          'When no substantially equivalent predicate exists and risk is moderate (not high-risk Class III), the De Novo pathway allows novel devices to be classified as Class II with special controls (e.g., algorithm performance requirements). De Novo approval also creates a new predicate for future 510(k) submissions — FDA\'s mechanism for classifying genuinely novel technologies.',
      },
      {
        question:
          'GENOMICS CASE: Whole-exome sequencing of a cancer patient identifies a BRCA2 frameshift mutation (c.5946delT, p.Ser1982Argfs). This variant is classified as pathogenic. The clinical implication for the patient\'s biomedical engineer-designed treatment planning is:',
        options: [
          'No treatment modification needed — BRCA2 mutations only affect inheritance patterns',
          'PARP inhibitor therapy (e.g., olaparib) is indicated, as BRCA2-deficient tumor cells cannot repair double-strand breaks by homologous recombination and are hypersensitive to PARP inhibition',
          'Increased radiation resistance expected — higher doses should be prescribed',
          'CRISPR correction of the BRCA2 mutation in somatic cells should be initiated immediately',
        ],
        answer: 1,
        explanation:
          'BRCA2 normally repairs double-strand DNA breaks via homologous recombination (HR). BRCA2-deficient tumors rely on PARP-mediated base excision repair. PARP inhibitors create synthetic lethality — blocking the backup pathway in HR-deficient cancer cells causes catastrophic DNA damage and selective cancer cell death while sparing normal cells.',
      },
      {
        question:
          'TISSUE ENGINEERING CHALLENGE: A team is engineering a full-thickness myocardial patch (5 mm thick) for cardiac repair after MI. The biggest biological engineering challenge is:',
        options: [
          'Finding enough cardiomyocytes — they can be easily harvested from the patient',
          'Ensuring electrical coupling between cells to allow synchronized contraction',
          'Achieving vascularization of the thick construct within 48 hours of implantation to prevent ischemic necrosis of the graft core',
          'Preventing the patch from contracting spontaneously before implantation',
        ],
        answer: 2,
        explanation:
          'At 5 mm thickness, the core of the construct is >200× the oxygen diffusion limit. Without rapid vascularization post-implantation, the center becomes hypoxic and necrotic within hours. Strategies include pre-vascularizing with endothelial cells in the scaffold, using oxygen-releasing biomaterials, or 3D printing vascular channel networks.',
      },
      {
        question:
          'PHARMACOKINETICS: A patient receives IV chemotherapy. The drug follows two-compartment PK: rapid distribution (t₁/₂α = 15 min) followed by slow elimination (t₁/₂β = 12 hr). Drug toxicity is correlated with total AUC. To achieve the same tumor AUC while reducing peak plasma concentration (reducing acute toxicity), the engineer should recommend:',
        options: [
          'Increasing the IV bolus dose',
          'Switching from bolus to continuous IV infusion over 4–6 hours',
          'Giving the dose as an oral tablet',
          'Reducing the dose to zero and switching to radiation therapy',
        ],
        answer: 1,
        explanation:
          'Continuous infusion spreads the same total dose over hours, reducing the Cmax (peak concentration) associated with acute toxicity (e.g., cardiac toxicity with anthracyclines) while achieving the same AUC (total exposure). This is the pharmacokinetic rationale for infusion pumps and liposomal formulations that similarly reduce Cmax.',
      },
      {
        question:
          'SIGNAL PROCESSING: An EEG BCI system decodes motor imagery from 64-electrode scalp recordings. The system uses a spatial filter (Common Spatial Pattern, CSP) that maximizes variance in one class while minimizing it in another. Mathematically, CSP solves a:',
        options: [
          'Fast Fourier Transform to isolate frequency bands',
          'Generalized eigenvalue problem to find spatial filters that optimally separate class-specific covariance matrices',
          'Simple threshold comparison on each electrode',
          'K-means clustering of electrode impedances',
        ],
        answer: 1,
        explanation:
          'CSP solves Σ₁W = λΣ₂W, a generalized eigenvalue problem where Σ₁ and Σ₂ are the spatial covariance matrices for two motor imagery classes. The eigenvectors (spatial filters) maximize the signal-to-noise ratio between classes in the feature space — connecting linear algebra directly to BCI algorithm design.',
      },
      {
        question:
          'BIOELECTRONICS: A patient\'s implanted cardiac pacemaker begins sensing T-waves as R-waves ("T-wave oversensing"), causing the pacemaker to inhibit its output inappropriately and creating pauses. The MOST likely engineering cause is:',
        options: [
          'Electromagnetic interference from a nearby power line',
          'Sensing amplifier gain set too high or sensitivity threshold set too sensitive, detecting the large T-wave amplitude',
          'Battery depletion reducing pacing output voltage',
          'Lead fracture causing loss of capture',
        ],
        answer: 1,
        explanation:
          'T-wave oversensing occurs when the sensing circuit is programmed with too high a sensitivity (lower threshold voltage), causing it to detect the T-wave (ventricular repolarization) as a second cardiac event. The solution is to decrease sensitivity (raise the threshold) or adjust the refractory period — connecting signal processing concepts to clinical device programming.',
      },
      {
        question:
          'IMAGING + ML: A deep learning model trained on 50,000 chest X-rays achieves 96% accuracy in detecting pneumothorax on the training set but only 74% accuracy on an independent hospital\'s test set. The most likely explanation and mitigation is:',
        options: [
          'The training set was too large — reducing to 10,000 images would improve generalization',
          'Dataset shift / overfitting: the model learned institution-specific artifacts (e.g., image processing, patient demographics). Mitigation: prospective multi-center validation and domain adaptation training',
          'The test hospital\'s X-ray machines are fundamentally incompatible with AI analysis',
          'Pneumothorax is too rare to be detected by machine learning',
        ],
        answer: 1,
        explanation:
          'The gap between training (96%) and external test (74%) accuracy indicates the model learned features specific to the training hospital\'s scanner, preprocessing pipeline, or patient population. Dataset shift is the leading challenge in deploying AI medical imaging tools — addressed by multi-center training datasets, federated learning, and rigorous external validation before clinical deployment.',
      },
      {
        question:
          'INTEGRATIVE DESIGN: You are designing a fully implantable artificial kidney for patients with end-stage renal disease. Rank the following engineering challenges in order of what you would address FIRST in the design process:',
        options: [
          'Marketing strategy → biocompatibility testing → size minimization → filtration membrane design',
          'User needs / design inputs → filtration membrane design → biocompatibility and materials → power source → regulatory strategy',
          'Regulatory approval → manufacturing → clinical trial → design inputs',
          'Power source selection → aesthetics → clinical trial → design inputs',
        ],
        answer: 1,
        explanation:
          'FDA 21 CFR Part 820 design controls require starting with user needs and design inputs (clinical requirements: filtration rate, biocompatibility, implant volume, power) before engineering solutions. Jumping to manufacturing or regulatory approval before defining requirements is a leading cause of medical device failure — the design control process exists precisely to prevent this.',
      },
    ],
  },
];
