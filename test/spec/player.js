const timeout = 5000;

export class Player {
  constructor(url) {
    browser.get(url);
    browser.executeScript(`
      playerStatus = document.createElement('div');
      player = videojs(document.querySelectorAll('.video-js')[0]);
      playerStatus.id = 'player-status';
      document.body.appendChild(playerStatus);
      player.ready(function() {
        playerStatus.classList.add('ready');
      });
    `);

    expect(this.hasCss('.ready')).toBe(true);
    if (!browser.isElementPresent(by.css('.video-js'))) {
      jasmine.getEnv().bailFast();
    }

    // Disable control bar autohide
    browser.executeScript(`player.options().inactivityTimeout = 0;`);
  }

  // UI
  hasCss(css) {
    return browser.wait(() => {
      return browser.isElementPresent(by.css(css));
    }, timeout);
  }

  clickElement(css) {
    browser.findElement(by.css(css)).click();
  }

  isPlaying() {
    browser.executeScript(`player.one('timeupdate', function(){
      playerStatus.classList.add('isPlaying');
    });`);

    if (this.hasCss('.isPlaying')) {
      browser.executeScript(`playerStatus.classList.remove('isPlaying');`);
      return this.hasCss('.vjs-playing') && browser.executeScript(`return !player.paused() && !player.ended() && player.error() === null;`);
    }

    return false;
  }

  isPaused() {
    return this.hasCss('.vjs-paused');
  }

  isFullscreen() {
    browser.executeScript(`player.one('fullscreenchange', function(){
      playerStatus.classList.add('isFullscreen');
    });`);

    if (this.hasCss('.isFullscreen')) {
      browser.executeScript(`playerStatus.classList.remove('isFullscreen');`);
      return this.hasCss('.vjs-fullscreen');
    }
    return false;
  }

  clickBigPlayButton() {
    this.clickElement('.vjs-big-play-button');
  }

  clickPlayControl() {
    this.clickElement('.vjs-play-control');
  }

  clickFullscreen() {
    this.clickElement('.vjs-fullscreen-control');
  }

  adIsPlaying() {
    return this.hasCss('.vjs-ad-playing') && browser.executeScript(`return !player.ima3.adPlayer.paused();`);
  }

  // API
  setCurrentTime(time) {
    browser.executeScript(`player.currentTime(arguments[0]);`, time);
  }

  getCurrentTime() {
    return browser.executeScript(`return player.currentTime();`);
  }

  play() {
    browser.executeScript(`player.play();`);
  }

  error() {
    return browser.executeScript(`return player.error();`);
  }
}
