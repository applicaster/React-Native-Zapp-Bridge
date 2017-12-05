# React Native Zapp Bridge

A React Native package that include bridging from React Native to [Applicaster](http://www.applicaster.com) Zapp Platform native framework.

## Features

React-Native-Zapp-Bridge is a util package that enable you to:

1. **Analytics** - use `sendAnalyticEvent` to send an analytics event throw [Zapp Morpheus](http://developer-zapp.applicaster.com/analytics/morpheus/morpheus.html) (Zapp Analytics Manager). 

2. **Video Player** - use `APVideoPlayer` to add a video player to your React-Native screen, this will add the chosen pluggable player on the Zapp Platform.

## Installation

`$ npm install --save react-native-zapp-bridge `


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
          <APVideoPlayer src={src} maxWidth={this.state.componentWidth} />
        <View />
    );  
  ```