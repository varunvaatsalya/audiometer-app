/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import TrackPlayer from 'react-native-track-player';
import { playBackService } from './playBackService';

TrackPlayer.registerPlaybackService(() => playBackService);
AppRegistry.registerComponent(appName, () => App);
