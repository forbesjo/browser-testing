
# Automated Browser Testing
[![Build Status](https://travis-ci.org/forbesjo/browser-testing.svg?branch=master)](https://travis-ci.org/forbesjo/browser-testing)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/forbesjo-vjs.svg)](https://saucelabs.com/u/forbesjo-vjs)

## Overview
The planned workflow for browser automation is as follows:

1. The tests are stored in single-video-template or in a dedicated test repo.
1. Jenkins will watch the required repos for changes and trigger the tests.
1. Several player configurations are built.
1. The player files are compiled into template pages.
1. The pages are served.
1. The e2e tests are run against the pages on IE/Chrome/Firefox/Safari/Android/iOS.

Supported browsers:
- IE 8/9/10/11
- Chrome/Firefox/Safari (two versions back using Sauce Labs, latest using local browsers)
- Android 4.0
- Android 4.1
- Android 4.2
- Android 4.3
- Android 4.4
- Android 5
- iPhone iOS 7.0
- iPhone iOS 7.1.2
- iPhone iOS 8.1 - MOBILE152
- iPad iOS 7.0
- iPad iOS 7.1.2
- iPad iOS 8.1

## Environment Requirements

- See [this gist](https://gist.githubusercontent.com/forbesjo/597958a2b8736a3a4858/raw/setup.sh) for a quick install

  ```
  brew install git node android-sdk ideviceinstaller ios-webkit-debug-proxy
  brew install caskroom/cask/brew-cask
  brew cask install google-chrome
  brew cask install firefox
  brew cask install flash

  # install the SafariDriver extension
  curl -O http://selenium-release.storage.googleapis.com/2.45/SafariDriver.safariextz
  open SafariDriver.safariextz

  # set variables for Android
  touch ~/.bash_profile
  echo "export ANDROID_HOME=/usr/local/opt/android-sdk" >> ~/.bash_profile
  echo 'export JAVA_HOME=\$(/usr/libexec/java_home)' >> ~/.bash_profile
  source ~/.bash_profile

  android update sdk -u
  ```

  _If you recently upgrade from Mavericks to Yosemite and you are getting Homebrew errors try `cd /usr/local/Library && git pull origin master`_
- Disable any extensions/add-ons that may conflict with the automation (ex. Safari Restore).
- Android devices are in developer mode (tap "Build Number" in settings 7 times)
- iOS devices have UI automation on (Settings->Developer->Enable UI Automation)
- iOS devices have Web Inspector options on (Settings->Safari->Advanced->Web Inspector)

## Test Session Setup
- Check that the below devices are connected to the device testing machine
- Make sure your machine is on the same network as the device testing machine
- If using the CI testing machine check that it is running Appium, `ios_webkit_debug_proxy` for each of the iOS devices and webdriver-manager, otherwise grunt will automatically start everything for a local run

## Execution
- To execute the tests run `grunt test` or `npm test`.
- If the test is being run locally it will use your local Safari, Firefox and Chrome browsers and assumes that you have the correct devices connected by a USB hub (see the device list above).
- To run the tests against a CI machine `WEBDRIVER_SERVER=<server ip> grunt test`
- If the tests are being run in CI the browser tests will be run in Sauce Labs. Device testing must be run manually at this time until a dedicated device testing machine is set up.
- To manually run the Sauce Labs tests with your own Sauce credentials run `SAUCE_USERNAME=<username> SAUCE_ACCESS_KEY=<key> grunt test`

## Troubleshooting
- Reconnect devices
- Restart devices
- Check appium-doctor
- Clear iOS device logs. (see [this SO question](http://stackoverflow.com/questions/8153098/unable-to-connect-iphone-3gsios-5-0-1-with-instruments-application/23561590#23561590))
- Follow these instructions: [Protractor Mobile Setup](https://github.com/angular/protractor/blob/master/docs/mobile-setup.md)

## Android Testing Over Wifi
1. Connect device to computer via USB.
2. Make sure device and computer are connected to the same Wi-Fi.
3. Run `adb tcpip 5555` to restart adb and make it work over tcpip:
4. Disconnect device
5. Get IP address of your phone ("Settings" -> Wifi -> “Your connected network” -> Your IP address")
6. Run `adb connect <your phones ip address>` command to connect adb to your device over Wi-Fi using IP address:
7. Verify, that adb works remotely with `adb devices`
8. Run tests over Wi-Fi!

_From [discuss.appium.io](https://discuss.appium.io/t/tutorial-how-to-run-tests-on-real-android-device-remotely-through-wi-fi/1135)_

## Capabilities
The `protractor` task in the grunt file points to `*.config.js` files which define the different browser/device capabilities. These are things like browserName, deviceName, platformName, etc.

See [Appium capabilities](http://appium.io/slate/en/master/?javascript#appium-server-capabilities) and [webdriver capabilities](https://code.google.com/p/selenium/wiki/DesiredCapabilities) for the available options.
See [Sauce Labs](https://docs.saucelabs.com/reference/test-configuration/) for additional capability fields such as tags, name and appiumVersion.

## Notes
Test video is a 5 second clip with 5 frame of different color created using imagemagick and ffmpeg.

    brew install ffmpeg --with-libvorbis --with-libvpx --with-fdk-faac
    brew install imagemagick

    for i in `seq 0 4`; do convert -size 640x360 xc: +noise Random $i.png; done && \
    ffmpeg -framerate 1 -i %d.png -c:v libx264 -vf fps=1 -pix_fmt yuv420p video.mp4 && \
    ffmpeg -i video.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis video.webm
