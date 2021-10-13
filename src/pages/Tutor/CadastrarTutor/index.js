import React, { useState } from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import FormInput from '../../../../components/FormInput';
import FormButton from '../../../../components/FormButton';
import SocialButton from '../../../../components/SocialButton';

import firebase from "../../../config/firebaseconfig";
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CadastrarTutor({ navigation }){
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmaSenha, setConfirmaSenha] = useState();
    const [errorCadastrar, setErrorCadastrar] = useState("");

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

            <FormInput
              labelValue={confirmaSenha}
              onChangeText={(text) => setConfirmaSenha(text)}
              placeholderText="Confirme sua senha"
              iconType="lock"
              secureTextEntry={true}
            />
            
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
            <FormButton
                disabled={true}
                buttonTitle="Cadastrar"
            />
            :            
            <FormButton
                buttonTitle="Cadastrar"
                onPress={cadastrarFirebase}
            />            
            }            

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                Ao se cadastrar, você confirma que aceita nossos{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Termos Clicado!')}>
                    <Text style={[styles.color_textPrivate, {color: '#1877f2'}]}>
                        Termos de serviço
                    </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> e nossa </Text>
                <Text style={[styles.color_textPrivate, {color: '#1877f2'}]}>
                Política de Privacidade
                </Text>
                <Text style={styles.login}>
                    Já tem Cadastro?
                    &nbsp;<Text
                    style={styles.linkSubscribe}
                    onPress={()=> navigation.navigate("Login Tutor")}
                    >
                        Faça seu Login!
                    </Text>
                </Text>
            </View>
            
            {Platform.OS === 'android' ? (
                <View>
                <SocialButton
                    buttonTitle="Sign Up with Facebook"
                    btnType="facebook"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={() => {}}
                />

                <SocialButton
                    buttonTitle="Sign Up with Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => {}}
                />
                </View>
            ) : null}   
            <View style={{height:30}}/>
        </KeyboardAvoidingView>
    )
}