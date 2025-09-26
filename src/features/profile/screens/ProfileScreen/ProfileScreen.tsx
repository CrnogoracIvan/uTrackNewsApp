import { Text, View } from 'react-native';
import React from 'react';
import { TRootStackParamList } from '../../../../types.ts';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { Button, useTheme } from 'react-native-paper';
import { LoadingComponent } from '../../../../components/LoadingComponent/LoadingComponent.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthContext } from '../../../auth/context/AuthContextProvider.tsx';
import { createStyles } from './ProfileScreen.styles.ts';

type TNavigationProps = NativeStackNavigationProp<TRootStackParamList, 'Auth'>;

export const ProfileScreen = () => {
  const Navigation = useNavigation<TNavigationProps>();
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
    logoutAndDeleteRemoveUserFromUsersInStorage,
    logoutRemoveUserFromStorage,
    activeUser,
  } = useAuthContext();

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

  const renderButtons = () => (
    <View style={styles.buttonContainer}>
      <Button
        mode={'outlined'}
        textColor={theme.colors.primary}
        onPress={handleLogoutAndDelete}
        style={styles.button}
      >
        LOGOUT AND DELETE ACCOUNT
      </Button>
      <Button
        mode={'contained'}
        textColor={'white'}
        onPress={handleLogout}
        style={styles.button}
      >
        LOG OUT
      </Button>
    </View>
  );

  const renderRow = (label: string, info: string) => (
    <View style={styles.row}>
      <Text style={styles.labelText}>{label}:</Text>
      <Text style={styles.infoText}>{info}</Text>
    </View>
  );

  return (
    <RegularLayout>
      {activeUser ? (
        <View style={styles.container}>
          <View>
            {activeUser.name && renderRow('Name', activeUser.name)}
            {activeUser.email && renderRow('Email', activeUser.email)}
          </View>
          {renderButtons()}
        </View>
      ) : (
        <LoadingComponent />
      )}
    </RegularLayout>
  );
};
