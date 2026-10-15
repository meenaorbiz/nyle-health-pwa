export type LongevityMarker = {
  id: string;
  num: string;
  label: string;
  pct: number;
  category: string;
  clinicalInsight: string;
  nextStepAction: string;
};

export type EducationalVideo = {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  thumb: string;
  isDirectMp4?: boolean;
};

export const DEFAULT_LONGEVITY_MARKERS: LongevityMarker[] = [
  {
    id: "m_grip",
    num: "01",
    label: "Grip Strength",
    pct: 86,
    category: "Neuromuscular Vitality",
    clinicalInsight: "Primary predictor of all-cause mortality, upper-body neuromuscular integrity, and biological aging rate.",
    nextStepAction: "Dynamometer baseline test during physical assessment.",
  },
  {
    id: "m_posture",
    num: "02",
    label: "Postural Balance",
    pct: 72,
    category: "Vestibular & Core Stability",
    clinicalInsight: "Evaluates proprioception and fall-prevention resilience critical for independent living post-60.",
    nextStepAction: "Single-leg stance & force-plate stability screening.",
  },
  {
    id: "m_gait",
    num: "03",
    label: "Gait & Mobility",
    pct: 64,
    category: "Functional Locomotion",
    clinicalInsight: "Walking speed and stride symmetry correlate directly with cardiovascular and neurological reserve.",
    nextStepAction: "4-meter timed walk & joint range-of-motion analysis.",
  },
  {
    id: "m_cognition",
    num: "04",
    label: "Cognitive Sharpness",
    pct: 80,
    category: "Neuro-Longevity",
    clinicalInsight: "Measures executive function, working memory, and processing speed to detect early midlife shifts.",
    nextStepAction: "Digital neuro-cognitive reaction & recall assessment.",
  },
  {
    id: "m_muscle",
    num: "05",
    label: "Muscle Mass Index",
    pct: 58,
    category: "Sarcopenia Defense",
    clinicalInsight: "Appendicular skeletal muscle mass acts as your primary metabolic sink for glucose disposal.",
    nextStepAction: "Bio-impedance / DEXA body composition scan.",
  },
  {
    id: "m_metabolic",
    num: "06",
    label: "Metabolic Score",
    pct: 76,
    category: "Endocrine & Cellular Energy",
    clinicalInsight: "Synthesizes insulin sensitivity, lipid ratios, and inflammatory markers.",
    nextStepAction: "Fasting metabolic panel & continuous glucose review.",
  },
];

export const DR_NEHA_VIDEOS: EducationalVideo[] = [
  {
    id: "v1",
    title: "The Nyle Protocol: Personalized Longevity & Independent Living",
    duration: "Watch Video",
    videoUrl: "https://www.livel.in/videos/story-web.mp4",
    thumb: "https://www.livel.in/images/article-nyle-protocol-600.jpg",
    isDirectMp4: true,
  },
  {
    id: "v2",
    title: "Why Muscle Mass & Grip Strength Predict Healthy Aging",
    duration: "Livel Insight",
    videoUrl: "https://www.livel.in/",
    thumb: "https://www.livel.in/images/article-muscle-mass-600.jpg",
  },
  {
    id: "v3",
    title: "Protecting Midlife Brain & Cognitive Sharpness",
    duration: "Livel Insight",
    videoUrl: "https://www.livel.in/",
    thumb: "https://www.livel.in/images/article-midlife-brain-600.jpg",
  },
];

export const AVAILABLE_TIME_SLOTS = ["10:30 AM", "12:00 PM", "04:00 PM", "06:00 PM"];
