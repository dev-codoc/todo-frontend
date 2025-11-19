// src/store/themeStore.ts
import { create } from 'zustand';

type Theme = "light" | "dark"; ;

interface ThemeState {
  theme: Theme;
  initTheme: () => void;
  toggleTheme: () => void;
}

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  localStorage.setItem('theme', theme);
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',

  initTheme: () => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('theme') as Theme | null;

    // 1) If user chose a theme before, use that
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored);
      set({ theme: stored });
      return;
    }
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    set({ theme: next });
  },
}));
