import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import blogImage from '../../assets/images/blog.png';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const data = {
      userName: username,
      userEmail: userEmail,
      password: password,
    };
    if (username != '' && userEmail != '' && password != '') {
      console.log('🚀 ~ file: SignUp.jsx:24 ~ handleSignUp ~ data:', data);
      try {
        await axios.post(
          'https://27ef-111-88-25-251.ngrok-free.app/api/registerUser',
          {
            userName: username,
            userEmail: userEmail,
            password: password,
          },
        );
        alert('Succcessfully sign up');
        navigation.navigate('Login');
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
        placeholder="Enter your name"
        placeholderTextColor="black"
        onChangeText={text => setUsername(text)}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
