import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'


var screen = Dimensions.get('window');


export default class FlatListView extends Component {

  constructor(props) {
    super(props);

    let mData = [];

    for(let i=0; i<20; i++) {
      mData.push({index:i, key:i+'', name:'abc' + i, age:'12'})
      //mData.push('abc'+i);
    }

    this.state = {
      data: mData
    }
  }

  getItemView = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.onItemPressed(item)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.index + 1}</Text>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  getSeparator = () => {
    return (<View style={styles.separator}/>);
  }

  onItemPressed = (item) => {
    alert(item.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.getItemView}
          //renderItem={(itemData) => this.getItemView(itemData.item)}
          ItemSeparatorComponent={this.getSeparator}
          //keyExtractor={(index) => '' + index}
          //onPressItem={(index) => alert('item ' + index + 'pressed')}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container : {
    flex :1,
    paddingTop :10
  },
  item : {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: "#55333333",
    justifyContent:'space-around'   // 子元素沿主轴的对齐方式
    //padding : 20
  },
  itemText : {
    padding : 10,
    fontSize : 20,
    height : 50,
  },
  separator : {
    width:screen.width-20,
    height:0.5,
    backgroundColor:'green',
    marginLeft: 10,
    marginRight: 10,
  }
})
