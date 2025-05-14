import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getCurrentPosition } from './LocationService';
import { RootStackParamList } from './Navigations';

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUserData(JSON.parse(user));
      }
      setLoading(false);
    };

    const getInitialLocation = async () => {
  try {
    const loc = await getCurrentPosition();
    setLocation({ lat: loc.latitude, lng: loc.longitude });
  } catch (error: any) {
    console.error('Location error:', error.message);
    Alert.alert('Location Error', error.message || 'Could not fetch location.');
  }
};
    fetchUserData();
    getInitialLocation();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Could not log out');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {userData?.name || 'User'} 👋</Text>
      <Text style={styles.time}>{currentTime}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Current Location:</Text>
        {location ? (
          <Text style={styles.locationText}>
            Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
          </Text>
        ) : (
          <Text style={styles.locationText}>Fetching...</Text>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  time: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 30,
  },
  infoBox: {
    padding: 15,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
