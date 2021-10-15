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
    
    
    function logout(id){
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            navigation.navigate("Login Tutor")
          }).catch((error) => {
            // An error happened.
          });
    }

    function deleteJogador(id){
        database.collection(route.params?.idUsuario).doc(id).delete()
    }

    useEffect(()=>{
        database.collection(route.params?.idUsuario).onSnapshot((query)=>{
            const lista = []
            query.forEach((doc)=>{
                lista.push({...doc.data(), id: doc.id })
            })
            setJogador(lista)
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
                                        descricao: item.descricao,
                                        idUsuario: route.params?.idUsuario
                                    })
                                }}
                            >
                                {item.descricao}                                
                            </Text>
                        </View>
                    )
                }}
                />
            <TouchableOpacity 
                style={styles.buttonCadastrarJogador} 
                onPress={() => navigation.navigate("Cadastrar Jogador", { idUsuario: route.params?.idUsuario })}>
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