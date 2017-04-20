import { FoosMatchmakingPage } from './app.po';

describe('foos-matchmaking App', () => {
  let page: FoosMatchmakingPage;

  beforeEach(() => {
    page = new FoosMatchmakingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
