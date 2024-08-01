// src/api/crudOperations.js
// import React, { useEffect, useState } from 'react';
import { db } from '../FirebaseApp';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Add Vehicle
export const addVehicle = async (vehicle) => {
  try {
    const docRef = await addDoc(collection(db, "vehicles"), vehicle);
    console.log("Vehicle added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding vehicle: ", e);
  }
};

// Get Vehicles
export const getVehicles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "vehicles"));
    let vehicles = [];
    querySnapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() });
    });
    return vehicles;
  } catch (e) {
    console.error("Error getting vehicles: ", e);
  }
};

// Update Vehicle Availability
export const updateVehicleAvailability = async (id, availability) => {
  try {
    const vehicleRef = doc(db, "vehicles", id);
    await updateDoc(vehicleRef, { availability });
    console.log("Vehicle updated with ID: ", id);
  } catch (e) {
    console.error("Error updating vehicle: ", e);
  }
};

// Delete Vehicle
export const deleteVehicle = async (id) => {
  try {
    await deleteDoc(doc(db, "vehicles", id));
    console.log("Vehicle deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting vehicle: ", e);
  }
};

// Add Booking
export const addBooking = async (booking) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), booking);
    console.log("Booking added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding booking: ", e);
  }
};

// Get Bookings
export const getBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    let bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  } catch (e) {
    console.error("Error getting bookings: ", e);
  }
};

// Update Booking Status
export const updateBookingStatus = async (id, status) => {
  try {
    const bookingRef = doc(db, "bookings", id);
    await updateDoc(bookingRef, { status });
    console.log("Booking status updated with ID: ", id);
  } catch (e) {
    console.error("Error updating booking status: ", e);
  }
};

// Fetch Vehicle Details

// src/api/crudOperations.js
export const fetchVehicleDetails = async (make, model) => {
  try {
    const response = await fetch('https://wizmanthan.github.io/vehicles/vehicles.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Log the data to see its structure
    console.log('Fetched data:', data);

    // Ensure data is an array
    if (!Array.isArray(data)) {
      throw new Error('Invalid data structure');
    }

    // Find the vehicle details matching the make and model
    const vehicle = data.find(v => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase());
    
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    
    return vehicle;
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw error;
  }
};




