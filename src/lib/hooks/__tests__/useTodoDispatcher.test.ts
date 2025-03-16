import { renderHook } from '@testing-library/react';
import { useTodoDispatcher } from '../useTodoDispatcher';
import { act } from 'react-dom/test-utils';

describe('useTodoDispatcher', () => {
  it('should handle complete action', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() =>
      useTodoDispatcher({ onComplete })
    );

    act(() => {
      result.current.dispatchComplete('123');
    });

    expect(onComplete).toHaveBeenCalledWith('123');
  });

  it('should handle delete action', () => {
    const onDelete = jest.fn();
    const { result } = renderHook(() =>
      useTodoDispatcher({ onDelete })
    );

    act(() => {
      result.current.dispatchDelete('123');
    });

    expect(onDelete).toHaveBeenCalledWith('123');
  });

  it('should handle search action', () => {
    const onSearch = jest.fn();
    const { result } = renderHook(() =>
      useTodoDispatcher({ onSearch })
    );

    act(() => {
      result.current.dispatchSearch('test query');
    });

    expect(onSearch).toHaveBeenCalledWith('test query');
  });

  it('should handle create action', () => {
    const onCreate = jest.fn();
    const { result } = renderHook(() =>
      useTodoDispatcher({ onCreate })
    );

    const todoData = { title: 'New Todo', description: 'Test description' };
    
    act(() => {
      result.current.dispatchCreate(todoData);
    });

    expect(onCreate).toHaveBeenCalledWith(todoData);
  });

  it('should handle update action', () => {
    const onUpdate = jest.fn();
    const { result } = renderHook(() =>
      useTodoDispatcher({ onUpdate })
    );

    const todoData = { title: 'Updated Todo' };
    
    act(() => {
      result.current.dispatchUpdate('123', todoData);
    });

    expect(onUpdate).toHaveBeenCalledWith('123', todoData);
  });

  it('should not throw when handler is not provided', () => {
    const { result } = renderHook(() =>
      useTodoDispatcher({})
    );

    expect(() => {
      act(() => {
        result.current.dispatchComplete('123');
        result.current.dispatchDelete('123');
        result.current.dispatchSearch('test');
        result.current.dispatchCreate({ title: 'test' });
        result.current.dispatchUpdate('123', { title: 'test' });
      });
    }).not.toThrow();
  });
}); 