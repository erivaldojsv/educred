import React, { useContext, useState } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import FormInput from '../../../../components/FormInput';
import FormButton from '../../../../components/FormButton';
import SocialButton from '../../../../components/SocialButton';
import { AuthContext } from '../../../navegacao/AuthProvider';

import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CadastrarTutor({ navigation, route }){
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmaSenha, setConfirmaSenha] = useState();
    const [errorCadastrar, setErrorCadastrar] = useState("");

    const {cadastrarTutor} = useContext(AuthContext);

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewTitle1}>
                <Text style={styles.title1}>Olá Tutor!</Text>
                <Text style={styles.title2}>Crie sua conta!</Text>
            </View>

            <FormInput
                labelValue={nome}
                onChangeText={(text) => setNome(text)}
                placeholderText="Digite seu nome"
                iconType="user"
            />

            <FormInput
                labelValue={email}
                onChangeText={(text) => setEmail(text)}
                placeholderText="Digite seu e-mail"
                iconType="mail"
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
                onPress={() => cadastrarTutor(email, senha, nome)}
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
                    buttonTitle="Acessar com Facebook"
                    btnType="facebook"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={() => {}}
                />

                <SocialButton
                    buttonTitle="Acessar com Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => {}}
                />
                </View>
            ) : null}   
            <View style={{height:30}}/>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}