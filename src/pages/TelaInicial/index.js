import React, { useState, useEffect } from "react";
import { 
    Text,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator } from 'react-native';

import styles from "./style";
import logo from '../../../assets/logo/educred.png'
    
export default function TelaInicial({ navigation }) {

    const [state, setState] = useState({ animating: true })
        
    closeActivityIndicator = () => setTimeout(() => setState({
    animating: false }), 2000)

    const animating = state.animating

    useEffect(()=>{
        anitaming=true;
        closeActivityIndicator()
    }, [])


    if(typeof(anitaming) === 'undefined') {
        return (
            <View style = {styles.containerActivityIndicator}>
                <ActivityIndicator
                animating = {animating}
                color = 'blue'
                size = "large"
                style = {styles.activityIndicator}/>
            </View>
        )   
    } else {
        return(
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.viewTelaInicial}>
                    <View>
                        <Image style={styles.logoTelaInicial} source={logo} />
                    </View>
                    <View style={styles.viewButtonTelaInicial}>
                        <TouchableOpacity 
                            style={styles.buttonTelaInicial}
                            onPress={()=> navigation.navigate("Login Tutor")}>
                            <Text style={styles.buttonTelaInicialText}>Tutor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonTelaInicial}                        
                            onPress={()=> navigation.navigate("Login Jogador")}>
                            <Text style={styles.buttonTelaInicialText}>Jogador</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}