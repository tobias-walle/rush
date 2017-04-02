import { browser } from 'protractor';

export class MainPage {
  navigateTo() {
    browser.get('http://localhost:3000/');
  }
};
