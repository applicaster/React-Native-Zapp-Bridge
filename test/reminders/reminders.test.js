import { NativeModules } from 'react-native';

import {
  addReminder,
  removeReminder,
  hasReminder,
  checkReminders
} from '../../src/reminders';

let addProgramReminderMock;
let removeProgramReminderMock;
let isProgramReminderScheduledMock;
let areProgramRemindersScheduledMock;

beforeEach(() => {
  addProgramReminderMock = jest.fn();
  removeProgramReminderMock = jest.fn();
  isProgramReminderScheduledMock = jest.fn();
  areProgramRemindersScheduledMock = jest.fn();

  NativeModules.Reminders = {
    addProgramReminder: addProgramReminderMock,
    removeProgramReminder: removeProgramReminderMock,
    isProgramReminderScheduled: isProgramReminderScheduledMock,
    areProgramRemindersScheduled: areProgramRemindersScheduledMock
  };
});

describe('reminders', () => {
  describe('addReminder({ id, channel_id, starts_at, ends_at, name })', () => {
    it('it will add a program reminder', () => {
      addReminder({
        id: '111',
        channel_id: '222',
        starts_at: '2016-12-20T14:00:00+00:00',
        ends_at: '2016-12-20T15:00:00+00:00',
        name: "Britain's Got the Pop Factor"
      });

      expect(addProgramReminderMock.mock.calls).toMatchSnapshot();
      expect(removeProgramReminderMock.mock.calls.length).toBe(0);
      expect(isProgramReminderScheduledMock.mock.calls.length).toBe(0);
      expect(areProgramRemindersScheduledMock.mock.calls.length).toBe(0);
    });
  });

  describe('removeReminder(programId)', () => {
    it('it will remove a program reminder', () => {
      removeReminder('111');

      expect(addProgramReminderMock.mock.calls.length).toBe(0);
      expect(removeProgramReminderMock.mock.calls).toMatchSnapshot();
      expect(isProgramReminderScheduledMock.mock.calls.length).toBe(0);
      expect(areProgramRemindersScheduledMock.mock.calls.length).toBe(0);
    });
  });

  describe('hasReminder(programId)', () => {
    it('it will check a program reminder', () => {
      hasReminder('111');

      expect(addProgramReminderMock.mock.calls.length).toBe(0);
      expect(removeProgramReminderMock.mock.calls.length).toBe(0);
      expect(isProgramReminderScheduledMock.mock.calls).toMatchSnapshot();
      expect(areProgramRemindersScheduledMock.mock.calls.length).toBe(0);
    });
  });

  describe('checkReminders(programIdsArr)', () => {
    it('it will check a program reminder', () => {
      checkReminders(['111', '222', '333']);

      expect(addProgramReminderMock.mock.calls.length).toBe(0);
      expect(removeProgramReminderMock.mock.calls.length).toBe(0);
      expect(isProgramReminderScheduledMock.mock.calls.length).toBe(0);
      expect(areProgramRemindersScheduledMock.mock.calls).toMatchSnapshot();
    });
  });
});
