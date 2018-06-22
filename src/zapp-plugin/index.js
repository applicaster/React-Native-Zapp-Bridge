import { NativeModules, Platform } from 'react-native';

const { ZappPlugin } = NativeModules;

export default {
  getConfiguration: Platform.select({
    android: pluginId => ZappPlugin.getPluginConfiguration(pluginId),
    ios: pluginId => ZappPlugin.getConfiguration(pluginId)
  })
};
