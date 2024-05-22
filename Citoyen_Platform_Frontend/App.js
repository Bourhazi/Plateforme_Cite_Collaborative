import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Locations from './pages/Locations';
import Login from './pages/Login';
import Register from './pages/Register';
import { getLocations } from './api';
import LocationsList from './pages/LocationsList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Locations" component={Locations} />
        <Stack.Screen name="LocationsList" component={LocationsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
