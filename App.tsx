import React from 'react';
import { PaperProvider } from 'react-native-paper';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/AppNavigator.tsx';
import { NewsContextProvider } from './src/features/news/context/NewsContextProvider.tsx';
import ToastContainer from 'toastify-react-native';
import { AuthContextProvider } from './src/features/auth/context/AuthContextProvider.tsx';
import {
  ThemeContextProvider,
  useThemeContext,
} from './src/theme/ThemeContextProvider.tsx';

const ThemedApp = () => {
  const { theme } = useThemeContext();

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <AuthContextProvider>
            <NewsContextProvider>
              <ThemedApp />
            </NewsContextProvider>
          </AuthContextProvider>
        </ThemeContextProvider>
      </QueryClientProvider>
      <ToastContainer position="bottom" duration={1500} />
    </SafeAreaProvider>
  );
}
