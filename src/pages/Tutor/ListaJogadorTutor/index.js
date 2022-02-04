import React, { useState, useEffect, useContext } from "react";
import {  
    View,
    Text,
    TouchableOpacity,
    FlatList 
} from "react-native";
import {AuthContext} from '../../../navegacao/AuthProvider';

import firebase from "../../../config/firebaseconfig.js";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";

export default function ListaJogadorTutor({ navigation, route }){

    const {user, setUser} = useContext(AuthContext);
    const [jogador, setJogador] = useState([])
    const database = firebase.firestore()

    function deleteJogador(id){
        database.collection("jogador").doc(id).delete()
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                const idTutor = user.uid;
                console.log(idTutor + " + Lista Jogador");
                database.collection("jogador").where("idTutor", "==", idTutor).onSnapshot((query)=>{
                    const lista = []
                    query.forEach((doc)=>{
                        lista.push({...doc.data(), id: doc.id })
                    });
                    setJogador(lista);
                })
            }
        })
    }, [])

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={jogador}
                renderItem={( { item } )=>{
                    return(
                        <View style={styles.contextTodosJogadores}>
                            <TouchableOpacity
                                style={styles.buttonDeletaJogador}
                                onPress={() => {
                                    deleteJogador(item.id)
                                }}>
                                <FontAwesome
                                    name="star"
                                    size={23}
                                    color="blue"
                                >                                
                                </FontAwesome>
                            </TouchableOpacity>
                            <Text
                                style={styles.textDescricaoJogador}
                                onPress={()=> {
                                    navigation.navigate("Movimentar Credito Jogador",{
                                        idJogador: item.id,
                                        nomeJogador: item.nomeJogador
                                    })
                                }}
                            >
                                {item.nomeJogador}                                
                            </Text>
                        </View>
                    )
                }}
                />
        </View>
    )
}