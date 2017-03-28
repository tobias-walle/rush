import { ArticlesPage } from './articles.page';

describe('ArticlesPage', () => {
  let page: ArticlesPage;

  beforeEach(() => {
    page = new ArticlesPage();
  });

  it('should navigate', () => {
    page.navigateTo();
  });
});