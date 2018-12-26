import React, { Component } from 'react'
import {StyleSheet, Text, TouchableOpacity } from 'react-native'


export default class Button extends Component {
  render(){
    // 默认的View是没有onPress事件的，这儿传一下props
    return(
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    height: 60,
    //width: 300,
    borderRadius:6,
    marginBottom:4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4398ff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  }

})
