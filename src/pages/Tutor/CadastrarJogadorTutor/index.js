import React, { useState, useEffect } from "react";
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

import firebase from "../../../config/firebaseconfig";
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NovoUsuario({ navigation, route }){
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmaSenha, setConfirmaSenha] = useState();
    const [errorCadastrar, setErrorCadastrar] = useState("");

    const database = firebase.firestore()

    const cadastrarJogadorFirebase = () => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {

            let idTutor = route.params?.idTutor;            
            let idJogador = userCredential.user.uid;
            let nivelAcesso = '3';
            let descricaoAcesso = 'Jogador';

            database.collection("jogador")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    idTutor,
                    idJogador,
                    nivelAcesso,
                    descricaoAcesso,
                    nome,
                    email
                })

            // Signed in
            navigation.navigate("Lista de Jogadores", { idTutor: idTutor });
            console.log(idTutor + " + 3");
            // ...
        })
        .catch((error) => {
            setErrorCadastrarJogador(true)
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
            <Text style={styles.title1}>Olá Tutor!</Text>
            <Text style={styles.title2}>Cadastre um Jogador!</Text>
            <FormInput
                labelValue={nome}
                onChangeText={(text) => setNome(text)}
                placeholderText="Digite o nome do jogador"
                iconType="user"
            />

            <FormInput
                labelValue={email}
                onChangeText={(text) => setEmail(text)}
                placeholderText="Digite o e-mail"
                iconType="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={senha}
                onChangeText={(text) => setSenha(text)}
                placeholderText="Digite a senha"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormInput
              labelValue={confirmaSenha}
              onChangeText={(text) => setConfirmaSenha(text)}
              placeholderText="Confirme a senha"
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
                onPress={cadastrarJogadorFirebase}
            />
            }
            <View style={{height:"30%"}}/>
        </KeyboardAvoidingView>
    )
}