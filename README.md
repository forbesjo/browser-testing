
# Automated Browser Testing
[![Build Status](https://travis-ci.org/forbesjo/browser-testing.svg?branch=master)](https://travis-ci.org/forbesjo/browser-testing)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/forbesjo-vjs.svg)](https://saucelabs.com/u/forbesjo-vjs)

## Overview
The planned workflow for browser automation is as follows:

- A test engineer will kick off the test suites manually while connected to a hub of devices or from a dedicated device testing machine. This will test as many devices as possible and the latest Mac desktop browsers.
- A developer will not have to run these tests manually. Instead a CI build sends the testing jobs to Sauce Labs. This will cover both Mac and Windows desktop browsers with two versions back. This does not cover devices. The CI build could also trigger tests on a dedicated device testing machine.

A more detailed process:

1. The tests are stored in single-video-template.
1. Several player configurations are built with a build task.
1. The player files are compiled into template pages.
1. The pages are served.
1. The e2e tests are run against the pages.

## Environment Requirements
- See [this gist](https://gist.githubusercontent.com/forbesjo/597958a2b8736a3a4858/raw/setup.sh) for a quick install
    ```
    brew install git node android-sdk ideviceinstaller ios-webkit-debug-proxy
    brew install caskroom/cask/brew-cask
    brew cask install google-chrome
    brew cask install firefox
    brew cask install virtualbox
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
- Disable any extensions/add-ons that may conflict with the automation (ex. Safari Restore).
- Android devices are in developer mode (tap "Build Number" in settings 7 times)
- iOS devices have UI automation on (Settings->Developer->Enable UI Automation)
- iOS devices have Web Inspector options on (Settings->Safari->Advanced->Web Inspector)
- `grunt updateWebdriver`
- `grunt copy` then `node_modules/.bin/appium` to start Appium
- `adb devices` to connect the Android devices
- `node_modules/.bin/webdriver-manager start` to start the browser Selenium server
- `ios_webkit_debug_proxy -c <UDID>:27753` running for each of the iOS devices

## Test Session Setup
- Check that the below devices are connected to the device testing machine
- Make sure your machine is on the same network as the device testing machine
- Check that the testing machine is running Appium, `ios_webkit_debug_proxy` for each of the iOS devices and webdriver-manager

## Execution
- To execute the tests run `grunt test` or `npm test`.
- If the test is being run locally it will use your local Safari, Firefox and Chrome browsers and assumes that you have the correct devices connected by a USB hub (see the device list below).
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
The ```protractor``` task in the grunt file points to ```*.config.js``` files which define the different browser/device capabilities. These are things like browserName, deviceName, platformName, etc.

See [Appium capabilities](http://appium.io/slate/en/master/?javascript#appium-server-capabilities) and [webdriver capabilities](https://code.google.com/p/selenium/wiki/DesiredCapabilities) for the available options.
See [Sauce Labs](https://docs.saucelabs.com/reference/test-configuration/) for additional capability fields such as tags, name and appiumVersion.

## Device List
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
