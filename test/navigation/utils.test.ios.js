import { NativeModules } from 'react-native';
import { closeModalScreen } from '../../src/navigation';

describe('utils', () => {
  describe('closeModalScreen()', () => {
    let iosCloseMethod;

    beforeEach(() => {
      iosCloseMethod = jest.fn();

      NativeModules.ZPReactNativeBridgeListener = {
        postEvent: iosCloseMethod
      };
    });

    it('calls the correct native method on iOS', () => {
      closeModalScreen();

      expect(iosCloseMethod.mock.calls).toMatchSnapshot();
    });
  });
});
