export class HttpError extends Error {
  private statusCode: number;
  private details: unknown | undefined;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
