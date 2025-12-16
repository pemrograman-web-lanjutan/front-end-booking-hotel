"use client";

/**
 * Safely get token from localStorage
 * Only use this in client-side components (with "use client")
 */
export function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem("token");
}

/**
 * Safely set token in localStorage
 * Only use this in client-side components (with "use client")
 */
export function setTokenInStorage(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem("token", token);
}

/**
 * Safely get user from localStorage
 * Only use this in client-side components (with "use client")
 */
export function getUserFromStorage(): any {
  if (typeof window === 'undefined') {
    return null;
  }
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/**
 * Safely clear auth data from localStorage
 * Only use this in client-side components (with "use client")
 */
export function clearAuthStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("pendingBooking");
}
