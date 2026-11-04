import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'autumn';

const THEME_STORAGE_KEY = 'zaloghub_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (saved === 'light' || saved === 'autumn') {
        return saved;
      }
    } catch (error) {
      console.error('Ошибка чтения темы:', error);
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Ошибка сохранения темы:', error);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'autumn' : 'light'));
  }, []);

  return { theme, toggleTheme };
}
