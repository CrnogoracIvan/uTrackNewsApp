import { Image, Text, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import React from 'react';
import { createStyles } from './RegisterScreen.styles.ts';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { isEmailValidRegex, setUserToStorage } from '../../../../utils.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../../types.ts';

type TNavigationProps = NativeStackNavigationProp<TRootStackParamList, 'News'>;

export const RegisterScreen = () => {
  const Navigation = useNavigation<TNavigationProps>();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const [isEmailErrorVisible, setIsEmailErrorVisible] = React.useState(false);
  const [isPasswordErrorVisible, setIsPasswordErrorVisible] =
    React.useState(false);

  const isRegisterButtonDisabled =
    !name || !email || !password || !confirmPassword;

  const handleRegister = () => {
    if (!isEmailValidRegex.test(email)) {
      setIsEmailErrorVisible(true);
    }
    if (password !== confirmPassword) {
      setIsPasswordErrorVisible(true);
      return;
    }
    setUserToStorage({
      name,
      email,
      password,
    });
    Navigation.navigate('News');
    console.log('register');
  };

  const renderErrorMessage = (errorText: string, errorVisible: boolean) => (
    <Text style={styles.errorMessageText}>{errorVisible ? errorText : ''}</Text>
  );

  return (
    <RegularLayout>
      <View style={styles.screenContainer}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/images/logo.png')}
        />
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
            // onChange={() => setIsErrorVisible(false)}
            mode="outlined"
            autoCapitalize="none"
            outlineColor={theme.colors.secondary}
            activeOutlineColor={theme.colors.primary}
            style={[styles.input, { marginTop: 0 }]}
          />
          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              // onChange={() => setIsErrorVisible(false)}
              mode="outlined"
              autoCapitalize="none"
              outlineColor={theme.colors.secondary}
              activeOutlineColor={theme.colors.primary}
              error={isEmailErrorVisible}
              style={styles.input}
            />
            {renderErrorMessage(
              'Email format is not correct.',
              isEmailErrorVisible,
            )}
          </View>
          <View>
            <TextInput
              label="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              // onChange={() => setIsErrorVisible(false)}
              mode="outlined"
              autoCapitalize="none"
              error={isPasswordErrorVisible}
              secureTextEntry={!isPasswordVisible}
              style={[styles.input, { marginTop: 0 }]}
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
            />
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              // onChange={() => setIsErrorVisible(false)}
              mode="outlined"
              autoCapitalize="none"
              error={isPasswordErrorVisible}
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
            />
            {renderErrorMessage(
              'Passwords do not match.',
              isPasswordErrorVisible,
            )}
          </View>
        </View>
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
      </View>
    </RegularLayout>
  );
};
