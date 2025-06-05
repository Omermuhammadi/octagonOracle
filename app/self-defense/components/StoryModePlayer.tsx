"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { storyScenarios } from "@/app/self-defense/data/storyData";
import { useState } from "react";
import type { StoryScenario, StoryStep, StoryChoice } from "@/app/self-defense/data/storyData"; // Import types

import t from '@/app/lib/i18n';

interface StoryModePlayerProps {
  onClose: () => void;
}

const StoryModePlayer: React.FC<StoryModePlayerProps> = ({ onClose }) => {
  const [currentStory, setCurrentStory] = useState<StoryScenario | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [storyStarted, setStoryStarted] = useState(false);
  const [verdict, setVerdict] = useState<{ text: string; feedback: string; isSmart: boolean } | null>(null);
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [userPath, setUserPath] = useState<string[]>([]); // To track choices for summary

  const startStory = (story: StoryScenario) => {
    setCurrentStory(story);
    setCurrentStepIndex(0);
    setStoryStarted(true);
    setVerdict(null);
    setShowFinalSummary(false);
    setUserPath([]);
  };

  const handleChoice = (choice: StoryChoice) => {
    setUserPath(prev => [...prev, choice.text]);
    if (choice.outcome.type === "nextStep" && choice.outcome.nextStepId) {
      const nextStepIdx = currentStory?.steps.findIndex((step: StoryStep) => step.stepId === choice.outcome.nextStepId);
      if (nextStepIdx !== undefined && nextStepIdx !== -1) {
        setCurrentStepIndex(nextStepIdx);
        setVerdict(null);
      } else {
        // Fallback or end story if next step not found
        setShowFinalSummary(true);
      }
    } else if (choice.outcome.type === "verdict") {
      setVerdict({
        text: choice.outcome.verdictText || "",
        feedback: choice.outcome.feedbackText || "",
        isSmart: choice.outcome.isSmartMove || false,
      });
      // Potentially end story here or offer to go back/restart
      setShowFinalSummary(true); // For now, any verdict ends the story step display
    } else {
      // Handle other outcome types like videoSuggestion if added
      setShowFinalSummary(true);
    }
  };
  
  const currentStepData = currentStory && currentStory.steps[currentStepIndex];

  const resetAndClose = () => {
    setCurrentStory(null);
    setStoryStarted(false);
    onClose();
  }

  if (!storyStarted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={resetAndClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full"
          aria-label={t("Close Story Mode")}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 text-transparent bg-clip-text">
            {t("Welcome to Interactive Story Mode")}
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            {t("Let’s see how you’d react in a real-world situation. Choose a scenario to begin.")}
          </p>
          {storyScenarios.length > 0 ? (
            <div className="space-y-4">
              {storyScenarios.map((story: StoryScenario) => (
                <Button 
                  key={story.id} 
                  onClick={() => startStory(story)} 
                  variant="outline"
                  className="w-full max-w-md mx-auto bg-slate-700/50 border-slate-600 hover:bg-sky-700/30 hover:border-sky-500 text-sky-300 hover:text-sky-200 font-semibold py-3 px-8 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                  {t(story.title)}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-lg text-slate-400">{t("No stories available at the moment. Please check back soon!")}</p>
          )}
        </div>
      </div>
    );
  }

  if (showFinalSummary && currentStory) {
    // Basic summary, can be expanded
    const lastVerdict = verdict || { text: t("Scenario Ended"), feedback: t("You've reached a conclusion in this scenario."), isSmart: true };
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
         <Button
          variant="ghost"
          size="icon"
          onClick={resetAndClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full"
          aria-label={t("Close Story Mode")}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="w-full max-w-2xl mx-auto p-8 bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl ring-1 ring-sky-500/30 text-center">
          <h2 className={`text-3xl font-bold mb-4 ${lastVerdict.isSmart ? 'text-green-400' : 'text-red-400'}`}>{t(lastVerdict.text)}</h2>
          <p className="text-lg text-slate-300 mb-6">{t(lastVerdict.feedback)}</p>
          <p className="text-md text-slate-400 mb-2">{t("Your path:")}</p>
          <ul className="text-sm text-slate-300 list-disc list-inside mb-6">
            {userPath.map((choiceText, index) => <li key={index}>{t(choiceText)}</li>)}
          </ul>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => startStory(currentStory)} className="bg-sky-600 hover:bg-sky-500">
              {t("Replay Scenario")}
            </Button>
            <Button onClick={() => setStoryStarted(false)} variant="outline" className="border-slate-500 text-slate-300 hover:bg-slate-700">
              {t("Choose Another Scenario")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentStepData) {
    // Should ideally not happen if logic is correct, but a fallback
    return (
      <div className="fixed inset-0 bg-slate-900 text-white z-50 flex items-center justify-center">
        <p>{t("Error: Story step not found or story ended unexpectedly.")}</p>
        <Button onClick={resetAndClose} className="ml-4">{t("Close")}</Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
      <Button
        variant="ghost"
        size="icon"
        onClick={resetAndClose}
        className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full"
        aria-label={t("Close Story Mode")}
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="w-full max-w-3xl mx-auto p-6 bg-slate-800/50 backdrop-blur-md rounded-xl shadow-2xl ring-1 ring-sky-500/30">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-sky-400">{t(currentStory.title)}</h2>
          <p className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">{t("Step")} {currentStepIndex + 1} {t("of")} {currentStory.steps.length}</p>
        </div>
        
        {/* Progress Bar Placeholder */}
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
          <div 
            className="bg-sky-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStepIndex + 1) / currentStory.steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="mb-6 p-4 bg-slate-700/60 rounded-lg min-h-[100px]">
          <p className="text-lg text-slate-200">
            {t(currentStepData.narration)}
          </p>
        </div>

        <div className="space-y-3">
          {currentStepData.choices.map((choice: StoryChoice) => (
            <Button 
              key={choice.choiceId}
              variant="outline"
              className="w-full justify-start text-left p-4 h-auto border-slate-600 hover:bg-sky-700/30 hover:border-sky-500 text-slate-200 hover:text-sky-300 transition-colors duration-200 text-md whitespace-normal break-words"
              onClick={() => handleChoice(choice)}
            >
              {t(choice.text)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryModePlayer;
