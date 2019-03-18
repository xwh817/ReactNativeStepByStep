import {Platform} from 'react-native'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Hello from './Hello';
import Home from './Home';
import FlexBoxLayout from './FlexBox';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import FlatListView from './Components/FlatListView';
import VideoPlayer from './VideoPlayer';
import PanResponder from './PanResponder';
import MyComponents from './MyComponents';
import Animations from './Animations';
import ScrollableTabView from './ScrollablePages'

const rootNavigatior = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                headerTitle: 'React-native step by step',
            }
        },
        Hello: {
            screen: Hello,
            navigationOptions: ({navigation}) => ({ // 从导航对象中动态设置
                headerTitle: `Hello from ${navigation.state.params.name}`,
            })
        },
        ListView: {
            screen: FlatListView,
        },
        Flex: {
            screen: FlexBoxLayout,
        },
        TabNavigator: {
            screen: TabNavigator,
        },
        DrawerNavigator: {
            screen: DrawerNavigator,
            navigationOptions: {
                header: null,
            }
        },
        ScrollableTabView: {
            screen: ScrollableTabView,
        },
        Video: {
            screen: VideoPlayer,
            navigationOptions: {
                title: 'react-native-video',
            }
        },
        PanResponder: {
            screen: PanResponder,
        },
        MyComponents: {
            screen: MyComponents,
        },
        Animations: {
            screen: Animations,
        },
    },
    {
        initialRouteName: 'Home',
        /* 自定义公用属性 */
        defaultNavigationOptions: ({navigation}) => ({
            title: navigation.state.routeName,
            headerStyle: {
                backgroundColor: '#e4511e',
                height: 52
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
        }),
    }
);

const AppContainer = createAppContainer(rootNavigatior);
export default AppContainer;
