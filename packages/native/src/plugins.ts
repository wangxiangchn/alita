export interface NativePlugin {
  name: string;
  cordova: string;
  ionic: string;
}

export const supportedPlugins: NativePlugin[] = [
  {
    name: 'camera',
    cordova: 'cordova-plugin-camera',
    ionic: '@ionic-native/camera',
  },
  {
    name: 'device',
    cordova: 'cordova-plugin-device',
    ionic: '@ionic-native/device',
  },
  {
    name: 'dialogs',
    cordova: 'cordova-plugin-dialogs',
    ionic: '@ionic-native/dialogs',
  },
  {
    name: 'file',
    cordova: 'cordova-plugin-file',
    ionic: '@ionic-native/file',
  },
  {
    name: 'geolocation',
    cordova: 'cordova-plugin-geolocation',
    ionic: '@ionic-native/geolocation',
  },
  {
    name: 'inappbrowser',
    cordova: 'cordova-plugin-inappbrowser',
    ionic: '@ionic-native/in-app-browser',
  },
  {
    name: 'media',
    cordova: 'cordova-plugin-media',
    ionic: '@ionic-native/media',
  },
  {
    name: 'media-capture',
    cordova: 'cordova-plugin-media-capture',
    ionic: '@ionic-native/media-capture',
  },
  {
    name: 'keyboard',
    cordova: 'cordova-plugin-ionic-keyboard',
    ionic: '@ionic-native/keyboard',
  },
  {
    name: 'secure-storage',
    cordova: 'cordova-plugin-secure-storage',
    ionic: '@ionic-native/secure-storage',
  },
  {
    name: 'network',
    cordova: 'cordova-plugin-network-information',
    ionic: '@ionic-native/network',
  },
  {
    name: 'screen-orientation',
    cordova: 'cordova-plugin-screen-orientation',
    ionic: '@ionic-native/screen-orientation',
  },
  {
    name: 'statusbar',
    cordova: 'cordova-plugin-statusbar',
    ionic: '@ionic-native/status-bar',
  },
  {
    name: 'vibration',
    cordova: 'cordova-plugin-vibration',
    ionic: '@ionic-native/vibration',
  },
];
