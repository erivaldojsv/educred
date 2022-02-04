import React, { useState, useEffect, useContext } from "react";
import {  
    View,
    Text,
    TouchableOpacity,
    FlatList
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import {AuthContext} from '../../../navegacao/AuthProvider';

import FormInput from "../../../../components/FormInput";

import firebase from "../../../config/firebaseconfig.js";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";

function DetalheEquipe({ navigation, route }){

    const {user, setUser} = useContext(AuthContext);
    const [equipe, setEquipe] = useState([]);
    const [equipeSelecionada, setEquipeSelecionada] = useState([]);
    const [jogador, setJogador] = useState('');
    const database = firebase.firestore();
        

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                const idTutor = user.uid;
                console.log(idTutor + " + Detalhe Equipe");

                database.collection("equipe").where("idTutorEquipe", "==", idTutor).onSnapshot((query)=>{
                    const listaEquipe = [];
                    query.forEach((doc)=>{
                        listaEquipe.push({...doc.data(), id: doc.id })
                    });
                    setEquipe(listaEquipe);
                })
                
                database.collection("jogador").onSnapshot((query)=>{
                    const listaJogador = [];
                    query.forEach((doc)=>{
                        listaJogador.push({...doc.data(), id: doc.id })
                    });
                    setJogador(listaJogador);
                })
            }
        })
    }, [])

    return(
        <View style={styles.container}>
            <Picker
            selectedValue={equipeSelecionada}
            onValueChange={(itemValue, itemIndex) => {
                setEquipeSelecionada(itemValue, itemIndex)

                console.log(itemValue);
                console.log(itemIndex);
            }
                
            }>
                {
                equipe.map(equip => {
                    //console.log(equip);
                    return <Picker.Item key={equip.id} label={equip.nomeEquipe} value={equip.nomeEquipe} />
                })
                }
            </Picker>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={jogador}
                renderItem={( { item } )=>{
                    return(
                        <View style={styles.contextTodasEquipes}>
                            <TouchableOpacity
                                style={styles.buttonDeletaEquipe}
                                onPress={() => {
                                    deleteJogador(item.id)
                                }}>
                                <AntDesign
                                    name="deleteuser"
                                    size={23}
                                    color="blue"
                                >                                
                                </AntDesign>
                            </TouchableOpacity>
                            <Text
                                style={styles.textDescricaoEquipe}
                                onPress={()=> {
                                    navigation.navigate("Movimentar Credito Jogador",{
                                        idJogador: item.id,
                                        NomeJogador: item.nomeJogador,
                                        idTutorJogador: route.params?.idTutor
                                    })
                                }}
                            >
                                {item.nomeJogador}                                
                            </Text>
                        </View>
                    )
                }}
                />
            <TouchableOpacity 
                style={styles.buttonCadastrarEquipe} 
                onPress={() => navigation.navigate("Cadastrar Equipe", { idTutor: route.params?.idTutor })}>
                <Text style={styles.iconButtonCadastrarEquipe}>
                    <AntDesign
                        name="addusergroup"
                        size={23}
                        color="#ffffff"
                    />
                    </Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetalheEquipe;