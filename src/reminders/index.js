import { NativeModules } from 'react-native';

const warn = method => {
  /* eslint no-console: 0 */
  console.warn(
    `React Native module 'Reminders' not found when trying to call '${method}'`
  );
};

const addReminder = program => {
  if (NativeModules && NativeModules.Reminders) {
    NativeModules.Reminders.addProgramReminder(program);
  }

  warn('addProgramReminder');
  return Promise.reject(new Error('failed to find Reminders native module'));
};

const removeReminder = id => {
  if (NativeModules && NativeModules.Reminders) {
    NativeModules.Reminders.removeProgramReminder(id.toString());
  }

  warn('removeProgramReminder');
  return Promise.reject(new Error('failed to find Reminders native module'));
};

const hasReminder = id => {
  if (NativeModules && NativeModules.Reminders) {
    return NativeModules.Reminders.isProgramReminderScheduled(id.toString());
  }

  warn('isProgramReminderScheduled');
  return Promise.reject(new Error('failed to find Reminders native module'));
};

export { addReminder, removeReminder, hasReminder };

export default {
  addReminder,
  removeReminder,
  hasReminder
};
