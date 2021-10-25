import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Inicial from '../pages/Inicial';
import LoginTutor from '../pages/Tutor/LoginTutor';
import CadastrarTutor from '../pages/Tutor/CadastrarTutor';
import InicialTutor from '../pages/Tutor/InicialTutor';
import EditarTutor from '../pages/Tutor/EditarTutor';
import CadastrarJogadorTutor from '../pages/Tutor/CadastrarJogadorTutor';
import ListarJogadorTutor from '../pages/Tutor/ListarJogadorTutor';
import MovimentarCreditoJogador from '../pages/Tutor/MovimentarCreditoJogador';
import LoginJogador from '../pages/Jogador/LoginJogador';
import InicialJogador from '../pages/Jogador/InicialJogador';
import EditarJogador from '../pages/Jogador/EditarJogador';

import firebase from "../config/firebaseconfig.js";

import { FontAwesome, Entypo } from 'react-native-vector-icons';

const Stack = createStackNavigator();

const AppStack = () => {

function logout(id){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        //navigation.navigate("Login Tutor")
      }).catch((error) => {
        // An error happened.
      });
}

  return (
    <Stack.Navigator initialRouteName={"Inicial"}>
      <Stack.Screen
      name="Inicial"
      component={Inicial}
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen
      name="Login Tutor"
      component={LoginTutor}
      options={({navigation}) => ({
        title: '',
        headerStyle: {
          backgroundColor: 'blue',
          shadowColor: '#f9fafd',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <FontAwesome.Button 
              name="long-arrow-left"
              size={25}
              backgroundColor="#f9fafd"
              color="#333"
              onPress={() => navigation.navigate('Inicial')}
            />
          </View>
        ),
      })}
      />
      <Stack.Screen
      name="Cadastrar Tutor"
      component={CadastrarTutor}
      options={({navigation}) => ({
        title: '',
        headerStyle: {
          backgroundColor: 'blue',
          shadowColor: '#f9fafd',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <FontAwesome.Button 
              name="long-arrow-left"
              size={25}
              backgroundColor="#f9fafd"
              color="#333"
              onPress={() => navigation.navigate('Login Tutor')}
            />
          </View>
        ),
      })}
      />
      <Stack.Screen
      name="Lista de Jogadores"
      component={ListarJogadorTutor}
      options={({navigation}) => ({
        title: 'Lista de Jogadores',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'blue',
          shadowColor: '#f9fafd',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
          </View>
        ),
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <Entypo.Button 
              name="log-out"
              size={25}
              backgroundColor="#f9fafd"
              color="#333"
              onPress={() => {navigation.navigate("Login Tutor"),  logout() }}
            />
          </View>
        ),
      })}
      />
      <Stack.Screen
      name="Inicial Tutor"
      component={InicialTutor}
      options={{
        headerTintColor:"blue",
      }}
      />
      <Stack.Screen
      name="Editar Tutor"
      component={EditarTutor}
      options={{
        headerTintColor:"blue",
      }}
      />
      <Stack.Screen
      name="Movimentar Credito Jogador"
      component={MovimentarCreditoJogador}
      options={{
        headerTintColor:"blue",
      }}
      />
      <Stack.Screen
      name="Cadastrar Jogador"
      component={CadastrarJogadorTutor}
      options={({navigation}) => ({
        title: '',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'blue',
          shadowColor: '#f9fafd',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <FontAwesome.Button 
              name="long-arrow-left"
              size={25}
              backgroundColor="#f9fafd"
              color="#333"
              onPress={() => navigation.navigate('Lista de Jogadores')}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <Entypo.Button 
              name="log-out"
              size={25}
              backgroundColor="#f9fafd"
              color="#333"
              onPress={() => {navigation.navigate("Login Tutor"),  logout() }}
            />
          </View>
        ),
      })}
      />
      <Stack.Screen
      name="Login Jogador"
      component={LoginJogador}
      options={{
        headerTintColor:"blue",
        headerShown: false,
      }}
      />
      <Stack.Screen
      name="Inicial Jogador"
      component={InicialJogador}
      options={{
        headerTintColor:"blue",
      }}
      />
      <Stack.Screen
      name="Editar Jogador"
      component={EditarJogador}
      options={{
        headerTintColor:"blue",
      }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
