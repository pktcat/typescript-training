import { RegisterUserUseCase } from '../application/user/RegisterUserUseCase';
import { UuidGenerator } from '../infrastructure/id/UuidGenerator';
import { InMemoryUserRepository } from '../infrastructure/user/InMemoryUserRepository';

interface Event {
  request: {
    userName: string;
    email: string;
  };
}

interface Response {
  statusCode: number;
  body: string;
}

export const handler = async (event: Event): Promise<Response> => {
  const { userName, email } = event.request;

  const userRepository = new InMemoryUserRepository();
  const idGenerator = new UuidGenerator();

  const usecase = new RegisterUserUseCase(userRepository, idGenerator);

  try {
    await usecase.execute({
      userName,
      email,
    });
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: 'Failed',
    };
  }

  return {
    statusCode: 200,
    body: 'OK',
  };
};

console.log(
  handler({
    request: {
      userName: 'test',
      email: 'test@example.com',
    },
  })
);
