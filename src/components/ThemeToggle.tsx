import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-xl border border-border flex items-center justify-center transition-all duration-300 hover:bg-muted hover:border-primary/30 group"
      aria-label="Toggle theme"
    >
      <div className="transition-all duration-300 group-hover:scale-110">
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-600" />
        )}
      </div>
    </button>
  );
}
