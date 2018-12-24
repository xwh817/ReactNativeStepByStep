import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';


const videoUrl = 'http://s2.turingcat.com/eh5v.files/html5video/Turingcat2.mp4_2.m4v';


export default class VideoPlayer extends Component {

    var
    player;

    render() {
        return (
            <View style={styles.container}>
                <Video source={{uri: videoUrl}}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                       onError={this.onError}               // Callback when video cannot be loaded
                       style={styles.videoPlayer}/>
            </View>
        );
    }

    onBuffer() {
        console.log("onBuffer");
    }

    onError() {
        console.log("onError");
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',    // 主轴方向row\column
        justifyContent: 'center',   // 子元素沿主轴的排列方式
        alignItems: 'stretch',      // 子元素沿次轴排列方式（选了主轴之后的另一个方向）
        padding: 10,
    },
    videoPlayer: {}
});
