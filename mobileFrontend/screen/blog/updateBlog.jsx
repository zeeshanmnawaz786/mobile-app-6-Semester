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
import {baseURI} from '../lib/constants';

export default function UpdateBlog({item, fetchData}) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const showCreateModal = () => {
    setTitle(item.title);
    setDescription(item.description);
    setSelectedCategory(item.category);
    setCreateModalVisible(true);
  };
  const hideCreateModal = () => {
    setCreateModalVisible(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseURI}/api/updateBlog?_id=${item._id}`, {
        title: title,
        description: description,
        category: selectedCategory,
      });
      alert('Successfully blog updated');
      setCreateModalVisible(false);
      fetchData();
    } catch (error) {
      console.log('🚀 ~ file: createBlog.jsx:72 ~ handleLogin ~ error:', error);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.modalButton} onPress={showCreateModal}>
        <Text style={styles.buttonText}>Update</Text>
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
            value={title}
            placeholderTextColor="black"
            onChangeText={text => setTitle(text)}
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
            value={description}
            placeholder="Enter your content here..."
            style={styles.textAreaInput}
            placeholderTextColor="black"
            textAlignVertical="top"
            onChangeText={text => setDescription(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
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
    borderRadius: 10,
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
