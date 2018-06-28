# React Native Zapp Bridge

[![npm version](https://badge.fury.io/js/react-native-zapp-bridge.svg)](https://badge.fury.io/js/react-native-zapp-bridge)
![](https://img.shields.io/badge/React%20Native-0.50.4-blue.svg)
[![CircleCI](https://circleci.com/gh/applicaster/React-Native-Zapp-Bridge.svg?style=svg)](https://circleci.com/gh/applicaster/React-Native-Zapp-Bridge)

A React Native package that includes bridging from React Native to [Applicaster](http://www.applicaster.com) Zapp Platform native framework.

## Features

React-Native-Zapp-Bridge is a util package that enable you to:

1.  **Analytics** - use `sendAnalyticEvent` to send an analytics event throw [Zapp Morpheus](http://developer-zapp.applicaster.com/analytics/morpheus/morpheus.html) (Zapp Analytics Manager).

2.  **Video Player** - use `APVideoPlayer` to add a video player to your React-Native screen, this will add the chosen pluggable player on the Zapp Platform.

3.  **Zapp login** - methods for logging in users and checking their login status

4.  **Data source plugin** - This class helps you to interact with the DS plugin. Use `DataSourceService` to make http request from DS plugin (DS plugin returns Atom model as result).

5.  **Zapp player** - methods for playing videos fullscreen

6.  **reminders** - An API for adding, removing & checking status of program reminders.

7.  **navigation** - An API for navigating within Zapp apps.

8.  **withZapp** - A React Native HOC for parsing plugin making properties consistent across platforms.

9.  **Zapp Plugin** - An API for getting information about plugin

## Installation

`$ npm install --save applicaster/react-native-zapp-bridge`

## Usage

### Analytics

1.  import:

```javascript
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
```

2.  send event:

```javascript
sendAnalyticEvent(`Your Screen Name`, {
    param: value,
  })
    .then(console.log)
    .catch(console.warn);
}
```

### Video Player

1.  import:

```javascript
import { APVideoPlayer } from 'react-native-zapp-bridge';
```

2.  create your video view:

```javascript
  const streamUrl = `your_stream_url`
  const style = {
    backgroundColor: '#ffffff'
  }
  const maxWidth = 200;
  const src = {
    type: Platform.OS === 'android' ? 'vod' : 'url',
    object: {
      id: `your_item_id`,
      name: `your_item_title`,
      thumbnail_url: `your_item_image_url`
      stream_url: streamUrl,
    },
    player_configuration: {
      inline_player_should_auto_mute: true,
    },
  };

  return <APVideoPlayer {...{ src, maxwidth, style }} />;
```

### Data Source Plugin

1.  import:

```javascript
import { ZappPipesService } from 'react-native-zapp-bridge';
```

2.  make a request:

```javascript
ZappPipesService.getDataSourceData(`Url To Load From DS Plugin`)
    .then(content)
    .catch(error);
}
```

### Zapp login

1.  import:

```javascript
import { NativeModules } from 'react-native';
```

2.  check if user is logged in

```javascript
NativeModules.ZappLogin.isUserLoggedIn();
```

Returns:
Promise - resolves:
`{ isUserLoggedIn: bool }`

3.  login user

```javascript
NativeModules.ZappLogin.login(additionalParams);
```

parameters:
`additionalParams: Object` - can be empty. This parameter is being delieved as the additionalParams to the native login method. So any values in this object will be available to the receiver login plugin.

Returns:
Promise - resolves:
`{ isUserLoggedIn: bool }`

### Zapp player

1.  import:

```javascript
import { NativeModules } from 'react-native';
```

2.  call player

```javascript
NativeModules.ZappPlayer.playFullScreen(type, playable, configuration);
```

parameters:
`type: String`
`playable: Object`
`configuration: Object` - can be empty

Supported values for `configuration` keys:

* `configuration['custom_configuration']` - This value is being delivered to the player plug as the player configuration dictionary.

Returns:
Promise - resolves:
`true`

### Reminders

1.  import:

```javascript
import { reminders } from 'react-native-zapp-bridge';
```

2.  methods:

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
reminders.removeReminder(PROGRAM_ID_STR).then(PROGRAM_ID_STR => {
  // success
});
reminders.hasReminder(PROGRAM_ID_STR).then(RESULT_BOOL => {
  // success
});
reminders.checkReminders(PROGRAM_ID_STR_ARR).then(RESULT_OBJ => {
  // success
  // result object should look like:
  // { PROGRAM_ID: REMINDER_SET_BOOL, ... }
});
```

### Navigation

1.  import:

```javascript
import { navigation } from 'react-native-zapp-bridge';
```

2.  methods:

```javascript
navigation.closeModalScreen(extraParams);
```

extraParams available in iOS only

* @type {('push'| string)} animation_type - Allowed animation types\*\*
* @param {object} [extraParams = {} ] - An extra params.
* @param {bool\*} [extraParams.animated = 1] - If close action should be animated.
* @param {string} [extraParams.animation_type = undefined] - The employee's department.

\* bool in this scope represents `0` or `1`;  
\*\* \`push\` present push close animation, any other string uses modal animation.

```
reminders.openInternalURL(params, reactParams);
```

### withZapp

1.  import:

```javascript
import { withZapp } from 'react-native-zapp-bridge';
```

2.  usage:

```javascript
// in the entry point to the plugin import the root of your app
import App from './src/App';

// Augment your app with Zapp for consistent props to be passed cross platform
const AppWithZapp = withZapp(App);

const RNRoot = props => <AppWithZapp {...props} />;

// Module name
AppRegistry.registerComponent('RNRoot', () => RNRoot);
```

### Zapp Plugin

1.  import:

```javascript
import { NativeModules } from 'react-native';
const { ZappPlugin } = NativeModules;
```

2.  methods:

```
ZappPlugin.getConfiguration(PLUGIN_IDENTIFIER).then(PLUGIN_CONFIGURATION => {
    // success
});
```

## Contributing

Commit messages are strictly enforced in this pattern:

```
type(scope?): subject
body?
footer?
```

Types can be one of the following:
\[build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test\]\[type-enum\]

## Continuous deployment

Deployment is automated by [Semantic Release](https://github.com/semantic-release/semantic-release). When PRs are merged to `master` Semantic Release will analyse the commit log, increment version, tag a release and publish directly to public NPM.
