import {createStackNavigator, createAppContainer} from 'react-navigation';
import Hello from './Hello';
import Home from './Home';
import FlexBoxLayout from './FlexBox';
import FlatListView from './Components/FlatListView';
import VideoPlayer from './VideoPlayer';
import PanResponder from './PanResponder';

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
        },
        Video: {
            screen: VideoPlayer,
            navigationOptions: {
                headerTitle: 'react-native-video',
            }
        },
        PanResponder: {
            screen: PanResponder,
            navigationOptions: {
                headerTitle: 'PanResponder手势响应',
            }
        }
    },
    {
        initialRouteName: 'Home',
        /* 自定义公用属性 */
        defaultNavigationOptions: {
            //header:null,
            headerStyle: {
                backgroundColor: '#f4511e',
                height: 60
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
        },
    }
);

const AppContainer = createAppContainer(rootNavigatior);
export default AppContainer;
