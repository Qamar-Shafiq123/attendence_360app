// react-native-push-notification.d.ts

declare module 'react-native-push-notification' {
  export type PushNotificationObject = {
    channelId?: string;
    title?: string;
    message: string;
    playSound?: boolean;
    soundName?: string;
    userInfo?: object;
    importance?: number;
    date?: Date;
    repeatType?: 'day' | 'week' | 'month' | 'time';
    allowWhileIdle?: boolean;
  };

  export type ChannelObject = {
    channelId: string;
    channelName: string;
    channelDescription?: string;
    playSound?: boolean;
    soundName?: string;
    importance?: number;
    vibrate?: boolean;
  };

  const PushNotification: {
    configure: (options: {
      onRegister: (token: { os: string; token: string }) => void;
      onNotification: (notification: any) => void;
      onAction?: (notification: any) => void;
      onRegistrationError?: (err: any) => void;
      permissions?: {
        alert?: boolean;
        badge?: boolean;
        sound?: boolean;
      };
      popInitialNotification?: boolean;
      requestPermissions?: boolean;
    }) => void;

    createChannel: (channel: ChannelObject, cb: (created: boolean) => void) => void;

    localNotification: (details: PushNotificationObject) => void;

    popInitialNotification: (callback: (notification: any) => void) => void;
  };

  export default PushNotification;
}
