import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import Dashboard from './Dashboard';
import Logo from './Logo';
import Login from './Login';

export type RootStackParamList = {
  Splash: undefined;
  Logo: undefined;
  Login: undefined,
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Logo" component={Logo} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Dashboard" component={Dashboard} />
  </Stack.Navigator>
);

export default RootNavigator;
