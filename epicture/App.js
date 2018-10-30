import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import API from './utils/api'

import HomePage from "./views/HomePage";

export default class App extends React.Component {


  render() {
    return (
     <HomePage/>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
