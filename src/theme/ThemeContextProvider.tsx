// src/context/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { customDarkTheme, customLightTheme } from './theme.tsx';

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  theme: typeof customLightTheme;
  themeType: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themeType, setThemeType] = useState<ThemeType>('light');

  const theme = themeType === 'light' ? customLightTheme : customDarkTheme;

  const toggleTheme = () => {
    setThemeType(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
