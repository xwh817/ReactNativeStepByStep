import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Hello from './Hello';
import FlexBoxLayout from './FlexBox';
import FlatListView from './Components/FlatListView';
import Color from './values/Color'

export default class ScrollablePages extends Component {

    render(){
        return(
          <ScrollableTabView
            style={styles.tabView}
            tabBarBackgroundColor='white'
            tabBarActiveTextColor ={Color.colorPrimary}
            tabBarInactiveTextColor ='#999999'
            tabBarTextStyle={styles.tabBarText}
            tabBarUnderlineStyle={styles.tabBarUnderline}
          >
            <Hello tabLabel='Hello' key='1' navigation={this.props.navigation}/>
            <FlatListView tabLabel='FlatList' key='2'/>
            <FlexBoxLayout tabLabel='Flex' key='3'/>    {/* label千万不要写成lable了，踩坑 */}
          </ScrollableTabView>
        );
      }
}


const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: Color.bg_page
  },
  tabBarText: {
    fontSize: 14,
    marginTop: 12,
  },
  tabBarUnderline: {
    backgroundColor: Color.colorPrimary,
    height:2,
  },
})