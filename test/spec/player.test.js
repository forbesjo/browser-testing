import url from 'url';
import { Player } from './player';

describe('Player', () => {
  const playerUrl = url.resolve(browser.baseUrl, 'test/page/player.html');
  let player;

  beforeEach(() => {
    player = new Player(playerUrl);
  });

  it('should have no console errors', () => {
    // cannot get logs with iedriver
    if (!/explorer/i.test(browser.browserName)) {
      player.bigPlayButton().click();
      player.consoleLog().then(logs => {
        expect(logs.length).toBe(0);
      });
    }
  });

  it('should have no player errors', () => {
    expect(player.error()).toBeNull();
  });

  it('should play', () => {
    player.bigPlayButton().click();
    expect(player.isPlaying()).toBe(true);
  });

  it('should set current time', () => {
    player.bigPlayButton().click();
    player.playControl().click();
    expect(player.currentTime(3)).toBeCloseTo(3, 0);
  });

  it('should seek (forwards and backwards)', () => {
    player.bigPlayButton().click();
    player.playControl().click();
    expect(player.currentTime(4)).toBeCloseTo(4, 0);
    expect(player.currentTime(2)).toBeCloseTo(2, 0);
  });

  it('should progress', () => {
    player.bigPlayButton().click();
    var time1 = player.currentTime();
    browser.executeAsyncScript(done => {
      player.on('timeupdate', () => {
        if (player.currentTime() >= 1) done();
      });
    });
    var time2 = player.currentTime();
    expect(time1).toBeLessThan(time2);
  });

  it('should pause and resume', () => {
    player.bigPlayButton().click();
    expect(player.isPlaying()).toBe(true);
    player.playControl().click();
    expect(player.paused()).toBe(true);

    // reset to beginning, the video may have finished
    // at the last isPlaying()
    player.currentTime(0);

    player.playControl().click();
    expect(player.isPlaying()).toBe(true);
  });
});
