import React from 'react';
import { useNotification } from '../context/NotificationContext';

const NotificationPopup: React.FC = () => {
  const { notification } = useNotification();

  if (!notification) {
    return null;
  }

  const baseClasses = 'fixed bottom-5 left-5 p-4 rounded-lg shadow-lg text-white transition-all duration-500 transform z-50';
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };
  
  const visibilityClasses = notification.visible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-5';

  return (
    <div className={`${baseClasses} ${typeClasses[notification.type]} ${visibilityClasses}`}>
      {notification.message}
    </div>
  );
};

export default NotificationPopup;
