
import React from 'react';
import { AppState } from '../types';
import MicrophoneIcon from './icons/MicrophoneIcon';
import StopIcon from './icons/StopIcon';

interface ControlButtonProps {
  onClick: () => void;
  state: AppState;
}

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, state }) => {
  const isActive = state === AppState.LISTENING || state === AppState.THINKING || state === AppState.PAUSED;

  const text = state === AppState.IDLE ? 'Start Co-Pilot' : 'Stop Co-Pilot';
  const Icon = isActive ? StopIcon : MicrophoneIcon;
  const buttonClass = isActive
    ? 'bg-red-600 hover:bg-red-700 text-white'
    : 'bg-cyan-500 hover:bg-cyan-600 text-slate-900';

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg transform hover:scale-105 ${buttonClass}`}
      aria-label={text}
    >
      <Icon className="h-6 w-6" />
      <span>{text}</span>
    </button>
  );
};

export default ControlButton;