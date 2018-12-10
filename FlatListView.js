import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

var mData = [];

function initData() {
  for(var i=0; i<20; i++) {
    mData.push({key:i, name:'abc' + i, age:'12'})
  }
}

export default class FlatListView extends Component {
  render() {
    initData();
    return (
      <View style={styles.container}>
        <FlatList
          data={mData}
          renderItem={({item}) => <Text style={styles.item}>{(item.key + 1) + '_' + item.name}</Text>}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container : {
    flex :1,
    padding :20
  },
  item : {
    padding : 10,
    fontSize : 20,
    height : 50,
  }
})
