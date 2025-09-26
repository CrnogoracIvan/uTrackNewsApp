import { PermissionsAndroid, Platform } from 'react-native';
import { STORAGE_KEYS } from './constants.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { INewsArticle, IUser } from './types.ts';

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
    console.log('error getArticlesFromStorage', e);
  }
};

export const setUserToStorage = (user: IUser) => {
  const { USER } = STORAGE_KEYS;
  const stringifiedUser = JSON.stringify(user);
  AsyncStorage.setItem(USER, stringifiedUser);
};

export const getUserFromStorage = async () => {
  const { USER } = STORAGE_KEYS;
  try {
    const stringifiedUser = await AsyncStorage.getItem(USER);
    if (!stringifiedUser) {
      return [];
    }
    const parsed = JSON.parse(stringifiedUser);
    return parsed;
  } catch (e) {
    console.log('error getUserFromStorage', e);
  }
};
