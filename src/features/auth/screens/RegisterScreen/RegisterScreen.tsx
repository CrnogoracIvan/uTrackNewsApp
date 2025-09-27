import { Image, Text, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import React, { useRef } from 'react';
import { createStyles } from './RegisterScreen.styles.ts';
import { UtRegularLayout } from '../../../../components/UtRegularLayout/UtRegularLayout.tsx';
import { isEmailValidRegex } from '../../../../utils.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../../types.ts';
import { useAuthContext } from '../../context/AuthContextProvider.tsx';
import { useThemeContext } from '../../../../theme/ThemeContextProvider.tsx';

const LIGHT_LOGO = require('../../../../assets/images/logo.png');
const DARK_LOGO = require('../../../../assets/images/logo-dark.png');

type TNavigationProps = NativeStackNavigationProp<TRootStackParamList, 'News'>;

export const RegisterScreen = () => {
  const Navigation = useNavigation<TNavigationProps>();
  const theme = useTheme();
  const styles = createStyles(theme);
  const { registerUserToStorage } = useAuthContext();
  const { themeType } = useThemeContext();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const [isEmailErrorVisible, setIsEmailErrorVisible] = React.useState(false);
  const [isPasswordErrorVisible, setIsPasswordErrorVisible] =
    React.useState(false);

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  const isRegisterButtonDisabled =
    !name || !email || !password || !confirmPassword;

  const handleGoBack = () => {
    Navigation.goBack();
  };

  const handleRegister = () => {
    if (!isEmailValidRegex.test(email)) {
      setIsEmailErrorVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setIsPasswordErrorVisible(true);
      return;
    }
    registerUserToStorage({
      name,
      email,
      password,
    });
    Navigation.navigate('News');
  };

  const renderErrorMessage = (errorText: string, errorVisible: boolean) => (
    <Text style={styles.errorMessageText}>{errorVisible ? errorText : ''}</Text>
  );

  const renderInputFields = () => (
    <View style={styles.inputContainer}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        mode="outlined"
        autoCapitalize="none"
        outlineColor={theme.colors.secondary}
        activeOutlineColor={theme.colors.primary}
        style={[styles.input, { marginTop: 0 }]}
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          onChange={() => setIsEmailErrorVisible(false)}
          mode="outlined"
          autoCapitalize="none"
          outlineColor={theme.colors.secondary}
          activeOutlineColor={theme.colors.primary}
          error={isEmailErrorVisible}
          style={styles.input}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        {renderErrorMessage(
          'Email format is not correct.',
          isEmailErrorVisible,
        )}
      </View>
      <View>
        <TextInput
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          onChange={() => setIsPasswordErrorVisible(false)}
          mode="outlined"
          autoCapitalize="none"
          error={isPasswordErrorVisible}
          secureTextEntry={!isPasswordVisible}
          style={[styles.input, { marginTop: 0 }]}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
        />
        <TextInput
          ref={confirmPasswordRef}
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          onChange={() => setIsPasswordErrorVisible(false)}
          mode="outlined"
          autoCapitalize="none"
          error={isPasswordErrorVisible}
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
          onSubmitEditing={() => !isRegisterButtonDisabled && handleRegister()}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
        />
        {renderErrorMessage('Passwords do not match.', isPasswordErrorVisible)}
      </View>
    </View>
  );

  const renderRegisterButton = () => (
    <View style={styles.buttonContainer}>
      <Button
        mode={'contained'}
        textColor={'white'}
        onPress={handleRegister}
        disabled={isRegisterButtonDisabled}
      >
        REGISTER
      </Button>
    </View>
  );

  const renderGoBack = () => (
    <View style={styles.loginHintContainer}>
      <Text style={styles.loginHintText}>Have an account?</Text>
      <Button onPress={handleGoBack}>
        <Text style={styles.loginHintButtonText}>Login</Text>
      </Button>
    </View>
  );

  return (
    <UtRegularLayout>
      <View style={styles.screenContainer}>
        <Image
          style={styles.logo}
          source={themeType === 'dark' ? DARK_LOGO : LIGHT_LOGO}
        />
        {renderInputFields()}
        {renderRegisterButton()}
      </View>
      {renderGoBack()}
    </UtRegularLayout>
  );
};
