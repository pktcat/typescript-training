export class UserName {
  private readonly _name: string;

  constructor(name: string) {
    if (name.length === 0) {
      throw new Error('UserName is invalid');
    }

    this._name = name;
  }

  equals(other: UserName): boolean {
    return this._name === other._name;
  }

  get value(): string {
    return this._name;
  }
}
