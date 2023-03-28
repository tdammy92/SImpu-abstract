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

1. Cloned off the feature/integration branch.

   ```bash
   git clone https://github.com/tdammy92/SImpu-abstract.git

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

5. Ask for the release.keystore

### Running the Application in development

To run the app during development. you will follow the process listed below

- start metro packager run the command below to start the packager in a separate
  terminal console

this must be done in the root directory

```bash
npm start -- --reset-cache
```

##Current crash issue

Note: App crashes after changing an organisation for the first time after login.

- Please kindly use the .env file sent to you.
- Use the login details sent to you for testing

Note:occurs frequently on IOS.
-Sample Page
![sample_page1](image/image1.png)

- Select organisation
  ![sample_page2](image/image2.png)

© [Simpu](https://www.simpu.co/)
