import { Pressable, Text, View } from 'react-native';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { Button, TextInput, useTheme } from 'react-native-paper';
import React from 'react';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { Dropdown } from '../../../../components/Dropdown/Dropdown.tsx';
import { NEWS_CATEGORIES } from '../../../../constants/tabs.ts';
import { Icon } from 'react-native-paper/src';
import { launchImageLibrary } from 'react-native-image-picker';

export const AddArticleScreen = () => {
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const theme = useTheme();
  const {
    newArticleTitle,
    setNewArticleTitle,
    newArticleDescription,
    setNewArticleDescription,
    newArticleImage,
    setNewArticleImage,
    newArticleSource,
    setNewArticleSource,
    newArticleCategories,
    setNewArticleCategories,
  } = useNewsContext();

  const dropDownData = NEWS_CATEGORIES.filter(
    category => category.value !== 'all',
  );

  const handleSaveArticle = () => {
    console.log('Saving article...');
  };

  const handleCancel = () => {
    setIsErrorVisible(false);
    setNewArticleTitle('');
    setNewArticleDescription('');
    setNewArticleImage('');
    setNewArticleSource('');
    setNewArticleCategories([]);
  };

  // Handler for category selection
  const handleCategorySelect = (selectedCategories: string[]) => {
    setNewArticleCategories(selectedCategories);
    setIsErrorVisible(false);
  };

  return (
    <RegularLayout>
      <View style={{ gap: 8 }}>
        <TextInput
          label="Title"
          value={newArticleTitle}
          onChangeText={text => setNewArticleTitle(text)}
          onChange={() => setIsErrorVisible(false)}
          mode="outlined"
          error={isErrorVisible}
        />
        <TextInput
          label="Description"
          value={newArticleDescription}
          onChangeText={text => setNewArticleDescription(text)}
          onChange={() => setIsErrorVisible(false)}
          mode="outlined"
          multiline={true}
          error={isErrorVisible}
        />
        <TextInput
          label="Source"
          value={newArticleSource}
          onChangeText={text => setNewArticleSource(text)}
          onChange={() => setIsErrorVisible(false)}
          mode="outlined"
          error={isErrorVisible}
        />

        <Dropdown
          label="Categories"
          placeholder="Select Categories"
          options={dropDownData}
          value={newArticleCategories}
          onSelect={handleCategorySelect}
          error={isErrorVisible}
        />

        <Pressable
          style={{
            alignItems: 'center',
            width: '100%',
            borderWidth: 1,
            borderColor: theme.colors.outline,
            borderRadius: theme.roundness,
            padding: 10,
            backgroundColor: theme.colors.background,
            marginTop: 8,
          }}
          onPress={() => {
            const result = launchImageLibrary({ mediaType: 'photo' });
            console.log(result);
          }}
        >
          <Icon
            size={64}
            source={'image-outline'}
            color={theme.colors.outline}
          />
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            Upload Article cover image
          </Text>
        </Pressable>
      </View>

      <Button
        mode={'contained'}
        textColor={'white'}
        onPress={handleSaveArticle}
        style={{ marginTop: 16 }}
      >
        SAVE ARTICLE
      </Button>
      <Button
        mode={'contained'}
        textColor={'white'}
        onPress={handleCancel}
        style={{ marginTop: 8 }}
      >
        CANCEL
      </Button>
    </RegularLayout>
  );
};
