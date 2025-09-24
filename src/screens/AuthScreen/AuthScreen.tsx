import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import navigation from '../../constants/navigation';
import { TextInput } from 'react-native-paper';
import { RegularLayout } from '../../components/RegularLayout/RegularLayout.tsx';
import AuthScreenStyles from './AuthScreen.styles.ts';


export const AuthScreen = () => {
  const Navigation = useNavigation();
  const styles = AuthScreenStyles

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <RegularLayout>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={userName}
          onChangeText={text => setUserName(text)}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
        />
        <Button title={'Go to NEws'} onPress={()=> Navigation.navigate(navigation.NEWS) } />
      </View>
    </RegularLayout>
    )
}