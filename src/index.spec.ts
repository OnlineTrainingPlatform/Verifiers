import { sum } from './index';

describe('test', () => {
  test('sum', async () => {
    expect(sum(1, 1)).toEqual(24);
  });
});
