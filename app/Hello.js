/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import StorageUtil from './Utils/StorageUtil'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class Hello extends Component {


  constructor(props) {
    super(props);
    
    this.state = {
      userName:"",
    }

    const { navigation } = this.props;  // 从导航中取数据
    if (navigation) {
      let name = navigation.getParam('name', 'xwh');
      StorageUtil.put('userName', name);
      this.state.userName = name;
    } else {
      StorageUtil.get('userName').then(value =>{
        this.setState({
          userName:value,
        });
        //this.state.userName = value;  // 异步的，这个地方直接赋值会失败
      });
    }

  }


  render() {

    const hello = 'Hello React-native, I\'m ';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.myStyle}>{hello + this.state.userName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  myStyle: {
    fontSize: 16,
    color: '#993333',
    textAlign: 'center',
    marginTop: 10,
  }
});
