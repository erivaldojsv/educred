import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TelaInicial from '../pages/TelaInicial';
import LoginTutor from '../pages/Tutor/LoginTutor';
import CadastrarTutor from '../pages/Tutor/CadastrarTutor';
import InicialTutor from '../pages/Tutor/InicialTutor';
import CadastrarEquipeTutor from '../pages/Tutor/CadastrarEquipeTutor';
import LoginJogador from '../pages/Jogador/LoginJogador';
import CadastrarJogador from '../pages/Jogador/CadastrarJogador';
import InicialJogador from '../pages/Jogador/InicialJogador';
import DetalheEquipe from '../pages/Tutor/DetalheEquipe';

import firebase from "../config/firebaseconfig.js";

import { FontAwesome, Entypo } from 'react-native-vector-icons';
import ListaEquipeTutor from '../pages/Tutor/ListaEquipeTutor';

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
    <Stack.Navigator initialRouteName={"TelaInicial"}>
      <Stack.Screen
      name="TelaInicial"
      component={TelaInicial}
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
              onPress={() => navigation.navigate('TelaInicial')}
            />
          </View>
        ),
      })}
      />
      <Stack.Screen
      name="Login Jogador"
      component={LoginJogador}
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
              onPress={() => navigation.navigate('TelaInicial')}
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
      name="Cadastrar Jogador"
      component={CadastrarJogador}
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
              onPress={() => navigation.navigate('Login Jogador')}
            />
          </View>
        ),
      })}
      />
      <Stack.Screen
      name="Cadastrar Equipe"
      component={CadastrarEquipeTutor}
      options={({navigation}) => ({
        title: '',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'blue',
          shadowColor: '#f9fafd',
          elevation: 0,
        },
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
      name="Detalhe Equipe"
      component={DetalheEquipe}
      options={{
        headerTintColor:"blue",
      }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
