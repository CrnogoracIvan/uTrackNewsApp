import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import navigation from '../../constants/navigation';
import { TextInput } from 'react-native-paper';
import { RegularLayout } from '../../components/RegularLayout/RegularLayout.tsx';


export const AuthScreen = () => {
  const Navigation = useNavigation();

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <RegularLayout>
      <View >
        <TextInput
          label="Email"
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button title={'Go to NEws'} onPress={()=> Navigation.navigate(navigation.NEWS) } />
      </View>
    </RegularLayout>
    )
}