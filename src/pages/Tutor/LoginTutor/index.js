import React, { useState, useEffect, useContext } from "react";
import { 
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform 
} from "react-native";
import { useRoute } from "@react-navigation/native";

import FormInput from '../../../../components/FormInput';
import FormButton from '../../../../components/FormButton';
import SocialButton from '../../../../components/SocialButton';
import { AuthContext } from '../../../navegacao/AuthProvider';

import firebase from "../../../config/firebaseconfig";
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Google from 'expo-google-app-auth';

export default function LoginTutor({ navigation, route }){
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [errorLogin, setErrorLogin] = useState("")

    const {loginFirebaseTutor} = useContext(AuthContext);

    const {signInWithGoogleAsyncTutor} = useContext(AuthContext);

    const pagina = useRoute();

    useEffect(()=>{
      firebase.auth().onAuthStateChanged((usuario) => {
        if (usuario) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          navigation.navigate("Inicial Tutor", {idTutor: usuario.uid})
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
                iconType="mail"
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
                onPress={() => loginFirebaseTutor(email, senha)}
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
                    onPress={() => signInWithGoogleAsyncTutor()}
                />
                </View>
            ) : null}   
            </ScrollView>
        </KeyboardAvoidingView>
    );
}