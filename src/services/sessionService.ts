export interface UserSession {
  valid: boolean;
  userName?: string;
  portalUrl?: string;
}

export const checkUserSession = async (): Promise<UserSession> => {
  try {
    const response = await fetch('/api/v1/user/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Session check failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking user session:', error);
    // Return invalid session on error
    return { valid: false };
  }
};