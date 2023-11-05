import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dummy} from '../../dummyData';
import CreateBlog from './createBlog';

const MyBlog = () => {
  const navigation = useNavigation();

  const passDataToBlogCardFunc = item => {
    navigation.navigate('BlogCard', {
      itemId: item.id,
      title: item.title,
      author: item.author,
      content: item.content,
      imageUrl: item.imageUrl,
    });
  };
  // const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // const showCreateModal = () => {
  //   setCreateModalVisible(true);
  // };

  // const hideCreateModal = () => {
  //   setCreateModalVisible(false);
  // };

  const showUpdateModal = () => {
    setUpdateModalVisible(true);
  };

  const hideUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };
  const renderItemFunc = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => passDataToBlogCardFunc(item)}>
        <Image source={{uri: item.imageUrl}} style={styles.image} />
        <View style={styles.cardText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>Author: {item.author}</Text>
          <Text style={styles.content}>{item.content.slice(0, 100)}...</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // const handleCreateBlog = () => {
  //   // You should implement the logic to create a new blog post here.
  //   // Typically, you would send this data to a server or update your data source.

  //   // After successfully creating the blog, you can close the modal.
  //   onHideCreateModal();
  // };

  return (
    <View style={styles.container}>
      <CreateBlog />
      {/* ================================= */}
      <View style={styles.buttonContainer}>
        {/* <Button title="Create Blog" onPress={showCreateModal} /> */}
        <Button title="Update Blog" onPress={showUpdateModal} />
        <Button title="Delete Blog" onPress={showDeleteModal} />
      </View>

      {/* Create Blog Modal */}
      {/* <Modal
        visible={createModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Blog</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Author"
            value={author}
            onChangeText={text => setAuthor(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Content"
            multiline
            value={content}
            onChangeText={text => setContent(text)}
          />
          <Button title="Create" onPress={handleCreateBlog} />
          <Button title="Cancel" onPress={hideCreateModal} />
        </View>
      </Modal> */}

      {/* Update Blog Modal */}
      <Modal
        visible={updateModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContent}>
          {/* Add your Update Blog Form or Content Component Here */}
          <Button title="Close" onPress={hideUpdateModal} />
        </View>
      </Modal>

      {/* Delete Blog Modal */}
      <Modal
        visible={deleteModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContent}>
          {/* Add your Delete Blog Confirmation Content Component Here */}
          <Button title="Close" onPress={hideDeleteModal} />
        </View>
      </Modal>

      {/* ================================= */}
      <FlatList
        data={Dummy}
        renderItem={renderItemFunc}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardText: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  author: {
    fontSize: 16,
    color: 'gray',
  },
  content: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});

export default MyBlog;
