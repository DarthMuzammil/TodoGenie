import { memo } from 'react';

interface TodoItemProps {
  title: string;
  description: string;
  completed: boolean;
  onComplete?: () => void;
  onDelete?: () => void;
}

const TodoItem = memo(function TodoItem({ 
  title, 
  description,
  completed,
  onComplete, 
  onDelete 
}: TodoItemProps) {
  return (
    <div className={`p-4 border rounded-lg shadow-sm ${completed ? 'bg-gray-50' : ''}`}>
      <div className="flex items-center justify-between">
        <div className={completed ? 'text-gray-500' : ''}>
          <h3 className={`text-lg font-semibold ${completed ? 'line-through' : ''}`}>
            {title}
          </h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onComplete}
            className={`p-2 ${completed ? 'text-gray-400' : 'text-green-500'} hover:bg-green-50 rounded`}
            aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {completed ? '↩' : '✓'}
          </button>
          <button 
            onClick={onDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded"
            aria-label="Delete todo"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem; 