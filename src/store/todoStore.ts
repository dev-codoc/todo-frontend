import { create } from 'zustand';
import { Todo } from '../types';

interface TodoState {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updatedTodo: Todo) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  
  setTodos: (todos) => set({ todos }),
  
  addTodo: (todo) => set((state) => ({ 
    todos: [todo, ...state.todos] 
  })),
  
  updateTodo: (id, updatedTodo) => set((state) => ({
    todos: state.todos.map((todo) => 
      todo._id === id ? updatedTodo : todo
    ),
  })),
  
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo._id !== id),
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
}));