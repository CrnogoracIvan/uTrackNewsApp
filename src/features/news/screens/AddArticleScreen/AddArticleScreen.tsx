import { Image, Text, TouchableOpacity, View } from 'react-native';
import { UtRegularLayout } from '../../../../components/UtRegularLayout/UtRegularLayout.tsx';
import { Button, TextInput, useTheme } from 'react-native-paper';
import React, { useEffect } from 'react';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { UtDropdown } from '../../../../components/UtDropdown/UtDropdown.tsx';
import { NEWS_CATEGORIES } from '../../../../constants.ts';
import { Icon } from 'react-native-paper/src';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { requestPermissions } from '../../../../utils.ts';
import { Toast } from 'toastify-react-native';
import { createStyles } from './AddArticleScreen.styles.ts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../../types.ts';

type TProps = NativeStackScreenProps<TRootStackParamList, 'NewArticle'>;

export const AddArticleScreen = (props: TProps) => {
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const theme = useTheme();
  const styles = createStyles(theme);
  const Navigation = useNavigation();
  const {
    articleData,
    setArticleData,
    handleSetNewArticleTitle,
    handleSetNewArticleDescription,
    handleSetNewArticleSource,
    handleSetNewArticleCategories,
    handleSetNewArticleImage,
    handleAddArticle,
    handleEditArticle,
    handleClearNewArticleForm,
    isAddNewArticleButtonDisabled,
  } = useNewsContext();

  const { route } = props;
  const articleForEditing = route?.params?.article;

  const dropDownData = NEWS_CATEGORIES.filter(
    category => !['all', 'my'].includes(category.value),
  );

  const handleSaveArticle = () => {
    if (!articleForEditing) {
      handleAddArticle();
      Toast.success('Article has been added successfully.');
    } else {
      handleEditArticle(articleForEditing);
    }
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
      handleSetNewArticleImage(result.assets[0]);
    } catch (e) {}
  };

  const handleCategorySelect = (selectedCategories: string[]) => {
    handleSetNewArticleCategories(selectedCategories);
    setIsErrorVisible(false);
  };

  useEffect(() => {
    if (!articleForEditing) {
      return;
    }
    if (!articleData.uuid) {
      setArticleData(articleForEditing);
    }
  }, [
    articleForEditing,
    articleData,
    articleData.uuid,
    handleClearNewArticleForm,
    setArticleData,
  ]);

  useEffect(() => {
    Navigation.setOptions({
      title: route.params?.article ? 'Edit Article' : 'New Article',
    });
  }, [Navigation, route.params?.article]);

  const renderImagePreview = () => {
    if (articleData?.image?.uri || articleData?.image_url)
      return (
        <Image
          resizeMode="cover"
          source={{ uri: articleData?.image?.uri || articleData?.image_url }}
          style={styles.image}
        />
      );

    return (
      <View style={styles.imageContainer}>
        <Icon size={64} source={'image-outline'} color={theme.colors.outline} />
        <Text style={{ color: theme.colors.onSurfaceVariant }}>
          Upload Article cover image
        </Text>
      </View>
    );
  };

  return (
    <UtRegularLayout>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            label="Title"
            value={articleData.title}
            onChangeText={text => handleSetNewArticleTitle(text)}
            onChange={() => setIsErrorVisible(false)}
            mode="outlined"
            error={isErrorVisible}
          />
          <TextInput
            label="Description"
            value={articleData.description}
            onChangeText={text => handleSetNewArticleDescription(text)}
            onChange={() => setIsErrorVisible(false)}
            mode="outlined"
            multiline={true}
            error={isErrorVisible}
          />
          <TextInput
            label="Source"
            value={articleData.source}
            onChangeText={text => handleSetNewArticleSource(text)}
            onChange={() => setIsErrorVisible(false)}
            mode="outlined"
            error={isErrorVisible}
            autoCapitalize="none"
          />

          <UtDropdown
            label="Categories"
            placeholder="Select Categories"
            options={dropDownData}
            value={articleData.categories}
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
