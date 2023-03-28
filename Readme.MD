# Simpu Mobile

This repository contains the application source code for the project Simpu Mobile customer platform.

## Motivation

Streamline all your chat channels into one powerful inbox. Sync WhatsApp, Twitter, Instagram, Messenger, SMS, iMessage, Website Chat, Telegram. Never lose a message again!

## Tech used

### Built with

- [React Native](https://reactnative.dev/)

## Requirements

`node`

`gem install cocoapods -v 1.10.1`

## Installation

`npm install`

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
   npm install
   ```

3. Start dependencies.

   ```bash
   npx react-native run-android
   ```

   ```bash
   npx react-native run-ios
   ```

4. iOS dependencies

   ```bash
    cd ios && pod install
   ```

5. Create the keystore.properties file, and ask for the content of this file

```bash
printf 'keyAlias=%s\nkeyPassword=%s\nstoreFile=%s\nstorePassword=%s' $keyAlias $keyPassword $storeFile $storePassword > ./android/keystore.properties
```

6. Ask for the release.keystore

### Running the Application in development

To run the app during development. you will follow the process listed below

- start metro packager run the command below to start the packager in a separate
  terminal console

this must be done in the root directory

```bash
npm start -- --reset-cache
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

© [Simpu](https://www.simpu.co/)
