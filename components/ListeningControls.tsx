import React from 'react';
import PauseIcon from './icons/PauseIcon';
import RestartIcon from './icons/RestartIcon';
import PlayIcon from './icons/PlayIcon';

interface ListeningControlsProps {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

const ListeningControls: React.FC<ListeningControlsProps> = ({ isPaused, onPause, onResume, onRestart }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={isPaused ? onResume : onPause}
        className="flex items-center justify-center p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors shadow-md"
        aria-label={isPaused ? 'Resume listening' : 'Pause listening'}
      >
        {isPaused ? <PlayIcon className="h-5 w-5" /> : <PauseIcon className="h-5 w-5" />}
      </button>
      <button
        onClick={onRestart}
        className="flex items-center justify-center p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors shadow-md"
        aria-label="Restart listening"
      >
        <RestartIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ListeningControls;
