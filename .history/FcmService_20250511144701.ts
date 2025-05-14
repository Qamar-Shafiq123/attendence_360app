import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const requestUserPermission = async () => {
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
  }
};

export const listenForegroundMessages = (callback: (msg: any) => void) => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert(remoteMessage.notification?.title || '', remoteMessage.notification?.body || '');
    callback(remoteMessage);
  });
  return unsubscribe;
};

export const registerBackgroundHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Message:', remoteMessage);
  });
};

// New function to get FCM token
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};
