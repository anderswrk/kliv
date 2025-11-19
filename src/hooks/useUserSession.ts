import { useState, useEffect, useCallback } from 'react';
import { checkUserSession, UserSession } from '../services/sessionService';

export const useUserSession = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    try {
      const userSession = await checkUserSession();
      setSession(userSession);
    } catch (error) {
      console.error('Failed to refresh session:', error);
      setSession({ valid: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const goToPortal = useCallback((prompt?: string) => {
    if (session?.portalUrl) {
      const portalUrl = prompt 
        ? `${session.portalUrl}?prompt=${encodeURIComponent(prompt)}` 
        : session.portalUrl;
      window.location.href = portalUrl;
    }
  }, [session?.portalUrl]);

  return {
    session,
    loading,
    refreshSession,
    goToPortal,
    isLoggedIn: session?.valid ?? false,
    userName: session?.userName,
  };
};