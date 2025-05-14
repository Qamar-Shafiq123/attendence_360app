import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import LogoScreen from './Logo';
import LoginScreen from './Login';
import Dashboard from './Dashboard';

export type RootStackParamList = {
  Splash: undefined;
  Logo: undefined;
  Login: undefined,
  Dashboard: undefined;
  LoginScreen: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Logo" component={LogoScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Dashboard" component={Dashboard} />
  </Stack.Navigator>
);

export default RootNavigator;
