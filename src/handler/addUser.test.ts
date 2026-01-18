import { expect, test } from 'vitest';
import { handler } from './addUser';

test('200 test', async () => {
  const response = await handler({
    request: {
      userName: 'test',
      email: 'test@example.com',
    },
  });
  expect(response).toEqual({
    statusCode: 200,
    body: 'OK',
  });
});

test('400 test', async () => {
  const response = await handler({
    request: {
      userName: 'test',
      email: 'testexample.com',
    },
  });
  expect(response).toEqual({
    statusCode: 400,
    body: 'Failed',
  });
});
