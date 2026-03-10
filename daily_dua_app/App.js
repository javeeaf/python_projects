import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import DuaListScreen from './src/screens/DuaListScreen';
import DuaDetailScreen from './src/screens/DuaDetailScreen';
import TasbeehScreen from './src/screens/TasbeehScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import QuranListScreen from './src/screens/QuranListScreen';
import QuranDetailScreen from './src/screens/QuranDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Dua Navigation Stack
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#15803d' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DuaList"
        component={DuaListScreen}
        options={({ route }) => ({ title: route.params.categoryTitle })}
      />
      <Stack.Screen
        name="DuaDetail"
        component={DuaDetailScreen}
        options={{ title: 'Dua Details' }}
      />
    </Stack.Navigator>
  );
}

// Quran Navigation Stack
function QuranStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0369a1' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="QuranList"
        component={QuranListScreen}
        options={{ title: 'Quran Verses' }}
      />
      <Stack.Screen
        name="QuranDetail"
        component={QuranDetailScreen}
        options={{ title: 'Recitation' }}
      />
    </Stack.Navigator>
  );
}

// Global App Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#15803d' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: route.name === 'Quran' ? '#0369a1' : '#15803d',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'book';
            else if (route.name === 'Quran') iconName = 'play-circle';
            else if (route.name === 'Tasbeeh') iconName = 'circle-o-notch';
            else if (route.name === 'Favorites') iconName = 'heart';
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Quran"
          component={QuranStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Tasbeeh"
          component={TasbeehScreen}
          options={{ title: 'Tasbeeh Counter', headerShown: false }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'My Favorites' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
