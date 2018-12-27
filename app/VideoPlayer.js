import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';
import StringUtil from './Utils/StringUtil'


const videoUrl = 'http://s2.turingcat.com/eh5v.files/html5video/Turingcat2.mp4_2.m4v';

export default class VideoPlayer extends Component {

    // 在子页面中对navigationOptions进行配置
    /*static navigationOptions = {
        header: null   // 去掉顶部标题
    };*/


    progressWidth = 0;
    progressLeft = 0;
    isPressed = false;

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0,
        currentTime: 0,
        paused: false,
        progressPosition: 0,
    };


    render() {
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
                            style={{width: 40, height: 40}}/>
                    </TouchableOpacity>


                    <Text style={styles.timeText}>
                        {StringUtil.formatTime(this.state.currentTime)}
                    </Text>

                    <View style={styles.progress}
                          onLayout={(e) => {
                              this.progressWidth = e.nativeEvent.layout.width;
                              this.progressLeft = e.nativeEvent.layout.x;
                              console.log("获取宽度：" + this.progressWidth + ", 位置：" + this.progressLeft);
                          }}

                          onStartShouldSetResponder={() => true}
                          onMoveShouldSetResponder={() => true}
                          onResponderGrant={(event) => this.onGrant(event)}
                          onResponderMove={(event) => this.onMoving(event)}
                          onResponderEnd={(event) => this.onPressEnd(event)}
                    >

                        <View style={styles.progressBackground}>
                            <View style={[styles.innerProgressCompleted,
                                {width: this.state.progressPosition}]}/>
                            {/*如果还要加其他进度条，在这儿加*/}
                        </View>

                        <View style={[styles.progressIcon,
                            {left: this.state.progressPosition - 10}]}
                        />
                    </View>

                    <Text style={styles.timeText}>
                        {StringUtil.formatTime(this.state.duration)}
                    </Text>

                </View>

                {/*<PlayerController
                    progress={this.state.currentTime}
                    duration={this.state.duration}
                />*/}

            </View>
        );

    }


    onGrant(event) {
        this.isPressed = true;
    }

    onMoving(event) {
        let mX = event.nativeEvent.pageX;   // 相对于父组件位置
        let left = mX - styles.progressIcon.width / 2 - this.progressLeft;  // 计算在组件内的位置
        //let left = event.nativeEvent.locationX;
        if (left >= 0 && left <= this.progressWidth) {
            this.setState({
                currentTime: this.state.duration * left / this.progressWidth,
                progressPosition: left,
            })
        }
    }

    onPressEnd(event) {
        this.isPressed = false;
        this.onMoving(event);
        this.player.seek(this.state.currentTime)
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
            this.setState({
                currentTime: data.currentTime,
                progressPosition: this.state.duration > 0 ? this.progressWidth * data.currentTime / this.state.duration : 0
            });
            //console.log("onProgress: " + data.currentTime);
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

class PlayerController extends Component {
    state = {
        duration: 0.0,
        currentTime: 0.0,
        paused: false,
    };

    render() {
        return (
            <View style={styles.controls}>
            </View>);
    }
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
    btnStyle: {
        paddingRight: 10,
        paddingTop: 25,
        justifyContent: 'flex-end',
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
    progress: {
        flex: 1,
        height: 30,
        padding: 10,
        //overflow: 'hidden',
        //flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    progressBackground: {
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#2C2C2C',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: '#cccccc',
    },
    progressIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        backgroundColor: '#dddddd',
        borderStyle: 'solid',
        borderRadius: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timeText: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 6,
        marginRight: 6,
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
});
