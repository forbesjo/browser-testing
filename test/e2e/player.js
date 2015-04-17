export class Player {
  constructor(id) {
    this.player = `videojs.players['${id}']`;
  }

  // UI
  hasCss(css) {
    return browser.wait(() => {
      return browser.isElementPresent(by.css(css));
    }, 5000);
  }

  clickElement(css) {
    browser.findElement(by.css(css)).click();
  }

  isPlaying() {
    return this.hasCss('.vjs-playing');
  }

  isPaused() {
    return this.hasCss('.vjs-paused');
  }

  isFullscreen() {
    return this.hasCss('.vjs-fullscreen');
  }

  bigPlayButton() {
    this.clickElement('.vjs-big-play-button');
  }

  playControl() {
    this.clickElement('.vjs-play-control');
  }

  fullscreen() {
    this.clickElement('.vjs-fullscreen-control');
  }

  // API
  currentTime(time) {
    browser.executeScript(`${this.player}.currentTime(arguments[0]);`, time);
  }

  getCurrentTime() {
    return browser.executeScript(`return ${this.player}.currentTime();`);
  }

  play() {
    browser.executeScript(`${this.player}.play();`);
  }

  error() {
    return browser.executeScript(`${this.player}.error();`);
  }
}
