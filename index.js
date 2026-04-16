/**
 * @format
 */
// import './global.css'; 
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { Buffer } from 'buffer';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.Buffer = Buffer;

AppRegistry.registerComponent(appName, () => App);
