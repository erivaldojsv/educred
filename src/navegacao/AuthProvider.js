import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

import firebase from "../config/firebaseconfig";

import * as Google from 'expo-google-app-auth';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {
  const [user, setUser] = useState(null);
  const [errorLogin, setErrorLogin] = useState("")
  const [errorCadastrar, setErrorCadastrar] = useState(""); 

  const database = firebase.firestore()

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginFirebaseTutor: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                let usuario = userCredential.user;
                navigation.navigate("Inicial Tutor", { idTutor: usuario.uid})
                console.log(usuario.uid + " + Login Tutor carregando lista de jogadores");
                // ...
            })
            .catch((error) => {
                setErrorLogin(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            });
          } catch (e) {
            console.log(e);
          }          
        },

        isUserEqualTutor: (googleUser, firebaseUser) => {
            if (firebaseUser) {
              var providerData = firebaseUser.providerData;
              for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                  // We don't need to reauth the Firebase connection.
                  return true;
                }
              }
            }
            return false;
        },
    
        onSignInTutor: googleUser => {
            console.log('Google Auth Response', googleUser);
            // We need to register an Observer on Firebase Auth to make sure auth is initialized.
            var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
              unsubscribe();
              // Check if we are already signed-in Firebase with the correct user.
              if (!isUserEqualTutor(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );      
                // Sign in with credential from the Google user.
                firebase
                .auth()
                .signInWithCredential(credential).then(function (){
                    console.log('Tutor Logado!');
                })
                .catch((error) => {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                });
              } else {
                console.log('Tutor já cadastrado no Firebase.');
              }
            });
        },        
        signInWithGoogleAsyncTutor: async () => {
            try {
              const result = await Google.logInAsync({
                androidClientId: '170621206655-u81n4jfbukkgh95b6q3nv00plqvn6tn1.apps.googleusercontent.com',
                //iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
              });
          
              if (result.type === 'success') {
                onSignInTutor(result);
                return result.accessToken;
              } else {
                return { cancelled: true };
              }
            } catch (e) {
              return { error: true };
            }
        },
        cadastrarTutor: async (email, password, tutorNome) => {
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
        loginFirebaseJogador: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                let usuario = userCredential.user;
                navigation.navigate("Inicial Jogador", { idJogador: usuario.uid})
                console.log(usuario.uid + " + Login Jogador - AuthProvider");
                // ...
            })
            .catch((error) => {
                setErrorLogin(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            });
          } catch (e) {
            console.log(e);
          }          
        },

        isUserEqualJogador: (googleUser, firebaseUser) => {
            if (firebaseUser) {
              var providerData = firebaseUser.providerData;
              for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                  // We don't need to reauth the Firebase connection.
                  return true;
                }
              }
            }
            return false;
        },
    
        onSignInJogador: googleUser => {
            console.log('Google Auth Response', googleUser);
            // We need to register an Observer on Firebase Auth to make sure auth is initialized.
            var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
              unsubscribe();
              // Check if we are already signed-in Firebase with the correct user.
              if (!isUserEqualJogador(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );      
                // Sign in with credential from the Google user.
                firebase
                .auth()
                .signInWithCredential(credential).then(function (){
                    console.log('Jogador Logado!');
                })
                .catch((error) => {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                });
              } else {
                console.log('Jogador já cadastrado no Firebase.');
              }
            });
        },        
        signInWithGoogleAsyncJogador: async () => {
            try {
              const result = await Google.logInAsync({
                androidClientId: '170621206655-u81n4jfbukkgh95b6q3nv00plqvn6tn1.apps.googleusercontent.com',
                //iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
              });
          
              if (result.type === 'success') {
                onSignInJogador(result);
                return result.accessToken;
              } else {
                return { cancelled: true };
              }
            } catch (e) {
              return { error: true };
            }
        },
        cadastrarJogador: async (email, password, jogadorNome) => {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {
                  let idTutor = '';
                  let idJogador = userCredential.user.uid;
                  let nivelAcesso = '2';
                  let descricaoAcesso = 'Jogador';
                  let emailJogador = userCredential.user.email;
                  let nomeJogador = jogadorNome;

                  database.collection("jogador")
                      .doc(firebase.auth().currentUser.uid)
                      .set({
                          idTutor,
                          idJogador,
                          nivelAcesso,
                          descricaoAcesso,
                          emailJogador,
                          nomeJogador
                      })

                      console.log(idJogador + " " + nivelAcesso + " " + descricaoAcesso + "-" + "AuthProvider");

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
