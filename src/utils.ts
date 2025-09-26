import { PermissionsAndroid, Platform } from 'react-native';
import { STORAGE_KEYS } from './constants.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { INewsArticle } from './types.ts';

export const getFormattedDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const isEmailValidRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export const filterMyArticles = (articles: INewsArticle[]) => {
  const myArticleData = articles.filter(item => item.categories.includes('my'));
  return myArticleData;
};

// For testing purposes only
export const getAllDataFromStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    const data = result.reduce((acc, [key, value]) => {
      acc[key] = value != null ? JSON.parse(value) : null;
      return acc;
    }, {} as Record<string, any>);

    console.log(data);
    return data;
  } catch (e) {
    console.error('Error reading storage', e);
    return {};
  }
};

export const setArticlesToStorage = (articles: INewsArticle[]) => {
  const { ARTICLES } = STORAGE_KEYS;
  const stringifiedArticles = JSON.stringify(articles);
  AsyncStorage.setItem(ARTICLES, stringifiedArticles);
};

export const getArticlesFromStorage = async () => {
  const { ARTICLES } = STORAGE_KEYS;
  try {
    const stringifiedArticles = await AsyncStorage.getItem(ARTICLES);
    if (!stringifiedArticles) {
      return [];
    }
    const parsed = JSON.parse(stringifiedArticles);
    return parsed;
  } catch (e) {
    console.warn('error getArticlesFromStorage', e);
  }
};

export const getActiveUserFromStorage = async () => {
  const { ACTIVE_USER } = STORAGE_KEYS;
  const stringifiedUser = await AsyncStorage.getItem(ACTIVE_USER);
  if (!stringifiedUser) {
    return false;
  }
  return JSON.parse(stringifiedUser);
};
