import { IdGenerator } from '../../domain/id/IdGenerator';
import { Email } from '../../domain/user/Email';
import { User } from '../../domain/user/User';
import { UserId } from '../../domain/user/UserId';
import { UserName } from '../../domain/user/UserName';
import { UserRepository } from '../../domain/user/UserRepository';
import { Err, Ok } from '../common/result';
import { Result } from '../common/types';

interface RegisterUserInput {
  userName: string;
  email: string;
}

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(input: RegisterUserInput): Promise<Result<null>> {
    try {
      // ValueObjectの生成
      const userName: UserName = new UserName(input.userName);
      const email: Email = new Email(input.email);

      // 登録可能化のチェック
      if (await this.userRepository.findByEmail(email)) {
        return Err(new Error('User already exists.'));
      }

      // User Entityの生成
      const userId: UserId = new UserId(this.idGenerator.generate());
      const user: User = new User(userId, userName, email);

      // 永続化
      await this.userRepository.save(user);
      return Ok(null);
    } catch (e) {
      return Err(e instanceof Error ? e : new Error('Validation Error.'));
    }
  }
}
