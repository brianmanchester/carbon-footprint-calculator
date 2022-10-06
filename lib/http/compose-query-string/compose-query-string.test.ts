import { composeQueryString } from './index';

describe('tests for composeQueryString', () => {
  it('should compose the correct query string with string values', () => {
    expect(composeQueryString({ one: 'test-one', two: 'test-two' })).toEqual(
      '?one=test-one&two=test-two'
    );
  });

  it('should compose the correct query string with string array values', () => {
    expect(
      composeQueryString({ one: ['one', 'two', 'three'], two: 'test-two' })
    ).toEqual('?one=one%2Ctwo%2Cthree&two=test-two');
  });

  it('should correctly encode special characters', () => {
    expect(
      composeQueryString({ one: ['one', 'two', 'three'], two: 'test two' })
    ).toEqual('?one=one%2Ctwo%2Cthree&two=test%20two');
  });

  it('should return an empty string when there are no params', () => {
    expect(composeQueryString({})).toEqual('');
  });
});
