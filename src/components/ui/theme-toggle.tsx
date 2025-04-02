import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

export function ThemeToggle({ className, iconClassName }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "p-2 rounded-full transition-colors",
          theme === "light" ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-conison-500 dark:focus-visible:ring-conison-400"
        )}
        aria-label="Light mode"
      >
        <Sun className={cn("h-5 w-5 text-yellow-500", iconClassName)} />
      </button>
      
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "p-2 rounded-full transition-colors",
          theme === "dark" ? "bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-conison-500 dark:focus-visible:ring-conison-400"
        )}
        aria-label="Dark mode"
      >
        <Moon className={cn("h-5 w-5 text-gray-800 dark:text-gray-300", iconClassName)} />
      </button>
      
      <button
        onClick={() => setTheme("system")}
        className={cn(
          "p-2 rounded-full transition-colors",
          theme === "system" ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-conison-500 dark:focus-visible:ring-conison-400"
        )}
        aria-label="System preference"
      >
        <Laptop className={cn("h-5 w-5 text-gray-800 dark:text-gray-300", iconClassName)} />
      </button>
    </div>
  );
} 