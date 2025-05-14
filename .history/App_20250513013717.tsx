import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './Navigations';
import { requestUserPermission, listenForegroundMessages } from './FcmService';
import {
  configureLocalNotifications,
  LocalNotificationListener,
} from './LocalNotificationService';
import { Alert } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

const App = () => {
  useEffect(() => {
    const initialize = async () => {
      try {
        // Request FCM permissions
        await requestUserPermission();

        // Configure local notifications
        configureLocalNotifications();

        // Listen for foreground FCM messages
        const unsubscribeFcm = listenForegroundMessages((remoteMessage) => {
          Alert.alert(
            remoteMessage.notification?.title || 'Notification',
            remoteMessage.notification?.body || ''
          );
        });

        // Listen for initial notification (if app launched from one)
        LocalNotificationListener((notification) => {
          console.log('App opened from local notification:', notification);
        });

        // Cleanup foreground FCM listener
        return () => {
          console.log('Cleaning up listeners');
          unsubscribeFcm;
          BackgroundGeolocation.removeAllListeners(); // Avoid duplicate listeners on reload
        };
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initialize();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;