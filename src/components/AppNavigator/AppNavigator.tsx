import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LoginScreen } from '../../features/auth/screens/LoginScreen/LoginScreen.tsx';
import { NewsScreen } from '../../features/news/screens/NewsScreen/NewsScreen.tsx';
import { Image } from 'react-native';
import { SingleArticleScreen } from '../../features/news/screens/SingleArticleScreen/SingleArticleScreen.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../types.ts';
import { AddArticleScreen } from '../../features/news/screens/AddArticleScreen/AddArticleScreen.tsx';
import { RegisterScreen } from '../../features/auth/screens/RegisterScreen/RegisterScreen.tsx';

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator<TRootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Auth'}>
        <Stack.Screen
          name={'Auth'}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Register'}
          component={RegisterScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={'News'}
          component={NewsScreen}
          options={{
            headerBackVisible: true,
            gestureEnabled: false,
            headerTitleAlign: 'center',
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
          name={'Article'}
          component={SingleArticleScreen}
          options={{
            headerTitle: 'Article Details',
          }}
        />
        <Stack.Screen
          name={'NewArticle'}
          component={AddArticleScreen}
          options={{
            headerTitle: 'New Article',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
