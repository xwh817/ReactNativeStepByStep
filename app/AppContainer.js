import {createStackNavigator, createAppContainer} from 'react-navigation';
import Hello from './Hello';
import Home from './Home';
import FlexBoxLayout from './FlexBox';
import FlatListView from './Components/FlatListView';

const rootNavigatior = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: 'Home',
      }
    },
    Hello: {
      screen: Hello,
      navigationOptions: {
        headerTitle: 'Hello',
      }
    },
    ListView: {
      screen: FlatListView,
      navigationOptions: {
        headerTitle: 'ListView',
      }
    },
    Flex: {
      screen: FlexBoxLayout,
      navigationOptions: {
        headerTitle: 'FlexBoxLayout',
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(rootNavigatior);
export default AppContainer;
