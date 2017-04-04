import { browser } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.get('http://localhost:3000/');
  }
};
