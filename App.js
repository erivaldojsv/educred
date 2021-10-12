import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicial from './src/pages/Inicial';
import LoginTutor from './src/pages/Tutor/LoginTutor';
import InicialTutor from './src/pages/Tutor/InicialTutor';
import CadastrarTutor from './src/pages/Tutor/CadastrarTutor';
import EditarTutor from './src/pages/Tutor/EditarTutor';
import CadastrarJogadorTutor from './src/pages/Tutor/CadastrarJogadorTutor';
import ListarJogadorTutor from './src/pages/Tutor/ListarJogadorTutor';
import MovimentarCreditoJogador from './src/pages/Tutor/MovimentarCreditoJogador';
import LoginJogador from './src/pages/Jogador/LoginJogador';
import InicialJogador from './src/pages/Jogador/InicialJogador';
import EditarJogador from './src/pages/Jogador/EditarJogador';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
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
        options={{
          headerTintColor:"blue",
          headerShown: false,
        }}
        />
        <Stack.Screen
        name="Inicial Tutor"
        component={InicialTutor}
        options={{
          headerTintColor:"blue",
        }}
        />
        <Stack.Screen
        name="Cadastrar Tutor"
        component={CadastrarTutor}
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
        name="Lista de Jogadores"
        component={ListarJogadorTutor}
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
        options={{
          headerTintColor:"blue",
        }}
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
    </NavigationContainer>
  );
}