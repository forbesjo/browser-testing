
# Automated Browser Testing
[![Build Status](https://travis-ci.org/forbesjo/browser-testing.svg?branch=master)](https://travis-ci.org/forbesjo/browser-testing) [![Sauce Test Status](https://saucelabs.com/buildstatus/forbesjo-vjs)](https://saucelabs.com/u/forbesjo-vjs)

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
- Follow these instructions: [Protractor Mobile Setup](https://github.com/angular/protractor/blob/master/docs/mobile-setup.md)
- Install [SafariDriver extension](http://selenium-release.storage.googleapis.com/2.45/SafariDriver.safariextz) in Safari
- Disable any extensions/add-ons that may conflict with the automation (ex. Safari Restore).
- Android devices are in developer mode (tap "Build Number" in settings 7 times)
- iOS devices have UI automation on (Settings->Developer->Enable UI Automation)
- iOS devices have Web Inspector options on (Settings->Safari->Advanced->Web Inspector)

## Test Session Setup
- Find the devices in the list below
- Make sure your machine and devices are connected to BRIGHTCOVE Wifi
- Disconnect any personal devices
- Connect iOS devices
- Install dependencies: ```npm install```
- Run the setup script to check for pre-reqs: ```grunt setup```

## Execution
- To execute the tests run ```grunt test``` or ```npm test```.
- If the test is being run locally it will use your local Safari, Firefox and Chrome browsers and assumes that you have the correct devices connected by a USB hub (see the device list below).
- If the tests are being run in CI the browser tests will be run in Sauce Labs. Device testing must be run manually at this time until a dedicated device testing machine is set up.
- To manually run the Sauce Labs tests with your own Sauce credentials run
    ```
    sc -u <username> -k <key>

    SAUCE_USERNAME=<username> SAUCE_ACCESS_KEY=<key> grunt test
    ```
- After the test session is finished you can view the report under test/screenshots/report.html

## Troubleshooting
- Reconnect devices
- Restart devices
- Check appium-doctor
- Clear iOS device logs. (see [this SO question](http://stackoverflow.com/questions/8153098/unable-to-connect-iphone-3gsios-5-0-1-with-instruments-application/23561590#23561590))

## Android Testing Over Wifi
1. Connect device to computer via USB.
2. Make sure device and computer are connected to the same Wi-Fi.
3. Run this command to restart adb and make it work over tcpip:
    ```adb tcpip 5555```
4. Disconnect device
5. Get IP address of your phone ("Settings" -> Wifi -> “Your connected network” -> Your IP address")
6. Run this command to connect adb to your device over Wi-Fi using IP address:
    ```adb connect <your phones ip address>```
7. Verify, that adb works remotely:
    ```adb devices```
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

