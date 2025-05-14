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

import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';
import { Platform } from 'react-native';

export const requestNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  if (
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  ) {
    console.log('Notification permissions granted.');
  } else {
    console.log('Notification permissions denied.');
  }
};

export const createNotificationChannel = async () => {
  if (Platform.OS === 'android') {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    return channelId;
  }
  return undefined;
};

export const displayLocalNotification = async (title: string, body: string) => {
  const channelId = await createNotificationChannel();

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // Ensure you have this icon in your resources
      pressAction: {
        id: 'default',
      },
    },
  });
};

export const setupNotificationListeners = () => {
  return notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.PRESS:
        console.log('User pressed the notification.', detail.notification);
        // Handle navigation or other actions here
        break;
      case EventType.DISMISSED:
        console.log('User dismissed the notification.', detail.notification);
        break;
    }
  });
};
