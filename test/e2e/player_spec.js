import url from 'url';
import util from 'util';

class Player {
  hasCss(css) {
    return browser.wait(() => browser.isElementPresent(by.css(css)));
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

describe('Player', () => {
  const playerUrl = url.resolve(browser.baseUrl, 'test/page/player.html');
  let player;

  beforeEach(() => {
    browser.get(playerUrl);
    player = new Player();
  });

  it('Page title contains "video.js"', () => {
    expect(browser.getTitle()).toEqual('video.js');
    
      });

  xit('There are no console errors', () => {
    browser.manage().logs().get('browser').then(log => {
      if (log.length > 0) {
        console.log(util.inspect(log));
      }
      expect(log.length).toBe(0);
    });
  });

  it('Test that clicking the play button works.', () => {
    player.bigPlayButton();
    expect(player.isPlaying()).toBe(true);
  });

  xit('Test that the media progresses as expected.', () => {});

  it('Test pause and resume works.', () => {
    
    player.bigPlayButton();
    expect(player.isPlaying()).toBe(true);

    player.playControl();
    expect(player.isPaused()).toBe(true);

    player.playControl();
    expect(player.isPlaying()).toBe(true);
  });

  xit('Test seeking (forwards and backwards) works.', () => {});

  xit('Test that switching videos in a playlist works.', () => {});

  xit('Test that emailing the video link and other social interactions pause the video and then let the user resume from paused point.', () => {});

  it('Test that going into and exiting full screen works', () => {
    player.bigPlayButton();
    expect(player.isPlaying()).toBe(true);
    browser.sleep(500);
    
    player.fullscreen();
    expect(player.isFullscreen()).toBe(true);
    browser.sleep(500);

    player.fullscreen();
    expect(player.isFullscreen()).toBe(false);
  });

  xit('Test pre-roll ads work', () => {
    // player is configured with a pre-roll ad
    player.bigPlayButton();
    // expect(player.adsArePlaying()).toBe(true);
  });

  xit('Test click-thrus work and you go to the advertiser’s landing page.', () => {});

  xit('Test you can come back after clicking through and resume your ad/video from where you left off.', () => {});

  xit('Test control bar is available and actionable during ads.', () => {});

  xit('Test you can pause ads.', () => {
    // player is configured with a pre-roll ad
    player.bigPlayButton();
    // expect(player.adsArePlaying()).toBe(true);

    player.playControl();
    expect(player.isPaused()).toBe(true);
  });

  xit('Test you can resume after pausing ads.', () => {
    // player is configured with a pre-roll ad
    player.bigPlayButton();
    // expect(player.adsArePlaying()).toBe(true);

    player.playControl();
    expect(player.isPaused()).toBe(true);

    player.playControl();
    expect(player.isPlaying()).toBe(true);
  });

  xit('Test transition to video content is seamless (no audio/video issues, no skips, no long delays, no spinners over video content)', () => {});

  xit('Verify you can enter and exit full screen while the ad is playing', () => {
    // player is configured with a pre-roll ad
    player.bigPlayButton();
    // expect(player.adsArePlaying()).toBe(true);

    player.fullscreen();
    expect(player.isFullscreen()).toBe(true);

    player.fullscreen();
    expect(player.isFullscreen()).toBe(false);
  });

  xit('Verify you cannot scrub through an ad (except when the native player takes over)', () => {});

  xit('Verify that if the ad errors out, it does not affect the playing of the video. The timeout should not be so long as to affect the viewing experience.', () => {});

  xit('If the video is unavailable for any reason, the ad should play.', () => {});

  xit('Test you can enable and disable captions', () => {});

  xit('Test you can update caption settings.', () => {});

  xit('Test caption settings persist across multiple browser loads.', () => {});

  xit('Test you can load and view players via Accessibility options.', () => {});

});
