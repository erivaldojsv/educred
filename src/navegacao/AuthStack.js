import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TelaEmbarque from '../pages/TelaEmbarque';
import TelaInicial from '../pages/TelaInicial';
import LoginTutor from '../pages/Tutor/LoginTutor';
import CadastrarTutor from '../pages/Tutor/CadastrarTutor';
import LoginJogador from '../pages/Jogador/LoginJogador';
import CadastrarJogador from '../pages/Jogador/CadastrarJogador';

import { FontAwesome, Entypo } from 'react-native-vector-icons';

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
  } else if (isFirstLaunch == true) {
    routeName = 'TelaEmbarque';
  } else {
    routeName = 'TelaInicial';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="TelaEmbarque"
        component={TelaEmbarque}
        options={{header: () => null}}
      />
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
    </Stack.Navigator>
  );
};

export default AuthStack;
