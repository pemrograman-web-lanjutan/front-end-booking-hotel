import { redirect } from 'next/navigation';

/**
 * Server-side function to verify if user is authenticated
 * Use this in server components and server actions
 */
export async function verifyAuth() {
  try {
    // Dynamic import untuk menghindari build issues
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      redirect('/auth/login?redirect=/dashboard');
    }

    return token;
  } catch (error) {
    console.error('[verifyAuth] Error:', error);
    redirect('/auth/login?redirect=/dashboard');
  }
}

/**
 * Server-side function to get token from cookies
 * Returns null if no token found (doesn't redirect)
 */
export async function getTokenFromCookies() {
  try {
    // Dynamic import untuk menghindari build issues
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value || null;
  } catch (error) {
    console.error('[getTokenFromCookies] Error:', error);
    return null;
  }
}
