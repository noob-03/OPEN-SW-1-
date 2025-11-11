import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SportType } from '../types';

interface SportContextType {
  sport: SportType | null;
  setSport: (sport: SportType) => void;
  clearSport: () => void;
}

const SportContext = createContext<SportContextType | undefined>(undefined);

export const SportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sport, setSportState] = useState<SportType | null>(() => {
    const storedSport = localStorage.getItem('sportify_sport');
    return storedSport ? (storedSport as SportType) : null;
  });

  const setSport = (selectedSport: SportType) => {
    localStorage.setItem('sportify_sport', selectedSport);
    setSportState(selectedSport);
  };

  const clearSport = () => {
    localStorage.removeItem('sportify_sport');
    setSportState(null);
  }

  return (
    <SportContext.Provider value={{ sport, setSport, clearSport }}>
      {children}
    </SportContext.Provider>
  );
};

export const useSport = () => {
  const context = useContext(SportContext);
  if (context === undefined) {
    throw new Error('useSport must be used within a SportProvider');
  }
  return context;
};