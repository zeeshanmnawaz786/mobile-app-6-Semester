import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

export default BlogCard = ({route}) => {
  if (!route.params) {
    return <Text>Loading...</Text>;
  }

  const {title, author, content, imageUrl} = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>Author: {author}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
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
  content: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
  },
});
