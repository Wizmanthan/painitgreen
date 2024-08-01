import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { addVehicle, fetchVehicleDetails } from '../api/crudOperations';

const CreateListing = () => {
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [fuel, setFuel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');

  const handleCreateListing = () => {
    const listing = {
      vehicleName,
      photoUrl,
      seatingCapacity,
      fuel,
      licensePlate,
      pickupLocation,
      rentalPrice,
    };

    addVehicle(listing)
      .then(() => {
        Alert.alert('Success', 'Listing created successfully');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Something went wrong');
      });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const source = response.assets[0].uri;
        setPhotoUrl(source);
      }
    });
  };

  const handleFetchVehicleDetails = async () => {
    try {
      console.log(`Fetching vehicle details for make: ${vehicleMake}, model: ${vehicleModel}`);
      const data = await fetchVehicleDetails(vehicleMake, vehicleModel);
      console.log('Vehicle details fetched successfully:', data);

      // Assuming the API returns the data in a structured format
      setVehicleName(`${data.make} ${data.model}`);
      setPhotoUrl(data.images[0].url_full || ''); // Set the first image URL
      setSeatingCapacity(data.seats_max?.toString() || ''); // Convert to string if necessary
      setFuel(data.fuel || '');
      // Update the other properties as needed

      // If the API returns different field names, map them accordingly
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      Alert.alert('Error', 'Could not fetch vehicle details');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create a Listing</Text>
      <TextInput
        placeholder="Vehicle Make"
        value={vehicleMake}
        onChangeText={setVehicleMake}
        style={styles.input}
      />
      <TextInput
        placeholder="Vehicle Model"
        value={vehicleModel}
        onChangeText={setVehicleModel}
        style={styles.input}
      />
      <Button title="Fetch Vehicle Details" onPress={handleFetchVehicleDetails} />
      <TextInput
        placeholder="Vehicle Name"
        value={vehicleName}
        onChangeText={setVehicleName}
        style={styles.input}
      />
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      {photoUrl ? <Image source={{ uri: photoUrl }} style={styles.image} /> : null}
      <TextInput
        placeholder="Seating Capacity"
        value={seatingCapacity}
        onChangeText={setSeatingCapacity}
        style={styles.input}
      />
      <TextInput
        placeholder="Fuel"
        value={fuel}
        onChangeText={setFuel}
        style={styles.input}
      />
      <TextInput
        placeholder="License Plate"
        value={licensePlate}
        onChangeText={setLicensePlate}
        style={styles.input}
      />
      <TextInput
        placeholder="Pickup Location"
        value={pickupLocation}
        onChangeText={setPickupLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Rental Price"
        value={rentalPrice}
        onChangeText={setRentalPrice}
        style={styles.input}
      />
      <Button title="Create Listing" onPress={handleCreateListing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
  },
});

export default CreateListing;
