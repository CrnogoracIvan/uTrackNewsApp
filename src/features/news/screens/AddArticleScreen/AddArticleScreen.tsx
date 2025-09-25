import { Text, View } from 'react-native';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { Button, TextInput } from 'react-native-paper';
import React from 'react';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';

export const AddArticleScreen = () => {
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
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

  const handleSaveArticle = () => {
    console.log('Saving article...');
  };

  const handleCancel = () => {
    setIsErrorVisible(false);
    setNewArticleTitle('');
    setNewArticleDescription('');
    setNewArticleImage('');
    setNewArticleSource('');
    setNewArticleCategories('');
  };

  return (
    <RegularLayout>
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
      <TextInput
        label="Categories"
        value={newArticleCategories}
        onChangeText={text => setNewArticleCategories(text)}
        onChange={() => setIsErrorVisible(false)}
        mode="outlined"
        error={isErrorVisible}
      />
      <Button
        mode={'contained'}
        textColor={'white'}
        onPress={handleSaveArticle}
      >
        SAVE ARTICLE
      </Button>
      <Button mode={'contained'} textColor={'white'} onPress={handleCancel}>
        CANCEL
      </Button>
    </RegularLayout>
  );
};
