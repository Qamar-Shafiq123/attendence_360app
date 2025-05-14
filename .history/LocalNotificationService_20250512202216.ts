import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const CHANNEL_ID = 'attendance-channel';

export const configureNotifications = () => {
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: CHANNEL_ID,
        channelName: 'Attendance Notifications',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`)
    );
  }

  PushNotification.configure({
    onRegister: function (token) {
      console.log('PushNotification Token:', token);
    },
    onNotification: function (notification) {
      console.log('Notification:', notification);
      if (notification.userInteraction) {
        // Handle notification tap here if needed
      }
      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });
};
