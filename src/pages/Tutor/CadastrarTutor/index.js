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

export default function CadastrarTutor({ navigation }){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorCadastrar, setErrorCadastrar] = useState("")

    const cadastrarFirebase = () => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Signed in
            let usuario = userCredential.user;
            navigation.navigate("Inicial Tutor", { idUsuario: usuario.uid })
            // ...
        })
        .catch((error) => {
            setErrorCadastrar(true)
            let errorCode = error.code;
            let errorMessage = error.message;
            // ..
        });
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title1}>Criar uma Conta</Text>
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
            {errorCadastrar === true
            ?
            <View style={styles.contentAlert}>
                <MaterialCommunityIcons
                    name="alert-circle"
                    size={24}
                    color="#bdbdbd"
                />
                <Text style={styles.warningAlert}>Não foi possível realizar seu cadastro!</Text>
            </View>
            :
            <View />
            }
            { email==="" || senha === ""
            ?
            <TouchableOpacity
                disabled={true}
                style={styles.buttonCadastrar}
            >
                <Text style={styles.textButtonCadastrar}>Cadastrar</Text>
            </TouchableOpacity>
            :            
            <TouchableOpacity
                style={styles.buttonCadastrar}
                onPress={cadastrarFirebase}
            >
                <Text style={styles.textButtonCadastrar}>Cadastrar</Text>
            </TouchableOpacity>
            }
            <Text style={styles.login}>
                Já tem Cadastro?
                &nbsp;<Text
                style={styles.linkSubscribe}
                onPress={()=> navigation.navigate("Login Tutor")}
                >
                    Faça seu Login!
                </Text>
            </Text>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}