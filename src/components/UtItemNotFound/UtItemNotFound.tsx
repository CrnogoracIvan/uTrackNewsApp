import { Text, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';
import { createStyles } from './UtItemNotFound.styles.ts';

interface IProps {
  iconName: string;
  text: string;
}

export const UtItemNotFound = ({ iconName, text }: IProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Icon size={64} source={iconName} color={theme.colors.onSurface} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
