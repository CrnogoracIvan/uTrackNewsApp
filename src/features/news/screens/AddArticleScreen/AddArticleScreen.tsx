import { Image, Text, TouchableOpacity, View } from 'react-native';
import { UtRegularLayout } from '../../../../components/UtRegularLayout/UtRegularLayout.tsx';
import { Button, TextInput, useTheme } from 'react-native-paper';
import React from 'react';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { UtDropdown } from '../../../../components/UtDropdown/UtDropdown.tsx';
import { NEWS_CATEGORIES } from '../../../../constants.ts';
import { Icon } from 'react-native-paper/src';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { requestPermissions } from '../../../../utils.ts';
import { Toast } from 'toastify-react-native';
import { createStyles } from './AddArticleScreen.styles.ts';

export const AddArticleScreen = () => {
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const theme = useTheme();
  const styles = createStyles(theme);
  const Navigation = useNavigation();
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
    handleAddArticle,
    handleClearNewArticleForm,
    isAddNewArticleButtonDisabled,
  } = useNewsContext();

  const dropDownData = NEWS_CATEGORIES.filter(
    category => !['all', 'my'].includes(category.value),
  );

  const handleSaveArticle = () => {
    handleAddArticle();
    Toast.success('Article has been added successfully.');
    Navigation.goBack();
  };

  const handleCancel = () => {
    handleClearNewArticleForm();
    setIsErrorVisible(false);
    Navigation.goBack();
  };

  const handleImagePickerPress = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        return;
      }
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.didCancel) {
        return;
      }
      if (!result.assets || result.assets.length === 0) {
        return;
      }
      setNewArticleImage(result.assets[0]);
    } catch (e) {}
  };

  const handleCategorySelect = (selectedCategories: string[]) => {
    setNewArticleCategories(selectedCategories);
    setIsErrorVisible(false);
  };

  const renderImagePreview = () => {
    if (!newArticleImage) {
      return (
        <View style={styles.imageContainer}>
          <Icon
            size={64}
            source={'image-outline'}
            color={theme.colors.outline}
          />
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            Upload Article cover image
          </Text>
        </View>
      );
    }
    return (
      <Image
        resizeMode="cover"
        source={{ uri: newArticleImage.uri }}
        style={styles.image}
      />
    );
  };

  return (
    <UtRegularLayout>
      <View style={styles.container}>
        <View style={styles.form}>
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
            autoCapitalize="none"
          />

          <UtDropdown
            label="Categories"
            placeholder="Select Categories"
            options={dropDownData}
            value={newArticleCategories}
            onSelect={handleCategorySelect}
            error={isErrorVisible}
          />

          <TouchableOpacity
            style={styles.chooseImage}
            onPress={handleImagePickerPress}
          >
            {renderImagePreview()}
          </TouchableOpacity>
        </View>

        <View>
          <Button
            mode={'contained'}
            textColor={'white'}
            onPress={handleSaveArticle}
            style={styles.saveButton}
            disabled={isAddNewArticleButtonDisabled}
          >
            SAVE ARTICLE
          </Button>
          <Button
            mode={'outlined'}
            onPress={handleCancel}
            style={styles.cancelButton}
          >
            CANCEL
          </Button>
        </View>
      </View>
    </UtRegularLayout>
  );
};
