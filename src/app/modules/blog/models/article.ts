export class Article {
  id: string;

  constructor(
    public subject: string,
    public body: string,
  ) {
    this.id = Math.random().toString(32);
  }
}