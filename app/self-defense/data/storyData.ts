export interface StoryChoice {
  choiceId: string;
  text: string;
  outcome: {
    type: "nextStep" | "verdict" | "videoSuggestion";
    nextStepId?: string;
    verdictText?: string;
    feedbackText?: string;
    isSmartMove?: boolean;
    videoId?: string; // For suggesting a tutorial video
  };
}

export interface StoryStep {
  stepId: string;
  narration: string;
  illustrationUrl?: string; // Optional: for image/animation
  choices: StoryChoice[];
}

export interface StoryScenario {
  id: string;
  title: string;
  introText: string; // Displayed on scenario selection screen
  steps: StoryStep[];
  finalSummary?: {
    goodOutcome: string; // Text if user generally made good choices
    badOutcome: string;  // Text if user generally made risky choices
    recommendedTutorialIds?: string[]; // Link to existing techniques/articles
  };
}

import t from '@/app/lib/i18n';

export const storyScenarios: StoryScenario[] = [
  {
    id: "street_harassment_1",
    title: t("Late Night Walk"),
    introText: t("You're walking home alone after an evening class. It's getting dark, and the street is quieter than usual. Test your awareness and decision-making skills."),
    steps: [
      {
        stepId: "start",
        narration: t("You hear distinct footsteps behind you. They seem to be getting closer. You glance back and see a shadowy figure about 20 meters away, matching your pace."),
        choices: [
          {
            choiceId: "1a_call_friend",
            text: t("Pull out your phone, pretend to make a call, and speak loudly as if talking to someone meeting you soon."),
            outcome: { 
              type: "nextStep", 
              nextStepId: "s1_phone_call_outcome",
            }
          },
          {
            choiceId: "1b_increase_pace",
            text: t("Increase your pace significantly and head towards a well-lit main street you know is nearby."),
            outcome: { 
              type: "nextStep", 
              nextStepId: "s1_increase_pace_outcome",
            }
          },
          {
            choiceId: "1c_confront",
            text: t("Stop, turn around, make eye contact, and firmly ask 'Are you following me?'"),
            outcome: { 
              type: "verdict", 
              verdictText: t("Risky Move"), 
              feedbackText: t("Confronting an unknown individual directly can escalate the situation, especially when you're alone and unsure of their intentions or capabilities. It's generally safer to create distance, seek safety, or draw attention from others first."),
              isSmartMove: false
            }
          }
        ]
      },
      {
        stepId: "s1_phone_call_outcome",
        narration: t("You start talking loudly on your phone, mentioning you're 'just around the corner'. The footsteps behind you seem to hesitate, and the figure stops under a distant streetlight, no longer advancing."),
        choices: [
          {
            choiceId: "2a_continue_call",
            text: t("Continue your 'call', maintaining awareness, and walk briskly to the main street. Don't look back."),
            outcome: { 
              type: "verdict", 
              verdictText: t("Smart Decision!"), 
              feedbackText: t("Using your phone (even pretending) makes you a less appealing target. It signals you're connected and potentially alerting someone. Reaching a safer, more populated area is the primary goal."),
              isSmartMove: true
            }
          },
          {
            choiceId: "2b_hang_up_check",
            text: t("Quietly hang up, and quickly glance back to see what the person is doing now."),
            outcome: { 
              type: "verdict", 
              verdictText: t("Slightly Risky"), 
              feedbackText: t("While the immediate threat seems to have paused, breaking the deterrent (the call) and showing you're still focused on them might make them re-evaluate. It's better to continue to safety without re-engaging."),
              isSmartMove: false // Could be debated, but caution is key
            }
          }
        ]
      },
      {
        stepId: "s1_increase_pace_outcome",
        narration: t("You pick up your pace. The footsteps behind you also quicken, clearly matching your speed. The figure is gaining on you slightly."),
        choices: [
          {
            choiceId: "3a_run_to_safety",
            text: t("Break into a run towards the main street. If there's an open shop or cafe, head for it."),
            outcome: { 
              type: "verdict", 
              verdictText: t("Good Instincts!"), 
              feedbackText: t("When someone is actively closing distance despite your attempts to disengage, creating as much distance as possible and moving towards safety/witnesses is crucial. Don't hesitate to run."),
              isSmartMove: true
            }
          },
          {
            choiceId: "3b_turn_defensive_shout",
            text: t("Stop suddenly, turn to face them, adopt a defensive posture, and shout loudly 'STAY BACK!'"),
            outcome: { 
              type: "verdict", 
              verdictText: t("High Risk, High Reward (Potentially)"), 
              feedbackText: t("This can be a powerful deterrent if the follower is an opportunist. However, it also commits you to a potential confrontation if they are determined. Best used if escape seems impossible or you are near help that can be alerted by your shout."),
              isSmartMove: false // Generally, escape is preferred if viable
            }
          },
           {
            choiceId: "3c_find_refuge_call_emergency",
            text: t("Look for the nearest house with lights on, run to the porch, and loudly bang on the door while dialing emergency services."),
            outcome: { 
              type: "verdict", 
              verdictText: t("Excellent Strategy!"), 
              feedbackText: t("Seeking immediate refuge and involving others (residents, emergency services) is a very effective way to deter a follower and ensure your safety. It creates witnesses and a barrier."),
              isSmartMove: true
            }
          }
        ]
      }
      // Add more steps for different branches as needed
    ],
    finalSummary: {
      goodOutcome: t("You navigated that tricky situation well, prioritizing awareness and safe disengagement. Remember, your safety comes first."),
      badOutcome: t("That was a challenging situation. Some choices might have increased risk. Reflect on how to prioritize de-escalation and escape in similar scenarios."),
      recommendedTutorialIds: ["street_awareness_101", "verbal_deescalation_basics"] // Example IDs for linking
    }
  }
  // Add more story scenarios here
];
