import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load index page', () => {
    page.navigateTo();
    expect(page.getRouterOutlet()).not.toBeUndefined();
  });
});
