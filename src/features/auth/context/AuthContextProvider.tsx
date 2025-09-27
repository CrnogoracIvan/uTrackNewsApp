import React, { useContext } from 'react';
import { IUser } from '../../../types.ts';
import { STORAGE_KEYS } from '../../../constants.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface IProps {
  children: React.ReactNode;
}

const useAuthHook = () => {
  const [activeUser, setActiveUser] = React.useState<IUser | null>(null);

  const handleSetActiveUser = async () => {
    const userFromStorage = await getActiveUserFromStorage();
    if (!userFromStorage) {
      return;
    }
    setActiveUser(userFromStorage);
  };

  const getActiveUserFromStorage = async () => {
    const { ACTIVE_USER } = STORAGE_KEYS;
    const stringifiedUser = await AsyncStorage.getItem(ACTIVE_USER);
    if (!stringifiedUser) {
      return false;
    }
    return JSON.parse(stringifiedUser);
  };

  const loginUserSuccessufully = async (user: IUser) => {
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
    await AsyncStorage.setItem(ACTIVE_USER, stringifiedUser);
    handleSetActiveUser();
    return true;
  };

  const loginUserGetFromStorage = async () => {
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

  const logoutRemoveUserFromStorage = async () => {
    const { ACTIVE_USER } = STORAGE_KEYS;
    try {
      await AsyncStorage.removeItem(ACTIVE_USER);
    } catch (e) {
      console.warn('error getUserFromStorage', e);
    }
  };

  const registerUserToStorage = async (user: IUser) => {
    const { REGISTERED_USERS } = STORAGE_KEYS;
    const alreadyRegisteredUsers = await AsyncStorage.getItem(REGISTERED_USERS);
    const updatedUserWithId = {
      ...user,
      id: uuid.v4(),
    };
    if (!alreadyRegisteredUsers) {
      const stringifiedUser = JSON.stringify([updatedUserWithId]);
      await AsyncStorage.setItem(REGISTERED_USERS, stringifiedUser);
    } else {
      const parsed = JSON.parse(alreadyRegisteredUsers);
      parsed.push(updatedUserWithId);
      const stringifiedUsers = JSON.stringify(parsed);
      await AsyncStorage.setItem(REGISTERED_USERS, stringifiedUsers);
    }
    loginUserSuccessufully(user);
  };

  const logoutAndDeleteRemoveUserFromUsersInStorage = async () => {
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
    await logoutRemoveUserFromStorage();
    await AsyncStorage.setItem(
      REGISTERED_USERS,
      updatedRegisteredUsersStringified,
    );
  };

  return {
    activeUser,
    handleSetActiveUser,
    registerUserToStorage,
    logoutRemoveUserFromStorage,
    loginUserGetFromStorage,
    logoutAndDeleteRemoveUserFromUsersInStorage,
    loginUserSuccessufully,
  };
};

const AuthContext = React.createContext<any>(null);

export const AuthContextProvider = ({ children }: IProps) => {
  const authContextValue = useAuthHook();
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};
