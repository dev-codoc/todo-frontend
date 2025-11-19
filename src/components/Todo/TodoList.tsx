import { useQuery } from '@tanstack/react-query';
import { todoApi } from '../../api/todoApi';
import { useTodoStore } from '../../store/todoStore';
import { TodoItem } from './TodoItem';
import { useEffect, useState } from 'react';

export const TodoList = () => {
  const { todos, setTodos } = useTodoStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
  });

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data, setTodos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <svg className="animate-spin h-12 w-12 text-primary" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Todos</h3>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-primary">{stats.total}</p>
          <p className="text-sm text-gray-600 mt-1">Total</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
          <p className="text-sm text-gray-600 mt-1">Active</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-sm text-gray-600 mt-1">Completed</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
              filter === f
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo Items */}
      {filteredTodos.length === 0 ? (
        <div className="card p-12 text-center">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No todos yet</h3>
          <p className="text-gray-600">Create your first task to get started!</p>
        </div>
      ) : (
        <div className="space-y-0">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};
