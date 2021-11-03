import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../navegacao/AuthProvider';

import AuthStack from '../navegacao/AuthStack';
import AppStack from '../navegacao/AppStack';

import firebase from "../config/firebaseconfig";

const Routes = () => {

  const {user, setUser} = useContext(AuthContext);
  const {initializing, setInitializing} = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      if(initializing) setInitializing(false);
      console.log(user.uid + " + Routes");
    }
  }

  useEffect(() => {
    const subscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscribe;
  }, []);

  if(initializing) return null;

  return (
    <NavigationContainer>
      { user ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  );
};

export default Routes;