import { View } from 'react-native';
import { createStyles } from './RegularLayout.styles.ts';

interface IProps {
  children: React.ReactNode;
}

export const RegularLayout = ({ children }: IProps) => {
  const styles = createStyles();

  return <View style={styles.mainContainer}>{children}</View>;
};
