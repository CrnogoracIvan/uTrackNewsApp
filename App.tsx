import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import constants from './src/constants/navigation';

import { AuthScreen } from './src/features/auth/screens/AuthScreen/AuthScreen';
import { NewsScreen } from './src/features/news/screens/NewsScreen/NewsScreen';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator();

export default function App() {
  const { AUTH, NEWS } = constants;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={AUTH}>
            <Stack.Screen
              name={AUTH}
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={NEWS} component={NewsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
