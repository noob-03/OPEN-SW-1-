
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import NotificationPopup from './NotificationPopup';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <NotificationPopup />
    </div>
  );
};

export default Layout;