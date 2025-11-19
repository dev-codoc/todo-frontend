import { Navbar } from "../Layout/Navbar";
import { TodoForm } from "../Todo/TodoForm";
import { TodoList } from "../Todo/TodoList";

export const DashboardPage = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 "
    >
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            My Tasks
          </h1>
          <p className="text-gray-600">Organize your day, one task at a time</p>
        </div>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};
