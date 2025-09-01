
import React, { useState } from 'react';

interface ResumeModalProps {
  onClose: () => void;
  onSave: (text: string) => void;
  initialText: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ onClose, onSave, initialText }) => {
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    onSave(text);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      aria-labelledby="resume-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 flex flex-col">
        <h2 id="resume-modal-title" className="text-2xl font-bold text-white mb-4">
          Personalize with Your Resume
        </h2>
        <p className="text-slate-400 mb-6">
          Paste your resume text below. The AI will use this context to tailor its answers to your specific skills and experience.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
          placeholder="Paste your resume here..."
          aria-label="Resume text area"
        />
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-slate-300 font-semibold bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-full text-slate-900 font-bold bg-cyan-500 hover:bg-cyan-600 transition-colors"
          >
            Save Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
