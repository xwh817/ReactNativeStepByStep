/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import FlatListView from './app/Components/FlatListView'

AppRegistry.registerComponent(appName, () => FlatListView);
