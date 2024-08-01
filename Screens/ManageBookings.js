
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { getVehicles } from '../api/crudOperations';

const ManageBookings = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getVehicles();
      setVehicles(data);
    };

    fetchVehicles();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text>Vehicle: {item.vehicleName}</Text>
      <Text>Seating Capacity: {item.seatingCapacity}</Text>
      <Text>Pickup Location: {item.pickupLocation}</Text>
      <Text>Rental Price: {item.rentalPrice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Manage Bookings</Text>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bookingItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default ManageBookings;
