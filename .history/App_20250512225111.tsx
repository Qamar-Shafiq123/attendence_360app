import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from './SplashScreen';
import Logo from './Logo';
import Dashboard from './Dashboard';
import Login from './Login';
import { Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');

export type RootStackParamList = {
  Splash: undefined;
  Logo: undefined;
  Login: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splashscreen} />
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
