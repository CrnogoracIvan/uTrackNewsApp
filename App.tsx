import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthScreen } from './src/screens/AuthScreen/AuthScreen.tsx';
import { NewsScreen } from './src/screens/NewsScreen/NewsScreen.tsx';


const RootStack = createNativeStackNavigator({
  screens: {
    Auth: AuthScreen ,
    News: NewsScreen
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function App() {
  return <Navigation />;
}