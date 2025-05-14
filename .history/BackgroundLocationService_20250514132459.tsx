// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getDistance } from 'geolib';
// import { showLocalNotification } from './LocalNotificationService';
// import { ASYNC_STORAGE_KEYS } from './types';

// const DESIGNATED_AREA_KEY = ASYNC_STORAGE_KEYS.DESIGNATED_AREA;
// const LAST_LOCATION_STATUS_KEY = ASYNC_STORAGE_KEYS.LAST_LOCATION_STATUS;
// const ATTENDANCE_LOG_KEY = ASYNC_STORAGE_KEYS.ATTENDANCE_LOG;

// // Call this ONCE after login
// export async function startBackgroundLocationTracking() {
//   // Remove any old listeners (avoid duplicates)
//   BackgroundGeolocation.removeAllListeners();

//   BackgroundGeolocation.configure({
//     desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
//     stationaryRadius: 50,
//     distanceFilter: 50,
//     notificationsEnabled: true,
//     notificationTitle: 'Attendance App',
//     notificationText: 'Tracking your location',
//     debug: false,
//     startOnBoot: true,
//     stopOnTerminate: false,
//   });

//   BackgroundGeolocation.on('location', async (location) => {
//     const { latitude, longitude } = location;
//     const designatedAreaString = await AsyncStorage.getItem(DESIGNATED_AREA_KEY);
//     if (!designatedAreaString) return;
//     const designatedArea = JSON.parse(designatedAreaString);

//     const distance = getDistance(
//       { latitude, longitude },
//       { latitude: designatedArea.latitude, longitude: designatedArea.longitude }
//     );
//     const isInside = distance <= designatedArea.radius;

//     // Get last status
//     const lastStatusString = await AsyncStorage.getItem(LAST_LOCATION_STATUS_KEY);
//     const lastStatus = lastStatusString ? JSON.parse(lastStatusString) : null;

//     // Check-in
//     if (isInside && (!lastStatus || lastStatus.isOutsideArea)) {
//       const newStatus = { latitude, longitude, isOutsideArea: false, timestamp: new Date().toISOString() };
//       await AsyncStorage.setItem(LAST_LOCATION_STATUS_KEY, JSON.stringify(newStatus));
//       showLocalNotification('Check-In', 'You are inside the designated area.');

//       // Optionally, log attendance
//       await logAttendance('Check In', newStatus);
//     }
//     // Check-out
//     else if (!isInside && (!lastStatus || !lastStatus.isOutsideArea)) {
//       const newStatus = { latitude, longitude, isOutsideArea: true, timestamp: new Date().toISOString() };
//       await AsyncStorage.setItem(LAST_LOCATION_STATUS_KEY, JSON.stringify(newStatus));
//       showLocalNotification('Check-Out', 'You have left the designated area.');

//       // Optionally, log attendance
//       await logAttendance('Check Out', newStatus);
//     }
//   });

//   BackgroundGeolocation.on('error', (error) => {
//     console.log('[ERROR] BackgroundGeolocation error:', error);
//   });

//   BackgroundGeolocation.start();
// }

// async function logAttendance(type: 'Check In' | 'Check Out', status: any) {
//   const logString = await AsyncStorage.getItem(ATTENDANCE_LOG_KEY);
//   const log = logString ? JSON.parse(logString) : [];
//   const now = new Date();
//   log.unshift({
//     id: `${now.toISOString()}_${type.replace(' ', '_').toLowerCase()}`,
//     type,
//     time: now.toISOString(),
//     date: now.toLocaleDateString(),
//     status: type === 'Check In' ? 'Auto (Entered Area)' : 'Auto (Left Area)',
//     location: { latitude: status.latitude, longitude: status.longitude },
//   });
//   await AsyncStorage.setItem(ATTENDANCE_LOG_KEY, JSON.stringify(log));
// }
