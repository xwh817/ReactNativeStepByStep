import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Header } from "react-navigation";

export default class PanResponder extends Component {
  // TODO 怎样获取到非自定义NavigationHeader的高度，还是个坑。。
  /* static headerHeight: 0;
    static navigationOptions = ({ navigation, navigationOptions }) => {
        this.headerHeight = navigationOptions.headerStyle.height;   // 获取自定义的headerStyle.height
        console.log("Height of header is " + this.headerHeight);
    }; */

  constructor(props) {
    super(props);
    this.state = {
      x: styles.item.width,
      y: styles.item.height,
      title: "来呀，拖我呀！",
      isPressed: false
    };
    this.headerHeight = Header.HEIGHT;
  }

  render() {
    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={event => this.onGrant(event)}
        onResponderMove={event => this.onMoving(event)}
        onResponderEnd={event => this.onEnd(event)}
      >
        <Text
          style={[
            styles.item,
            {
              left: this.state.x,
              top: this.state.y,
              backgroundColor: this.state.isPressed ? "#ffaa66" : "#669933"
            }
          ]}
        >
          {this.state.title}
        </Text>
      </View>
    );
  }

  onGrant(event) {
    this.setState({
      isPressed: true
    });

    this.preX = event.nativeEvent.pageX;
    this.preY = event.nativeEvent.pageY;
  }

  /**
   * 元素position: 'absolute'，设置top是从标题栏之下开始的，但pageX是根据整个页面的，所以要减去headerHeight
   * @param event
   */
  onMoving(event) {
    let pageX = event.nativeEvent.pageX; // 相对于根元素
    let pageY = event.nativeEvent.pageY;
    let locX = event.nativeEvent.locationX; // 相对于自己, 奇怪！！！如果事件在子元素上，返回的是相对子元素的
    let locY = event.nativeEvent.locationY;

    let dX = pageX - this.preX;
    let dY = pageY - this.preY;
    this.preX = pageX;
    this.preY = pageY;

    this.setState({
      x: this.state.x + dX,
      y: this.state.y + dY,
      title:
        Math.round(pageX) +
        ", " +
        Math.round(pageY) +
        "\n" +
        Math.round(locX) +
        ", " +
        Math.round(locY)
    });
  }

  onEnd(event) {
    this.setState({
      isPressed: false
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", // 主轴方向row\column
    justifyContent: "center", // 子元素沿主轴的排列方式
    alignItems: "stretch", // 子元素沿次轴排列方式（选了主轴之后的另一个方向）
    backgroundColor: "#dddddd" // 发现一个奇怪的问题，如果不设置backgroundColor，在根元素上没有拖动事件
  },
  item: {
    width: 100,
    height: 100,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    position: "absolute"
  }
});
