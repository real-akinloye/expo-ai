
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
import FireIcon from './icons/FireIcon';

interface HeaderProps {
  hasResume: boolean;
  onOpenResumeModal: () => void;
  onClearResume: () => void;
  onVanish: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  hasResume, 
  onOpenResumeModal, 
  onClearResume,
  onVanish,
}) => {
  return (
    <header className="text-center mb-8 md:mb-12 w-full max-w-4xl mx-auto flex justify-between items-start">
      <div className="flex-1 text-left">
        <div className="flex items-center gap-3">
            <button 
                onClick={onVanish}
                className="p-2 rounded-full transition-colors bg-slate-700 hover:bg-red-500/50 text-slate-300 hover:text-red-300"
                aria-label="Vanish Page"
            >
                <FireIcon className="h-5 w-5" />
            </button>
        </div>
      </div>
      <div className="flex-1 text-center">
        <div className="flex items-center justify-center gap-3">
          <SparklesIcon className="h-8 w-8 text-cyan-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            AI Interview Co-Pilot
          </h1>
        </div>
        <p className="text-slate-400 mt-2 text-lg">Your personal assistant for acing interviews.</p>
      </div>
      <div className="flex-1 text-right">
        {hasResume ? (
          <div className="inline-flex items-center gap-2 bg-green-900/50 text-green-300 border border-green-700 rounded-full py-1.5 pl-3 pr-2 text-sm">
            <CheckCircleIcon className="h-5 w-5" />
            <span>Resume Added</span>
            <button onClick={onClearResume} aria-label="Clear resume" className="p-1 rounded-full hover:bg-green-800/60">
                <XCircleIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={onOpenResumeModal}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600 rounded-full py-2 px-4 text-sm transition-colors"
          >
            <DocumentTextIcon className="h-5 w-5" />
            Personalize with Resume
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
