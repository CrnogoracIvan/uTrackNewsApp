import {  View } from 'react-native';


interface IProps {
  children: React.ReactNode;
}

export const RegularLayout = ({children}: IProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      {children}
    </View>
  )
}