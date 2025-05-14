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
