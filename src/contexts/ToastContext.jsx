import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';

const ToastContainer = dynamic(
  () => import('../components/common/Toast').then(mod => mod.ToastContainer),
  { ssr: false }
);

const ToastContext = createContext(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context && typeof window !== 'undefined') {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context || { 
    showToast: () => {},
    hideToast: () => {} 
  };
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, variant = 'info') => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, message, variant }]);
    
    setTimeout(() => {
      hideToast(id);
    }, 5000);
    
    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider; 