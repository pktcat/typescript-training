import { Email } from '../../domain/user/Email';
import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = this.users.find(u => {
      u.email.equals(email);
    });
    return user ?? null;
  }
}
