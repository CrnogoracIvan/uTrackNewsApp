import { Pressable, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import React from 'react';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import styles from 'react-native-webview/lib/WebView.styles';
import { Icon } from 'react-native-paper/src';

export const NewsSearch = () => {
  const theme = useTheme();
  const { searchTerm, setSearchTerm, handleClearSearch } = useNewsContext();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        gap: 6,
        marginVertical: 2,
        zIndex: 2,
      }}
    >
      <TextInput
        label="Search by content"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        mode="outlined"
        style={{ width: '90%', fontSize: 12 }}
      />

      <Pressable onPress={handleClearSearch}>
        <Icon source="close" size={36} color={theme.colors.primary} />
      </Pressable>
    </View>
  );
};
