import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string
 * @param  {...string} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
} 