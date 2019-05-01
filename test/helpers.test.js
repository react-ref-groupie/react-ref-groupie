import React from 'react';

import {
  splitTemplate,
  getRefsCurrent,
  clearRefByMark
} from '../src/helpers';

jest.mock('react');

describe('helpers', () => {
  it(
    'should split template string with whitespace symbols ' +
    'into an array',
    () => {
      expect(splitTemplate(`
        one
        two
        three
      `)).toEqual(['one', 'two', 'three']);
    }
  );

  it(
    'should return flat copy of an input object ' +
    'with only .ref.current fields',
    () => {
      expect(getRefsCurrent({
        firstTestElem: {
          ref: {
            current: 'first test'
          }
        },
        secondTestElem: {
          ref: {
            current: 'second test'
          }
        }
      })).toEqual({
        firstTestElem: 'first test',
        secondTestElem: 'second test'
      });
    }
  );

  it(
    'should recreate ref field on input object ' +
    'and cut second argument from lockedOn field',
    () => {
      React.createRef = jest.fn().mockImplementation(() => 'ref');

      const secondArgument = 'deleteIt';
      const inputObject = {
        ref: null,
        lockedOn: ['save it', secondArgument]
      };

      clearRefByMark(inputObject, secondArgument)

      expect(inputObject).toEqual({
        ref: 'ref',
        lockedOn: ['save it']
      });
      expect(React.createRef.mock.calls.length).toBe(1);
    }
  );
});
