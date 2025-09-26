import { Text, View } from 'react-native';
import React from 'react';
import { TRootStackParamList } from '../../../../types.ts';
import { UtRegularLayout } from '../../../../components/UtRegularLayout/UtRegularLayout.tsx';
import { Button, Switch, useTheme } from 'react-native-paper';
import { UtLoadingComponent } from '../../../../components/UtLoadingComponent/UtLoadingComponent.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthContext } from '../../../auth/context/AuthContextProvider.tsx';
import { createStyles } from './ProfileScreen.styles.ts';
import { DeleteAccount } from '../../components/DeleteAccount/DeleteAccount.tsx';
import { useThemeContext } from '../../../../theme/ThemeContextProvider.tsx';

type TNavigationProps = NativeStackNavigationProp<TRootStackParamList, 'Auth'>;

export const ProfileScreen = () => {
  const Navigation = useNavigation<TNavigationProps>();
  const theme = useTheme();
  const styles = createStyles(theme);

  const { themeType, toggleTheme } = useThemeContext();
  console.log('themeType: ', themeType);
  console.log('theme: ', theme);
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
      <DeleteAccount onConfirm={handleLogoutAndDelete} />
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

  const renderSwitch = () => (
    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
      <Text style={styles.labelText}>Dark theme</Text>
      <Switch value={themeType === 'dark'} onValueChange={toggleTheme} />
    </View>
  );

  return (
    <UtRegularLayout>
      {activeUser ? (
        <View style={styles.container}>
          <View>
            {activeUser.name && renderRow('Name', activeUser.name)}
            {activeUser.email && renderRow('Email', activeUser.email)}
          </View>
          {renderSwitch()}
          {renderButtons()}
        </View>
      ) : (
        <UtLoadingComponent />
      )}
    </UtRegularLayout>
  );
};
