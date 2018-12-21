import React, { Component } from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';

export default class FlexBoxLayout extends Component {
  render() {
    return (
      <ScrollView>

      {/*
        flexDirection可以决定布局的主轴。
        子元素是应该沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向排列呢？
        默认值是竖直轴(column)方向。*/}
        <View style={{padding:10}}>
          <View style={{height:60, backgroundColor:this.getRandomColor()}}/>
          <View style={{height:60, backgroundColor:this.getRandomColor()}}/>
          <View style={{width:120, height:60, backgroundColor:this.getRandomColor()}}/>
        </View>

        {/*justifyContent可以决定其子元素沿着主轴的排列方式。
          子元素是应该靠近主轴的起始端还是末尾段分布呢？亦或应该均匀分布？
          对应的这些可选项有：flex-start、center、flex-end、space-around、space-between以及space-evenly。*/}
        <View style={{flex:1, flexDirection:'row',padding:10, justifyContent:'space-around'}}>
          <View style={{width:60, height:60, backgroundColor:this.getRandomColor()}}/>
          <View style={{width:120, height:60, backgroundColor:this.getRandomColor()}}/>
          <View style={{width:60, height:60, backgroundColor:this.getRandomColor()}}/>
        </View>

        {/*alignItems可以决定其子元素沿着次轴（选定主轴后的另外一个方向）的排列方式。
          子元素是应该靠近次轴的起始端还是末尾段分布呢？亦或应该均匀分布？
          对应的这些可选项有：flex-start、center、flex-end以及stretch。

          flex值可以设置占用剩余空间的比例。
          */}
        <View style={{flex:1, flexDirection:'row',padding:10, alignItems:'center'}}>
          <View style={{flex:1, height:60, backgroundColor:this.getRandomColor()}}/>
          <View style={{width:120, height:120, backgroundColor:this.getRandomColor()}}/>
          <View style={{flex:2, height:60, backgroundColor:this.getRandomColor()}}/>
        </View>

      </ScrollView>
    );
  }

  getRandomColor() {
    let r = Math.floor(Math.random() * 100) + 155;
    let g = Math.floor(Math.random() * 100) + 155;
    let b = Math.floor(Math.random() * 100) + 155;
    return 'rgb('+r+','+g+','+b+')';
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeffdd',
    flexDirection: 'column',    // 主轴方向row\column
    justifyContent: 'center',   // 子元素沿主轴的排列方式
    alignItems: 'stretch',      // 子元素沿次轴排列方式（选了主轴之后的另一个方向）
    padding: 10,
    marginTop: 10,
  },
  item: {
    //width: 60,
    height: 60,
  }
});
