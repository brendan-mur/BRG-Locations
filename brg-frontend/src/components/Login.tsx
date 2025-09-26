import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/AxiosConfig';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Use new state
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // Effect to clear the error message after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      const response = await apiClient.post('/api/login', { email, password });
      if (response.data.token) {
        setToken(response.data.token);
        navigate('/admin');
      }
    } catch (err: any) {
      // Provide a user-friendly error message from the API response
      if (err.response?.data?.errors) {
        // Handle validation errors (e.g., "The provided credentials do not match...")
        const validationErrors = Object.values(err.response.data.errors).flat();
        setErrorMessage(validationErrors.join(' '));
      } else if (err.response?.data?.message) {
        // Handle other structured errors
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h3>Admin Login</h3>

        {/* --- Feedback Display Area --- */}
        {errorMessage && (
          <div className="feedback error" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="login-form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-row">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
