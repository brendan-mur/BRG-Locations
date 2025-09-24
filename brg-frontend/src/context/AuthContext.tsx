import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/AxiosConfig';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// Create a context for authentication
const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize token from localStorage
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

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
    <AuthContext.Provider value={{ token, setToken }}>
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
