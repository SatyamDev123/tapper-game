export class TapperGamePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tapper-game-app h1')).getText();
  }
}
