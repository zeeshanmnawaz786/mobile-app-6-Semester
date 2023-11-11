import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import blogImage from '../../assets/images/blog.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURI} from '../lib/constants';

export default function Login({navigation}) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = {
      userEmail: userEmail,
      password: password,
    };
    if (userEmail != '' && password != '') {
      console.log('🚀 ~ file: SignUp.jsx:24 ~ handleSignUp ~ data:', data);
      try {
        const res = await axios.post(`${baseURI}/api/loginUser`, {
          userEmail: userEmail,
          password: password,
        });

        navigation.navigate('Tabs');
        await AsyncStorage.setItem('token', res.data.token);
        alert('Succcessfully sign up');
      } catch (error) {
        console.log('🚀 ~ file: SignUp.jsx:38 ~ handleSignUp ~ error:', error);
      }
    } else {
      alert('Try Again...');
    }
  };

  const handleSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={blogImage} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Enter yout email"
        placeholderTextColor="black"
        onChangeText={text => setUserEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="black"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Don,t have an account ?
        <Text style={styles.signupText} onPress={handleSignup}>
          {' '}
          Signup
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 50,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 10,
    width: '85%',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    marginTop: 15,
    color: 'blue',
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
});
