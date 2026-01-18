import { Email } from './Email';
import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  private readonly _userId: UserId;
  private readonly _userName: UserName;
  private readonly _email: Email;

  constructor(userId: UserId, userName: UserName, email: Email) {
    this._userId = userId;
    this._userName = userName;
    this._email = email;
  }

  equals(other: User): boolean {
    return this._userId.equals(other.userId);
  }

  get userId(): UserId {
    return this._userId;
  }

  get userName(): UserName {
    return this._userName;
  }

  get email(): Email {
    return this._email;
  }
}
