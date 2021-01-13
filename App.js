/**
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar} from 'react-native';
import Home from './src/page/home/index';

const App = () => {
  return (
    <>
      <Home />
      <StatusBar barStyle="dark-content" backgroundColor="#7473d6" />
    </>
  );
};
export default App;
