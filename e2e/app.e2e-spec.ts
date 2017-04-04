import { AppPage } from './app.page';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate', () => {
    page.navigateTo();
  });
});