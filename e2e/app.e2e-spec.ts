import { Vedur3000Page } from './app.po';

describe('vedur3000 App', function() {
  let page: Vedur3000Page;

  beforeEach(() => {
    page = new Vedur3000Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
