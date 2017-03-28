import { browser } from 'protractor';

export class ArticlesPage {
  navigateTo() {
    browser.get('http://localhost:3000/blog');
  }
};
