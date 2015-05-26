import url from 'url';
import { Player } from './player';

describe('Player', () => {
  const playerUrl = url.resolve(browser.baseUrl, 'test/page/player.html');
  let player, browserName;

  beforeEach(() => {
    player = new Player(playerUrl);

    browser.getCapabilities().then(caps => {
      browserName = caps.caps_.browserName;
    });
  });

  it('should have no console errors', () => {
    // cannot get logs with iedriver
    if (!/explorer/i.test(browserName)) {
      player.clickBigPlayButton();
      browser.sleep(1000);
      expect(player.consoleLog().length).toBe(0);
    }
  });

  it('should have no player errors', () => {
    expect(player.error()).toBeNull();
  });

  it('should play', () => {
    player.clickBigPlayButton();
    expect(player.isPlaying()).toBe(true);
  });

  it('should set current time', () => {
    player.clickBigPlayButton();
    player.pause();
    browser.sleep(1500);

    player.currentTime(3);
    expect(player.currentTime()).toBe(3);
  });

  it('should seek (forwards and backwards)', () => {
    player.clickBigPlayButton();
    player.pause();
    browser.sleep(1500);

    player.currentTime(3);
    browser.sleep(500);
    expect(player.currentTime()).toBe(3);

    player.currentTime(2);
    browser.sleep(500);
    expect(player.currentTime()).toBe(2);
  });

  it('should progress', () => {
    player.clickBigPlayButton();
    browser.sleep(500);
    var time1 = player.currentTime();
    browser.sleep(500);
    var time2 = player.currentTime();
    expect(time1).toBeLessThan(time2);
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
