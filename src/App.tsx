import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useThemeStore } from "./store/themeStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { ProtectedRoute } from "./components/Layout/ProtectedRoute";
import { DashboardPage } from "./components/pages/DashboardPage";

const queryClient = new QueryClient();

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);
  // const initTheme = useThemeStore((s) => s.initTheme);
  // useEffect(() => {
  //   initTheme();
  // }, [initTheme]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
