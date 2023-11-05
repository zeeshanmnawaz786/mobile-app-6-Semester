import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dummy} from '../../dummyData';

export default PublicBlog = () => {
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

  return (
    <View style={styles.container}>
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