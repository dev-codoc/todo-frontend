import axiosInstance from './axios';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types';
import { z } from 'zod';
import { todoSchema } from '../schemas/todoSchema';

const todosArraySchema = z.array(todoSchema);

export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await axiosInstance.get('/todos');
    return todosArraySchema.parse(response.data);
  },

  createTodo: async (data: CreateTodoInput): Promise<Todo> => {
    const response = await axiosInstance.post('/todos', data);
    return todoSchema.parse(response.data);
  },

  updateTodo: async (id: string, data: UpdateTodoInput): Promise<Todo> => {
    const response = await axiosInstance.put(`/todos/${id}`, data);
    return todoSchema.parse(response.data);
  },

  deleteTodo: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/todos/${id}`);
  },

  toggleTodo: async (id: string): Promise<Todo> => {
    const response = await axiosInstance.patch(`/todos/${id}/toggle`);
    return todoSchema.parse(response.data);
  },
};