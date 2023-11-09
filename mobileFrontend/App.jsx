import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyBlog from './screen/blog/MyBlog';
import SignUp from './screen/auth/SignUp';
import Login from './screen/auth/Login';
import PublicBlog from './screen/blog/PublicBlog';
import BlogCard from './screen/blog/BlogCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [loggingIn, setLoggingIn] = useState();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      setLoggingIn(token);
    })();
  }, []);

  return (
    <NavigationContainer>
      {loggingIn ? (
        <Tab.Navigator initialRouteName="MyBlog">
          <Tab.Screen name="MyBlog" component={MyBlog} />
          <Tab.Screen name="PublicBlog" component={PublicBlog} />
          <Tab.Screen name="BlogCard" component={BlogCard} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="Login">
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="SignUp" component={SignUp} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
