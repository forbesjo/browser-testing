import util from 'util';
const timeout = 5000;

export class Player {
  constructor(url) {
    browser.get(url);
    browser.executeAsyncScript(done => {
      player = videojs(document.querySelectorAll('.video-js')[0]);
      player.ready(() => {
        // Disable control bar autohide
        player.options().inactivityTimeout = 0;
        done();
      });
    });

    if (!$('.video-js').isPresent()) {
      jasmine.getEnv().bailFast();
    }
  }

  bigPlayButton() {
    return $('.vjs-big-play-button');
  }

  playControl() {
    return $('.vjs-play-control');
  }

  fullscreen() {
    return $('.vjs-fullscreen-control');
  }

  hasCss(css) {
    return browser.wait($(css).isPresent, timeout, `Element by '${css}' could not be found`)
      .then(res => true, err => false);
  }

  isPlaying() {
    return browser.executeAsyncScript(done => {
      player.one('timeupdate', () => {
        let result = !player.paused() &&
          !player.ended() &&
          player.error() === null;
        done(result);
      });
    }).then(res => res, err => false);
  }

  isFullscreen() {
    return browser.executeAsyncScript(done => {
      player.one('fullscreenchange', () => {
        done(player.isFullscreen());
      });
    }).then(res => res, err => false);
  }

  adIsPlaying() {
    return this.hasCss('.vjs-ad-playing') &&
      browser.executeScript(() => !player.ima3.adPlayer.paused());
  }

  consoleLog() {
    // Skip errors about missing favicon
    return browser.manage().logs().get('browser').then(logs => {
      let filteredLogs = [];

      filteredLogs = logs.filter(log => !/favicon/.test(log.message));
      if (filteredLogs.length > 0) {
        console.log(`Console log: ${util.inspect(filteredLogs)}`);
      }

      return filteredLogs;
    });
  }

  currentTime(time) {
    if (time === undefined) {
      return browser.executeScript(() => player.currentTime());
    }

    return browser.executeScript(t => {
      player.currentTime(t);
      return player.currentTime();
    }, time);
  }

  play() {
    return browser.executeScript(() => {
      player.play();
    });
  }

  pause() {
    return browser.executeScript(() => {
      player.pause();
    });
  }

  paused() {
    return browser.executeScript(() => player.paused());
  }

  ended() {
    return browser.executeAsyncScript(done => {
      player.one('ended', () => {
        done(player.ended());
      });
    }).then(res => res, err => false);
  }

  duration() {
    return browser.executeScript(() => player.duration());
  }

  error() {
    return browser.executeScript(() => player.error());
  }
}
