import { View } from 'react-native';
import { createStyles } from './UtRegularLayout.styles.ts';

interface IProps {
  children: React.ReactNode;
}

export const UtRegularLayout = ({ children }: IProps) => {
  const styles = createStyles();

  return <View style={styles.mainContainer}>{children}</View>;
};
