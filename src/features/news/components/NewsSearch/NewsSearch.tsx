import { Pressable, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import React from 'react';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { Icon } from 'react-native-paper/src';
import { createStyles } from './NewsSearch.styles.ts';

export const NewsSearch = () => {
  const theme = useTheme();
  const styles = createStyles();
  const { searchTerm, setSearchTerm, handleClearSearch } = useNewsContext();
  return (
    <View style={styles.container}>
      <TextInput
        label="Search by content..."
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        mode="outlined"
        style={styles.input}
      />

      <Pressable onPress={handleClearSearch}>
        <Icon source="close" size={36} color={theme.colors.primary} />
      </Pressable>
    </View>
  );
};
