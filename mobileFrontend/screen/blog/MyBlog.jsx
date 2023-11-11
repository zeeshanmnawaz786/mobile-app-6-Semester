import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import axios from 'axios';

import CreateBlog from './createBlog';
import UpdateBlog from './updateBlog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURI} from '../lib/constants';

export default function MyBlog({navigation}) {
  const [allBLogs, setAllBlogData] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseURI}/api/getAllBlogs`);
        setAllBlogData(res.data.allBlogs);
      } catch (error) {
        console.error('🚀 ~ file: MyBlog.jsx:39 ~ error:', error);
      }
    })();
  }, []);

  const handleDelete = async _id => {
    console.log('🚀 ~ file: MyBlog.jsx:36 ~ handleDelete ~ id:', _id);
    try {
      await axios.delete(`${baseURI}/api/deleteBlog?_id=${_id}`);
      setAllBlogData(prevBlogs => prevBlogs.filter(blog => blog._id !== _id));
      alert('Successfully blog deleted');
    } catch (error) {
      console.log('🚀 ~ file: createBlog.jsx:72 ~ handleLogin ~ error:', error);
    }
  };
  const logoutFunc = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const renderItemFunc = ({item}) => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
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
      <TouchableOpacity style={styles.button} onPress={logoutFunc}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {/* <Button title="Logout" onPress={() => navigation.navigate('Login')} /> */}
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
