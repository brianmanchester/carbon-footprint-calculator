import { parseQueryParamToString } from './index';

describe('tests for parseQueryParamToString', () => {
  it('should return param values when there is a match', () => {
    expect(parseQueryParamToString({ good: 'test' }, 'good')).toEqual({
      error: undefined,
      value: 'test'
    });

    expect(
      parseQueryParamToString(
        { goodOne: 'test-one', goodTwo: 'test-two' },
        'goodTwo'
      )
    ).toEqual({
      error: undefined,
      value: 'test-two'
    });
  });

  it('should return an error when there is no match', () => {
    expect(parseQueryParamToString({ good: 'test' }, 'bad').error).toBeTruthy;
  });

  it('should return an error when the value is not a string', () => {
    expect(parseQueryParamToString({ bad: ['test'] }, 'bad').error).toBeTruthy;
  });
});
