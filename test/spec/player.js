import util from 'util';
const timeout = 5000;

export class Player {
  constructor(url) {
    browser.get(url);
    browser.executeScript(`
      player = videojs(document.querySelectorAll('.video-js')[0]);
      ready = false;
      player.ready(function() {
        ready = true;
        // Disable control bar autohide
        player.options().inactivityTimeout = 0;
      });
    `);

    if (!element(by.css('.video-js')).isPresent()) {
      jasmine.getEnv().bailFast();
    }

    browser.sleep(1000);
  }

  // UI
  hasCss(css) {
    return browser.wait(element(by.css(css)).isPresent, timeout, `Element by '${css}' could not be found`);
  }

  waitScript(script) {
    return browser.wait(() => browser.executeScript(script), timeout, `Script '${script}' did not return true`);
  }

  clickElement(css) {
    element(by.css(css)).click();
  }

  isPlaying() {
    browser.executeScript(`
      timeupdated = false;
      player.one('timeupdate', function() {
        timeupdated = true;
      });
      isPlaying = function() {
        return timeupdated &&
          !player.paused() &&
          !player.ended() &&
          player.error() === null;
      };
    `);

    return this.waitScript(`return isPlaying();`);
  }

  isFullscreen() {
    browser.executeScript(`
      fullscreenchanged = false;
      player.one('fullscreenchange', function(){
        fullscreenchanged = true;
      });
    `);

    return this.waitScript(`
      return fullscreenchanged && player.isFullscreen();
    `);
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

  consoleLog() {
    let filteredLogs = [];
    // Skip errors about missing favicon
    browser.manage().logs().get('browser').then(logs => {
      filteredLogs = logs.filter(log => !/favicon/.test(log.message));
      if (filteredLogs.length > 0) {
        console.log(`Console log: ${util.inspect(filteredLogs)}`);
      }
    });

    return filteredLogs;
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

  pause() {
    browser.executeScript(`player.pause();`);
  }

  paused() {
    return browser.executeScript(`return player.paused();`);
  }

  ended() {
    return browser.executeScript(`return player.ended();`);
  }

  duration() {
    return browser.executeScript(`return player.duration();`);
  }

  error() {
    return browser.executeScript(`return player.error();`);
  }
}
