import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Configure API Base URL
  const API = import.meta.env.VITE_API_URL || 'https://lms-2-9jwk.onrender.com';
  
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
      const res = await axios.get(`${API}/api/auth/me`);
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
      const res = await axios.post(`${API}/api/auth/login`, { email, password });
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
      const res = await axios.post(`${API}/api/auth/register`, userData);
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

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(`${API}/api/auth/forgotpassword`, { email });
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || 'Email not registered'
      };
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      const res = await axios.put(`${API}/api/auth/resetpassword`, { email, newPassword });
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || 'Password reset failed'
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
