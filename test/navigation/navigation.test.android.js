import { NativeModules } from 'react-native';
import { closeModalScreen, openInternalURL } from '../../src/navigation';

describe('navigation', () => {
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

  describe('openInternalURL(params, reactParams = {})', () => {
    let openInternalURLMock;

    beforeEach(() => {
      openInternalURLMock = jest.fn();

      NativeModules.Linking = {
        openInternalURL: openInternalURLMock
      };
    });

    it('will call native module with correct URL', () => {
      openInternalURL(
        {
          bundle: 'SingleChannelEPG',
          plugin: 'SingleChannelEPG',
          presentation: 'presentNoNavigation'
        },
        { channelId: 'xxx', channelTitle: 'BBC 4' }
      );

      expect(openInternalURLMock.mock.calls).toMatchSnapshot();
    });
  });
});
