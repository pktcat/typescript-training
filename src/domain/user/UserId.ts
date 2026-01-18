export class UserId {
  private readonly _id: string;

  constructor(id: string) {
    this._id = id;
  }

  equals(other: UserId): boolean {
    return this._id === other._id;
  }

  get value(): string {
    return this._id;
  }
}
