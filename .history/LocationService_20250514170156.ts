import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getCurrentPosition = async (): Promise<Coordinates> => {
  // Android permission request
  const requestAndroidPermission = async (): Promise<boolean> => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      const fineGranted =
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED;

      const coarseGranted =
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED;

      return fineGranted && coarseGranted;
    } catch (err) {
      console.error('Permission request error:', err);
      return false;
    }
  };

  const hasPermission =
    Platform.OS === 'android' ? await requestAndroidPermission() : true;

  if (!hasPermission) {
    throw new Error('Location permission denied.');
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Location success:', position);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Location error:', error);
        reject(new Error('Unable to fetch location: ' + error.message));
      },
      {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 10000,
      }
    );
  });
};
