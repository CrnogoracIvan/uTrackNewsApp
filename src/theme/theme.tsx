// src/theme.ts
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Define your custom light theme
export const customLightTheme = {
  ...MD3LightTheme,
  // Override colors
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    // Add more custom colors as needed
  },
  // Custom fonts
  fonts: {
    ...MD3LightTheme.fonts,
    // Customize fonts if needed
  },
  // Add other theme properties
};

// Define your custom dark theme
export const customDarkTheme = {
  ...MD3DarkTheme,
  // Override colors
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#f40c12',
    secondary: '#f39c12',
    // Add more custom colors as needed
  },
  // Custom fonts
  fonts: {
    ...MD3DarkTheme.fonts,
    // Customize fonts if needed
  },
  // Add other theme properties
};
