import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationState {
  message: string;
  type: NotificationType;
  visible: boolean;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
  notification: NotificationState | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = useCallback((message: string, type: NotificationType) => {
    setNotification({ message, type, visible: true });
    const timer = setTimeout(() => {
      setNotification(prev => prev ? { ...prev, visible: false } : null);
      const clearTimer = setTimeout(() => setNotification(null), 500); // allow for fade out
      return () => clearTimeout(clearTimer);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, notification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
