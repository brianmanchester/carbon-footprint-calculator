import { parseQueryParamToStringArray } from './index';

describe('tests for parseQueryParamToStringArray', () => {
  it('should return param values when there is a match', () => {
    expect(parseQueryParamToStringArray({ good: ['test'] }, 'good')).toEqual({
      error: undefined,
      value: ['test']
    });

    expect(
      parseQueryParamToStringArray(
        { goodOne: ['test-one'], goodTwo: ['test-two', 'test-three'] },
        'goodTwo'
      )
    ).toEqual({
      error: undefined,
      value: ['test-two', 'test-three']
    });
  });

  it('should return an error when there is no match', () => {
    expect(parseQueryParamToStringArray({ good: ['test'] }, 'bad').error)
      .toBeTruthy;
  });

  it('should return an error when the value is not a string', () => {
    expect(parseQueryParamToStringArray({ bad: 'test' }, 'bad').error)
      .toBeTruthy;
  });
});
