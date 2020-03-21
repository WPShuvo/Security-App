import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {Root} from 'native-base';
import {SafeAreaView} from 'react-navigation';
import RootNavigation from './app/navigation/RootNavigation';
import {Colors} from './app/themes';

if (_DEV_) {
  import('./app/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}
const App = () => {
  return (
    <Root>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          backgroundColor={Colors.primary}
          barStyle={
            Platform.OS === 'android' ? 'light-content' : 'dark-content'
          }
        />
        <RootNavigation />
      </SafeAreaView>
    </Root>
  );
};

export default App;
