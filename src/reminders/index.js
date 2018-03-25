import { NativeModules } from 'react-native';

const warn = method => {
  /* eslint no-console: 0 */
  console.warn(
    `React Native module 'Reminders' not found when trying to call '${method}'`
  );
};

const methodMapping = {
  addReminder: 'addProgramReminder',
  removeReminder: 'removeProgramReminder',
  hasReminder: 'isProgramReminderScheduled'
};

const exports = Object.assign(
  {},
  ...Object.keys(methodMapping).map(k => ({
    [k]: (...args) => {
      const nativeMethodName = methodMapping[k];
      if (NativeModules && NativeModules.Reminders) {
        return NativeModules.Reminders[nativeMethodName](...args);
      }

      warn(nativeMethodName);

      return Promise.reject(
        new Error('failed to find Reminders native module')
      );
    }
  }))
);

export const { addReminder, removeReminder, hasReminder } = exports;
export default { ...exports };
