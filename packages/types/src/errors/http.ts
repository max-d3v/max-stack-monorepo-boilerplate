export class HttpError extends Error {
  readonly statusCode: number;
  readonly details: unknown | undefined;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
