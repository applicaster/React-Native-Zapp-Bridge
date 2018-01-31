# React Native Zapp Bridge

![](https://img.shields.io/badge/React%20Native-0.50.4-blue.svg)

A React Native package that include bridging from React Native to [Applicaster](http://www.applicaster.com) Zapp Platform native framework.

## Features

React-Native-Zapp-Bridge is a util package that enable you to:

1. **Analytics** - use `sendAnalyticEvent` to send an analytics event throw [Zapp Morpheus](http://developer-zapp.applicaster.com/analytics/morpheus/morpheus.html) (Zapp Analytics Manager).

2. **Video Player** - use `APVideoPlayer` to add a video player to your React-Native screen, this will add the chosen pluggable player on the Zapp Platform.

3. **Data source plugin** - This class help you to interact with the DS plugin. Use `DataSourceService` to make http request from DS plugin (DS plugin returns Atom model as result).

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
