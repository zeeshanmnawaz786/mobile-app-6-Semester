import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {baseURI} from '../lib/constants';

export default function MyBlog() {
  const [allBLogs, setAllBlogData] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseURI}/api/getAllBlogs`);
      setAllBlogData(res.data.allBlogs);
    } catch (error) {
      console.error('🚀 ~ file: MyBlog.jsx:39 ~ error:', error);
    }
  };

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(fetchDataInterval);
  }, []); // Empty dependency array to run the effect only once on mount

  const renderItemFunc = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>Author: {item.author}</Text>
          <Text style={styles.author}>Category: {item.category}</Text>
          <Text style={styles.author}>Date: {item.date}</Text>
          <Text style={styles.content}>
            {item.description.slice(0, 100)}...
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
