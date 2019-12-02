import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from 'react-native'

export const onLogin = (token, user) => {

  let arrayToAsyncStore = [
    ['TK', token],
    ['U', JSON.stringify(user)],
  ];

  try {
    const log = AsyncStorage.multiSet(arrayToAsyncStore)
    console.log(log);

  } catch (error) {
    console.log(error);
  }
};

export const getAll = async () => {

  try {
    const x = await AsyncStorage.multiGet(['TK', 'U'])
    console.log(x);

  } catch (error) {
    console.log(error);
  }
};

export const onLogout = () => {
  AsyncStorage.removeItem('TK');
  AsyncStorage.removeItem('U');
  return true
};

export const readUser = async () => {
  const user = await AsyncStorage.getItem('U')
  return user
}
export const readToken = async () => {
  const token = await AsyncStorage.getItem('TK')
  return token
}

export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem('TK');

  return (token !== null) ? true : false;
};