import React, { useState, useEffect, useContext } from "react";
import {  
    View,
    Text,
    TouchableOpacity,
    FlatList 
} from "react-native";
import {AuthContext} from '../../../navegacao/AuthProvider';

import firebase from "../../../config/firebaseconfig.js";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";

export default function ListaEquipeTutor({ navigation, route }){

    const {user, setUser} = useContext(AuthContext);
    const [equipe, setEquipe] = useState([])
    const database = firebase.firestore()

    function deleteEquipe(id){
        database.collection("equipe").doc(id).delete()
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                const idTutor = user.uid;
                console.log(idTutor + " + Lista Equipe Tutor");
                database.collection("equipe").onSnapshot((query)=>{
                    const lista = []
                    query.forEach((doc)=>{
                        lista.push({...doc.data(), id: doc.id })
                    });
                    setEquipe(lista);
                })
            }
        })
    }, [])

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={equipe}
                renderItem={( { item } )=>{
                    return(
                        <View style={styles.contextTodasEquipes}>
                            <TouchableOpacity
                                style={styles.buttonDeletaEquipe}
                                onPress={() => {
                                    deleteEquipe(item.id)
                                }}>
                                <AntDesign
                                    name="deleteusergroup"
                                    size={23}
                                    color="blue"
                                >                                
                                </AntDesign>
                            </TouchableOpacity>
                            <Text
                                style={styles.textDescricaoEquipe}
                                onPress={()=> {
                                    navigation.navigate("Movimentar Credito Jogador",{
                                        idEquipe: item.id,
                                        NomeEquipe: item.nomeEquipe,
                                        idTutorEquipe: route.params?.idTutor
                                    })
                                }}
                            >
                                {item.nomeEquipe}                                
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