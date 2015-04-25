let timeout = 5000;

export class Player {
  constructor() {
    this.hasCss('.ready');
    this.hasCss('.loadstart');
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
    // Wait until fullscreen animation completes
    browser.sleep(1000);
    return this.hasCss('.vjs-fullscreen');
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

  // playIOS(){
  //   driver
  //     .contexts() // Cannot tap on a physical device webView
  //     .then((contexts) => {
  //       return driver.context(contexts[0]);
  //     })
  //     .elementByClassName('UIAWebView')
  //     .click()
  //     .contexts()
  //     .then((contexts) => {
  //       return driver.context(contexts[1]);
  //     });
  // }
}
