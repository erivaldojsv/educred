import React, { useState, useEffect } from "react";
import {  
    View,
    Text,
    TouchableOpacity,
    FlatList 
} from "react-native";

import firebase from "../../../config/firebaseconfig.js";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";

export default function ListarJogadorTutor({ navigation, route }){
    const [jogador, setJogador] = useState([])
    const database = firebase.firestore()

    function deleteJogador(id){
        database.collection("jogador").doc(id).delete()

        const user = firebase.auth().currentUser;

        user.delete(id).then(() => {
        // User deleted.
        console.log(id);
        }).catch((error) => {
        // An error ocurred
        // ...
        });
    }

    useEffect(()=>{
            const idTutor = route.params?.idTutor;
            console.log(idTutor + " + 2");
        database.collection("jogador").where("idTutor", "==", idTutor).onSnapshot((query)=>{
            const lista = []
            query.forEach((doc)=>{
                lista.push({...doc.data(), id: doc.id })
            });
            setJogador(lista);
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
                                        id: item.id,
                                        nome: item.nome,
                                        idJogador: route.params?.idJogador
                                    })
                                }}
                            >
                                {item.nome}                                
                            </Text>
                        </View>
                    )
                }}
                />
            <TouchableOpacity 
                style={styles.buttonCadastrarJogador} 
                onPress={() => navigation.navigate("Cadastrar Jogador", { idTutor: route.params?.idTutor })}>
                <Text style={styles.iconButtonCadastrarJogador}>
                    <MaterialCommunityIcons
                        name="account-plus-outline"
                        size={23}
                        color="#ffffff"
                    />
                    </Text>
            </TouchableOpacity>
        </View>
    )
}