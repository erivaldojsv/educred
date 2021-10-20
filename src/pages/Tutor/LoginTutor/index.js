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
                let tutor = userCredential.user;
                navigation.navigate("Lista de Jogadores", { idTutor: tutor.uid})
                console.log(tutor.uid + " + 1");
                // ...
            }
        })
        .catch((error) => {
            setErrorLogin(true)
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    }

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
                    onPress={() => {}}
                />
                </View>
            ) : null}   
            </ScrollView>
        </KeyboardAvoidingView>
    );
}