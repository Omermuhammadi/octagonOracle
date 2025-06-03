export interface TrainingModule {
  id: number
  name: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  description: string
  objectives: string[]
  techniques: Array<{
    name: string
    description: string
    videoUrl?: string
    steps: string[]
  }>
  prerequisites?: string[]
  equipment: string[]
  safetyTips: string[]
  progressMetrics: Array<{
    metric: string
    target: string
    current?: number
  }>
}

export const trainingModulesDatabase: TrainingModule[] = [
  {
    id: 1,
    name: "Basic Stance & Movement",
    duration: "2 weeks",
    difficulty: "Beginner",
    description: "Learn proper fighting stance and basic footwork fundamentals.",
    objectives: [
      "Master orthodox and southpaw stances",
      "Develop balance and stability",
      "Learn basic footwork patterns",
      "Understand distance management",
    ],
    techniques: [
      {
        name: "Orthodox Stance",
        description: "The fundamental right-handed fighting position",
        steps: [
          "Stand with left foot forward, right foot back",
          "Feet shoulder-width apart",
          "Weight evenly distributed",
          "Hands up, chin down",
          "Elbows close to body",
        ],
      },
      {
        name: "Basic Footwork",
        description: "Essential movement patterns for positioning",
        steps: [
          "Step and slide movements",
          "Maintain stance while moving",
          "Practice forward and backward movement",
          "Learn lateral movement",
          "Pivot and angle changes",
        ],
      },
    ],
    equipment: ["Training shoes", "Comfortable clothing", "Mirror (optional)"],
    safetyTips: ["Start slowly and focus on form", "Warm up before training", "Stay hydrated", "Listen to your body"],
    progressMetrics: [
      { metric: "Stance hold time", target: "5 minutes", current: 0 },
      { metric: "Footwork accuracy", target: "90%", current: 0 },
      { metric: "Balance test", target: "30 seconds", current: 0 },
    ],
  },
  {
    id: 2,
    name: "Fundamental Strikes",
    duration: "3 weeks",
    difficulty: "Beginner",
    description: "Master basic punches, kicks, and defensive movements.",
    objectives: [
      "Learn proper punching technique",
      "Develop basic kicking skills",
      "Understand power generation",
      "Practice defensive movements",
    ],
    techniques: [
      {
        name: "Jab",
        description: "The fundamental straight punch with the lead hand",
        steps: [
          "Start in fighting stance",
          "Extend lead hand straight forward",
          "Rotate fist palm down on impact",
          "Keep other hand up for defense",
          "Return to guard position quickly",
        ],
      },
      {
        name: "Cross",
        description: "Power punch with the rear hand",
        steps: [
          "Rotate hips and shoulders",
          "Drive rear hand straight forward",
          "Step forward with rear foot",
          "Full body rotation for power",
          "Return to stance",
        ],
      },
      {
        name: "Front Kick",
        description: "Basic defensive kick using the lead leg",
        steps: [
          "Lift knee to chest level",
          "Extend leg straight forward",
          "Strike with ball of foot",
          "Retract leg quickly",
          "Return to stance",
        ],
      },
    ],
    prerequisites: ["Basic Stance & Movement"],
    equipment: ["Heavy bag", "Hand wraps", "Training gloves"],
    safetyTips: [
      "Always wrap hands before striking",
      "Start with light contact",
      "Focus on technique over power",
      "Cool down after training",
    ],
    progressMetrics: [
      { metric: "Punch accuracy", target: "80%", current: 0 },
      { metric: "Combination speed", target: "10 per minute", current: 0 },
      { metric: "Power development", target: "Level 3", current: 0 },
    ],
  },
  {
    id: 3,
    name: "Defense Basics",
    duration: "2 weeks",
    difficulty: "Beginner",
    description: "Develop blocking, parrying, and evasive techniques.",
    objectives: [
      "Learn basic blocking techniques",
      "Develop parrying skills",
      "Practice head movement",
      "Understand defensive positioning",
    ],
    techniques: [
      {
        name: "High Block",
        description: "Defense against overhead attacks",
        steps: [
          "Raise both arms above head",
          "Form X-shape with forearms",
          "Keep elbows close together",
          "Absorb impact with forearms",
          "Counter-attack immediately",
        ],
      },
      {
        name: "Slip",
        description: "Head movement to avoid punches",
        steps: [
          "Bend knees slightly",
          "Move head off centerline",
          "Keep eyes on opponent",
          "Maintain balance",
          "Return to center position",
        ],
      },
    ],
    prerequisites: ["Fundamental Strikes"],
    equipment: ["Focus mitts", "Partner or trainer"],
    safetyTips: [
      "Practice slowly at first",
      "Communicate with training partner",
      "Wear protective gear when sparring",
      "Stop if you feel dizzy",
    ],
    progressMetrics: [
      { metric: "Block success rate", target: "85%", current: 0 },
      { metric: "Reaction time", target: "0.5 seconds", current: 0 },
      { metric: "Defense combinations", target: "5 different", current: 0 },
    ],
  },
  {
    id: 4,
    name: "Conditioning",
    duration: "4 weeks",
    difficulty: "Beginner",
    description: "Build strength, endurance, and flexibility for martial arts.",
    objectives: [
      "Improve cardiovascular fitness",
      "Build functional strength",
      "Increase flexibility",
      "Develop martial arts-specific conditioning",
    ],
    techniques: [
      {
        name: "Shadow Boxing",
        description: "Solo training for technique and cardio",
        steps: [
          "Warm up with light movement",
          "Practice combinations in air",
          "Focus on form and speed",
          "3-minute rounds with 1-minute rest",
          "Cool down with stretching",
        ],
      },
      {
        name: "Bag Work",
        description: "Power and conditioning training",
        steps: [
          "Wrap hands properly",
          "Start with light contact",
          "Practice all learned techniques",
          "Increase intensity gradually",
          "Focus on breathing",
        ],
      },
    ],
    prerequisites: ["Defense Basics"],
    equipment: ["Heavy bag", "Timer", "Jump rope", "Yoga mat"],
    safetyTips: ["Progress gradually", "Stay hydrated throughout", "Rest when needed", "Proper warm-up and cool-down"],
    progressMetrics: [
      { metric: "Cardio endurance", target: "15 minutes continuous", current: 0 },
      { metric: "Strength improvement", target: "25% increase", current: 0 },
      { metric: "Flexibility score", target: "Good range", current: 0 },
    ],
  },
  {
    id: 5,
    name: "Sparring Introduction",
    duration: "3 weeks",
    difficulty: "Beginner",
    description: "Begin controlled practice with partners.",
    objectives: [
      "Apply techniques in live situations",
      "Develop timing and distance",
      "Build confidence in contact",
      "Learn sparring etiquette",
    ],
    techniques: [
      {
        name: "Light Contact Sparring",
        description: "Controlled practice with minimal contact",
        steps: [
          "Wear all protective gear",
          "Start with 50% speed and power",
          "Focus on technique over aggression",
          "Respect your partner",
          "Stop when instructor says",
        ],
      },
      {
        name: "Drill Sparring",
        description: "Structured sparring with specific goals",
        steps: [
          "Practice specific techniques only",
          "Take turns attacking and defending",
          "Focus on one skill at a time",
          "Provide feedback to partner",
          "Reset and repeat",
        ],
      },
    ],
    prerequisites: ["Conditioning"],
    equipment: ["Headgear", "Mouthguard", "Gloves", "Shin guards", "Groin protection"],
    safetyTips: [
      "Never spar without protective gear",
      "Communicate with your partner",
      "Start very light and slow",
      "Stop immediately if injured",
      "Respect tap-outs and verbal stops",
    ],
    progressMetrics: [
      { metric: "Sparring rounds completed", target: "20 rounds", current: 0 },
      { metric: "Technique application", target: "70% success", current: 0 },
      { metric: "Control and safety", target: "Excellent", current: 0 },
    ],
  },
  {
    id: 6,
    name: "Fighting Fundamentals",
    duration: "4 weeks",
    difficulty: "Beginner",
    description: "Master stance, movement, and basic techniques for adult beginners.",
    objectives: [
      "Perfect fighting stance and movement",
      "Develop basic striking combinations",
      "Learn fundamental defensive techniques",
      "Build martial arts foundation",
    ],
    techniques: [
      {
        name: "Combination Training",
        description: "Linking multiple techniques together",
        steps: [
          "Start with 2-punch combinations",
          "Add kicks to combinations",
          "Practice flowing movements",
          "Increase speed gradually",
          "Maintain proper form",
        ],
      },
      {
        name: "Distance Management",
        description: "Controlling range and positioning",
        steps: [
          "Understand fighting ranges",
          "Practice entering and exiting",
          "Use footwork to control distance",
          "Recognize optimal striking range",
          "Avoid being cornered",
        ],
      },
    ],
    equipment: ["Full training gear", "Heavy bag", "Focus mitts", "Timer"],
    safetyTips: [
      "Master basics before advancing",
      "Train consistently",
      "Focus on quality over quantity",
      "Get proper instruction",
    ],
    progressMetrics: [
      { metric: "Combination fluency", target: "10 combinations", current: 0 },
      { metric: "Distance control", target: "Advanced", current: 0 },
      { metric: "Overall technique", target: "Proficient", current: 0 },
    ],
  },
  {
    id: 7,
    name: "Striking Techniques",
    duration: "6 weeks",
    difficulty: "Intermediate",
    description: "Develop powerful and accurate striking combinations.",
    objectives: [
      "Master advanced striking techniques",
      "Develop knockout power",
      "Learn complex combinations",
      "Improve accuracy and timing",
    ],
    techniques: [
      {
        name: "Hook Punch",
        description: "Circular punch targeting the side of the head or body",
        steps: [
          "Start in fighting stance",
          "Rotate hips and shoulders",
          "Keep elbow at 90 degrees",
          "Strike in circular motion",
          "Follow through with body rotation",
        ],
      },
      {
        name: "Uppercut",
        description: "Upward punch targeting the chin or solar plexus",
        steps: [
          "Drop slightly into stance",
          "Drive upward with rear hand",
          "Rotate hips upward",
          "Keep other hand up for defense",
          "Return to guard position",
        ],
      },
      {
        name: "Roundhouse Kick",
        description: "Circular kick using the shin or instep",
        steps: [
          "Pivot on support foot",
          "Lift knee across body",
          "Snap leg out in circular motion",
          "Strike with shin or instep",
          "Return leg to chamber position",
        ],
      },
    ],
    prerequisites: ["Fighting Fundamentals"],
    equipment: ["Heavy bag", "Thai pads", "Shin guards", "Focus mitts"],
    safetyTips: [
      "Condition shins gradually",
      "Use proper protective gear",
      "Focus on technique before power",
      "Train with experienced partners",
    ],
    progressMetrics: [
      { metric: "Power generation", target: "Advanced level", current: 0 },
      { metric: "Striking accuracy", target: "90%", current: 0 },
      { metric: "Combination complexity", target: "5+ techniques", current: 0 },
    ],
  },
  {
    id: 8,
    name: "Grappling Basics",
    duration: "6 weeks",
    difficulty: "Intermediate",
    description: "Learn takedowns, control positions, and submissions.",
    objectives: [
      "Master basic takedowns",
      "Learn ground control positions",
      "Develop submission skills",
      "Understand grappling strategy",
    ],
    techniques: [
      {
        name: "Double Leg Takedown",
        description: "Fundamental wrestling takedown",
        steps: [
          "Change levels by dropping down",
          "Drive forward with shoulder",
          "Grab both legs behind knees",
          "Lift and drive opponent backward",
          "Follow through to ground control",
        ],
      },
      {
        name: "Mount Position",
        description: "Dominant ground control position",
        steps: [
          "Sit on opponent's torso",
          "Keep knees tight to their sides",
          "Maintain good posture",
          "Control their arms",
          "Look for submission opportunities",
        ],
      },
      {
        name: "Rear Naked Choke",
        description: "Fundamental submission from back control",
        steps: [
          "Secure back control position",
          "Slide arm under opponent's chin",
          "Grab your own bicep",
          "Place other hand behind their head",
          "Squeeze and apply pressure",
        ],
      },
    ],
    prerequisites: ["Striking Techniques"],
    equipment: ["Grappling mats", "Gi or no-gi attire", "Mouthguard"],
    safetyTips: [
      "Tap early and often",
      "Communicate with training partners",
      "Learn to fall safely",
      "Respect submission holds",
      "Stop when someone taps",
    ],
    progressMetrics: [
      { metric: "Takedown success", target: "70%", current: 0 },
      { metric: "Position control", target: "2 minutes", current: 0 },
      { metric: "Submission knowledge", target: "10 techniques", current: 0 },
    ],
  },
]
