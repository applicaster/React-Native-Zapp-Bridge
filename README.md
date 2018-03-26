# React Native Zapp Bridge

![](https://img.shields.io/badge/React%20Native-0.50.4-blue.svg) [![CircleCI](https://circleci.com/gh/applicaster/React-Native-Zapp-Bridge.svg?style=svg)](https://circleci.com/gh/applicaster/React-Native-Zapp-Bridge)

A React Native package that include bridging from React Native to [Applicaster](http://www.applicaster.com) Zapp Platform native framework.

## Features

React-Native-Zapp-Bridge is a util package that enable you to:

1. **Analytics** - use `sendAnalyticEvent` to send an analytics event throw [Zapp Morpheus](http://developer-zapp.applicaster.com/analytics/morpheus/morpheus.html) (Zapp Analytics Manager).

2. **Video Player** - use `APVideoPlayer` to add a video player to your React-Native screen, this will add the chosen pluggable player on the Zapp Platform.

3. **Data source plugin** - This class helps you to interact with the DS plugin. Use `DataSourceService` to make http request from DS plugin (DS plugin returns Atom model as result).

4. **reminders** - An API for adding, removing & checking status of program reminders.

4. **navigation** - An API for navigating within Zapp apps.

## Installation

`$ npm install --save applicaster/react-native-zapp-bridge `


## Usage

### Analytics
  1. import:
  ```javascript
  import { sendAnalyticEvent } from 'react-native-zapp-bridge';
  ```
  2. send event:
  ```javascript
  sendAnalyticEvent(`Your Screen Name`, {
      param: value,
    })
      .then(console.log)
      .catch(console.warn);
  }
  ```

### Video Player
  1. import:
  ```javascript
  import { APVideoPlayer } from 'react-native-zapp-bridge';
  ```
  2. create your video view:
  ```javascript
    const streamUrl = `your_stream_url`
    const style = {
      backgroundColor: '#ffffff'
    }
    const maxWidth = 200;
    let playerDetails = {
      id: `your_item_id`,
      name: `your_item_title`,
      thumbnail_url: `your_item_image_url`
      stream_url: streamUrl,
    };
    let playerConfiguration = {
      inline_player_should_auto_mute: true,
    };
    if (Platform.OS === 'android') {
      playerDetails = JSON.stringify(playerDetails);
      playerConfiguration = JSON.stringify(playerConfiguration);
    }
    const src = {
      type: Platform.OS === 'android' ? 'vod' : 'url',
      object: playerDetails,
      player_configuration: playerConfiguration,
    };

    return (
      streamUrl ?
        <View>
          <APVideoPlayer {...{ src, maxwidth, style }} />
        <View />
    );
  ```

### Data Source Plugin
  1. import:
  ```javascript
  import { ZappPipesService } from 'react-native-zapp-bridge';
  ```
  2. make a request:
  ```javascript
  ZappPipesService.getDataSourceData(`Url To Load From DS Plugin`)
      .then(content)
      .catch(error);
  }
  ```

### Zapp login
1. import:
```javascript
import { NativeModules } from 'react-native';
```
2. check if user is logged in
```javascript
NativeModules.ZappLogin.isUserLoggedIn();
```
Returns:
Promise - resolves:
`{ isUserLoggedIn: bool }`

3. login user
```javascript
NativeModules.ZappLogin.login(additionalParams);
```
parameters:
`additionalParams: Object` - can be empty

Returns:
Promise - resolves:
`{ isUserLoggedIn: bool }`

### Zapp player
1. import:
```javascript
import { NativeModules } from 'react-native';
```
2. call player
```javascript
NativeModules.ZappPlayer.playFullScreen(type, playable, configuration);
```
parameters:
`type: String`
`playable: Object`
`configuration: Object` - can be empty

Returns:
Promise - resolves:
`true`

### Reminders
1. import:
```javascript
import { reminders } from 'react-native-zapp-bridge';
```
2. methods:
```
reminders.addReminder({
  id: PROGRAM_ID_STR,
  channel_id: CHANNEL_ID_STR,
  starts_at: '2016-12-20T14:00:00+00:00',
  ends_at: '2016-12-20T15:00:00+00:00',
  name: PROGRAM_NAME_STR
}).then(PROGRAM_ID_STR => {
  // success
});
reminders.removeReminder(PROGRAM_ID).then(PROGRAM_ID_STR => {
  // success
});
reminders.hasReminder(PROGRAM_ID).then(RESULT_BOOL => {
  // success
});
```

### Navigation
1. import:
```javascript
import { navigation } from 'react-native-zapp-bridge';
```
2. methods:
```
navigation.closeModalScreen();
reminders.openInternalURL(params, reactParams);
```
