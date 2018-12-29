import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import ViewUtil from "./Utils/ViewUtil";

export default class FlexBoxLayout extends Component {

    state={
        color1:ViewUtil.getRandomColor(),
        color2:ViewUtil.getRandomColor(),
        color3:ViewUtil.getRandomColor(),
    }

    render() {
        return (
            <ScrollView>

                {/*
                flexDirection可以决定布局的主轴。
                子元素是应该沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向排列呢？
                默认值是竖直轴(column)方向。
                alignSelf  元素在容器内的对齐方式，auto默认值元素继承了它的父容器的 align-items 属性。如果没有父容器则为 "stretch"。
                */}
                <View style={{padding: 10}}>
                    <View style={{height: 60, backgroundColor: this.state.color1}}/>
                    <View style={{height: 60, backgroundColor: this.state.color2}}/>
                    <View style={{width: 120, height: 60, alignSelf:'center', backgroundColor: this.state.color3}}/>
                </View>

                {/*justifyContent可以决定其子元素沿着主轴的排列方式。
                  子元素是应该靠近主轴的起始端还是末尾段分布呢？亦或应该均匀分布？
                  对应的这些可选项有：flex-start、center、flex-end、space-around、space-between以及space-evenly。*/}
                <View style={{flex: 1, flexDirection: 'row', padding: 10, justifyContent: 'space-around'}}>
                    <View style={{width: 60, height: 60, backgroundColor: this.state.color1}}/>
                    <View style={{width: 120, height: 60, backgroundColor: this.state.color2}}/>
                    <View style={{width: 60, height: 60, backgroundColor: this.state.color3}}/>
                </View>

                {/*alignItems可以决定其子元素沿着次轴（选定主轴后的另外一个方向）的排列方式。
                  子元素是应该靠近次轴的起始端还是末尾段分布呢？亦或应该均匀分布？
                  对应的这些可选项有：flex-start、center、flex-end以及stretch。

                  flex值可以设置占用剩余空间的比例。
                  */}
                <View style={{flex: 1, flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                    <View style={{flex: 1, height: 60, backgroundColor: this.state.color1}}/>
                    <View style={{width: 120, height: 120, backgroundColor: this.state.color2}}/>
                    <View style={{flex: 2, height: 60, backgroundColor: this.state.color3}}/>
                </View>
            </ScrollView>
        );
    }
}
