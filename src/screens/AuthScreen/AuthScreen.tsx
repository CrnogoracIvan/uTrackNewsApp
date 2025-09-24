import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import navigation from '../../constants/navigation';
import { TextInput, useTheme } from 'react-native-paper';
import { RegularLayout } from '../../components/RegularLayout/RegularLayout.tsx';
import { createStyles } from './AuthScreen.styles.ts';
import { mockData } from '../../mockData.ts';

export const AuthScreen = () => {
  const Navigation = useNavigation();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const handleLogin = () => {
    if (userName !== mockData.USER_NAME || password !== mockData.PASSWORD) {
      setIsErrorVisible(true);
      return;
    }
    Navigation.navigate(navigation.NEWS);
  };

  const renderLogo = () => (
    <Image
      style={styles.logo}
      source={require('../../assets/images/logo.png')}
    />
  );

  const renderInputFields = () => {
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={userName}
            onChangeText={text => setUserName(text)}
            mode="outlined"
            outlineColor={theme.colors.secondary}
            activeOutlineColor={theme.colors.primary}
            error={isErrorVisible}
            onChange={() => setIsErrorVisible(false)}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            mode="outlined"
            error={isErrorVisible}
            onChange={() => setIsErrorVisible(false)}
            secureTextEntry={!isPasswordVisible}
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? 'eye' : 'eye-off'}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
          />
        </View>
        {renderErrorMessage()}
      </View>
    );
  };

  const renderButton = () => (
    <View style={styles.buttonContainer}>
      <Button title={'go to news'} onPress={handleLogin} />
    </View>
  );

  const renderErrorMessage = () => (
    <Text style={styles.errorMessageText}>
      {isErrorVisible && 'Incorrect email or password'}
    </Text>
  );

  return (
    <RegularLayout>
      <View style={styles.mainContainer}>
        {renderLogo()}
        {renderInputFields()}
        {renderButton()}
      </View>
    </RegularLayout>
  );
};
