import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { LoginScreen } from './features/auth/screens/LoginScreen/LoginScreen.tsx';
import { NewsScreen } from './features/news/screens/NewsScreen/NewsScreen.tsx';
import { Image, Pressable } from 'react-native';
import { SingleArticleScreen } from './features/news/screens/SingleArticleScreen/SingleArticleScreen.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TRootStackParamList } from './types.ts';
import { AddArticleScreen } from './features/news/screens/AddArticleScreen/AddArticleScreen.tsx';
import { RegisterScreen } from './features/auth/screens/RegisterScreen/RegisterScreen.tsx';
import { Icon } from 'react-native-paper/src';
import { useTheme } from 'react-native-paper';
import { ProfileScreen } from './features/profile/screens/ProfileScreen/ProfileScreen.tsx';
import { getActiveUserFromStorage } from './utils.ts';
import { LoadingComponent } from './components/LoadingComponent/LoadingComponent.tsx';
import { useNewsContext } from './features/news/context/NewsContextProvider.tsx';

export const AppNavigator = () => {
  const theme = useTheme();
  const Stack = createNativeStackNavigator<TRootStackParamList>();
  const { handleSearchToggle } = useNewsContext();

  const [initialRoute, setInitialRoute] = useState<keyof TRootStackParamList>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userIsLoggedIn = await getActiveUserFromStorage();
      setInitialRoute(userIsLoggedIn ? 'News' : 'Auth');
    };

    checkLoginStatus();
  }, []);

  if (!initialRoute) {
    return <LoadingComponent />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name={'Auth'}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Register'}
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'Profile'} component={ProfileScreen} />
        <Stack.Screen
          name={'News'}
          component={NewsScreen}
          options={({ navigation }) => ({
            headerBackVisible: false,
            gestureEnabled: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Pressable onPress={handleSearchToggle}>
                <Icon source="magnify" size={30} color={theme.colors.primary} />
              </Pressable>
            ),
            headerTitle: () => (
              <Image
                source={require('./assets/images/logo.png')}
                style={{ width: 120, height: 30, resizeMode: 'contain' }}
              />
            ),
            title: '',
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Profile')}>
                <Icon
                  source="account-outline"
                  size={36}
                  color={theme.colors.primary}
                />
              </Pressable>
            ),
          })}
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
