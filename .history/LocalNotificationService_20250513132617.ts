// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import { Platform } from 'react-native';
// import PushNotification, { ReceivedNotification } from 'react-native-push-notification';

// const CHANNEL_ID = 'attendance-channel';

// export const configureLocalNotifications = () => {
//   // Only create channel on Android
//   if (Platform.OS === 'android') {
//     PushNotification.createChannel(
//       {
//         channelId: CHANNEL_ID,
//         channelName: 'Attendance Notifications',
//         importance: 4,
//         vibrate: true,
//       },
//       (created) => console.log(`Channel created: ${created}`)
//     );
//   }

//   // Configure PushNotification once (for both iOS and Android)
//   PushNotification.configure({
//     onRegister: function (token) {
//       console.log('PushNotification Token:', token);
//     },
//     onNotification: function (notification: Omit<ReceivedNotification, "userInfo">) {
//       console.log('Notification:', notification);
//       if (notification.userInteraction) {
//         // Handle notification tap here if needed
//       }
//       if (Platform.OS === 'ios') {
//         notification.finish(PushNotificationIOS.FetchResult.NoData);
//       }
//     },
//     popInitialNotification: true,
//     requestPermissions: Platform.OS === 'ios',
//   });
// };

// // Function to handle incoming local notifications
// export const LocalNotificationListener = (callback: (notification: Omit<ReceivedNotification, "userInfo">) => void): void => {
//   PushNotification.configure({
//     onNotification: function (notification: Omit<ReceivedNotification, "userInfo">) {
//       console.log('Local Notification Received:', notification);
//       callback(notification);
//     },
//     popInitialNotification: true,
//     requestPermissions: Platform.OS === 'ios',
//   });
// };

import { Platform, PushNotificationIOS } from 'react-native';

export const configureLocalNotifications = () => {
  if (Platform.OS === 'android') {
    // Android doesn't require extra configuration here, native notifications can be shown
  }

  if (Platform.OS === 'ios') {
    // For iOS, we may need to request permission
    PushNotificationIOS.requestPermissions();
  }
};

export const LocalNotificationListener = (callback: (notification: any) => void) => {
  if (Platform.OS === 'ios') {
    PushNotificationIOS.addEventListener('notification', callback);
  }
};
