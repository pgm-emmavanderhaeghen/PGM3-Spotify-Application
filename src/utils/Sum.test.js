/* eslint-disable no-undef */
import sum from './Sum.js';

test('arg a + arg b should be equal as the sum', () => {
  expect(sum(10, 190)).toBe(200);
  expect(sum(-18, 19)).toBe(1);
});
