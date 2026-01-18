export class Email {
  private readonly _address: string;

  constructor(address: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(address)) {
      throw new Error('Email is invalid');
    }

    this._address = address;
  }

  equals(other: Email): boolean {
    return this._address === other._address;
  }

  get value(): string {
    return this._address;
  }
}
