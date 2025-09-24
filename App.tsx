import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import { AuthScreen } from './src/screens/AuthScreen/AuthScreen';
import { NewsScreen } from './src/screens/NewsScreen/NewsScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="News" component={NewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
