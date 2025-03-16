'use client';

import { useState } from 'react';
import { VoiceRecorder } from '@/components/voice/VoiceRecorder';

export default function TodosPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleTranscript = (text: string) => {
    setTranscript(text);
    console.log('Transcript received:', text);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsRecording(false);
    console.error('Voice recording error:', errorMessage);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setError(null);
      setTranscript('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <button
          onClick={toggleRecording}
          className={`p-4 rounded-full transition-colors ${
            isRecording ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isRecording ? '🎤 Recording...' : '🎤 Start Recording'}
        </button>
      </div>

      {/* Voice recording status */}
      <div className="mb-8">
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            {error}
          </div>
        )}
        {transcript && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <h3 className="font-semibold mb-2">Last Transcript:</h3>
            <p>{transcript}</p>
          </div>
        )}
      </div>

      <VoiceRecorder
        isRecording={isRecording}
        onTranscript={handleTranscript}
        onError={handleError}
      />

      {/* Placeholder for todo list */}
      <div className="space-y-4">
        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Example Todo</h3>
              <p className="text-gray-600">This is a placeholder todo item</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-green-500 hover:bg-green-50 rounded">✓</button>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded">×</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 