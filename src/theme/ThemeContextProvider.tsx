import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { customDarkTheme, customLightTheme } from './theme.tsx';
import { getThemeFromStorage, saveThemeToStorage } from '../utils.ts';

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
    saveThemeToStorage(themeType === 'light' ? 'dark' : 'light');
    setThemeType(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const themeLoading = async () => {
      const themeFromStorage = await getThemeFromStorage();

      setThemeType(
        themeFromStorage ? (themeFromStorage as ThemeType) : 'light',
      );
    };
    themeLoading();
  }, []);

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
