import { parseQueryParamToStringArray } from './index';

test('parseQueryParamToStringArray to return param values when there is a match', () => {
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

test('parseQueryParamToStringArray to return an error when there is no match', () => {
  expect(parseQueryParamToStringArray({ good: ['test'] }, 'bad').error)
    .toBeTruthy;
});

test('parseQueryParamToStringArray to return an error when the value is not a string', () => {
  expect(parseQueryParamToStringArray({ bad: 'test' }, 'bad').error).toBeTruthy;
});
