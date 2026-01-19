import fs from 'fs/promises';
import { afterAll, beforeEach, describe, expect, test } from 'vitest';
import { handler } from './addUser';

const FILE_PATH = './users.txt';

describe('addUser handler', () => {
  beforeEach(async () => {
    await fs.writeFile(FILE_PATH, '');
  });
  afterAll(async () => {
    await fs.writeFile(FILE_PATH, '');
  });
  test('200 test', async () => {
    const response = await handler({
      request: {
        userName: 'test',
        email: 'test@example.com',
      },
    });
    expect(response).toEqual({
      statusCode: 200,
      body: 'Successfully created user "test".',
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
      body: 'Failed to create user "test".',
    });
  });
});
