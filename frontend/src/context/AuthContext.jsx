import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  const API_URL = import.meta.env.VITE_API_URL + '/api';
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`);
      setUser(res.data.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      // If token is invalid, logout
      if (err.response && err.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.error || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      // For registration, we might not always get a token back depending on backend logic
      // But if we do, we can log them in automatically
      if (res.data.token && res.data.user) {
        setToken(res.data.token);
        setUser(res.data.user);
      }
      return { success: true, message: res.data.message };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.error || 'Registration failed.' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
