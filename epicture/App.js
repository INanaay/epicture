import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import API from './utils/api'
import HomePage from "./views/HomePage";
import LoginScreen from "./views/login";
import Application from "./compoments/Navigation"

export default class App extends React.Component {


  render() {
    return (
        <Application />
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
