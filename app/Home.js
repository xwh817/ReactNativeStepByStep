import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Components/Button';
import PanResponder from "./PanResponder";

export default class Home extends Component {
    render() {
        let {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Button text='Hello React-Native' onPress={() => navigate('Hello', {name:'xwh123'})}/>
                <Button text='FlatListView' onPress={() => navigate('ListView')}/>
                <Button text='FlexLayout' onPress={() => navigate('Flex')}/>
                <Button text='VideoPlayer' onPress={() => navigate('Video')}/>
                <Button text='PanResponder手势响应' onPress={() => navigate('PanResponder')}/>
                <Button text='自定义组件' onPress={() => navigate('MyComponents')}/>
                <Button text='动画' onPress={() => navigate('Animations')}/>
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
