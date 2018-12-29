import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import StringUtil from './Utils/StringUtil'
import SeekBar from './Components/SeekBar'

const videoUrl = 'http://s2.turingcat.com/eh5v.files/html5video/Turingcat2.mp4_2.m4v';

export default class VideoPlayer extends Component {

    // 在子页面中对navigationOptions进行配置
    /*static navigationOptions = {
        header: null   // 去掉顶部标题
    };*/

    isPressed = false;

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0,
        currentTime: 0,
        paused: false,
    };


    render() {
        console.log("render()");
        return (
            <View style={styles.container}>
                <Video source={{uri: videoUrl}}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}
                       style={styles.videoPlayer}
                       onBuffer={this.onBuffer}
                       onError={this.onError}
                       rate={this.state.rate}
                       paused={this.state.paused}
                       volume={this.state.volume}
                       muted={this.state.muted}
                       resizeMode={this.state.resizeMode}
                       onLoad={this.onLoad}
                       onProgress={this.onProgress}
                       onEnd={this.onEnd}
                       onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                       onAudioFocusChanged={this.onAudioFocusChanged}
                       repeat={false}
                />

                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => {
                        this.setState({paused: !this.state.paused})
                    }}>
                        <Image
                            source={this.state.paused ? require('./images/ic_play.png') : require('./images/ic_pause.png')}
                            style={{width: 40, height: 40, marginRight: 6}}/>
                    </TouchableOpacity>


                    <Text style={styles.timeText}>
                        {StringUtil.formatTime(this.state.currentTime)}
                    </Text>

                    <SeekBar style={{flex: 1, padding: 10}}
                             max={this.state.duration}
                             progress={Math.round(this.state.currentTime)}
                             progressBackgroundColor='#2C2C2C'
                             progressColor='#88cc33'
                             progressHeight={2}
                             thumbSize={10}
                             thumbColor='#88cc33'
                             thumbColorPressed='#f4511e'
                             onStartTouch={() => {this.isPressed = true;}}
                             onProgressChanged={(progress) => this.setCurrentTime(progress)}
                             onStopTouch={(progress) => {
                                 this.isPressed = false;
                                 this.setCurrentTime(progress);
                                 this.player.seek(progress);
                             }}
                    />

                    <Text style={styles.timeText}>
                        {StringUtil.formatTime(this.state.duration)}
                    </Text>

                </View>

            </View>
        );

    }

    setCurrentTime(progress) {
        let currentTime = Math.round(this.state.currentTime);
        let newTime = Math.round(progress);
        if (currentTime != newTime) {   // 用整数比较，减少刷新次数
            this.setState({
                currentTime: newTime,
            });
        }
    }

    onBuffer() {
        console.log("onBuffer");
    }

    onError() {
        console.log("onError");
    }

    onLoad = (data) => {
        this.setState({duration: data.duration});
        console.log("onLoad: " + data.duration);
    };

    onProgress = (data) => {
        if (!this.isPressed) {
            // 尽量不要自己去更新DOM
            //this.refs.seekBar.setProgress(Math.round(data.currentTime));

            this.setCurrentTime(data.currentTime);
            console.log("onProgress: " + data.currentTime);
        }
    };

    onEnd = () => {
        this.setState({paused: true})
        this.player.seek(0)
        console.log("onEnd");
    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        //this.setState({paused: !event.hasAudioFocus})
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',    // 主轴方向row\column
        justifyContent: 'center',   // 子元素沿主轴的排列方式
        //alignItems: 'stretch',      // 子元素沿次轴排列方式（选了主轴之后的另一个方向）
    },
    videoPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },
    textStyle: {
        paddingLeft: 10,
        paddingTop: 25,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    controls: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    timeText: {
        fontSize: 14,
        color: '#fff',
        justifyContent: 'center',
    },
});
