
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AppState } from './types';
import { generateAnswer } from './services/geminiService';
import Header from './components/Header';
import AnswerDisplay from './components/AnswerDisplay';
import TranscriptDisplay from './components/TranscriptDisplay';
import ControlButton from './components/ControlButton';
import IntroScreen from './components/IntroScreen';
import ErrorDisplay from './components/ErrorDisplay';
import ListeningControls from './components/ListeningControls';
import ResumeModal from './components/ResumeModal';

// FIX: Add types for Web Speech API to fix TypeScript errors.
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}


// Polyfill for browser compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [transcript, setTranscript] = useState<string>('');
  const [finalTranscript, setFinalTranscript] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isBrowserSupported, setIsBrowserSupported] = useState<boolean>(true);
  const [resumeText, setResumeText] = useState<string>('');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      setIsBrowserSupported(false);
      setError('Speech recognition is not supported in this browser. Please try Chrome or Edge.');
    }
  }, []);

  const processTranscript = useCallback(async (text: string) => {
    const question = text.trim();
    if (question.length > 5) {
      setAppState(AppState.THINKING);
      setError('');
      try {
        const answer = await generateAnswer(question, resumeText);
        setAiAnswer(answer);
        setFinalTranscript(''); // Clear the processed question
        setTranscript('');
      } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred with the AI service.';
        setError(`Failed to get answer. ${errorMessage}`);
      } finally {
        setAppState(AppState.LISTENING); // Always return to listening
      }
    }
  }, [resumeText]);
  
  const startListening = useCallback((isResuming = false) => {
    if (!SpeechRecognition || recognitionRef.current) return;

    if (!isResuming) {
      setError('');
      setTranscript('');
      setFinalTranscript('');
      setAiAnswer('');
    }
    
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setAppState(AppState.LISTENING);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscriptChunk = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptChunk += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);
      if (finalTranscriptChunk) {
        setFinalTranscript(prev => `${prev} ${finalTranscriptChunk}`.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone access was denied. Please allow microphone access in your browser settings.');
      } else {
        setError(`An error occurred: ${event.error}`);
      }
      setAppState(AppState.IDLE);
    };

    recognition.onend = () => {
      // If it ends and we are supposed to be listening (not pausing), restart it.
      // This handles cases where the connection times out.
      if (appState === AppState.LISTENING) {
        recognition.start();
      }
    };

    recognition.start();
  }, [appState]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // Prevent automatic restart
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setAppState(AppState.IDLE);
    setTranscript('');
    setFinalTranscript('');
    setAiAnswer('');
  }, []);
  
  const pauseListening = useCallback(() => {
    if (recognitionRef.current && appState === AppState.LISTENING) {
      setAppState(AppState.PAUSED);
      recognitionRef.current.stop();
    }
  }, [appState]);

  const resumeListening = useCallback(() => {
    if (appState === AppState.PAUSED) {
      startListening(true);
    }
  }, [appState, startListening]);

  const restartListening = useCallback(() => {
    stopListening();
    setTimeout(() => startListening(), 100);
  }, [stopListening, startListening]);


  const handleToggleListening = () => {
    const isActive = appState !== AppState.IDLE;
    if (!isActive) {
      startListening();
    } else {
      stopListening();
    }
  };

  const handleSaveResume = (text: string) => {
    setResumeText(text);
    setIsResumeModalOpen(false);
  };
  
  const handleClearResume = () => {
    setResumeText('');
  };
  
  const handleVanish = () => {
    stopListening();
    document.title = 'New Tab'; // Disguise the tab before it vanishes.
    // A short delay to ensure state updates before navigation
    setTimeout(() => {
      window.location.replace('about:blank');
    }, 100);
  };

  const showControls = appState === AppState.LISTENING || appState === AppState.PAUSED;

  return (
    <div 
      className="min-h-screen font-sans flex flex-col items-center p-4 md:p-8 relative bg-slate-900"
    >
      <Header 
        hasResume={!!resumeText}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onClearResume={handleClearResume}
        onVanish={handleVanish}
      />
      <div className="w-full max-w-4xl mx-auto flex-grow flex flex-col">
        <div className="flex-grow">
          {appState === AppState.IDLE ? (
            <IntroScreen isBrowserSupported={isBrowserSupported} />
          ) : (
            <div className="flex flex-col gap-6">
              <AnswerDisplay state={appState} answer={aiAnswer} />
              <TranscriptDisplay 
                transcript={transcript} 
                finalTranscript={finalTranscript}
                state={appState}
                onProcess={processTranscript}
              />
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-center items-center gap-6">
            {showControls && (
              <ListeningControls
                isPaused={appState === AppState.PAUSED}
                onPause={pauseListening}
                onResume={resumeListening}
                onRestart={restartListening}
              />
            )}
            <ControlButton
              onClick={handleToggleListening}
              state={appState}
            />
        </div>
        <ErrorDisplay message={error} />
      </div>
       {isResumeModalOpen && (
        <ResumeModal
          onClose={() => setIsResumeModalOpen(false)}
          onSave={handleSaveResume}
          initialText={resumeText}
        />
      )}
    </div>
  );
};

export default App;
