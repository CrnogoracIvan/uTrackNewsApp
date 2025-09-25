import { PermissionsAndroid, Platform } from 'react-native';
import { STORAGE_KEYS } from './constants.ts';
import asyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage.ts';
import { INewsArticle } from './types.ts';

export const getFormattedDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export const setArticlesToStorage = (articles: INewsArticle[]) => {
  const { ARTICLES } = STORAGE_KEYS;
  const stringifiedArticles = JSON.stringify(articles);
  asyncStorage.setItem(ARTICLES, stringifiedArticles);
};

export const getArticlesFromStorage = async () => {
  const { ARTICLES } = STORAGE_KEYS;
  try {
    const stringifiedArticles = await asyncStorage?.getItem(ARTICLES);
    console.log(stringifiedArticles);
    if (!stringifiedArticles) {
      return [];
    }
    const parsed = JSON.parse(stringifiedArticles);
    return parsed;
  } catch (e) {
    console.log('error getArticlesFromStorage', e);
  }
};
