import url from 'url';
import util from 'util';
import { Player } from './player';

describe('Player by API', () => {
  const playerUrl = url.resolve(browser.baseUrl, 'test/page/player.html');
  let player;

  beforeEach(() => {
    browser.get(playerUrl);
    player = new Player('vjs_video_3');
    browser.sleep(1000); //TODO: wait for player to be ready
  });

  it('should play', () => {
    player.play();
    expect(player.isPlaying()).toBe(true);
  });

  it('should set current time', () => {
    player.currentTime(3);
    player.getCurrentTime()
      .then((r) => expect(r).toBe(3));
  });

  it('should have no player errors', () => {
    expect(player.error()).toBe(null);
  });

});
