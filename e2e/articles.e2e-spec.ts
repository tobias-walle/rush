import { MainPage } from './articles.page';

describe('MainPage', () => {
  let page: MainPage;

  beforeEach(() => {
    page = new MainPage();
  });

  it('should navigate', () => {
    page.navigateTo();
  });
});