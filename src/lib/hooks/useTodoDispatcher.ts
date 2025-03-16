import { useCallback } from 'react';
import { Todo } from '@/lib/db/todoDb';

type TodoOperation = 'create' | 'read' | 'update' | 'delete' | 'complete' | 'search';

interface TodoAction {
  type: TodoOperation;
  payload: {
    id?: string;
    data?: Partial<Todo>;
    query?: string;
  };
}

export const useTodoDispatcher = (
  initialHandlers: {
    onComplete?: (id: string) => void;
    onDelete?: (id: string) => void;
    onSearch?: (query: string) => void;
    onCreate?: (data: Partial<Todo>) => void;
    onUpdate?: (id: string, data: Partial<Todo>) => void;
  }
) => {
  const dispatch = useCallback(
    (action: TodoAction) => {
      switch (action.type) {
        case 'complete':
          if (action.payload.id && initialHandlers.onComplete) {
            initialHandlers.onComplete(action.payload.id);
          }
          break;
        case 'delete':
          if (action.payload.id && initialHandlers.onDelete) {
            initialHandlers.onDelete(action.payload.id);
          }
          break;
        case 'search':
          if (action.payload.query !== undefined && initialHandlers.onSearch) {
            initialHandlers.onSearch(action.payload.query);
          }
          break;
        case 'create':
          if (action.payload.data && initialHandlers.onCreate) {
            initialHandlers.onCreate(action.payload.data);
          }
          break;
        case 'update':
          if (action.payload.id && action.payload.data && initialHandlers.onUpdate) {
            initialHandlers.onUpdate(action.payload.id, action.payload.data);
          }
          break;
        default:
          console.warn('Unhandled todo operation:', action.type);
      }
    },
    [initialHandlers]
  );

  return {
    dispatch,
    dispatchComplete: useCallback(
      (id: string) => dispatch({ type: 'complete', payload: { id } }),
      [dispatch]
    ),
    dispatchDelete: useCallback(
      (id: string) => dispatch({ type: 'delete', payload: { id } }),
      [dispatch]
    ),
    dispatchSearch: useCallback(
      (query: string) => dispatch({ type: 'search', payload: { query } }),
      [dispatch]
    ),
    dispatchCreate: useCallback(
      (data: Partial<Todo>) => dispatch({ type: 'create', payload: { data } }),
      [dispatch]
    ),
    dispatchUpdate: useCallback(
      (id: string, data: Partial<Todo>) =>
        dispatch({ type: 'update', payload: { id, data } }),
      [dispatch]
    ),
  };
}; 