import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import CheckBox from "react-native-check-box";

import FormInput from '../../../../components/FormInput';
import FormButton from '../../../../components/FormButton';

import firebase from "../../../config/firebaseconfig";
import styles from "./style";



export default function CadastrarEquipeTutor({ navigation, route }){
    const [tutor, setTutor] = useState();
    const [nomeEquipe, setNomeEquipe] = useState();
    const [descricaoEquipe, setdescricaoEquipe] = useState();
    const [situacaoEquipe, setSituacaoEquipe] = useState(true);
    const [errorCadastrarEquipe, setErrorCadastrarEquipe] = useState("");

    const onCheckSituacaoEquipe = () => {
        setSituacaoEquipe(!situacaoEquipe);
    };

    const database = firebase.firestore()


        useEffect(()=>{
            firebase.auth().onAuthStateChanged((user) => {
                setTutor(user);
            })
                
        }, [])

    const cadastrarEquipeFirebase = () => {

        let idTutorEquipe = tutor.uid;
        console.log(idTutorEquipe);

        database.collection("equipe")
        .add({
            idTutorEquipe,
            nomeEquipe,
            descricaoEquipe,
            situacaoEquipe
        })

        // Signed in
        navigation.navigate("Inicial Tutor", { idTutor: idTutorEquipe });
        console.log(idTutorEquipe + " + Cadastra Equipe");
        // ...
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title1}>Olá Tutor!</Text>
            <Text style={styles.title2}>Cadastre uma Equipe!</Text>
            <FormInput
                labelValue={nomeEquipe}
                onChangeText={(text) => setNomeEquipe(text)}
                placeholderText="Digite o nome da Equipe"
                iconType="team"
            />

            <FormInput
                labelValue={descricaoEquipe}
                onChangeText={(text) => setdescricaoEquipe(text)}
                placeholderText="Descreva sua equipe..."
                iconType="form"
            />
            
            <View style={styles.situacaoEquipeItem}>
                <CheckBox
                    checkBoxColor='skyblue'
                    onClick={onCheckSituacaoEquipe}
                    isChecked={situacaoEquipe}
                />
                <Text style={styles.situacaoEquipeText}>
                    Ativa:
                </Text>
            </View>          

            {errorCadastrarEquipe === true
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

            { nomeEquipe===""
            ?
            <FormButton
                disabled={true}
                buttonTitle="Cadastrar"
            />
            :            
            <FormButton
                buttonTitle="Cadastrar"
                onPress={cadastrarEquipeFirebase}
            />
            }
            <View style={{height:"30%"}}/>
        </KeyboardAvoidingView>
    )
}