import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class PanResponder extends Component {

    // TODO 怎样获取到非自定义NavigationHeader的高度，还是个坑。。
    static headerHeight: 0;
    static navigationOptions = ({navigation, navigationOptions}) => {
        this.headerHeight = navigationOptions.headerStyle.height;   // 获取自定义的headerStyle.height
        console.log("Height of header is " + this.headerHeight);
    };

    state = {
        x: styles.item.width,
        y: styles.item.height,
        title: '来呀，拖我呀！',
        isPressed: false,
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.item,
                    {
                        top: this.state.y,
                        left: this.state.x,
                        backgroundColor: this.state.isPressed ? '#ffaa66' : '#669933'
                    }]}

                      onStartShouldSetResponder={() => true}
                      onMoveShouldSetResponder={() => true}
                      onResponderGrant={(event) => this.onGrant(event)}
                      onResponderMove={(event) => this.onMoving(event)}
                      onResponderEnd={(event) => this.onEnd(event)}
                >{this.state.title}</Text>
            </View>
        );
    }

    onGrant(event) {
        this.setState({
            isPressed: true,
        })
    }

    /**
     * 元素position: 'absolute'，设置top是从标题栏之下开始的，但pageX是根据整个页面的，所以要减去headerHeight
     * @param event
     */
    onMoving(event) {
        let mX = event.nativeEvent.pageX;
        let mY = event.nativeEvent.pageY;
        this.setState({
            x: mX - styles.item.width / 2,
            y: mY - styles.item.height / 2 - headerHeight,
            title: Math.round(mX) + ", " + Math.round(mY)
                + "\n" + Math.round(event.nativeEvent.locationX) + ", " + Math.round(event.nativeEvent.locationY),
        })
    }

    onEnd(event) {
        this.setState({
            isPressed: false,
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',    // 主轴方向row\column
        justifyContent: 'center',   // 子元素沿主轴的排列方式
        alignItems: 'stretch',      // 子元素沿次轴排列方式（选了主轴之后的另一个方向）
    },
    item: {
        width: 100,
        height: 100,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
    }
});
