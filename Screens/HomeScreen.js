import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Welcome to Paint it Green App</Text>
      <Text>This is your solution to your e-car renting problems</Text>
      {/* <Button title="Go to Create Listing" onPress={() => navigation.navigate('CreateListing')} />
      <Button title="Go to Manage Bookings" onPress={() => navigation.navigate('ManageBookings')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
