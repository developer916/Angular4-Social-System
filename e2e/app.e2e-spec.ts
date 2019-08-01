import { Angular2TestPage } from './app.po';

describe('angular2-test App', () => {
  let page: Angular2TestPage;

  beforeEach(() => {
    page = new Angular2TestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
