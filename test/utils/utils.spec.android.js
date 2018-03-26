import { NativeModules } from 'react-native';
import { closeModalScreen } from '../../src/utils';

describe('utils', () => {
  describe('closeModalScreen()', () => {
    let androidCloseMethod;

    beforeEach(() => {
      androidCloseMethod = jest.fn();

      NativeModules.APReactNativeBridge = {
        handleCommand: androidCloseMethod
      };
    });

    it('calls the correct native method on android', () => {
      closeModalScreen();

      expect(androidCloseMethod.mock.calls).toMatchSnapshot();
    });
  });
});
