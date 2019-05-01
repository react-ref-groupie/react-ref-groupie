import processConfig from '../src/process-config';

const helpers = require('../src/helpers');

describe('process-config', () => {
  it('should process config correctly', () => {
    const inputConfig = {
      configName: {
        refs: `
          first
          second
        `,
        globals: `
          third
          fourth
        `,
        someMethod: () => {}
      }
    };

    const spy = jest.spyOn(
      inputConfig.configName,
      'someMethod'
    );

    const {
      refGroupsMethods,
      internalRefs
    } = processConfig(inputConfig);

    refGroupsMethods.configName.someMethod();

    expect(spy).toBeCalledWith(
      {
        first: null,
        second: null,
        fourth: null,
        third: null
      },
      undefined
    );

    expect(internalRefs).toEqual({
      configName: [
        'first',
        'second',
        'third',
        'fourth'
      ].reduce((accum, refName) => {
        accum[refName] = {
          lockedOn: [],
          ref: {
            current: null
          }
        };
        return accum;
      }, {})
    });
  });

  it('should call logRefUsageError', () => {
    helpers.logRefUsageError = jest.fn();

    const inputConfig = {
      configName: {
        refs: `
          first
          second
        `,
        globals: `
          third
          fourth
        `,
        someMethod: () => {}
      }
    };

    const {
      refGroupsMethods,
      internalRefs
    } = processConfig(inputConfig);

    internalRefs.configName.first.lockedOn = [1, 2];

    refGroupsMethods.configName.someMethod();

    expect(helpers.logRefUsageError.mock.calls.length).toBe(1);
    expect(helpers.logRefUsageError).toBeCalledWith('configName');
  });

  describe('should call logNameCollision', () => {
    beforeEach(() => {
      helpers.logNameCollisionError = jest.fn();
    });

    it('refs && globals names collision', () => {
      const inputConfig = {
        configName: {
          refs: 'collision',
          globals: 'collision'
        }
      };
      processConfig(inputConfig);
      expect(helpers.logNameCollisionError.mock.calls.length).toBe(1);
      expect(helpers.logNameCollisionError).toBeCalledWith('configName', 'collision');
    });

    it('refs && method names collision', () => {
      const inputConfig = {
        configName: {
          refs: 'errorMethod',
          errorMethod: () => {}
        }
      };
      processConfig(inputConfig);
      expect(helpers.logNameCollisionError.mock.calls.length).toBe(1);
      expect(helpers.logNameCollisionError).toBeCalledWith('configName', 'errorMethod');
    });

    it('globals && method names collision', () => {
      const inputConfig = {
        configName: {
          globals: 'errorMethod',
          errorMethod: () => {}
        }
      };
      processConfig(inputConfig);
      expect(helpers.logNameCollisionError.mock.calls.length).toBe(1);
      expect(helpers.logNameCollisionError).toBeCalledWith('configName', 'errorMethod');
    });
  });
});
