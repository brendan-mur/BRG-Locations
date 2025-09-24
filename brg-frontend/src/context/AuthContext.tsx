import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/AxiosConfig';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

// Create a context for authentication
const AuthContext = createContext<AuthContextType | null>(null);

// 15 minutes in milliseconds
const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize token from localStorage
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const navigate = useNavigate();

  // Function to set token in state, localStorage, and Axios headers
  const setToken = (newToken: string | null) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      // Set the token for all future Axios requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } else {
      localStorage.removeItem('token');
      // Remove the token from Axios headers
      delete apiClient.defaults.headers.common['Authorization'];
    }
  };

  // --- LOGOUT FUNCTION ---
  const logout = useCallback(async () => {
    if (token) {
      try {
        // Invalidate the token on the server
        await apiClient.post('/api/logout');
      } catch (error) {
        console.error(
          'Logout failed on server, but logging out client-side.',
          error
        );
      } finally {
        // Always clear client-side session
        setToken(null);
        navigate('/login');
      }
    }
  }, [token, navigate]);

  // --- INACTIVITY TIMER LOGIC ---
  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logout, INACTIVITY_TIMEOUT);
    };

    // List of events that indicate user activity
    const activityEvents = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
    ];

    if (token) {
      // Start the timer when the user is logged in
      resetTimer();
      // Add event listeners to reset the timer on activity
      activityEvents.forEach((event) =>
        window.addEventListener(event, resetTimer)
      );
    }

    // Cleanup function
    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [token, logout]); // Rerun this effect if the token or logout function changes

  // On initial load, set the token in Axios if it exists
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      apiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${storedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
