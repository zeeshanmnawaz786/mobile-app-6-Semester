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
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
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
        const res = await axios.post(
          'https://c3ab-111-88-13-75.ngrok-free.app/api/loginUser',
          {
            userEmail: userEmail,
            password: password,
          },
        );

        await AsyncStorage.setItem('token', res.data.token);
        alert('Succcessfully sign up');
        navigation.navigate('MyBlog');
      } catch (error) {
        console.log('🚀 ~ file: SignUp.jsx:38 ~ handleSignUp ~ error:', error);
      }
    } else {
      alert('Try Again...');
    }
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
      <TouchableOpacity
        style={styles.button} // Add your desired styles here
        onPress={handleLogin}>
        <Text
          style={styles.buttonText} // Add your desired styles here
        >
          Login
        </Text>
      </TouchableOpacity>
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
});
