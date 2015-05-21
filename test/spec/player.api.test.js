import url from 'url';
import util from 'util';
import { Player } from './player';

describe('Player by API', () => {
  const playerUrl = url.resolve(browser.baseUrl, 'test/page/player.html');
  let player;

  beforeEach(() => {
    player = new Player(playerUrl);
  });

  it('should play', () => {
    player.play();
    expect(player.isPlaying()).toBe(true);
  });

  it('should set current time', () => {
    player.currentTime(3);
    player.currentTime()
      .then(r => expect(r).toBe(3));
  });

  it('should have no player errors', () => {
    expect(player.error()).toBe(null);
  });

  it('should seek (forwards and backwards)', () => {
    player.currentTime(3);
    player.currentTime()
      .then(r => expect(r).toBe(3));

    player.currentTime(2);
    player.currentTime()
      .then(r => expect(r).toBe(2));
  });
});
