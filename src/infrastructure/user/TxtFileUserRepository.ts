import fs from 'fs/promises';
import { Email } from '../../domain/user/Email';
import { User } from '../../domain/user/User';
import { UserId } from '../../domain/user/UserId';
import { UserName } from '../../domain/user/UserName';
import { UserRepository } from '../../domain/user/UserRepository';

const FILE_PATH = './users.txt';

export class TxtFileUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const line = JSON.stringify({
      id: user.userId.value,
      name: user.userName.value,
      email: user.email.value,
    });
    await fs.appendFile(FILE_PATH, line + '\n');
  }

  async findByEmail(email: Email): Promise<User | null> {
    try {
      const content = await fs.readFile(FILE_PATH, 'utf-8');
      const lines = content.split('\n').filter(Boolean);

      for (const line of lines) {
        const data = JSON.parse(line);
        if (data.email === email.value) {
          return new User(new UserId(data.id), new UserName(data.name), new Email(data.email));
        }
      }
      return null;
    } catch {
      throw new Error('Infrastructure Error? Domain Error?');
    }
  }
}
