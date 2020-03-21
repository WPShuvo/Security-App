import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import {SafeAreaView} from 'react-navigation';
import RootNavigation from './src/containers/RootNavigation';

class App extends Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAu9t73JwTtIj-kDxAUtFg-mnmbkSOS7hs",
      authDomain: "security-app-1784f.firebaseapp.com",
      databaseURL: "https://security-app-1784f.firebaseio.com",
      projectId: "security-app-1784f",
      storageBucket: "security-app-1784f.appspot.com",
      messagingSenderId: "219849072382",
      appId: "1:219849072382:web:6914f21c3b4c120855cfaf",
      measurementId: "G-PML7WVPZ68"
    })
  }

  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigation/>
      </SafeAreaView>
    );
  }
};

export default App;
