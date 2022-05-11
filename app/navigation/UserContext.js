import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function setLocalStorage(key, value) {
  try {
    AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function getLocalStorage(key, initialValue) {
  try {
    const value = AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}

function UserContext({children}) {
  const [user, setUser] = useState(() => getLocalStorage('user', ''));

  useEffect(() => {
    setLocalStorage('user', user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        userId: user.id,
        setUserId: id => setUser({...user, id}),
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
