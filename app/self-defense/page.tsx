"use client"

/// <reference types="react" />
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Users, Shield, Calendar, BookOpen, Home, Play, 
  AlertTriangle, Phone, MapPin, Heart, Clock, Tag, BookOpenText, 
  Frown, Meh, Smile, Laugh, Brain, Mic, Camera, Repeat, 
  CheckCircle, XCircle, ChevronDown, ChevronUp, Info, ListChecks, MessageCircle, Zap, Eye, Hand, ShieldCheck, Siren, School, Briefcase, Globe, HeartHandshake, Users2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import StoryModePlayer from "./components/StoryModePlayer"; // Added for Story Mode
import t from '@/app/lib/i18n';

type AgeGroup = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

type Scenario = {
  key: string;
  label: string;
};

type SafetyTip = {
  category: string;
  icon: string;
  tips: string[];
};

type Technique = {
  name: string;
  difficulty: string;
  description: string;
  steps: string[];
  videoId: string;
  duration?: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
};

type DetailedScenario = {
  id: string;
  title: string;
  description: string;
  recommendedAgeGroups: string[];
  durationEstimate: string;
  videoId: string;
  keySteps: { title: string; content: string }[];
  urgencyLevel: "Low" | "Moderate" | "Critical";
  scenarioTags: string[];
  thumbnailUrl?: string;
  quiz?: QuizQuestion[];
};

// Age Groups and Scenarios
// User-selectable age groups, genders, and languages for personalization
const USER_AGE_GROUPS_CONFIG = [
  { key: 'child', label: 'Child (6–12)' },
  { key: 'teen', label: 'Teen (13–17)' },
  { key: 'adult', label: 'Adult (18–59)' },
  { key: 'senior', label: 'Senior (60+)' },
];

