import url from 'url';
import util from 'util';
import { Player } from './player';

describe('Player', () => {
  const playerUrl = url.resolve(browser.baseUrl, 'test/page/player.html');
  let player;

  beforeEach(() => {
    player = new Player(playerUrl);
  });

  xit('should have no console errors', () => {
    browser.manage().logs().get('browser').then(logs => {
      let filteredLogs = logs.filter(log => !/favicon/.test(log.message));
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
    expect(player.paused()).toBe(true);

    // reset to beginning, the video may have finished
    // at the last isPlaying()
    player.currentTime(0);

    player.clickPlayControl();
    expect(player.isPlaying()).toBe(true);
  });
});
