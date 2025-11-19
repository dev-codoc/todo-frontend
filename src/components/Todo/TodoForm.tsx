import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodoSchema, CreateTodoData } from '../../schemas/todoSchema';
import { todoApi } from '../../api/todoApi';
import { useTodoStore } from '../../store/todoStore';

export const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useTodoStore((state) => state.addTodo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoData>({
    resolver: zodResolver(createTodoSchema),
  });

  const createMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: (newTodo) => {
      addTodo(newTodo);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      reset();
    },
  });

  const onSubmit = (data: CreateTodoData) => {
    createMutation.mutate(data);
  };

  return (
    <div className="card p-6 mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Title Input */}
          <div className="flex-1">
            <input
              type="text"
              {...register('title')}
              placeholder="What needs to be done?"
              className="input-field"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Add Button */}
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="btn-primary whitespace-nowrap disabled:opacity-50"
          >
            {createMutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </span>
            )}
          </button>
        </div>

        {/* Description Input */}
        <textarea
          {...register('description')}
          placeholder="Add description (optional)"
          rows={2}
          className="input-field resize-none"
        />
      </form>
    </div>
  );
};
