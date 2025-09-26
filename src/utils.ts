import { PermissionsAndroid, Platform } from 'react-native';
import { STORAGE_KEYS } from './constants.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { INewsArticle, IUser } from './types.ts';
import uuid from 'react-native-uuid';

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

export const loginUserSuccessufully = async (user: IUser) => {
  const { ACTIVE_USER, REGISTERED_USERS } = STORAGE_KEYS;
  const registeredUsersStringified = await AsyncStorage.getItem(
    REGISTERED_USERS,
  );
  if (!registeredUsersStringified) {
    return false;
  }
  const registeredUsers = JSON.parse(registeredUsersStringified);
  const findUser = registeredUsers.find(
    (registeredUser: IUser) =>
      registeredUser.email === user.email &&
      registeredUser.password === user.password,
  );
  if (!findUser) {
    return false;
  }
  const stringifiedUser = JSON.stringify(findUser);
  AsyncStorage.setItem(ACTIVE_USER, stringifiedUser);
  return true;
};

export const loginUserSetToStorage = async (user: IUser) => {
  const { ACTIVE_USER, REGISTERED_USERS } = STORAGE_KEYS;
  const registeredUsersStringified = await AsyncStorage.getItem(
    REGISTERED_USERS,
  );
  if (!registeredUsersStringified) {
    return false;
  }
  const registeredUsers = JSON.parse(registeredUsersStringified);
  const findUser = registeredUsers.find(
    (registeredUser: IUser) => registeredUser.email === user.email,
  );
  if (!findUser) {
    return false;
  }

  const stringifiedUser = JSON.stringify(findUser);
  AsyncStorage.setItem(ACTIVE_USER, stringifiedUser);
  return true;
};

export const loginUserGetFromStorage = async () => {
  const { ACTIVE_USER } = STORAGE_KEYS;
  try {
    const stringifiedUser = await AsyncStorage.getItem(ACTIVE_USER);
    if (!stringifiedUser) {
      return [];
    }
    const parsed = JSON.parse(stringifiedUser);
    return parsed;
  } catch (e) {
    console.warn('error getUserFromStorage', e);
  }
};

export const logoutRemoveUserFromStorage = async () => {
  const { ACTIVE_USER } = STORAGE_KEYS;
  try {
    await AsyncStorage.removeItem(ACTIVE_USER);
  } catch (e) {
    console.warn('error getUserFromStorage', e);
  }
};

export const registerUserToStorage = async (user: IUser) => {
  const { REGISTERED_USERS } = STORAGE_KEYS;
  const alreadyRegisteredUsers = await AsyncStorage.getItem(REGISTERED_USERS);
  const updatedUserWithId = {
    ...user,
    id: uuid.v4(),
  };
  if (!alreadyRegisteredUsers) {
    const stringifiedUser = JSON.stringify([updatedUserWithId]);
    AsyncStorage.setItem(REGISTERED_USERS, stringifiedUser);
  } else {
    const parsed = JSON.parse(alreadyRegisteredUsers);
    parsed.push(updatedUserWithId);
    const stringifiedUsers = JSON.stringify(parsed);
    AsyncStorage.setItem(REGISTERED_USERS, stringifiedUsers);
  }
  loginUserSetToStorage(user);
};

export const logoutAndDeleteRemoveUserFromUsersInStorage = async () => {
  const { ACTIVE_USER, REGISTERED_USERS } = STORAGE_KEYS;
  const activeUserStringified = await AsyncStorage.getItem(ACTIVE_USER);
  const registeredUsersStringified = await AsyncStorage.getItem(
    REGISTERED_USERS,
  );
  if (!activeUserStringified || !registeredUsersStringified) {
    return;
  }
  const activeUser = JSON.parse(activeUserStringified);
  const registeredUsers = JSON.parse(registeredUsersStringified);
  const updatedRegisteredUsers = registeredUsers.filter(
    (regUser: IUser) => regUser.id !== activeUser.id,
  );
  const updatedRegisteredUsersStringified = JSON.stringify(
    updatedRegisteredUsers,
  );
  await AsyncStorage.setItem(
    REGISTERED_USERS,
    updatedRegisteredUsersStringified,
  );
};
