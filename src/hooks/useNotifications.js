import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../config';

import { sampleNotifications } from '../data/sampleNotifications';

export function useNotifications() {
  const isServer = typeof window === 'undefined';
  
  const [notifications, setNotifications] = useState(isServer ? sampleNotifications : []);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const auth = useSelector((state) => state.auth || {});
  const token = auth.token;

  const fetchNotifications = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setNotifications(response.data.notifications || []);
      setUnreadCount(
        response.data.notifications.filter(notification => !notification.read).length
      );
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch notifications');
      setLoading(false);
    }
  };

  const getRecentNotifications = () => {
    return notifications.slice(0, 5);
  };

  const markAsRead = async (notificationId) => {
    if (!token) return;
    
    try {
      await axios.put(`${API_URL}/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const updatedNotifications = notifications.map(notification => {
        if (notification.id === notificationId && !notification.read) {
          setUnreadCount(prevCount => prevCount - 1);
          return { ...notification, read: true };
        }
        return notification;
      });
      
      setNotifications(updatedNotifications);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    
    try {
      await axios.put(`${API_URL}/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const updatedNotifications = notifications.map(notification => ({
        ...notification, 
        read: true 
      }));
      
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    getRecentNotifications,
    markAsRead,
    markAllAsRead,
    refreshNotifications: fetchNotifications,
  };
}

export default useNotifications;
