import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from 'react-native'

export const TOKEN_KEY = "";
export const USER = "";

export const onLogin = (token, user) => {

  try {
    AsyncStorage.setItem(TOKEN_KEY, token);
    AsyncStorage.setItem(USER, JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export const onLogout = () => {
  AsyncStorage.removeItem(TOKEN_KEY);
  AsyncStorage.removeItem(USER);
  return true
};

export const readUser = async () => {
  const user = await AsyncStorage.getItem(USER)
  return user
}
export const readToken = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY)
  return token
}

export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  // console.log(token);

  return (token !== null) ? true : false;
};