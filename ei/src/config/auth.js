import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = "";
export const USER = "";

export const onLogin = (token, user) => {
  AsyncStorage.setItem(TOKEN_KEY, token);
  AsyncStorage.setItem(USER, user);
};

export const onLogout = () => AsyncStorage.removeItem(TOKEN_KEY);

export const assign = async () => { const user = await AsyncStorage.getItem(TOKEN_KEY); return user}

export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return (token !== null) ? true : false;
};