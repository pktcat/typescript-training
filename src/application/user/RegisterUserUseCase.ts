import { IdGenerator } from '../../domain/id/IdGenerator';
import { Email } from '../../domain/user/Email';
import { User } from '../../domain/user/User';
import { UserId } from '../../domain/user/UserId';
import { UserName } from '../../domain/user/UserName';
import { UserRepository } from '../../domain/user/UserRepository';
import { UuidGenerator } from '../../infrastructure/id/UuidGenerator';

interface RegisterUserInput {
  userName: string;
  email: string;
}

// 依存性注入
const idGenerator: IdGenerator = new UuidGenerator();

export class RegisterUserUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<void> {
    // ValueObjectの生成
    const userName: UserName = new UserName(input.userName);
    const email: Email = new Email(input.email);

    // 登録可能化のチェック
    if (await this._userRepository.findByEmail(email)) throw new Error('This user already exists.');

    // User Entityの生成
    const userId: UserId = new UserId(idGenerator.generate());
    const user: User = new User(userId, userName, email);

    // 永続化
    return await this._userRepository.save(user);
  }
}
