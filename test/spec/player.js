const timeout = 1000;

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

    if (!element(by.css('.video-js')).isPresent()) {
      jasmine.getEnv().bailFast();
    }

    // Disable control bar autohide
    browser.executeScript(`player.options().inactivityTimeout = 0;`);
  }

  // UI
  hasCss(css) {
    return browser.wait(() => {
      return element(by.css(css)).isPresent();
    }, timeout);
  }

  waitScript(script) {
    return browser.wait(() => {
      return browser.executeScript(script);
    }, timeout);
  }

  clickElement(css) {
    element(by.css(css)).click();
  }

  isPlaying() {
    browser.executeScript(`
      timeupdate = 0;
      player.one('timeupdate', function() {
        timeupdate = 1;
        //playerStatus.classList.add('isPlaying');
      });
      isPlaying = function() {
        return timeupdate > 0 &&
          !player.paused() &&
          !player.ended() &&
          player.error() === null;
      };
    `);

    return this.waitScript(`return isPlaying();`);
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
    return this.hasCss('.vjs-ad-playing') &&
      browser.executeScript(`return !player.ima3.adPlayer.paused();`);
  }

  // API
  currentTime(time) {
    if (time === undefined) {
      return browser.executeScript(`return player.currentTime();`);
    }

    browser.executeScript(`player.currentTime(${time});`);
  }

  play() {
    browser.executeScript(`player.play();`);
  }

  paused() {
    return browser.executeScript(`return player.paused();`);
  }

  error() {
    return browser.executeScript(`return player.error();`);
  }
}
