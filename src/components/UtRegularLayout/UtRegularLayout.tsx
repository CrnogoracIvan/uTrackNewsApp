import { View } from 'react-native';
import { createStyles } from './UtRegularLayout.styles.ts';
import { useTheme } from 'react-native-paper';

interface IProps {
  children: React.ReactNode;
}

export const UtRegularLayout = ({ children }: IProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return <View style={styles.mainContainer}>{children}</View>;
};
