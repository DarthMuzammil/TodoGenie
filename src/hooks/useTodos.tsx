import { useState, useEffect, useCallback } from 'react';
import { todoDB, Todo } from '@/lib/db/todoDb';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize the database
  useEffect(() => {
    todoDB.init()
      .then(() => loadTodos())
      .catch(() => setError('Failed to initialize database'));
  }, []);

  // Load todos
  const loadTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const loadedTodos = await todoDB.getAllTodos();
      setTodos(loadedTodos);
      setError(null);
    } catch {
      setError('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add todo
  const addTodo = useCallback(async (title: string, description: string) => {
    try {
      const newTodo = await todoDB.addTodo({
        title,
        description,
        completed: false
      });
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch {
      setError('Failed to add todo');
      throw new Error('Failed to add todo');
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (id: string, updates: Partial<Todo>) => {
    try {
      const updatedTodo = await todoDB.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
      return updatedTodo;
    } catch {
      setError('Failed to update todo');
      throw new Error('Failed to update todo');
    }
  }, []);

  // Delete todo
  const deleteTodo = useCallback(async (id: string) => {
    try {
      await todoDB.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      setError('Failed to delete todo');
      throw new Error('Failed to delete todo');
    }
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback(async (id: string) => {
    try {
      const updatedTodo = await todoDB.toggleTodoComplete(id);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
      return updatedTodo;
    } catch {
      setError('Failed to toggle todo');
      throw new Error('Failed to toggle todo');
    }
  }, []);

  // Search todos
  const searchTodos = useCallback(async (query: string) => {
    try {
      setSearchQuery(query);
      if (!query.trim()) {
        await loadTodos();
        return;
      }
      const results = await todoDB.searchTodos(query);
      setTodos(results);
    } catch {
      setError('Failed to search todos');
      throw new Error('Failed to search todos');
    }
  }, [loadTodos]);

  return {
    todos,
    isLoading,
    error,
    searchQuery,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    searchTodos,
    refreshTodos: loadTodos
  };
} 