import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { getCurrentPosition } from './LocationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔐 Request notification permission and get FCM token
export const requestUserPermission = async (): Promise<string | null> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await getFCMToken();
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    } else {
      Alert.alert('Permission Denied', 'Notification permission is required.');
      return null;
    }
  } catch (error) {
    console.error('Permission request error:', error);
    return null;
  }
};

// 📩 Handle foreground messages
export const listenForegroundMessages = (callback: (msg: any) => void) => {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    Alert.alert(
      remoteMessage.notification?.title || 'Notification',
      remoteMessage.notification?.body || ''
    );
    callback(remoteMessage);
  });
  return unsubscribe;
};

// 🎯 Get FCM token separately
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

// 🔄 Handle background messages
export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('🔄 Background Push Received:', remoteMessage.data);

    if (remoteMessage?.data?.type === 'LOCATION_UPDATE') {
      try {
        const location = await getCurrentPosition();
        console.log('📍 Background location:', location);

        // Store location locally or send to server here
        await AsyncStorage.setItem('lastBackgroundLocation', JSON.stringify(location));
      } catch (error) {
        console.error('❌ Error fetching background location:', error);
      }
    }
  });
};
