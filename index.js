/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './src/routes';
import { name as appName } from './app.json';

import 'react-native-gesture-handler';

import '~/config/ReactotronConfig';

enableScreens();

AppRegistry.registerComponent(appName, () => App);
