// import { Alert } from 'react-native';
// import messaging from '@react-native-firebase/messaging';

// // Request notification permission and get FCM token
// export const requestUserPermission = async (): Promise<string | null> => {
//   try {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       const fcmToken = await getFCMToken();
//       console.log('FCM Token:', fcmToken);
//       return fcmToken;
//     } else {
//       Alert.alert('Permission Denied', 'Notification permission is required.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Permission request error:', error);
//     return null;
//   }
// };

// // Handle foreground messages
// export const listenForegroundMessages = (callback: (msg: any) => void) => {
//   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//     Alert.alert(
//       remoteMessage.notification?.title || 'Notification',
//       remoteMessage.notification?.body || ''
//     );
//     callback(remoteMessage);
//   });
//   return unsubscribe;
// };

// // Get FCM token separately
// export const getFCMToken = async (): Promise<string | null> => {
//   try {
//     const token = await messaging().getToken();
//     return token;
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//     return null;
//   }
// };

import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

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
