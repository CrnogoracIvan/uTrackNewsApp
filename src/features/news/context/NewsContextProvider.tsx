import React, { useContext } from 'react';
import { useNewsHook } from './useNewsHook.tsx';

interface IProps {
  children: React.ReactNode;
}

const NewsContext = React.createContext<any>(null);

export const NewsContextProvider = ({ children }: IProps) => {
  const newsContextValue = useNewsHook();
  return (
    <NewsContext.Provider value={newsContextValue}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsContextProvider');
  }
  return context;
};
