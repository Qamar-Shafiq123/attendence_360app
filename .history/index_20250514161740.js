/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { getCurrentPosition } from './LocationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Register background handler
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

// Headless check for iOS
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
