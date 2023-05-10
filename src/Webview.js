import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';

const Webview = ({route}) => {
    const url = route?.params?.url;
    return (
      <WebView source={{ uri: url }} />
    );
  };

export default Webview;