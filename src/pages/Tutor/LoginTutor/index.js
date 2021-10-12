import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform 
} from "react-native";

import firebase from "../../../config/firebaseconfig";
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginTutor({ navigation }){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorLogin, setErrorLogin] = useState("")

    const loginFirebase = ()=>{
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Signed in
            let usuario = userCredential.user;
            navigation.navigate("Lista de Jogadores", { idUsuario: usuario.uid})
            // ...
        })
        .catch((error) => {
            setErrorLogin(true)
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((usuario) => {
            if (usuario) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              navigation.navigate("Lista de Jogadores", {idUsuario: usuario.uid})
            }
        });
    }, [])

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title1}>Olá Tutor!</Text>
            <Text style={styles.title2}>Faça seu login abaixo!</Text>
            <TouchableOpacity style={styles.inputOpacity}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    type="text"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputOpacity}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                    type="text"
                    onChangeText={(text) => setSenha(text)}
                    value={senha}
                />
            </TouchableOpacity>
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
            <TouchableOpacity
                disabled={true}
                style={styles.buttonLogin}
            >
                <Text style={styles.textButtonLogin}>Entrar</Text>
            </TouchableOpacity>
            :            
            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={loginFirebase}
            >
                <Text style={styles.textButtonLogin}>Entrar</Text>
            </TouchableOpacity>
            }
            <Text style={styles.registration}>
                Ainda não tenho cadastro! 
                &nbsp;<Text
                style={styles.linkSubscribe}
                onPress={()=> navigation.navigate("Cadastrar Tutor")}
                >
                    Quero me Cadastrar!
                </Text>
            </Text>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    );
}