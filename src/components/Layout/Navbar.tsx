import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isDark = theme === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TodoApp
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-12 h-6 flex items-center rounded-full bg-gray-200 dark:bg-gray-700 transition"
            >
              <span
                className={`absolute w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow transform transition-transform ${
                  isDark ? "translate-x-6" : "translate-x-0"
                }`}
              />
              <span className="absolute left-1 text-xs">☀️</span>
              <span className="absolute right-1 text-xs">🌙</span>
            </button>

            {/* User */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition"
            >
              {/* logout icon */}
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
