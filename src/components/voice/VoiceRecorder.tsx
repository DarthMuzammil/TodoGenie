'use client';

import { useState, useEffect, useCallback } from 'react';

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  onError: (error: string) => void;
  isRecording: boolean;
}

export function VoiceRecorder({ onTranscript, onError, isRecording }: VoiceRecorderProps) {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      onError('Speech recognition is not supported in this browser.');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      if (event.results[0].isFinal) {
        onTranscript(transcript);
      }
    };

    recognitionInstance.onerror = (event) => {
      onError(`Error occurred in recognition: ${event.error}`);
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.abort();
    };
  }, [onTranscript, onError]);

  useEffect(() => {
    if (!recognition) return;

    if (isRecording) {
      try {
        recognition.start();
      } catch (error) {
        // Handle the case where recognition is already started
        if ((error as Error).message.includes('already started')) {
          recognition.stop();
          setTimeout(() => recognition.start(), 100);
        }
      }
    } else {
      recognition.stop();
    }
  }, [isRecording, recognition]);

  return null; // This is a non-visual component
} 