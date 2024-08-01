// VideoDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const VideoDetailScreen = () => {
  const route = useRoute();
  const { videoId } = route.params;
  const [videoDetails, setVideoDetails] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetch(`https://api.dailymotion.com/video/${videoId}?fields=thumbnail_240_url,description,views_total,title,created_time`)
      .then(response => response.json())
      .then(data => setVideoDetails(data))
      .catch(error => console.error(error));
  }, [videoId]);

  const addToFavorites = () => {
    const db = getFirestore(app);
    addDoc(collection(db, 'favorites'), { videoId })
      .then(() => {
        alert('Added to favorites');
        setIsFavorited(true);
      })
      .catch(error => console.error('Error adding to favorites: ', error));
  };

  if (!videoDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: videoDetails.thumbnail_240_url }} style={styles.thumbnail} />
      <Text style={styles.title}>{videoDetails.title}</Text>
      <Text style={styles.description}>{videoDetails.description}</Text>
      <Text style={styles.views}>Views: {videoDetails.views_total}</Text>
      <TouchableOpacity
        style={[styles.favButton, isFavorited && styles.favButtonDisabled]}
        onPress={addToFavorites}
        disabled={isFavorited}
      >
        <Text style={styles.favButtonText}>Add to Favorites</Text>
      </TouchableOpacity>
      <View style={styles.bottomSpacing}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  thumbnail: {
    width: '100%',
    height: 240,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  views: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
  },
  favButton: {
    backgroundColor: '#1e90ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  favButtonDisabled: {
    backgroundColor: '#d3d3d3',
  },
  favButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 50,
  },
});

export default VideoDetailScreen;
