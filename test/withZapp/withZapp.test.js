import { propsParser } from '../../src/withZapp';

describe('withZapp HOC', () => {
  describe('propsParser(props, platform)', () => {
    it('will correctly parse values for android', () => {
      expect(propsParser({ foo: 'bar' }, 'android')).toMatchObject({
        foo: 'bar'
      });
      expect(
        propsParser({ extra_props: '{"foo": "bar"}' }, 'android')
      ).toMatchObject({
        extra_props: { foo: 'bar' }
      });
      expect(
        propsParser({ extra_props: '{"foo": "bar"}' }, 'ios')
      ).toMatchObject({
        extra_props: '{"foo": "bar"}'
      });
    });

    it('will cope with realish android props', () => {
      expect(
        propsParser(
          {
            is_tablet: false,
            localization: JSON.stringify({}),
            settings: JSON.stringify({}),
            styles: JSON.stringify({
              tablet: { plat: 'tablet' },
              smartphone: { plat: 'smartphone' }
            }),
            extra_props: JSON.stringify({
              foo: 'bar',
              data_source_model: JSON.stringify({ double: 'stringified' })
            })
          },
          'android'
        )
      ).toMatchObject({
        is_tablet: false,
        localization: {},
        settings: {},
        styles: { plat: 'smartphone' },
        extra_props: {
          foo: 'bar',
          data_source_model: { double: 'stringified' }
        }
      });

      expect(
        propsParser(
          {
            is_tablet: true,
            localization: JSON.stringify({}),
            settings: JSON.stringify({}),
            styles: JSON.stringify({
              tablet: { plat: 'tablet' },
              smartphone: { plat: 'smartphone' }
            }),
            extra_props: JSON.stringify({})
          },
          'android'
        )
      ).toMatchObject({
        is_tablet: true,
        localization: {},
        settings: {},
        styles: { plat: 'tablet' },
        extra_props: {}
      });
    });

    it('will cope with realish ios props', () => {
      expect(
        propsParser(
          {
            is_tablet: false,
            localization: {},
            settings: {},
            styles: { plat: 'orig' },
            extra_props: {
              foo: 'bar',
              data_source_model: { not: 'stringified' }
            }
          },
          'ios'
        )
      ).toMatchObject({
        is_tablet: false,
        localization: {},
        settings: {},
        styles: { plat: 'orig' },
        extra_props: {
          foo: 'bar',
          data_source_model: { not: 'stringified' }
        }
      });
    });
  });
});
