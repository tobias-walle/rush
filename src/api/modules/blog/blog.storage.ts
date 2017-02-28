import { Article } from '../../../app/modules/blog/models/article';

/**
 * A simple class to store the articles in memory. Don't use this in production.
 * All articles will be deleted then the server shuts down.
 */
export class BlogStorage {
  articles: Article[];

  constructor() {
    this.articles = [];
  }

  getArticle(id: string) {
    return this.articles.find((article) => article.id === id);
  }

  addArticle(article: Article) {
    this.articles.push(article);
  }

  removeArticle(article: Article) {
    this.articles = this.articles.filter((other) => other.id !== article.id);
  }
}

