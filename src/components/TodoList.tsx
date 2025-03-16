import { memo, useState } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/lib/db/todoDb';
import { useTodoDispatcher } from '@/lib/hooks/useTodoDispatcher';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onCompleteTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onSearch: (query: string) => void;
}

const TodoList = memo(function TodoList({ 
  todos,
  isLoading,
  onCompleteTodo,
  onDeleteTodo,
  onSearch
}: TodoListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    dispatchComplete,
    dispatchDelete,
    dispatchSearch
  } = useTodoDispatcher({
    onComplete: onCompleteTodo,
    onDelete: onDeleteTodo,
    onSearch: onSearch
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatchSearch(query);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {searchQuery ? 'No todos found' : 'No todos yet'}
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
              onComplete={() => dispatchComplete(todo.id)}
              onDelete={() => dispatchDelete(todo.id)}
            />
          ))
        )}
      </div>
    </div>
  );
});

TodoList.displayName = 'TodoList';

export default TodoList; 