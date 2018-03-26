import { Dimensions } from 'react-native';
import { getFrameDims } from '../../src/utils';

describe('utils', () => {
  describe('getFrameDims(maxWidth, ratio = 9 / 16)', () => {
    let dimensionsGetMock;

    beforeEach(() => {
      dimensionsGetMock = jest.fn();

      Dimensions.get = dimensionsGetMock;
    });

    it('will return correct height baised on width & default ratio', () => {
      dimensionsGetMock.mockReturnValue({ width: 1600 });

      expect(getFrameDims()).toMatchObject({ height: 900, width: 1600 });
    });
  });
});
