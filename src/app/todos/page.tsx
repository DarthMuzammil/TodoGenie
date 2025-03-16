'use client';

import { useState } from 'react';
import { VoiceRecorder } from '@/components/voice/VoiceRecorder';
import VoiceStatus from '@/components/VoiceStatus';
import TodoList from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';
import TodoHeader from '@/components/TodoHeader';

export default function TodosPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    searchTodos,
  } = useTodos();

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    console.log('Transcript received:', text);
    
    // Add todo from voice input
    try {
      await addTodo(text, ''); // Using transcript as title
      setError(null);
    } catch {
      setError('Failed to add todo from voice input');
    }
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
    <div className="max-w-4xl mx-auto p-4">
      <TodoHeader 
        isRecording={isRecording}
        onToggleRecording={toggleRecording}
      />

      <VoiceStatus error={error} transcript={transcript} />

      <VoiceRecorder
        isRecording={isRecording}
        onTranscript={handleTranscript}
        onError={handleError}
      />

      <TodoList
        todos={todos}
        isLoading={isLoading}
        onCompleteTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
        onSearch={searchTodos}
      />
    </div>
  );
} 