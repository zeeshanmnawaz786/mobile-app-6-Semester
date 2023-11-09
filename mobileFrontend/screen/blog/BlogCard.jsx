import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';

export default BlogCard = ({route}) => {
  if (!route.params) {
    return <Text>Loading...</Text>;
  }

  const {title, author, description} = route.params || {};
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const showCreateModal = () => {
    setCreateModalVisible(true);
  };

  const hideCreateModal = () => {
    setCreateModalVisible(false);
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
        <ScrollView
          contentContainerStyle={styles.container}
          scrollEnabled={true}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>Author: {author}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.button} onPress={hideCreateModal}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    margin: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    color: 'gray',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'gray',
  },
  author: {
    fontSize: 16,
    color: 'gray',
  },
  description: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
  },
});
