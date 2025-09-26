import React, { useRef } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInput, useTheme, Button } from 'react-native-paper';
import { createStyles } from './LoginScreen.styles.ts';
import { TRootStackParamList } from '../../../../types';
import { useAuthContext } from '../../context/AuthContextProvider.tsx';

type TNavigationProps = NativeStackNavigationProp<TRootStackParamList, 'News'>;

export const LoginScreen = () => {
  const Navigation = useNavigation<TNavigationProps>();
  const theme = useTheme();
  const styles = createStyles(theme);
  const { loginUserSuccessufully } = useAuthContext();

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const passwordlRef = useRef<any>(null);

  const isGoToNewsButtonDisable = !userName || !password;

  const handleLogin = async () => {
    const loginSuccessful: boolean = await loginUserSuccessufully({
      email: userName,
      password: password,
    });

    if (!loginSuccessful) {
      setIsErrorVisible(true);
      return;
    }
    Navigation.navigate('News');
  };

  const handleRegisterHere = () => {
    Navigation.navigate('Register');
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/images/logo.png')}
        />

        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={userName}
            onChangeText={text => setUserName(text)}
            onChange={() => setIsErrorVisible(false)}
            mode="outlined"
            autoCapitalize="none"
            outlineColor={theme.colors.secondary}
            activeOutlineColor={theme.colors.primary}
            error={isErrorVisible}
            onSubmitEditing={() => passwordlRef.current?.focus()}
          />
          <TextInput
            ref={passwordlRef}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            onChange={() => setIsErrorVisible(false)}
            mode="outlined"
            autoCapitalize="none"
            error={isErrorVisible}
            secureTextEntry={!isPasswordVisible}
            onSubmitEditing={() => !isGoToNewsButtonDisable && handleLogin()}
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? 'eye' : 'eye-off'}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
          />
          <Text style={styles.errorMessageText}>
            {isErrorVisible ? 'Incorrect email or password' : ''}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode={'contained'}
            textColor={'white'}
            onPress={handleLogin}
            disabled={isGoToNewsButtonDisable}
          >
            GO TO NEWS
          </Button>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
          gap: 12,
        }}
      >
        <Text>Don't have an account?</Text>
        <Button onPress={handleRegisterHere}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Register here
          </Text>
        </Button>
      </View>
    </View>
  );
};
