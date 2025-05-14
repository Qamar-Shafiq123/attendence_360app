import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestUserPermission } from './FcmService';
import { getCurrentPosition } from './LocationService'; // Updated LocationService

const Login = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = async () => {
    const cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');

    if (!cleanedNumber) {
      Alert.alert('Validation Error', 'Phone number is required.');
      return;
    }

    if (cleanedNumber.length !== 11) {
      Alert.alert('Validation Error', 'Phone number must be exactly 11 digits.');
      return;
    }

    try {
      // Request FCM permission
      const token = await requestUserPermission();
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
        console.log('FCM Token:', token);
      } else {
        console.warn('FCM token was not generated.');
      }

      // Fetch user location
      const location = await getCurrentPosition();
      console.log('User Location:', location);

      // Save phone number (simulate user)
      const user = { phone: cleanedNumber, name: 'Test User' };
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Navigate to Dashboard
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      );
    } catch (error: any) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : error?.message || 'Something went wrong.';

      console.error('Login error:', errorMessage, error);
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/images/backgroundImage.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={require('./assets/images/logo.png')} style={styles.logo} />
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Join the Movement</Text>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={11}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Open New Doors!</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 60,
  },
  formContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#121212',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'ClashDisplay-Variable',
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});
