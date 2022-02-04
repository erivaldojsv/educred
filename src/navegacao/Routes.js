import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../navegacao/AuthProvider';

import AuthStack from '../navegacao/AuthStack';
import AppStack from '../navegacao/AppStack';

import firebase from "../config/firebaseconfig";

const Routes = ({navigation, route}) => {

  const {user, setUser} = useContext(AuthContext);
  const {initializing, setInitializing} = useState(true);

  useEffect(()=>{
      firebase.auth().onAuthStateChanged((user) => {
          setUser(user);
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            if(initializing) setInitializing(false);
            console.log(user.uid + " + Routes");
          }
      });
  }, [])

  if(initializing) return null;

  return (
    <NavigationContainer>
      { user ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  );
};

export default Routes;