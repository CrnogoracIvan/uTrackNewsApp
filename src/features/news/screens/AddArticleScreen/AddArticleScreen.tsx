import { Image, Platform, Pressable, Text, View } from 'react-native';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { Button, TextInput, useTheme } from 'react-native-paper';
import React from 'react';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { Dropdown } from '../../../../components/Dropdown/Dropdown.tsx';
import { NEWS_CATEGORIES } from '../../../../constants/tabs.ts';
import { Icon } from 'react-native-paper/src';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { requestPermissions } from '../../../../utils.ts';

export const AddArticleScreen = () => {
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const theme = useTheme();
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
  } = useNewsContext();

  const dropDownData = NEWS_CATEGORIES.filter(
    category => category.value !== 'all',
  );

  const handleSaveArticle = () => {
    console.log('Saving article...');
    handleAddArticle();
    // handleCancel();
  };

  const handleCancel = () => {
    setIsErrorVisible(false);
    setNewArticleTitle('');
    setNewArticleDescription('');
    setNewArticleImage('');
    setNewArticleSource('');
    setNewArticleCategories([]);
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
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
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
        style={{ width: '100%', height: 200 }}
      />
    );
  };

  return (
    <RegularLayout>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBottom: 40,
        }}
      >
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
              height: 200,
              borderWidth: 1,
              borderColor: theme.colors.outline,
              borderRadius: theme.roundness,
              backgroundColor: theme.colors.background,
              marginTop: 8,
              overflow: 'hidden',
            }}
            onPress={handleImagePickerPress}
          >
            {renderImagePreview()}
          </Pressable>
        </View>

        <View>
          <Button
            mode={'contained'}
            textColor={'white'}
            onPress={handleSaveArticle}
            style={{ marginTop: 16 }}
          >
            SAVE ARTICLE
          </Button>
          <Button
            mode={'outlined'}
            onPress={handleCancel}
            style={{ marginTop: 8 }}
          >
            CANCEL
          </Button>
        </View>
      </View>
    </RegularLayout>
  );
};
