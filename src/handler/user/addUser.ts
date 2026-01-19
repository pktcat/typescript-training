import { RegisterUserUseCase } from '../../application/user/RegisterUserUseCase';
import { UuidGenerator } from '../../infrastructure/id/UuidGenerator';
import { TxtFileUserRepository } from '../../infrastructure/user/TxtFileUserRepository';
import { createErrorResponse, createOKResponse } from '../common/response';
import type { Handler } from '../common/types';

interface AddUserRequest {
  userName: string;
  email: string;
}

export const handler: Handler<AddUserRequest> = async event => {
  const { userName, email } = event.request;

  const userRepository = new TxtFileUserRepository();
  const idGenerator = new UuidGenerator();

  const usecase = new RegisterUserUseCase(userRepository, idGenerator);

  const result = await usecase.execute({
    userName,
    email,
  });

  if (!result.success) createErrorResponse(result.error.message);
  return createOKResponse(`Successfully created user "${userName}".`);
};
