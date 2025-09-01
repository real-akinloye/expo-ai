
import React from 'react';
import { AppState } from '../types';
import SendIcon from './icons/SendIcon';

interface TranscriptDisplayProps {
  transcript: string;
  finalTranscript: string;
  state: AppState;
  onProcess: (transcript: string) => void;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript, finalTranscript, state, onProcess }) => {
  const hasText = finalTranscript.trim().length > 0;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-start justify-between gap-4">
        <div className="flex-grow">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">LIVE TRANSCRIPT</h3>
            <p className="text-slate-300 min-h-[24px]">
                {finalTranscript}
                <span className="text-slate-500">{transcript}</span>
            </p>
        </div>
        <button
            onClick={() => onProcess(finalTranscript)}
            disabled={!hasText || state === AppState.THINKING}
            className="flex-shrink-0 flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 disabled:bg-slate-700/50 text-cyan-300 disabled:text-slate-500 border border-cyan-500/30 disabled:border-slate-700 rounded-full py-2 px-4 text-sm font-semibold transition-all disabled:cursor-not-allowed"
            aria-label="Get Answer"
        >
            <SendIcon className="h-4 w-4" />
            <span>Get Answer</span>
        </button>
    </div>
  );
};

export default TranscriptDisplay;
