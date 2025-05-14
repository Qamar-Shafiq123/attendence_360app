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
