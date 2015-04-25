import url from 'url';
import util from 'util';
import { Player } from './player';

describe('Player', () => {
  const playerUrl = url.resolve(browser.baseUrl, 'test/page/player.html');
  let player;

  beforeEach(() => {
    browser.get(playerUrl);
    player = new Player();
  });

  it('page title should contain "video.js"', () => {
    expect(browser.getTitle()).toEqual('video.js');
  });

  it('page should contain vjs div', () => {
    expect(browser.isElementPresent(by.css('.video-js'))).toBe(true);
  });

  it('should have no console errors', () => {
    browser.manage().logs().get('browser').then(logs => {
      let filteredLogs = logs.filter((log) => (!/favicon/.test(log.message)));
      if (filteredLogs.length > 0) {
        console.log(util.inspect(filteredLogs));
      }
      expect(filteredLogs.length).toBe(0);
    });
  });

  it('should play', () => {
    player.clickBigPlayButton();
    expect(player.isPlaying()).toBe(true);
  });

  it('should pause and resume', () => {
    player.clickBigPlayButton();
    expect(player.isPlaying()).toBe(true);

    player.clickPlayControl();
    expect(player.isPaused()).toBe(true);

    player.clickPlayControl();
    expect(player.isPlaying()).toBe(true);
  });

  xit('should enter and exit full screen', () => {
    player.clickBigPlayButton();
    expect(player.isPlaying()).toBe(true);

    player.clickFullscreen();
    expect(player.isFullscreen()).toBe(true);

    player.clickFullscreen();
    expect(player.isFullscreen()).toBe(false);
  });

});
