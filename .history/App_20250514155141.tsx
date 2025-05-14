// import React, { useEffect } from 'react';
// import { Alert } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import RootNavigator from './Navigations';
// import { requestUserPermission, listenForegroundMessages } from './FcmService';
// import {
//   configureLocalNotifications,
//   LocalNotificationListener,
// } from './LocalNotificationService';

// const App = () => {
//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         // Request FCM permissions
//         await requestUserPermission();

//         // Configure local notifications
//         configureLocalNotifications();

//         // Listen for foreground FCM messages
//         const unsubscribeFcm = listenForegroundMessages((remoteMessage) => {
//           Alert.alert(
//             remoteMessage.notification?.title || 'Notification',
//             remoteMessage.notification?.body || ''
//           );
//         });

//         // Listen for initial notification (if app launched from one)
//         LocalNotificationListener((notification) => {
//           console.log('App opened from local notification:', notification);
//         });

//         // Cleanup foreground FCM listener
//         return () => {
//           console.log('Cleaning up listeners');
//           unsubscribeFcm();
//         };
//       } catch (error) {
//         console.error('Initialization error:', error);
//       }
//     };

//     initialize();
//   }, []);

//   return (
//     <NavigationContainer>
//       <RootNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './Navigations';
import {
  displayLocalNotification,
  requestNotificationPermission,
  setupNotificationListeners,
} from './LocalNotificationService';

const App = () => {
  React.useEffect(() => {
    requestNotificationPermission();
    const unsubscribe = setupNotificationListeners();
    return () =>
    {
      unsubscribe();
    };
  }, []);

  const handleNotification = () =>
  {
    displayLocalNotification('Hello', 'this is a notification');
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
