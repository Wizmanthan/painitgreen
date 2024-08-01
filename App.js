// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screen/HomeScreen';
import VideoDetailScreen from './Screen/VideoDetailScreen';
import FavScreen from './Screen/FavScreen';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }} 
    />
    <HomeStack.Screen 
      name="VideoDetails" 
      component={VideoDetailScreen} 
      options={{ title: 'Video Details' }}
    />
  </HomeStack.Navigator>
);

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Favorites" component={FavScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
