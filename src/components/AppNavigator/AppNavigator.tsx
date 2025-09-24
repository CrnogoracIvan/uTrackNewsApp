import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthScreen } from '../../features/auth/screens/AuthScreen/AuthScreen.tsx';
import { NewsScreen } from '../../features/news/screens/NewsScreen/NewsScreen.tsx';
import { Image } from 'react-native';
import { SingleArticleScreen } from '../../features/news/screens/SingleArticleScreen/SingleArticleScreen.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../types.ts';
import routes from '../../constants/routes.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator<TRootStackParamList>();
  const { AUTH, NEWS, ARTICLE } = routes;
  const insets = useSafeAreaInsets();
  console.log('insets', insets);
  return (
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
            headerTitleAlign: 'center', // centers the image
            headerTitle: () => (
              <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 120, height: 30, resizeMode: 'contain' }}
              />
            ),
            title: '',
          }}
        />
        <Stack.Screen
          name={ARTICLE}
          component={SingleArticleScreen}
          options={{
            headerTitle: 'Article Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
