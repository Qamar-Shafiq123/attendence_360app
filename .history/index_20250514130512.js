/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setBackgroundMessageHandler } from '@react-native-firebase/messaging';

setBackgroundMessageHandler();

AppRegistry.registerComponent(appName, () => App);
