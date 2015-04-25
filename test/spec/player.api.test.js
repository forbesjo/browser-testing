import url from 'url';
import util from 'util';
import { Player } from './player';

describe('Player by API', () => {
  const playerUrl = url.resolve(browser.baseUrl, 'test/page/player.html');
  let player;

  beforeEach(() => {
    browser.get(playerUrl);
    player = new Player();
  });

  it('should play', () => {
    player.play();
    expect(player.isPlaying()).toBe(true);
  });

  it('should set current time', () => {
    player.setCurrentTime(3);
    player.getCurrentTime()
      .then((r) => expect(r).toBe(3));
  });

  it('should have no player errors', () => {
    expect(player.error()).toBe(null);
  });

});
