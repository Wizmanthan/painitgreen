// FavScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const FavScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const db = getFirestore(app);
    const unsubscribe = onSnapshot(collection(db, 'favorites'), async (querySnapshot) => {
      const favs = [];
      for (const doc of querySnapshot.docs) {
        const videoId = doc.data().videoId;
        const response = await fetch(`https://api.dailymotion.com/video/${videoId}?fields=title`);
        const data = await response.json();
        favs.push({ id: doc.id, videoId, title: data.title });
      }
      setFavorites(favs);
    });

    return () => unsubscribe();
  }, []);

  const clearFavorites = async () => {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, 'favorites'));
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, 'favorites', docSnap.id));
    });
    setFavorites([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('VideoDetails', { videoId: item.videoId })}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorites found</Text>
      )}
      <Button title="Clear Favorites" onPress={clearFavorites} disabled={favorites.length === 0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  noFavorites: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6c757d',
    marginTop: 20,
  },
});

export default FavScreen;
