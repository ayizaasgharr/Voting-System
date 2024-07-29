/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/screens/auth/Login';
import Signup from './src/screens/auth/Signup';
import Dashboard from './src/screens/dashboard';
import InviteUser from './src/screens/inviteUser';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#1410B4',
            },
          }}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTintColor: '#fff',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#1410B4',
            },
          }}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="Invite"
          component={InviteUser}
          options={{
            headerTintColor: '#fff',
            headerTitle:'Create Invite',
            headerStyle: {
              backgroundColor: '#1410B4',
            },
          }}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
