// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';
// import { getDistance } from 'geolib';
// import { Platform, Alert } from 'react-native';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const DESIGNATED_AREA = {
//   latitude: 34.0522, // Example: Los Angeles latitude
//   longitude: -118.2437, // Example: Los Angeles longitude
//   radius: 500, // meters
// };

// const LAST_LOCATION_STATUS_KEY = 'LAST_LOCATION_STATUS';

// async function requestLocationPermission(): Promise<boolean> {
//   try {
//     if (Platform.OS === 'android') {
//       const fine = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       if (fine !== RESULTS.GRANTED) return false;
//       const bg = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
//       return bg === RESULTS.GRANTED;
//     } else {
//       const status = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
//       return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
//     }
//   } catch (e) {
//     console.warn('Permission error', e);
//     return false;
//   }
// }

// async function checkLocationAndNotify() {
//   Geolocation.getCurrentPosition(
//     async (position) => {
//       const { latitude, longitude } = position.coords;
//       const distance = getDistance(
//         { latitude, longitude },
//         { latitude: DESIGNATED_AREA.latitude, longitude: DESIGNATED_AREA.longitude }
//       );
//       const isInside = distance <= DESIGNATED_AREA.radius;

//       const lastStatusStr = await AsyncStorage.getItem(LAST_LOCATION_STATUS_KEY);
//       const lastStatus = lastStatusStr ? JSON.parse(lastStatusStr) : null;

//       if (isInside && (!lastStatus || lastStatus.isOutsideArea)) {
//         // Entered area
//         await AsyncStorage.setItem(
//           LAST_LOCATION_STATUS_KEY,
//           JSON.stringify({ isOutsideArea: false, latitude, longitude, timestamp: new Date().toISOString() })
//         );
//         PushNotification.localNotification({
//           title: 'Check In',
//           message: 'You are inside the designated area.',
//           playSound: true,
//           soundName: 'default',
//           channelId: 'attendance-channel',
//         });
//       } else if (!isInside && (!lastStatus || !lastStatus.isOutsideArea)) {
//         // Left area
//         await AsyncStorage.setItem(
//           LAST_LOCATION_STATUS_KEY,
//           JSON.stringify({ isOutsideArea: true, latitude, longitude, timestamp: new Date().toISOString() })
//         );
//         PushNotification.localNotification({
//           title: 'Check Out',
//           message: 'You have left the designated area.',
//           playSound: true,
//           soundName: 'default',
//           channelId: 'attendance-channel',
//         });
//       }
//     },
//     (error) => {
//       console.warn('Location error:', error);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//   );
// }

// export async function initBackgroundLocationTracking() {
//   const hasPermission = await requestLocationPermission();
//   if (!hasPermission) {
//     Alert.alert('Permission required', 'Location permission is required for attendance tracking.');
//     return;
//   }

//   // Configure background fetch
//   BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 15, // minutes, adjust as needed (Android minimum 15)
//       stopOnTerminate: false,
//       startOnBoot: true,
//       enableHeadless: true,
//       requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
//     },
//     async (taskId) => {
//       console.log('[BackgroundFetch] task start:', taskId);
//       await checkLocationAndNotify();
//       BackgroundFetch.finish(taskId);
//     },
//     (error) => {
//       console.warn('[BackgroundFetch] failed to start', error);
//     }
//   );

//   // Optional: start immediately
//   BackgroundFetch.start();
// }
