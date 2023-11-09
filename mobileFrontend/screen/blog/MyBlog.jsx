import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

import {useNavigation} from '@react-navigation/native';
import CreateBlog from './createBlog';
import UpdateBlog from './updateBlog';

export default function MyBlog() {
  const navigation = useNavigation();
  const [allBLogs, setAllBlogData] = useState('');

  const passDataToBlogCardFunc = item => {
    navigation.navigate('BlogCard', {
      itemId: item.id,
      title: item.title,
      author: item.author,
      date: item.date,
      description: item.description,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          'https://27ef-111-88-25-251.ngrok-free.app/api/getAllBlogs',
        );
        setAllBlogData(res.data.allBlogs);
      } catch (error) {
        console.error('🚀 ~ file: MyBlog.jsx:39 ~ error:', error);
      }
    })();
  }, []);

  const handleDelete = async _id => {
    console.log('🚀 ~ file: MyBlog.jsx:36 ~ handleDelete ~ id:', _id);
    try {
      await axios.delete(
        `https://27ef-111-88-25-251.ngrok-free.app/api/deleteBlog?_id=${_id}`,
      );
      setAllBlogData(prevBlogs => prevBlogs.filter(blog => blog._id !== _id));
      alert('Successfully blog deleted');
    } catch (error) {
      console.log('🚀 ~ file: createBlog.jsx:72 ~ handleLogin ~ error:', error);
    }
  };

  const renderItemFunc = ({item}) => {
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
          <View style={styles.blogActionContainer}>
            <UpdateBlog item={item} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleDelete(item._id);
              }}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CreateBlog />
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
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  blogActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    width: '50%',
    marginTop: 10,
  },
});
