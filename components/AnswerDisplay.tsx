
import React from 'react';
import { AppState } from '../types';
import ThinkingAnimation from './ThinkingAnimation';
import SparklesIcon from './icons/SparklesIcon';
import ListeningAnimation from './ListeningAnimation';

interface AnswerDisplayProps {
  state: AppState;
  answer: string;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ state, answer }) => {
  const renderContent = () => {
    switch (state) {
      case AppState.THINKING:
        return (
          <div className="flex flex-col items-center justify-center text-center text-slate-400">
            <ThinkingAnimation className="mb-6" />
            <p className="text-xl font-semibold text-slate-200">Crafting your answer...</p>
            <p className="text-sm text-slate-500">The AI is processing your question.</p>
          </div>
        );
      case AppState.PAUSED:
      case AppState.LISTENING:
        if (answer) {
          return (
            <div>
              <div className="flex items-center gap-3 mb-4">
                  <SparklesIcon className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                  <h2 className="text-2xl font-bold text-white">Key Talking Points</h2>
              </div>
              <div 
                className="prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300 max-w-none whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br />') }}
              />
            </div>
          );
        }
        return (
            <div className="flex flex-col items-center justify-center text-center text-slate-400 gap-4">
              {state === AppState.LISTENING && <ListeningAnimation />}
              <p className="text-lg">
                {state === AppState.LISTENING ? "I'm listening for the next question..." : "Paused. Press resume to continue."}
              </p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 min-h-[250px] flex items-center justify-center transition-all duration-300">
      {renderContent()}
    </div>
  );
};

export default AnswerDisplay;
