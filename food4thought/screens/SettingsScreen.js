import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    
    return (
    <View>
      <View>
      <Image source={require('/media/matt.jpg')} />
      </View>
    </View>
    )
  }
}
