'use client';

import { useEffect, useState } from 'react';
import { voiceRecognition, VoiceRecognitionResult } from '@/lib/voice/recognition';
import { parseVoiceCommand } from '@/lib/voice/commandParser';
import { speak } from '@/lib/voice/speak';
import type { TodoCommand } from '@/lib/voice/commandParser';

interface VoiceStatusProps {
  onCommand: (command: TodoCommand) => Promise<void>;
}

export default function VoiceStatus({ onCommand }: VoiceStatusProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    voiceRecognition.on('start', () => {
      setIsListening(true);
      setTranscript('');
    });

    voiceRecognition.on('end', () => {
      setIsListening(false);
    });

    voiceRecognition.on('result', async (result: VoiceRecognitionResult) => {
      setTranscript(result.transcript);

      if (result.isFinal) {
        const command = parseVoiceCommand(result.transcript);
        if (command) {
          try {
            await onCommand(command);
            await speak(`Processing command: ${result.transcript}`);
          } catch (error) {
            console.error('Error processing command:', error);
            await speak('Sorry, I could not process that command.');
          }
        }
      }
    });

    return () => {
      voiceRecognition.removeAllListeners();
    };
  }, [onCommand]);

  const toggleListening = () => {
    if (isListening) {
      voiceRecognition.stop();
    } else {
      voiceRecognition.start();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <button
        onClick={toggleListening}
        className={`rounded-full p-3 transition-colors ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isListening
                ? 'M6 18L18 6M6 6l12 12'
                : 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3'
            }
          />
        </svg>
      </button>
      {transcript && (
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {transcript}
        </div>
      )}
    </div>
  );
} 