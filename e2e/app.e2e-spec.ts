import { FlameClientPage } from './app.po';

describe('flame-client App', () => {
  let page: FlameClientPage;

  beforeEach(() => {
    page = new FlameClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
