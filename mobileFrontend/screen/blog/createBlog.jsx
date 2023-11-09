import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import blogImage from '../../assets/images/blog.png';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const showCreateModal = () => {
    setCreateModalVisible(true);
  };

  const hideCreateModal = () => {
    setCreateModalVisible(false);
  };

  const handleLogin = async () => {
    const currentDate = new Date().toLocaleString();
    if (
      title != '' &&
      description != '' &&
      author != '' &&
      currentDate != '' &&
      selectedCategory != ''
    ) {
      try {
        await axios.post(
          'https://27ef-111-88-25-251.ngrok-free.app/api/registerBlog',
          {
            title: title,
            description: description,
            author: author,
            date: currentDate,
            category: selectedCategory,
          },
        );
        alert('Succcessfully blog created');
        setCreateModalVisible(false);
      } catch (error) {
        console.log(
          '🚀 ~ file: createBlog.jsx:72 ~ handleLogin ~ error:',
          error,
        );
      }
    } else {
      alert('Try Again...');
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.modalButton} onPress={showCreateModal}>
        <Text style={styles.buttonText}>Create Blog</Text>
      </TouchableOpacity>
      <Modal
        visible={createModalVisible}
        animationType="fade"
        transparent={true}>
        <View style={styles.container}>
          <Image source={blogImage} style={styles.image} />
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="black"
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Author Name"
            placeholderTextColor="black"
            onChangeText={text => setAuthor(text)}
          />

          <View style={styles.pickerStyle}>
            <Picker
              placeholderTextColor="black"
              style={styles.input}
              selectedValue={selectedCategory}
              onValueChange={itemValue => setSelectedCategory(itemValue)}>
              <Picker.Item label="Select any category" value="" />
              <Picker.Item label="IT" value="IT" />
              <Picker.Item label="CS" value="CS" />
              <Picker.Item label="Commerce" value="Commerce" />
              <Picker.Item label="English" value="English" />
            </Picker>
          </View>

          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Enter your content here..."
            style={styles.textAreaInput}
            placeholderTextColor="black"
            textAlignVertical="top"
            onChangeText={text => setDescription(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={hideCreateModal}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 50,
  },
  imageSelectButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: '45%',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 18,
    color: 'black',
    borderRadius: 10,
  },
  pickerStyle: {
    width: 300,
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    color: 'black',
    borderRadius: 10,
  },
  textAreaInput: {
    width: 300,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    width: '85%',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
