import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../../api/todoApi';
import { useTodoStore } from '../../store/todoStore';
import { Todo } from '../../types';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const queryClient = useQueryClient();
  const { toggleTodo, deleteTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const toggleMutation = useMutation({
    mutationFn: () => todoApi.toggleTodo(todo._id),
    onSuccess: () => {
      toggleTodo(todo._id);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => todoApi.deleteTodo(todo._id),
    onSuccess: () => {
      deleteTodo(todo._id);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { title: string }) => todoApi.updateTodo(todo._id, data),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleUpdate = () => {
    if (editTitle.trim()) {
      updateMutation.mutate({ title: editTitle });
    }
  };

  return (
    <div className="card p-4 mb-3 group hover:border-primary transition-all">
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => toggleMutation.mutate()}
          className="mt-1 flex-shrink-0"
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
            todo.completed
              ? 'bg-gradient-to-r from-primary to-secondary border-primary'
              : 'border-gray-300 hover:border-primary'
          }`}>
            {todo.completed && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="input-field"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-opacity-90"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(todo.title);
                  }}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={`text-lg font-medium ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mt-1 ${
                  todo.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {todo.description}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(todo.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
