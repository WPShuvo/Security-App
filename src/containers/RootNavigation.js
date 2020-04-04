import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';
import AuthLoadingScreen from './../screens/LogIn';
import SignUp from './../screens/SignUp'
import Home from '../screens/Home';
import Admin from './../screens/admin';
import TopSecret from '../screens/TopSecret';
import Secret from '../screens/Secret';
import Confidential from '../screens/Confidential';
import Unclassified from '../screens/Unclassified';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      SignUp: SignUp,
      Home: Home,
      Admin: Admin,
      TopSecret: TopSecret,
      Secret: Secret,
      Confidential: Confidential,
      Unclassified: Unclassified,
    //   App: MainNavigator,
    //   Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);