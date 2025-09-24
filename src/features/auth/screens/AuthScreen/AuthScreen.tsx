import React from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInput, useTheme, Button } from 'react-native-paper';
import { createStyles } from './AuthScreen.styles';
import { MOCK_CREDENTIALS } from '../../../../mockData';
import { TRootStackParamList } from '../../../../types';

type TNewsScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'News'
>;

export const AuthScreen = () => {
  const Navigation = useNavigation<TNewsScreenNavigationProp>();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const handleLogin = () => {
    if (
      userName !== MOCK_CREDENTIALS.USER_NAME ||
      password !== MOCK_CREDENTIALS.PASSWORD
    ) {
      setIsErrorVisible(true);
      return;
    }
    Navigation.navigate('News'); // now typed correctly
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
            mode="outlined"
            autoCapitalize="none"
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
            autoCapitalize="none"
            error={isErrorVisible}
            secureTextEntry={!isPasswordVisible}
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? 'eye' : 'eye-off'}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
          />
        </View>

        {isErrorVisible && (
          <Text style={styles.errorMessageText}>
            {isErrorVisible && 'Incorrect email or password'}
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <Button mode={'contained'} textColor={'white'} onPress={handleLogin}>
            GO TO NEWS
          </Button>
        </View>
      </View>
    </View>
  );
};
