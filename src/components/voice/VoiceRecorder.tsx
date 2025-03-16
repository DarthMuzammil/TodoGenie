'use client';

import { useEffect, useRef } from 'react';

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  onError: (error: string) => void;
  isRecording: boolean;
}

export function VoiceRecorder({ onTranscript, onError, isRecording }: VoiceRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/mp3' });
          
          try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.mp3');

            const response = await fetch('/api/speechToText', {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error('Speech-to-text conversion failed');
            }

            const data = await response.json();
            onTranscript(data.text);
          } catch (error) {
            onError('Failed to convert speech to text');
            console.error('Speech-to-text error:', error);
          }
        };

        mediaRecorder.start();
        cleanup = () => {
          if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
          }
          stream.getTracks().forEach(track => track.stop());
        };
      } catch (error) {
        onError('Failed to access microphone');
        console.error('Microphone access error:', error);
      }
    };

    if (isRecording) {
      startRecording();
    } else if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [isRecording, onTranscript, onError]);

  return null; // This is a non-visual component
} 