import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import constants from './src/constants/navigation';

import { AuthScreen } from './src/features/auth/screens/AuthScreen/AuthScreen';
import { NewsScreen } from './src/features/news/screens/NewsScreen/NewsScreen';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Image } from 'react-native';
import { SingleArticleScreen } from './src/features/news/screens/SingleArticleScreen/SingleArticleScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const { AUTH, NEWS, ARTICLE } = constants;

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
            <Stack.Screen
              name={NEWS}
              component={NewsScreen}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./src/assets/images/logo.png')}
                    style={{ width: 120, height: 60, resizeMode: 'contain' }}
                  />
                ),
                headerTitleAlign: 'center', // centers the image
              }}
            />
            {/*@ts-expect-error - Expecting component type mismatch*/}
            <Stack.Screen name={ARTICLE} component={SingleArticleScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
