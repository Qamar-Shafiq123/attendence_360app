// import { PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// export interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// export const getCurrentPosition = async (): Promise<Coordinates> => {
//   // Android permission request
//   const requestAndroidPermission = async (): Promise<boolean> => {
//     try {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       ]);

//       const fineGranted =
//         granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
//         PermissionsAndroid.RESULTS.GRANTED;

//       const coarseGranted =
//         granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
//         PermissionsAndroid.RESULTS.GRANTED;

//       return fineGranted && coarseGranted;
//     } catch (err) {
//       console.error('Permission request error:', err);
//       return false;
//     }
//   };

//   const hasPermission =
//     Platform.OS === 'android' ? await requestAndroidPermission() : true;

//   if (!hasPermission) {
//     throw new Error('Location permission denied.');
//   }

//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         console.log('Location success:', position);
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error('Location error:', error);
//         reject(new Error('Unable to fetch location: ' + error.message));
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 50000,
//         maximumAge: 10000,
//       }
//     );
//   });
// };

import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Request location permission on Android
const requestAndroidLocationPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location for attendance tracking.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Permission request error:', err);
    return false;
  }
};

// Get current location
export const getCurrentPosition = async (): Promise<Coordinates> => {
  const hasPermission =
    Platform.OS === 'android'
      ? await requestAndroidLocationPermission()
      : true; // iOS handled via Info.plist

  if (!hasPermission) {
    throw new Error('Location permission denied.');
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (!position?.coords) {
          reject(new Error('Coordinates not available.'));
          return;
        }

        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(`Location error [${error.code}]: ${error.message}`);
        Alert.alert('Location Error', error.message || 'Could not fetch location.');
        reject(new Error(`Unable to fetch location: [${error.code}] ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  });
};
