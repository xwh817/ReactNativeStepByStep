import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, Image, View, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import HttpUtil from '../Utils/HttpUtil'

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
        <View style={styles.item}>

          <TouchableOpacity onPress={() => {this.toast.show(item.name);}}>
              <Image
                source={{uri:item.image}}
                style={{width: 100, height: 100}}
                />
          </TouchableOpacity>

            <View style={styles.layout_info}>
              <Text style={styles.itemText}>姓名：{item.name}</Text>
              <Text style={styles.itemText}>编号：{item.key}</Text>
              <Text style={styles.itemText}>地址：{item.address}</Text>
            </View>
          
        </View>
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

    HttpUtil.get('http://rap2api.taobao.org/app/mock/162333/getData')
    .then(result => {
      mData = this.state.data;
      if (reload) {
        mData = [];
      }

      let keyStart = mData.length + 1;
      result.data.map((item, index) => {
        item.key = (keyStart + index).toString();
        mData.push(item);
        return item;
      });

      this.setState({
        isReloading: false,
        data:mData,
      });
    })
    .catch(error => this.toast.show(error));
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

        <Toast ref={toast=>{this.toast=toast}} 
          position='bottom'
          style={{backgroundColor:'#e4511e'}}
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
  },
  item : {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#eeeeee",
    justifyContent:'space-around',   // 子元素沿主轴的对齐方式
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    marginBottom:10,
    padding : 10,
    //borderRadius: 4,    // 圆角
    shadowColor:'grey',   // 添加阴影效果
    shadowOffset:{width:1, height:1},
    shadowOpacity:0.5,
    shadowRadius:2,
    elevation:2,  // android端要加上这个属性，不然阴影不出来
  },
  layout_info : {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#ffffff",
    justifyContent:'flex-start',   // 子元素沿主轴的对齐方式
    marginLeft: 10,
    padding : 10
  },
  itemText : {
    fontSize : 14,
    marginBottom: 10,
  },
  separator : {
    width:screen.width-20,
    height:1,
    alignSelf:'center',
    backgroundColor:'#eeeeee',
    borderStyle: 'dotted'
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
