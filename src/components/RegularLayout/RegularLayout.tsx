import {  View } from 'react-native';


interface IProps {
  children: React.ReactNode;
}

export const RegularLayout = ({children}: IProps) => {
  return (
    <View style={{flex: 1, borderWidth: 1, borderColor: 'red', justifyContent: 'center'}}>
      {children}
    </View>
  )
}