export class Player {
  hasCss(css) {
    return browser.wait(() => browser.isElementPresent(by.css(css)), 5000);
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
}
