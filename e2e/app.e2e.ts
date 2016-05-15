import { TapperGamePage } from './app.po';

describe('tapper-game App', function() {
  let page: TapperGamePage;

  beforeEach(() => {
    page = new TapperGamePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tapper-game works!');
  });
});
