import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TelaEmbarque from '../pages/TelaEmbarque';
import Inicial from '../pages/Inicial';
import LoginTutor from '../pages/Tutor/LoginTutor';
import InicialTutor from '../pages/Tutor/InicialTutor';
import CadastrarTutor from '../pages/Tutor/CadastrarTutor';
import EditarTutor from '../pages/Tutor/EditarTutor';
import CadastrarJogadorTutor from '../pages/Tutor/CadastrarJogadorTutor';
import ListarJogadorTutor from '../pages/Tutor/ListarJogadorTutor';
import MovimentarCreditoJogador from '../pages/Tutor/MovimentarCreditoJogador';
import LoginJogador from '../pages/Jogador/LoginJogador';
import InicialJogador from '../pages/Jogador/InicialJogador';
import EditarJogador from '../pages/Jogador/EditarJogador';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  if (isFirstLaunch === null) {
    return null; // Mudar "false" para "true", para mostrar tela de embarque só no primeiro acesso ao App. This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == false) {
    routeName = 'TelaEmbarque';
  } else {
    routeName = 'Inicial';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="TelaEmbarque"
        component={TelaEmbarque}
        options={{header: () => null}}
      />
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
      options={({navigation}) => ({
        title: '',
        headerStyle: {
          backgroundColor: '#f9fafd',
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
      options={({navigation}) => ({
        title: '',
        headerStyle: {
          backgroundColor: '#f9fafd',
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

export default AuthStack;
