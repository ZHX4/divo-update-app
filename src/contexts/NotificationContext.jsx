import React, { createContext, useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const NotificationToastContainer = dynamic(
  () => import('../components/notifications/NotificationToast').then(mod => mod.NotificationToastContainer),
  { ssr: false }
);

const NotificationContext = createContext();

const generateUniqueId = () => `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (notification) => {
    const id = notification.id || generateUniqueId();
    const newToast = { ...notification, id };
    setToasts(prev => [newToast, ...prev]);
    return id;
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  const handleAction = (action, notification) => {
    console.log(`Action ${action} for notification ${notification.id}`);

    removeToast(notification.id);
  };

  return (
    <NotificationContext.Provider value={{ addToast, removeToast }}>
      {children}
      <NotificationToastContainer 
        notifications={toasts} 
        onClose={removeToast}
        onAction={handleAction}
      />
    </NotificationContext.Provider>
  );
};

export const useNotificationToast = () => {
  const context = useContext(NotificationContext);
  
  if (context === undefined && typeof window !== 'undefined') {
    throw new Error('useNotificationToast must be used within a NotificationProvider');
  }
  
  return context || { 
    addToast: () => {},
    removeToast: () => {} 
  };
};

export default NotificationContext;