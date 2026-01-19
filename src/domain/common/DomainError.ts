type DomainErrorReason = 'InvalidEmail' | 'InvalidUserName' | 'BusinessRuleViolation';

export class DomainError extends Error {
  constructor(
    public readonly reason: DomainErrorReason,
    message?: string
  ) {
    super(message ?? reason);
    this.name = 'DomainError';
  }
}
