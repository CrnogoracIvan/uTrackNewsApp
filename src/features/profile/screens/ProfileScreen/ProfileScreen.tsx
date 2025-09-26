import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IUser, TRootStackParamList } from '../../../../types.ts';
import { getAllDataFromStorage } from '../../../../utils.ts';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { Button, useTheme } from 'react-native-paper';
import { LoadingComponent } from '../../../../components/LoadingComponent/LoadingComponent.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthContext } from '../../../auth/context/AuthContextProvider.tsx';

type TNavigationProps = NativeStackNavigationProp<TRootStackParamList, 'Auth'>;

export const ProfileScreen = () => {
  const Navigation = useNavigation<TNavigationProps>();
  const theme = useTheme();

  const {
    logoutAndDeleteRemoveUserFromUsersInStorage,
    logoutRemoveUserFromStorage,
    loginUserGetFromStorage,
  } = useAuthContext();

  const [userData, setUserData] = useState<IUser>();

  const handleLogout = async () => {
    await logoutRemoveUserFromStorage();
    Navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleLogoutAndDelete = async () => {
    await logoutAndDeleteRemoveUserFromUsersInStorage();
    Navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  useEffect(() => {
    const getUserData = async () => {
      getAllDataFromStorage();
      const loginData = await loginUserGetFromStorage();
      console.log('data: ', loginData);
      if (loginData) {
        setUserData(loginData);
      }
    };
    getUserData();
  }, []);

  const renderButtons = () => (
    <View style={{ gap: 12, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        mode={'outlined'}
        textColor={theme.colors.primary}
        onPress={handleLogoutAndDelete}
        style={{ width: 300 }}
      >
        LOGOUT AND DELETE ACCOUNT
      </Button>
      <Button
        mode={'contained'}
        textColor={'white'}
        onPress={handleLogout}
        style={{ width: 300 }}
      >
        LOG OUT
      </Button>
    </View>
  );

  const renderRow = (label: string, info: string) => (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 8,
        alignItems: 'flex-end',
      }}
    >
      <Text style={{ minWidth: 60, fontSize: 16, fontStyle: 'italic' }}>
        {label}:
      </Text>
      <Text
        style={{
          minWidth: 80,
          fontSize: 20,
          color: theme.colors.primary,
          fontWeight: 'bold',
        }}
      >
        {info}
      </Text>
    </View>
  );

  return (
    <RegularLayout>
      {userData ? (
        <View style={{ gap: 60 }}>
          <View>
            {renderRow('Name', userData.name)}
            {renderRow('Email', userData.email)}
          </View>
          {renderButtons()}
        </View>
      ) : (
        <LoadingComponent />
      )}
    </RegularLayout>
  );
};
