import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native'


var screen = Dimensions.get('window');
const PAGE_SIZE = 10;

export default class FlatListView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isReloading: false,
      pageIndex: 0,
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

  getFooter() {
    return <View style={styles.footer}>
      <ActivityIndicator
        size={'large'}
        color={'green'}
        animating={true}
      />
      <Text>正在加载中……</Text>
    </View>
  }

  loadData(reload) {
    this.setState({isReloading: reload});
    setTimeout(() => {
      mData = this.state.data;
      if (reload) {
        mData = [];
      }

      for(let i=0; i<10; i++) {
        let start = PAGE_SIZE * this.state.pageIndex;
        let index = start + i;
        mData.push({index:index , key:index+'', name:'abc' + index, age:'12'})
      }
      this.setState({
        isReloading: false,
        data:mData,
      });
    }, 2000);
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
          //ItemSeparatorComponent={this.getSeparator}
          //keyExtractor={(index) => '' + index}
          //onPressItem={(index) => alert('item ' + index + 'pressed')}
          refreshing={this.state.isReloading}
          onRefresh={() => {
            this.state.pageIndex = 0;
            this.loadData(true);
          }}
          ListFooterComponent={() => this.getFooter()}
          onEndReachedThreshold={0.1}   // 最后一条距离底部比例多少了触发onEndReached
          onEndReached={() => {
            this.state.pageIndex++;
            this.loadData(false);
          }}
        />
      </View>
    );
  }
  

  componentDidMount() {
    this.loadData(false);
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
    backgroundColor: "#eeeeee",
    justifyContent:'space-around',   // 子元素沿主轴的对齐方式
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    //padding : 20
  },
  itemText : {
    padding : 10,
    fontSize : 20,
    height : 50,
  },
  separator : {
    width:screen.width-20,
    height:4,
    backgroundColor:'green',
  },
  footer : {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  footer : {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
