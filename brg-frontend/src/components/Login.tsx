import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/AxiosConfig';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState(String); // Pre-fill for easy testing
  const [password, setPassword] = useState(String); // Pre-fill for easy testing
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. First, get the CSRF cookie from the backend.
      await apiClient.get('/sanctum/csrf-cookie');

      // 2. Now that the cookie is set, attempt the actual login.
      const response = await apiClient.post('/api/login', { email, password });

      // 3. If successful, store the token and navigate to the admin page.
      setToken(response.data.token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div className="login-form-row">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-row">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
