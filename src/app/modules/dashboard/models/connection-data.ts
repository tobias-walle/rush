export class ConnectionData {
  constructor(
    public loading?: boolean,
    public interval?: number,
    public error?: string,
    public value?: any,
  ) { }
}