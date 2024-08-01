import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import CreateListing from './Screens/CreateListing';
import ManageBookings from './Screens/ManageBookings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreateListing" component={CreateListing} />
      <Tab.Screen name="ManageBookings" component={ManageBookings} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="CreateListing" component={CreateListing} />
        <Stack.Screen name="ManageBookings" component={ManageBookings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
