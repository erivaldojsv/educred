import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform 
} from "react-native";
import { useRoute } from "@react-navigation/native"

import FormInput from '../../../../components/FormInput';
import FormButton from '../../../../components/FormButton';
import SocialButton from '../../../../components/SocialButton';

import firebase from "../../../config/firebaseconfig";
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Google from 'expo-google-app-auth';

export default function LoginTutor({ navigation, route }){
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [errorLogin, setErrorLogin] = useState("")

    const pagina = useRoute();

    const loginFirebase = ()=>{
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            if (pagina.name !== "Login Tutor") {
                alert('Não é um Tutor!')
                console.log(pagina.name);
            } else {
                // Signed in
                let usuario = userCredential.user;
                navigation.navigate("Lista de Jogadores", { idTutor: usuario.uid})
                console.log(usuario.uid + " + 1");
                // ...
            }
        })
        .catch((error) => {
            setErrorLogin(true)
            let errorCode = error.code;
            let errorMessage = error.message;
        });

    }

    isUserEqual = (googleUser, firebaseUser) => {
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
      }

    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );      
            // Sign in with credential from the Google user.
            firebase
            .auth()
            .signInWithCredential(credential).then(function (){
                console.log('Usuário Logado!');
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
            console.log('Usuário já cadastrado no Firebase.');
          }
        });
      }
    
    signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: '170621206655-u81n4jfbukkgh95b6q3nv00plqvn6tn1.apps.googleusercontent.com',
            //iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((usuario) => {
            if (usuario) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              navigation.navigate("Lista de Jogadores", {idTutor: usuario.uid})
            }
        });
    }, [])

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewTitle1}>
                <Text style={styles.title1}>Olá Tutor!</Text>
                <Text style={styles.title2}>Faça seu login abaixo!</Text>
            </View>
            
            <FormInput
                labelValue={email}
                onChangeText={(text) => setEmail(text)}
                placeholderText="Digite seu e-mail"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
              labelValue={senha}
              onChangeText={(text) => setSenha(text)}
              placeholderText="Digite sua senha"
              iconType="lock"
              secureTextEntry={true}
            />

            {errorLogin === true
            ?
            <View style={styles.contentAlert}>
                <MaterialCommunityIcons
                    name="alert-circle"
                    size={24}
                    color="#bdbdbd"
                />
                <Text style={styles.warningAlert}>E-mail ou Senha inválidos!</Text>
            </View>
            :
            <View />
            }
            
            { email==="" || senha === ""
            ?
            <FormButton
                //disabled={disabled}
                buttonTitle="Entrar"
            />
            :   
            <FormButton
                buttonTitle="Entrar"
                onPress={loginFirebase}
            />            
            }

            <Text style={styles.registration}>
                Ainda não tenho cadastro! 
                &nbsp;
            <Text
            style={styles.linkSubscribe}
            onPress={()=> navigation.navigate("Cadastrar Tutor")}
            >
                Quero me Cadastrar!
            </Text>
            </Text>
            
            <View style={{height:30}}/>
            
            {Platform.OS === 'android' ? (
                <View>
                <SocialButton
                    buttonTitle="Acessar com Facebook"
                    btnType="facebook"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={() => {}}
                />

                <SocialButton
                    buttonTitle="Acessar com Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={signInWithGoogleAsync}
                />
                </View>
            ) : null}   
            </ScrollView>
        </KeyboardAvoidingView>
    );
}