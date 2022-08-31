# Simpu Mobile

This repository contains the application source code for the project Simpu Mobile customer platform.

## Motivation

Streamline all your chat channels into one powerful inbox. Sync WhatsApp, Twitter, Instagram, Messenger, SMS, iMessage, Website Chat, Telegram. Never lose a message again!



## Code style

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Tools used along this project

- [React Native](https://reactnative.dev/) as principal mobile framework.
- [@react-navigation](https://reactnavigation.org/) as the navigation in react
  native
- [ES6](http://es6-features.org) as the main language.
- [Async](https://github.com/caolan/async) as async utilities for node and the
  browser
- [Jest](https://jestjs.io/) as a testing framework.
- [@testing-library/react-native](https://testing-library.com/docs/react-native-testing-library/intro/)
  as TDD assertion library.
- [ESLint](http://eslint.org) as JavaScript linter.
- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
  as plugin for helping to follow the code style guide
- [Husky](https://github.com/typicode/husky) as git hook to check linter and
  test before commit.

## Screenshots

Include logo/demo screenshot etc.

## Tech used

### Built with

- [React Native](https://reactnative.dev/)

## Requirements

`nvm use 12.21.0`

`yarn use 1.22.10`

`gem install cocoapods -v 1.10.1`

## Installation

### Setup vars for environment

**_copy .env.example file with the vars gave by the dev team_**

0. `cp .env.example .env`

1. Cloned off the staging branch.

   ```bash
   gh repo clone https://gitlab.com/varens/Simpu.git
   git checkout staging
   ```

2. Install dependencies.

   ```bash
   yarn install && yarn prepare
   ```

3. iOS dependencies

   ```bash
    cd ios && pod install
   ```

4. Create the keystore.properties file, and ask for the content of this file

```bash
printf 'keyAlias=%s\nkeyPassword=%s\nstoreFile=%s\nstorePassword=%s' $keyAlias $keyPassword $storeFile $storePassword > ./android/keystore.properties
```

5. Ask for the release.keystore

### Running the Application in development

To run the app during development. you will follow the process listed below

- start metro packager run the command below to start the packager in a separate
  terminal console

this must be done in the root directory

```bash
yarn start --reset-cache
```

```sh
yarn ios
```

**_create a .netrc file in your home ~ directory and add this the keys in it_**

3.2. Android Studio configuration

3.2.1. Open android studio and install the following dependencies

Android 10 (Q)

Android SDK Platform 29.0.2

Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

## Debugging

To fulfill this task we will use Flipper you would install installed from
[here](https://fbflipper.com/) and add the plugin to work with redux

`Manage Plugins > Install Plugins > search "redux-debugger" > Install`

## Tests

### Run Unit tests

```sh
yarn test
```

### Run E2E tests

- You need to follow the
  [Getting started](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md)
- Then the set up on
  [Android](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md)
- Then the set up on
  [iOS](https://github.com/wix/Detox/blob/master/docs/Introduction.iOS.md)

End to End test on ios in debug mode, with a specific build

```sh
  yarn test:e2e-debug-build-ios && yarn test:e2e-debug-test-ios
```

End to End test on android in debug mode, with a specific build

```sh
  yarn test:e2e-debug-build-android && yarn test:e2e-debug-test-android
```



```sh
  yarn test:e2e-release-build-ios && yarn test:e2e-release-test-ios
```

CircleCI will do linting checks along with unit and integration tests. you will
run the following command on andorid

```sh
  yarn test:e2e-release-build-android && yarn test:e2e-release-test-android
```

this will run the end to end test using a release build

© [Simpu](https://www.simpu.co/)
