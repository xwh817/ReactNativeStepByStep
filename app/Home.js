import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Components/Button';
import PanResponder from "./PanResponder";

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button text='Hello React-Native' onPress={() => this.props.navigation.navigate('Hello')}/>
                <Button text='FlatListView' onPress={() => this.props.navigation.navigate('ListView')}/>
                <Button text='FlexLayout' onPress={() => this.props.navigation.navigate('Flex')}/>
                <Button text='VideoPlayer' onPress={() => this.props.navigation.navigate('Video')}/>
                <Button text='PanResponder手势响应' onPress={() => this.props.navigation.navigate('PanResponder')}/>
                <Button text='自定义组件' onPress={() => this.props.navigation.navigate('MyComponents')}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',    // 主轴方向row\column
        justifyContent: 'center',   // 子元素沿主轴的排列方式
        alignItems: 'stretch',      // 子元素沿次轴排列方式（选了主轴之后的另一个方向）
        padding: 10,
    }
});
