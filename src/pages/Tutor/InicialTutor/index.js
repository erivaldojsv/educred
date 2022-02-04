import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListaEquipeTutor from '../../Tutor/ListaEquipeTutor';
import ListaEquipeTodas from '../../Tutor/ListaEquipeTodas';
import ListaJogadorTutor from '../../Tutor/ListaJogadorTutor';
import ListaJogadorTodos from '../../Tutor/ListaJogadorTodos';

import firebase from "../../../config/firebaseconfig.js";

import { Entypo, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Icon } from "react-native-elements/dist/icons/Icon";

const TabTutor = createBottomTabNavigator();

export default function InicialTutor(){

    function logout(id){
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            //navigation.navigate("Login Tutor")
          }).catch((error) => {
            // An error happened.
          });
    }

    return(
    <TabTutor.Navigator>
      <TabTutor.Screen 
      name="Minhas Equipes"
      component={ListaEquipeTutor}
      options={({navigation}) => ({
        title: 'Minhas Equipes',
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
        tabBarIcon: () => (
            <MaterialCommunityIcons name='ungroup' size={20} color='blue' />

        ),
      })} />
      <TabTutor.Screen 
      name="Todas Equipes"
      component={ListaEquipeTodas}
      options={({navigation}) => ({
        title: 'Todas Equipes',
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
        tabBarIcon: () => (
            <MaterialCommunityIcons name='select-group' size={20} color='blue' />

        ),
      })} />
      <TabTutor.Screen 
      name="Meus Jogadores"
      component={ListaJogadorTutor}
      options={({navigation}) => ({
        title: 'Meus Jogadores',
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
        tabBarIcon: () => (
            <MaterialCommunityIcons name='account-group-outline' size={20} color='blue' />

        ),
      })} />
      <TabTutor.Screen 
      name="Todos Jogadores"
      component={ListaJogadorTodos}
      options={({navigation}) => ({
        title: 'Todos Jogadores',
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
        tabBarIcon: () => (
            <MaterialCommunityIcons name='account-group' size={20} color='blue' />

        ),
      })} />
    </TabTutor.Navigator>
    )
    
}