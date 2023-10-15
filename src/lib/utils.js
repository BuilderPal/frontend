import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function capitalise(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
