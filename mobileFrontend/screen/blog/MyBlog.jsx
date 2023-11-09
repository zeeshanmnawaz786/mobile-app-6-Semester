import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
} from 'react-native';
import axios from 'axios';

import {useNavigation} from '@react-navigation/native';
import {Dummy} from '../../dummyData';
import CreateBlog from './createBlog';

export default function MyBlog() {
  const navigation = useNavigation();
  const [allBLogs, setAllBlogData] = useState('');
  console.log(allBLogs);

  const passDataToBlogCardFunc = item => {
    navigation.navigate('BlogCard', {
      itemId: item.id,
      title: item.title,
      author: item.author,
      content: item.content,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          'https://27ef-111-88-25-251.ngrok-free.app/api/getAllBlogs',
        );
        console.log(res.data.allBlogs);
        setAllBlogData(res.data.allBlogs);
      } catch (error) {
        console.error('🚀 ~ file: MyBlog.jsx:39 ~ error:', error);
      }
    })();
  }, []);

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
    console.log('🚀 ~ file: MyBlog.jsx:64 ~ renderItemFunc ~ item:', item);
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => passDataToBlogCardFunc(item)}>
        <View style={styles.cardText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>Author: {item.author}</Text>
          <Text style={styles.author}>Category: {item.category}</Text>
          <Text style={styles.author}>Date: {item.date}</Text>
          <Text style={styles.content}>
            {item.description.slice(0, 100)}...
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CreateBlog />
      {/* ================================= */}
      <View style={styles.buttonContainer}>
        <Button title="Update Blog" onPress={showUpdateModal} />
        <Button title="Delete Blog" onPress={showDeleteModal} />
      </View>

      {/* Update Blog Modal */}
      <Modal
        visible={updateModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContent}>
          <Button title="Close" onPress={hideUpdateModal} />
        </View>
      </Modal>

      {/* Delete Blog Modal */}
      <Modal
        visible={deleteModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContent}>
          <Button title="Close" onPress={hideDeleteModal} />
        </View>
      </Modal>

      {/* ================================= */}
      <FlatList
        data={allBLogs}
        renderItem={renderItemFunc}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
}

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
