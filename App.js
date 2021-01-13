/**
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Home from './src/page/home/index';

const App = () => {
  useEffect(() => {
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
      skipPermissionRequests: false,
    });
  }, []);
  return (
    <>
      <Home />
      <StatusBar barStyle="dark-content" backgroundColor="#7473d6" />
    </>
  );
};
export default App;
