import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyBlog from './screen/blog/MyBlog';
import SignUp from './screen/auth/SignUp';
import Login from './screen/auth/Login';
import PublicBlog from './screen/blog/PublicBlog';
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  function Tabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="MyBlog" component={MyBlog} />
        <Tab.Screen name="PublicBlog" component={PublicBlog} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
