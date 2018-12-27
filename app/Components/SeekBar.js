import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'


export default class SeekBar extends Component {

    progressWidth = 0;
    progressLeft = 0;
    isPressed = false;
    min = 0;
    max = 100;
    value = 50;

    defaultProgressColor = '#dddddd';
    defaultProgressHeight = 6;
    thumbSize;

    // 默认props
    static defaultProps = {
        /*max: 100,
        value: 50,*/
    }

    // propTypes用于验证转入的props，当向 props 传入无效数据时，JavaScript 控制台会抛出警告
    /* static propTypes = {
         value: React.PropTypes.number.isRequired,
     }*/

    state = {
        progressPosition: 0,    // 当前进度的位置（界面位置）
    };

    constructor(props) {
        super(props);

        let progressHeight = props.progressHeight !== undefined ? props.progressHeight : this.defaultProgressHeight;
        this.thumbSize = props.thumbSize !== undefined ? props.thumbSize : this.defaultProgressHeight * 4;
        let containerHeight = Math.max(progressHeight, this.thumbSize) * 2;

        if (props.min != undefined) {
            this.min = props.min;
        }
        if (props.max != undefined) {
            this.max = props.max;
        }

        // 外部style覆盖内部默认style
        this.styles = StyleSheet.create({
            container: {
                height: containerHeight,
                padding: progressHeight,
                justifyContent: 'center',
                backgroundColor: 'transparent',
            },
            progressBackground: {
                height: progressHeight,
                borderRadius: progressHeight / 2,
                overflow: 'hidden',
                backgroundColor: props.progressBackgroundColor !== undefined ? props.progressBackgroundColor : '#2C2C2C',
            },
            innerProgressCompleted: {
                height: progressHeight,
                backgroundColor: props.progressColor !== undefined ? props.progressColor : '#cccccc',
            },
            progressThumb: {
                width: this.thumbSize,
                height: this.thumbSize,
                position: 'absolute',
                backgroundColor: props.thumbColor !== undefined ? props.thumbColor : this.defaultProgressColor,
                borderStyle: 'solid',
                borderRadius: this.thumbSize / 2,
            },

        })
    }

    render() {
        if (this.props.progress != undefined) {
            this.setProgress(this.props.progress);
        }
        return (
            <View style={[this.styles.container, this.props.style]}
                  onLayout={(e) => {
                      this.progressWidth = e.nativeEvent.layout.width;
                      this.progressLeft = e.nativeEvent.layout.x;
                      this.setProgress(this.value);
                      console.log("获取宽度：" + this.progressWidth + ", 位置：" + this.progressLeft);
                  }}

                  onStartShouldSetResponder={() => true}
                  onMoveShouldSetResponder={() => true}
                  onResponderGrant={(event) => this.onGrant(event)}
                  onResponderMove={(event) => this.onMoving(event)}
                  onResponderEnd={(event) => this.onPressEnd(event)}
            >

                <View style={this.styles.progressBackground}>
                    <View style={[this.styles.innerProgressCompleted,
                        {
                            width: this.state.progressPosition,
                            backgroundColor: this.props.progressColor == undefined ? this.styles.innerProgressCompleted.backgroundColor : this.props.progressColor
                        }
                    ]}/>
                    {/*如果还要加其他进度条，在这儿加*/}
                </View>

                <View style={[this.styles.progressThumb,
                    {
                        //left: this.styles.container.padding + (this.progressWidth - this.styles.container.padding * 2) * this.state.progressPosition / this.progressWidth - this.thumbSize / 2,
                        left: this.state.progressPosition,
                        backgroundColor: this.getThumbColor(),
                    }]}
                />
            </View>
        );
    }

    getThumbColor() {
        let color = this.defaultProgressColor;
        if (this.isPressed) {
            if (this.props.thumbColorPressed !== undefined) {
                color = this.props.thumbColorPressed;
            }
        } else {
            if (this.props.thumbColor !== undefined) {
                color = this.props.thumbColor;
            }
        }
        return color;
    }


    setProgress(value) {
        if (this.value != value) {
            this.value = value;
            this.setState(
                {
                    progressPosition: this.progressWidth * (this.value - this.min) / (this.max - this.min),
                }
            )
        }
    }


    onGrant(event) {
        this.isPressed = true;
        this.onMoving(event);
        console.log("onGrant");
    }

    onMoving(event) {
        let mX = event.nativeEvent.pageX;   // 相对于父组件位置
        let left = mX - this.progressLeft;  // 计算在组件内的位置
        //let left = event.nativeEvent.locationX; // 超出范围时会突然变很小，Bug
        console.log("onMoving:" + left);
        if (left < 0) {
            left = 0;
        } else if (left > this.progressWidth) {
            left = this.progressWidth;
        }

        let newValue = this.min + (this.max - this.min) * left / this.progressWidth;
        if (this.value != newValue) {
            this.setState({
                progressPosition: left,
            })

            this.value = newValue;

            if (this.props.onProgressChanged !== undefined) {
                this.props.onProgressChanged(this.value, true)
            }
        }
    }

    onPressEnd(event) {
        console.log("onPressEnd");
        this.isPressed = false;
        this.onMoving(event);
    }

}

