import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

import firebase from "../config/firebaseconfig";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [errorCadastrar, setErrorCadastrar] = useState("");  

  const database = firebase.firestore()

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, tutorNome) => {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {

                  let idTutor = userCredential.user.uid;
                  let nivelAcesso = '2';
                  let descricaoAcesso = 'Tutor';
                  let emailTutor = userCredential.user.email;
                  let nomeTutor = tutorNome;

                  database.collection("tutor")
                      .doc(firebase.auth().currentUser.uid)
                      .set({
                          idTutor,
                          nivelAcesso,
                          descricaoAcesso,
                          emailTutor,
                          nomeTutor
                      })

                      console.log(idTutor + " " + nivelAcesso + " " + descricaoAcesso + "-" + "AuthProvider");

              })
              .catch((error) => {
                  let errorCode = error.code;
                  let errorMessage = error.message;
                  // ..
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
