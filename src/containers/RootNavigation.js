import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';
import AuthLoadingScreen from './../screens/LogIn';
import SignUp from './../screens/SignUp'
import test from '../screens/test';
import Root from '../screens/root';
import Admin from './../screens/admin';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      SignUp: SignUp,
      Test: test,
      Admin: Admin,
    //   App: MainNavigator,
    //   Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);