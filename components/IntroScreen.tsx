
import React from 'react';

interface IntroScreenProps {
    isBrowserSupported: boolean;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ isBrowserSupported }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
        <p className="text-slate-400 max-w-md mb-8">
            Click the "Start Co-Pilot" button below to begin. I'll listen for interview questions and provide you with key talking points in real-time.
        </p>
        {!isBrowserSupported && (
            <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg">
                <p><strong>Browser Not Supported:</strong> Please use the latest version of Chrome or Edge for the best experience.</p>
            </div>
        )}
        <div className="mt-12 text-xs text-slate-500 max-w-md">
            <strong>Note:</strong> You will be prompted to grant microphone access. This is required for the application to function. All audio processing is done in your browser.
        </div>
    </div>
  );
};

export default IntroScreen;
