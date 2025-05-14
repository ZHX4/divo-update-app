import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, logout, updateUser, clearError } from '../store/slices/authSlice';
import { API_URL } from '../config';

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const authState = useSelector((state) => state.auth);

  const login = async (email, password) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      dispatch(loginSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      dispatch(loginFailure(errorMsg));
      throw new Error(errorMsg);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Signup failed. Please try again.';
      setLoading(false);
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const signOut = () => {
    dispatch(logout());
    router.push('/login');
  };

  const clearAuthError = () => {
    dispatch(clearError());
    setError(null);
  };

  return {
    loading: loading || authState.loading,
    error: error || authState.error,
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    token: authState.token,
    login,
    signup,
    signOut,
    updateUserInfo: async (userData) => {
      setLoading(true);
      try {
        const response = await axios.put(`${API_URL}/users/profile`, userData, {
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        dispatch(updateUser(response.data));
        setLoading(false);
        return response.data;
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to update profile');
        setLoading(false);
        throw error;
      }
    },
    resetPassword: async (email) => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/auth/reset-password`, { email });
        setLoading(false);
        return response.data;
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to reset password');
        setLoading(false);
        throw error;
      }
    },
    clearAuthError,
  };
}

export default useAuth;
