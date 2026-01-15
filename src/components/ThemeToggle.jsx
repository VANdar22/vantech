import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl focus:outline-none transition-all duration-200 transform hover:scale-110"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className="w-6 h-6 text-[#EA1841]" />
        ) : (
          <Sun className="w-6 h-6 text-[#EA1841]" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