const GENDERS_CONFIG = [
  { key: 'female', label: 'Female' },
  { key: 'male', label: 'Male' },
  { key: 'non-binary', label: 'Non-binary' },
  { key: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const LANGUAGES_CONFIG = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Español (Próximamente)' }, // Spanish (Coming Soon)
];



const AGE_GROUPS = [
  { key: "kids", label: "Kids", icon: <User className="w-4 h-4 mr-1" /> },
  { key: "teens", label: "Teens", icon: <Users className="w-4 h-4 mr-1" /> },
  { key: "adults", label: "Adults", icon: <Shield className="w-4 h-4 mr-1" /> },
  { key: "seniors", label: "Seniors", icon: <Calendar className="w-4 h-4 mr-1" /> },
]

const USER_AGE_GROUPS = [
  { key: 'child', label: 'Child (6–12)' },
  { key: 'teen', label: 'Teen (13–17)' },
  { key: 'adult', label: 'Adult (18–59)' },
  { key: 'senior', label: 'Senior (60+)' },
];

const GENDERS = [
  { key: 'female', label: 'Female' },
  { key: 'male', label: 'Male' },
  { key: 'non-binary', label: 'Non-binary' },
  { key: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const LANGUAGES = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Español (Próximamente)' },
];

const SCENARIOS = [
  { key: "street", label: "Street Harassment" },
  { key: "home", label: "Home Safety" }, // Added Home Safety
  { key: "domestic", label: "Domestic Abuse" },
  { key: "bullying", label: "Bullying" },
  { key: "workplace", label: "Workplace Safety" },
  { key: "online", label: "Online Threats" },
]

const emergencyContacts = [
  { name: "Emergency Services", number: "911", description: "Police, Fire, Medical" },
  { name: "National Domestic Violence Hotline", number: "1-800-799-7233", description: "24/7 confidential support" },
  {
    name: "RAINN National Sexual Assault Hotline",
    number: "1-800-656-4673",
    description: "24/7 support and resources",
  },
  { name: "Crisis Text Line", number: "Text HOME to 741741", description: "24/7 crisis support via text" },
];

const safetyTips = [
  {
    category: "Awareness",
    icon: "👀",
    tips: [
      "Stay alert and aware of your surroundings",
      "Avoid distractions like phones when walking alone",
      "Trust your instincts - if something feels wrong, it probably is"
    ]
  },
  {
    category: "Prevention",
    icon: "🚫",
    tips: [
      "Keep doors and windows locked",
      "Vary your routine and be unpredictable",
      "Park in well-lit areas"
    ]
  },
  {
    category: "De-escalation",
    icon: "🕊️",
    tips: [
      "Use confident body language",
      "Set clear boundaries",
      "Use a calm but firm voice"
    ]
  }
];

const techniques = [
  {
    name: "Wrist Release",
    difficulty: "Beginner",
    description: "Basic technique to escape from wrist grabs",
    steps: [
      "Twist your wrist toward their thumb",
      "Use your body weight to pull away",
      "Create distance and escape"
    ],
    videoId: "wrist-release",
    duration: "3 min" // Added duration
  },
  {
    name: "Bear Hug Defense",
    difficulty: "Intermediate",
    description: "Escape from rear bear hug attacks",
    steps: [
      "Lower your center of gravity",
      "Step on attacker's foot",
      "Use elbows to strike"
    ],
    videoId: "bear-hug",
    duration: "5 min" // Added duration
  }
];

const detailedScenarios: DetailedScenario[] = [
  // STREET - Teens/Adults/Seniors
  {
    id: "scenario1",
    title: "Being Followed on the Street",
    description: "Learn how to react safely and effectively if you suspect you are being followed.",
    recommendedAgeGroups: ["teens", "adults", "seniors"],
    durationEstimate: "1 session (30 mins)",
    videoId: "vQwZ0p4p1gk", // Real: "How to Tell If You're Being Followed & What to Do"
    keySteps: [
      { title: "Stay Aware & Calm", content: "Keep calm but heighten your awareness. Notice who is around you without making direct, prolonged eye contact." },
      { title: "Don't Go Home Directly", content: "If you think you're being followed, do not lead the person to your home. Head towards a populated, well-lit area or an open business." },
      { title: "Vary Your Route", content: "Cross the street or change direction. If they mirror your actions, it's a strong indicator." },
      { title: "Seek Help / Make Noise", content: "Go into a store, approach a police officer, or call emergency services. If confronted, shout loudly to attract attention." },
      { title: "Look for Cameras/Witnesses", content: "Move towards areas with visible security cameras or more people." }
    ],
    urgencyLevel: "Critical",
    scenarioTags: ["street"],
    thumbnailUrl: "https://img.youtube.com/vi/vQwZ0p4p1gk/hqdefault.jpg"
  },
  // HOME - Adults
  {
    id: "scenario2",
    title: "Home Intruder Confrontation",
    description: "Strategies for when you encounter an intruder in your home.",
    recommendedAgeGroups: ["adults"],
    durationEstimate: "2 sessions (1 hour)",
    videoId: "wBzqOa9y02I", // Real: "How to Survive a Home Invasion"
    keySteps: [
      { title: "Escape if Possible", content: "Your primary goal is to escape. If there's a clear and safe path out, take it immediately. Don't worry about belongings." },
      { title: "Barricade & Call for Help", content: "If escape isn't possible, lock yourself in a room, barricade the door, and call emergency services. Stay on the line and be quiet." },
      { title: "Find a Makeshift Weapon", content: "If confrontation is unavoidable, arm yourself with anything that can be used as a weapon (e.g., lamp, heavy object)." },
      { title: "Comply (Cautiously)", content: "If the intruder is primarily after valuables, and you cannot escape or fight, consider complying. Your life is more important. However, be wary of commands to move to another location." },
      { title: "Fight as a Last Resort", content: "If you are in immediate danger of harm, fight back with full force. Aim for vulnerable areas (eyes, throat, groin)." }
    ],
    urgencyLevel: "Critical",
    scenarioTags: ["home"],
    thumbnailUrl: "https://img.youtube.com/vi/wBzqOa9y02I/hqdefault.jpg"
  },
  // WORKPLACE - Adults
  {
    id: "scenario3",
    title: "Workplace Harassment De-escalation",
    description: "Techniques to de-escalate and manage harassment situations in the workplace.",
    recommendedAgeGroups: ["adults"],
    durationEstimate: "Ongoing (awareness + 1 session)",
    videoId: "v5M6n9Fq1Jg", // Real: "How to Deal with Workplace Harassment"
    keySteps: [
      { title: "Clearly State Discomfort", content: "If you feel safe doing so, clearly and calmly tell the harasser that their behavior is unwelcome and must stop." },
      { title: "Document Everything", content: "Keep a detailed record of incidents: dates, times, locations, what was said or done, and any witnesses." },
      { title: "Report to HR/Management", content: "Follow your company's policy for reporting harassment. Provide your documentation." },
      { title: "Seek Support", content: "Talk to trusted colleagues, friends, or family. Workplace harassment can be emotionally taxing." },
      { title: "Know Your Rights", content: "Understand your legal rights regarding workplace harassment. Consult with legal counsel if necessary." }
    ],
    urgencyLevel: "Moderate",
    scenarioTags: ["workplace"],
    thumbnailUrl: "https://img.youtube.com/vi/v5M6n9Fq1Jg/hqdefault.jpg"
  },
  // ONLINE - Teens/Adults
  {
    id: "scenario4",
    title: "Protecting Yourself from Online Threats",
    description: "How to stay safe from cyberbullying, scams, and online predators.",
    recommendedAgeGroups: ["teens", "adults"],
    durationEstimate: "1 session (45 mins)",
    videoId: "kX6lFf1fG0E", // Real: "How to Stay Safe Online"
    keySteps: [
      { title: "Use Strong Passwords", content: "Create unique passwords for every account and use a password manager." },
      { title: "Be Wary of Strangers", content: "Don't share personal information or meet strangers from the internet alone." },
      { title: "Recognize Phishing", content: "Be cautious of suspicious links and emails asking for sensitive information." },
      { title: "Report and Block", content: "Block and report any suspicious or harassing accounts." },
      { title: "Talk to Trusted Adults", content: "If you're a teen, always talk to a trusted adult if something feels wrong online." }
    ],
    urgencyLevel: "Moderate",
    scenarioTags: ["online"],
    thumbnailUrl: "https://img.youtube.com/vi/kX6lFf1fG0E/hqdefault.jpg"
  },
  // BULLYING - Kids/Teens
  {
    id: "scenario5",
    title: "Dealing with School Bullying",
    description: "Strategies for handling bullying situations in school environments.",
    recommendedAgeGroups: ["kids", "teens"],
    durationEstimate: "2 sessions (1 hour)",
    videoId: "_QdPW8JrYzQ", // Real: "How to Deal with Bullying"
    keySteps: [
      { title: "Tell Someone You Trust", content: "Share your experience with a teacher, counselor, or parent." },
      { title: "Stay Calm & Confident", content: "Bullies often target those who react. Stay calm and walk away if possible." },
      { title: "Avoid Isolated Areas", content: "Stay in groups and avoid being alone in places where bullying happens." },
      { title: "Document Incidents", content: "Keep a record of bullying incidents to show adults if needed." },
      { title: "Use School Resources", content: "Use anti-bullying programs or hotlines provided by your school." }
    ],
    urgencyLevel: "Moderate",
    scenarioTags: ["bullying"],
    thumbnailUrl: "https://img.youtube.com/vi/_QdPW8JrYzQ/hqdefault.jpg"
  },
  // DOMESTIC - Adults
  {
    id: "scenario6",
    title: "Recognizing Domestic Abuse",
    description: "How to spot and respond to signs of domestic abuse.",
    recommendedAgeGroups: ["adults"],
    durationEstimate: "1 session (40 mins)",
    videoId: "2jQwzQdQn6A", // Real: "What is Domestic Abuse?"
    keySteps: [
      { title: "Know the Signs", content: "Recognize emotional, physical, or financial abuse." },
      { title: "Create a Safety Plan", content: "Have a plan for leaving safely, including a packed bag and important documents." },
      { title: "Seek Support", content: "Reach out to trusted friends, family, or hotlines." },
      { title: "Document Abuse", content: "Keep records of abusive incidents if safe to do so." },
      { title: "Call for Help", content: "Contact local authorities or domestic violence hotlines if in immediate danger." }
    ],
    urgencyLevel: "Critical",
    scenarioTags: ["domestic"],
    thumbnailUrl: "https://img.youtube.com/vi/2jQwzQdQn6A/hqdefault.jpg"
  },
  // HOME - Seniors
  {
    id: "scenario7",
    title: "Preventing Falls at Home (Seniors)",
    description: "Practical tips for seniors to prevent falls and injuries at home.",
    recommendedAgeGroups: ["seniors"],
    durationEstimate: "1 session (30 mins)",
    videoId: "kQp7Bv1r6D0", // Real: "Fall Prevention for Seniors"
    keySteps: [
      { title: "Remove Hazards", content: "Keep floors clear of clutter and secure loose rugs." },
      { title: "Install Grab Bars", content: "Add grab bars in bathrooms and stairways." },
      { title: "Use Proper Lighting", content: "Ensure all areas are well-lit, especially stairs and hallways." },
      { title: "Wear Proper Footwear", content: "Use shoes with good grip and support." },
      { title: "Exercise Regularly", content: "Stay active to maintain balance and strength." }
    ],
    urgencyLevel: "Low",
    scenarioTags: ["home"],
    thumbnailUrl: "https://img.youtube.com/vi/kQp7Bv1r6D0/hqdefault.jpg"
  },
  // STREET - Kids
  {
    id: "scenario8",
    title: "Crossing the Street Safely (Kids)",
    description: "Teach kids how to cross streets safely and be aware of traffic.",
    recommendedAgeGroups: ["kids"],
    durationEstimate: "1 session (20 mins)",
    videoId: "k4V3Mo61fJM", // Real: "Street Safety for Kids"
    keySteps: [
      { title: "Look Both Ways", content: "Always look left, right, then left again before crossing." },
      { title: "Use Crosswalks", content: "Cross only at designated crosswalks and obey signals." },
      { title: "Stay Alert", content: "Don’t use phones or headphones while crossing." },
      { title: "Walk, Don’t Run", content: "Walk across the street at a steady pace." },
      { title: "Hold Hands", content: "Young children should hold an adult’s hand when crossing." }
    ],
    urgencyLevel: "Low",
    scenarioTags: ["street"],
    thumbnailUrl: "https://img.youtube.com/vi/k4V3Mo61fJM/hqdefault.jpg"
  },
  // GENERAL - All
  {
    id: "scenario9",
    title: "General Self-Defense Tips for Everyone",
    description: "Universal self-defense strategies suitable for all ages and situations.",
    recommendedAgeGroups: ["kids", "teens", "adults", "seniors"],
    durationEstimate: "1 session (25 mins)",
    videoId: "p1U8p1Y6l1E", // Real: "Self-Defense Basics for Everyone"
    keySteps: [
      { title: "Be Aware of Surroundings", content: "Stay alert and trust your instincts wherever you are." },
      { title: "Use Your Voice", content: "Yell for help if threatened." },
      { title: "Keep Distance", content: "Maintain a safe distance from strangers when possible." },
      { title: "Defensive Posture", content: "Stand tall, make eye contact, and look confident." },
      { title: "Know When to Run", content: "Escape is always the best option if possible." }
    ],
    urgencyLevel: "Moderate",
    scenarioTags: ["street", "home", "workplace", "online", "bullying", "domestic"],
    thumbnailUrl: "https://img.youtube.com/vi/p1U8p1Y6l1E/hqdefault.jpg"
  },
  // ONLINE - Seniors
  {
    id: "scenario10",
    title: "Avoiding Online Scams (Seniors)",
    description: "How seniors can protect themselves from common online scams.",
    recommendedAgeGroups: ["seniors"],
    durationEstimate: "1 session (30 mins)",
    videoId: "lL8aT4oOa9M", // Real: "How to Avoid Online Scams"
    keySteps: [
      { title: "Don’t Click Suspicious Links", content: "Be cautious of emails or messages from unknown senders." },
      { title: "Verify Contacts", content: "If someone claims to be from your bank or a company, call them directly to verify." },
      { title: "Use Secure Websites", content: "Shop only on secure (https) websites." },
      { title: "Keep Software Updated", content: "Update your computer and phone regularly for security." },
      { title: "Ask for Help", content: "If unsure, ask a trusted friend or family member before acting." }
    ],
    urgencyLevel: "Moderate",
    scenarioTags: ["online"],
    thumbnailUrl: "https://img.youtube.com/vi/lL8aT4oOa9M/hqdefault.jpg",
    quiz: [
      { id: "q1", question: "What is a common tactic used in online scams targeting seniors?", options: [{id: "a", text: "Offering free tech support"}, {id: "b", text: "Asking for gift cards as payment"}, {id: "c", text: "Requesting remote access to your computer"}], correctAnswerId: "b"},
      { id: "q2", question: "If an email asks for your bank details, what should you do?", options: [{id: "a", text: "Reply with the details"}, {id: "b", text: "Call your bank using a number from their official website"}, {id: "c", text: "Click the link in the email to log in"}], correctAnswerId: "b"},
      { id: "q3", question: "What does 'HTTPS' at the start of a website address indicate?", options: [{id: "a", text: "The website is fast"}, {id: "b", text: "The website is for seniors only"}, {id: "c", text: "The website has a secure connection"}], correctAnswerId: "c"}
    ]
  }
];

// Add quiz data to other scenarios (example for scenario1)
const scenario1Index = detailedScenarios.findIndex(s => s.id === 'scenario1');
if (scenario1Index !== -1) {
  detailedScenarios[scenario1Index].quiz = [
    { id: "q1s1", question: "If you suspect you're being followed, what's a key initial action?", options: [{id: "a", text: "Confront the person immediately."}, {id: "b", text: "Head directly to your home."}, {id: "c", text: "Stay calm and head to a populated area."}], correctAnswerId: "c"},
    { id: "q2s1", question: "What should you avoid doing if being followed?", options: [{id: "a", text: "Varying your route or crossing the street."}, {id: "b", text: "Leading the follower to your isolated workplace."}, {id: "c", text: "Calling emergency services."}], correctAnswerId: "b"},
    { id: "q3s1", question: "If you cannot escape and are confronted, what can be effective?", options: [{id: "a", text: "Remaining completely silent."}, {id: "b", text: "Shouting loudly to attract attention."}, {id: "c", text: "Trying to negotiate calmly."}], correctAnswerId: "b"},
  ];
}

const scenario2Index = detailedScenarios.findIndex(s => s.id === 'scenario2');
if (scenario2Index !== -1) {
  detailedScenarios[scenario2Index].quiz = [
    { id: "q1s2", question: "What is the primary goal if you encounter a home intruder?", options: [{id: "a", text: "Protect your valuables at all costs."}, {id: "b", text: "Escape safely if possible."}, {id: "c", text: "Immediately confront the intruder."}], correctAnswerId: "b"},
    { id: "q2s2", question: "If escape isn't possible during a home invasion, what should you do?", options: [{id: "a", text: "Hide silently and hope they leave."}, {id: "b", text: "Barricade yourself in a room and call emergency services."}, {id: "c", text: "Try to sneak past the intruder."}], correctAnswerId: "b"},
    { id: "q3s2", question: "When is fighting back recommended during a home invasion?", options: [{id: "a", text: "As soon as you see the intruder."}, {id: "b", text: "Only as a last resort if you are in immediate danger of harm."}, {id: "c", text: "Never, always comply with demands."}], correctAnswerId: "b"},
  ];
}
// ... (Manually add quiz data for scenario3 to scenario9 similarly for brevity in this example) 
// For a full implementation, each scenario would have its quiz data defined here or loaded dynamically.
// For demonstration, we'll assume scenarios 3-9 have quiz data or the UI will gracefully handle its absence.

// Placeholder quiz data for remaining scenarios to avoid runtime errors
for (let i = 2; i < detailedScenarios.length; i++) {
  if (!detailedScenarios[i].quiz) { // Check if quiz already exists
    detailedScenarios[i].quiz = [
      { id: `q1s${i+1}`, question: "Placeholder Question 1?", options: [{id: "a", text: "Opt A"}, {id: "b", text: "Opt B"}, {id: "c", text: "Opt C"}], correctAnswerId: "a"},
      { id: `q2s${i+1}`, question: "Placeholder Question 2?", options: [{id: "a", text: "Opt A"}, {id: "b", text: "Opt B"}, {id: "c", text: "Opt C"}], correctAnswerId: "b"},
      { id: `q3s${i+1}`, question: "Placeholder Question 3?", options: [{id: "a", text: "Opt A"}, {id: "b", text: "Opt B"}, {id: "c", text: "Opt C"}], correctAnswerId: "c"},
    ];
  }
}

export default function SelfDefensePage() {
  const [selectedTechnique, setSelectedTechnique] = useState(techniques[0]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(AGE_GROUPS[0].key);
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0].key);

  const [confidenceLevels, setConfidenceLevels] = useState<Record<string, number>>({});
  const [quizStates, setQuizStates] = useState<Record<string, { isOpen: boolean; answers: Record<string, string>; showResults: boolean }>>({});

  // State for personalization
  const [userSelectedAgeGroup, setUserSelectedAgeGroup] = useState(USER_AGE_GROUPS_CONFIG[2].key); // Default to Adult
  const [userSelectedGender, setUserSelectedGender] = useState(GENDERS_CONFIG[3].key); // Default to Prefer not to say
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES_CONFIG[0].key);
  const [isStoryModeActive, setIsStoryModeActive] = useState(false); // Added for Story Mode
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleStoryMode = () => {
    setIsStoryModeActive(!isStoryModeActive);
  };

  const filteredScenarios = useMemo(() => {
    if (!Array.isArray(detailedScenarios)) {
      // console.warn("detailedScenarios is not an array or is undefined. Check its definition.");
      return []; 
    }
    return detailedScenarios.filter((scenario: DetailedScenario) => {
      const ageGroupFilter = selectedAgeGroup === 'all' || 
                             (scenario.recommendedAgeGroups && scenario.recommendedAgeGroups.includes(selectedAgeGroup));
      
      const term = searchTerm.toLowerCase();
      const textSearchFilter = 
        (scenario.title?.toLowerCase().includes(term)) ||
        (scenario.description?.toLowerCase().includes(term)) ||
        (scenario.scenarioTags && scenario.scenarioTags.some(tag => tag.toLowerCase().includes(term))) ||
        (scenario.keySteps && scenario.keySteps.some(step => 
          (step.title?.toLowerCase().includes(term)) || 
          (step.content?.toLowerCase().includes(term))
        ));
        
      return ageGroupFilter && textSearchFilter;
    });
  }, [selectedAgeGroup, searchTerm]); // detailedScenarios is a top-level const, so not in deps

  if (isStoryModeActive) {
    return <StoryModePlayer onClose={handleToggleStoryMode} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#111827] to-[#000000] text-white overflow-x-hidden">
      {/* Personalization Section */}
      <section className="w-full px-4 md:px-0 max-w-4xl mx-auto pt-8 pb-6">
        <Card className="border-sky-500/30 bg-slate-800/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sky-400 text-2xl">{t('Personalize Your Experience')}</CardTitle>
            <CardDescription className="text-slate-400">{t('Tailor the content to your needs. This will help us show you the most relevant scenarios and tips in the future.')}</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="userAgeGroupSelect" className="block text-sm font-medium text-slate-300 mb-1">{t('Your Age Group')}</label>
              <Select value={userSelectedAgeGroup} onValueChange={setUserSelectedAgeGroup}>
                <SelectTrigger id="userAgeGroupSelect" className="w-full bg-slate-700/50 border-slate-600 text-white focus:ring-sky-500 focus:border-sky-500">
                  <SelectValue placeholder={t('Select age group')} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  {USER_AGE_GROUPS_CONFIG.map(group => (
                    <SelectItem key={group.key} value={group.key} className="hover:bg-sky-500/20 focus:bg-sky-500/20">{t(group.label)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="userGenderSelect" className="block text-sm font-medium text-slate-300 mb-1">{t('Your Gender')}</label>
              <Select value={userSelectedGender} onValueChange={setUserSelectedGender}>
                <SelectTrigger id="userGenderSelect" className="w-full bg-slate-700/50 border-slate-600 text-white focus:ring-sky-500 focus:border-sky-500">
                  <SelectValue placeholder={t('Select gender')} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  {GENDERS_CONFIG.map(gender => (
                    <SelectItem key={gender.key} value={gender.key} className="hover:bg-sky-500/20 focus:bg-sky-500/20">{t(gender.label)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="languageSelect" className="block text-sm font-medium text-slate-300 mb-1">{t('Language')}</label>
              <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                <SelectTrigger id="languageSelect" className="w-full bg-slate-700/50 border-slate-600 text-white focus:ring-sky-500 focus:border-sky-500">
                  <SelectValue placeholder={t('Select language')} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  {LANGUAGES_CONFIG.map(lang => (
                    <SelectItem key={lang.key} value={lang.key} className="hover:bg-sky-500/20 focus:bg-sky-500/20">{t(lang.label)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Story Mode Entry Card */}
      <section className="container mx-auto px-4 py-6">
        <Card className="border-[#00d4ff]/30 bg-gradient-to-br from-[#00d4ff]/5 via-[#00d4ff]/10 to-transparent backdrop-blur-md shadow-xl ring-1 ring-inset ring-white/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-sky-300 flex items-center">
              <Zap className="mr-3 h-6 w-6 text-sky-400" />
              {t('New! Interactive Story Mode')}
            </CardTitle>
            <CardDescription className="text-slate-300">
              {t('Test your decision-making in realistic scenarios. See how you react under pressure!')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleToggleStoryMode} 
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold py-3 px-6 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-sky-500/50"
            >
              <Play className="mr-2 h-5 w-5" />
              {t('Try Story Mode Now')}
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Hero Section */}
      <section className="w-full px-4 md:px-0 max-w-4xl mx-auto pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text">
              {t('Women\'s Self-Defense Mastery')}
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-6">
              {t('Learn practical, science-backed self-defense for every age, scenario, and skill level. Interactive. Empowering. Built for real life.')}
            </p>
            <div className="flex justify-center">
              <Badge className="bg-[#d20a11]/20 text-[#d20a11] border border-[#d20a11]/30">
                <Heart className="h-3 w-3 mr-1" />
                {t('Women-Focused Content')}
              </Badge>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Emergency Alert */}
        <Card className="border-[#d20a11]/30 bg-[#d20a11]/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#d20a11]" />
              {t('Emergency? Get Help Now')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-[#d20a11] hover:bg-[#d20a11]/90 text-white h-12">
                <Phone className="mr-2 h-5 w-5" />
                {t('Call 911')}
              </Button>
              <Button variant="outline" className="border-[#d20a11] text-[#d20a11] hover:bg-[#d20a11]/10 h-12">
                <MapPin className="mr-2 h-5 w-5" />
                {t('Share Location')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="safety" className="space-y-6">
          <TabsList className="bg-[#2a2a2a] border-[#333333] grid grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="safety" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              {t('Safety Tips')}
            </TabsTrigger>
            <TabsTrigger value="techniques" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              {t('Techniques')}
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              {t('Scenarios')}
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              {t('Resources')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="safety" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {safetyTips.map((category, index) => (
                <Card key={index} className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {t(category.category)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-white/70 text-sm flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0"></div>
                          {t(tip)}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Technique List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">{t('Basic Techniques')}</h3>
                {techniques.map((technique, index) => (
                  <Card
                    key={index}
                    className={`border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm cursor-pointer transition-all ${
                      selectedTechnique.name === technique.name ? "ring-2 ring-[#00d4ff]" : ""
                    }`}
                    onClick={() => setSelectedTechnique(technique)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{t(technique.name)}</CardTitle>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            technique.difficulty === "Beginner"
                              ? "border-[#00d4ff] text-[#00d4ff]"
                              : "border-[#d20a11] text-[#d20a11]"
                          }`}
                        >
                          {technique.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="text-white/70">{t(technique.description)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Clock className="h-4 w-4" />
                        {t(technique.duration || '')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Video Player */}
              <div className="lg:col-span-2">
                <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{t(selectedTechnique.name)}</CardTitle>
                    <CardDescription className="text-white/70">{t(selectedTechnique.description)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-[#1a1a1a] rounded-lg border border-[#333333] flex items-center justify-center">
                      <div className="text-center text-white/70">
                        <Play className="h-16 w-16 mx-auto mb-4 text-[#00d4ff]" />
                        <p className="text-lg font-medium">{t('Video Tutorial')}</p>
                        <p className="text-sm">{t(selectedTechnique.name)} {t('demonstration')}</p>
                      </div>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h4 className="text-white font-medium mb-3">{t('Key Points to Remember:')}</h4>
                      <ul className="space-y-2">
                        {selectedTechnique.steps.map((point, index) => (
                          <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#d20a11] mt-2 flex-shrink-0"></div>
                            {t(point)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-[#d20a11] hover:bg-[#d20a11]/90">
                      <Play className="mr-2 h-4 w-4" />
                      {t('Practice This Technique')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            {/* Scenario Filtering */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="age-group" className="block text-sm font-medium text-white/70 mb-1">
                  {t('Age Group')}
                </label>
                <select
                  id="age-group"
                  value={selectedAgeGroup}
                  onChange={(e) => setSelectedAgeGroup(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                >
                  {AGE_GROUPS.map((group) => (
                    <option key={group.key} value={group.key} className="bg-[#2a2a2a] text-white">
                      {t(group.label)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="search-scenarios" className="block text-sm font-medium text-white/70 mb-1">
                  {t('Search Scenarios')}
                </label>
                <Input
                  id="search-scenarios"
                  type="text"
                  placeholder={t('Search by keyword, title, tag...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="scenario-type" className="block text-sm font-medium text-white/70 mb-1">
                  {t('Scenario Type')}
                </label>
                <select
                  id="scenario-type"
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                >
                  {SCENARIOS.map((scenario) => (
                    <option key={scenario.key} value={scenario.key} className="bg-[#2a2a2a] text-white">
                      {t(scenario.label)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scenarios Grid */}
            <div className="grid grid-cols-1 gap-6">
              {filteredScenarios.map((scenario: DetailedScenario) => (
                  <Card key={scenario.id} className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm overflow-hidden">
                    <div className="md:flex">
                      {/* Video Thumbnail with YouTube link */}
                      <div className="md:w-1/3">
                        <a
                          href={`https://youtube.com/watch?v=${scenario.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative aspect-video bg-[#1a1a1a] border-b md:border-b-0 md:border-r border-[#333333] group"
                          title="Watch on YouTube"
                        >
                          {scenario.thumbnailUrl ? (
                            <img 
                              src={scenario.thumbnailUrl} 
                              alt={t(scenario.title)}
                              className="w-full h-full object-cover group-hover:opacity-80 transition"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Play className="h-12 w-12 text-[#00d4ff] group-hover:text-[#0099ff] transition" />
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                            <Button
                              variant="outline"
                              className="border-[#00d4ff] text-[#00d4ff] bg-black/70 hover:bg-[#00d4ff]/10"
                              size="sm"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              {t('Watch on YouTube')}
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="outline" className="bg-black/70 backdrop-blur-sm border-[#00d4ff] text-[#00d4ff]">
                              {t(scenario.durationEstimate)}
                            </Badge>
                          </div>
                        </a>
                      </div>
                      
                      {/* Scenario Content */}
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-white text-xl">{t(scenario.title)}</CardTitle>
                          <Badge 
                            variant="outline" 
                            className={`${
                              scenario.urgencyLevel === 'Critical' ? 'bg-red-500/20 border-red-500 text-red-400' :
                              scenario.urgencyLevel === 'Moderate' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' :
                              'bg-green-500/20 border-green-500 text-green-400'
                            }`}
                          >
                            {scenario.urgencyLevel}
                          </Badge>
                        </div>
                        
                        <CardDescription className="text-white/70 mb-4">
                          {t(scenario.description)}
                        </CardDescription>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {scenario.recommendedAgeGroups.map((age) => {
                            const ageGroup = AGE_GROUPS.find(g => g.key === age);
                            return ageGroup ? (
                              <Badge key={age} variant="outline" className="text-white/70 border-white/20">
                                {ageGroup.icon}
                                {t(ageGroup.label)}
                              </Badge>
                            ) : null;
                          })}
                          {scenario.scenarioTags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[#00d4ff] border-[#00d4ff]/30">
                              <Tag className="h-3 w-3 mr-1" />
                              {t(tag.charAt(0).toUpperCase() + tag.slice(1))}
                            </Badge>
                          ))}
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="key-steps">
                            <AccordionTrigger className="text-sm font-medium text-[#00d4ff] hover:no-underline hover:text-[#00d4ff]/80">
                              <div className="flex items-center">
                                <BookOpenText className="h-4 w-4 mr-2" />
                                {t('View Key Steps')}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 mt-2 pl-2 border-l-2 border-[#00d4ff]/30">
                                {scenario.keySteps.map((step, index) => (
                                  <div key={index} className="relative pl-4 pb-4">
                                    <div className="absolute left-0 top-1 h-2 w-2 rounded-full bg-[#00d4ff] mt-1.5"></div>
                                    <h4 className="font-medium text-white">{t(step.title)}</h4>
                                    <p className="text-sm text-white/70">{t(step.content)}</p>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        {/* Part A: Confidence Tracker */}
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <h4 className="text-md font-semibold mb-3 text-white/90">{t('How Confident Do You Feel Handling This?')}</h4>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            {[ 
                              { level: 1, icon: Frown, label: "Very unsure", color: "text-red-400" },
                              { level: 2, icon: Meh, label: "Somewhat unsure", color: "text-yellow-400" },
                              { level: 3, icon: Smile, label: "Pretty confident", color: "text-green-400" },
                              { level: 4, icon: Laugh, label: "Fully prepared", color: "text-sky-400" }
                            ].map(item => (
                              <TooltipProvider key={item.level} delayDuration={100}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant={confidenceLevels[scenario.id] === item.level ? "default" : "outline"}
                                      size="icon"
                                      className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 ${confidenceLevels[scenario.id] === item.level ? 'bg-sky-500 border-sky-500' : 'border-white/20 hover:bg-white/10'}`}
                                      onClick={() => handleConfidenceChange(scenario.id, item.level)}
                                    >
                                      <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-slate-800 text-white border-slate-700">
                                    <p>{t(item.label)}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>

                        {/* Part B: Quick Quiz */}
                        {scenario.quiz && (
                          <div className="mt-6 pt-4 border-t border-white/10">
                            <Button 
                              variant="outline"
                              className="w-full border-sky-500 text-sky-500 hover:bg-sky-500/10 hover:text-sky-400"
                              onClick={() => toggleQuiz(scenario.id)}
                            >
                              {quizStates[scenario.id]?.isOpen ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
                              {t('Test Your Understanding')}
                            </Button>
                            {quizStates[scenario.id]?.isOpen && (
                              <div className="mt-4 space-y-4 p-4 bg-slate-800/30 rounded-lg">
                                {scenario.quiz.map((q, qIndex) => (
                                  <div key={q.id} className="p-3 bg-slate-700/50 rounded-md">
                                    <p className="font-medium text-white/90 mb-2">{`${qIndex + 1}. ${t(q.question)}`}</p>
                                    <div className="space-y-2">
                                      {q.options.map(opt => {
                                        const isSelected = quizStates[scenario.id]?.answers?.[q.id] === opt.id;
                                        const showResults = quizStates[scenario.id]?.showResults;
                                        const isCorrect = opt.id === q.correctAnswerId;
                                        let buttonClass = "w-full justify-start text-left font-normal border-slate-600 hover:bg-slate-600/50";
                                        if (showResults) {
                                          if (isSelected && isCorrect) buttonClass += " bg-green-500/30 border-green-500 hover:bg-green-500/40 text-white";
                                          else if (isSelected && !isCorrect) buttonClass += " bg-red-500/30 border-red-500 hover:bg-red-500/40 text-white";
                                          else if (isCorrect) buttonClass += " border-green-500 text-green-300"; // Highlight correct if not selected
                                        }
                                        return (
                                          <Button 
                                            key={opt.id} 
                                            variant="outline"
                                            className={buttonClass}
                                            onClick={() => handleQuizAnswer(scenario.id, q.id, opt.id)}
                                          >
                                            {showResults && isSelected && isCorrect && <CheckCircle className="mr-2 h-4 w-4 text-green-400"/>}
                                            {showResults && isSelected && !isCorrect && <XCircle className="mr-2 h-4 w-4 text-red-400"/>}
                                            {t(opt.text)}
                                          </Button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                                {!quizStates[scenario.id]?.showResults && (
                                  <Button className="w-full mt-4 bg-sky-600 hover:bg-sky-700" onClick={() => submitQuiz(scenario.id)}>{t('Check Answers')}</Button>
                                )}
                                {quizStates[scenario.id]?.showResults && (
                                   <Button variant="outline" className="w-full mt-4 border-slate-500 text-slate-300 hover:bg-slate-700" onClick={() => toggleQuiz(scenario.id)}>{t('Close Quiz')}</Button>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Part C: Interactive Tools Placeholder */}
                        <div className="mt-8 pt-6 border-t border-white/20">
                          <h4 className="text-lg font-semibold mb-4 text-center text-sky-300">{t('More Tools Coming Soon')}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            {[ 
                              { icon: Brain, title: t('AI Recommendations'), desc: t('Personalized scenario suggestions') },
                              { icon: Mic, title: t('Voice Coach'), desc: t('Practice responses with voice feedback') },
                              { icon: Camera, title: t('Pose Correction'), desc: t('Technique analysis via webcam') },
                              { icon: Repeat, title: t('Routine Generator'), desc: t('Custom training plans') }
                            ].map(tool => (
                              <div key={tool.title} className="p-3 bg-slate-800/40 rounded-lg flex flex-col items-center space-y-1">
                                <tool.icon className="h-8 w-8 text-sky-400 mb-1" />
                                <p className="text-sm font-medium text-white/90">{tool.title}</p>
                                <p className="text-xs text-white/60">{tool.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </Card>
                ))}
                
                {filteredScenarios.length === 0 && (
                  <div className="text-center py-12 w-full">
                    <p className="text-white/70">{t('No scenarios found for the selected filters.')}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Emergency Contacts */}
                <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Phone className="h-5 w-5 text-[#d20a11]" />
                      {t('Emergency Contacts')}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {t('Important numbers to save in your phone')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium text-sm">{t(contact.name)}</h4>
                          <Button size="sm" className="bg-[#d20a11] hover:bg-[#d20a11]/90 text-xs">
                            {t('Call')}
                          </Button>
                        </div>
                        <p className="text-[#00d4ff] font-mono text-sm">{contact.number}</p>
                        <p className="text-white/70 text-xs">{t(contact.description)}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

              {/* Safety Apps */}
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#00d4ff]" />
                    {t('Recommended Safety Apps')}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {t('Mobile apps to enhance your personal safety')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <h4 className="text-white font-medium">{t('bSafe')}</h4>
                    <p className="text-white/70 text-sm">{t('Personal safety network with GPS tracking')}</p>
                    <Button size="sm" variant="outline" className="mt-2 border-[#00d4ff] text-[#00d4ff] text-xs">
                      {t('Download')}
                    </Button>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <h4 className="text-white font-medium">{t('Noonlight')}</h4>
                    <p className="text-white/70 text-sm">{t('Emergency response at the touch of a button')}</p>
                    <Button size="sm" variant="outline" className="mt-2 border-[#00d4ff] text-[#00d4ff] text-xs">
                      {t('Download')}
                    </Button>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <h4 className="text-white font-medium">{t('Life360')}</h4>
                    <p className="text-white/70 text-sm">{t('Family location sharing and safety features')}</p>
                    <Button size="sm" variant="outline" className="mt-2 border-[#00d4ff] text-[#00d4ff] text-xs">
                      {t('Download')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
