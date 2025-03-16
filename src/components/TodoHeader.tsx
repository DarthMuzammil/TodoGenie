import { memo } from 'react';

interface TodoHeaderProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const TodoHeader = memo(function TodoHeader({
  isRecording,
  onToggleRecording
}: TodoHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">My Tasks</h1>
      <button
        onClick={onToggleRecording}
        className={`p-4 rounded-full transition-colors ${
          isRecording ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? '🎤 Recording...' : '🎤 Start Recording'}
      </button>
    </div>
  );
});

TodoHeader.displayName = 'TodoHeader';

export default TodoHeader; 