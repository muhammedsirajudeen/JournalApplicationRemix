import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function clearAllCookies() {
  // Get all cookies in the document
  const cookies = document.cookie.split(";");

  // Loop through each cookie and delete it
  cookies.forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim(); // Get the cookie name
    document.cookie = `${cookieName}=; max-age=0; path=/; secure; samesite=strict`;
  });
}


export const backendUrl="http://localhost:3000"