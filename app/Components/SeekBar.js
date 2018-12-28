import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'


export default class SeekBar extends Component {

    containerWidth = 0;
    containerLeft = 0;
    progressLeft = 0;
    progressRight = 0;
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
        thumbColor: this.defaultProgressColor,
        isPressed: false,
    };

    constructor(props) {
        super(props);

        let progressHeight = props.progressHeight || this.defaultProgressHeight;
        this.thumbSize = props.thumbSize || this.defaultProgressHeight * 4;
        let containerHeight = Math.max(progressHeight, this.thumbSize) * 2;
        this.min = props.min || 0;
        this.max = props.max || 100;

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
                backgroundColor: props.progressBackgroundColor || '#2C2C2C',
            },
            innerProgressCompleted: {
                height: progressHeight,
                backgroundColor: props.progressColor || '#cccccc',
            },
            progressThumb: {
                width: this.thumbSize,
                height: this.thumbSize,
                position: 'absolute',
                backgroundColor: props.thumbColor || this.defaultProgressColor,
                borderStyle: 'solid',
                borderRadius: this.thumbSize / 2,
            },

        })
    }

    render() {

        // 外部指定了progress就更新
        if (this.props.progress != undefined) {
            this.value = this.props.progress;
            this.state.progressPosition = this.getPositionFromValue();
        }

        if (this.props.max != undefined) {
            this.max = this.props.max;
        }

        return (
            <View style={[this.styles.container, this.props.style]}
                  onLayout={(e) => {
                      this.containerWidth = e.nativeEvent.layout.width;
                      this.containerLeft = e.nativeEvent.layout.x;
                      console.log("获取容器宽度：" + this.containerWidth + ", 位置：" + this.containerLeft);
                  }}

                  onStartShouldSetResponder={() => true}
                  onMoveShouldSetResponder={() => true}
                  onResponderGrant={(event) => this.onGrant(event)}
                  onResponderMove={(event) => this.onMoving(event)}
                  onResponderEnd={(event) => this.onPressEnd(event)}
            >

                <View style={this.styles.progressBackground}
                      onLayout={(e) => {
                          this.progressLeft = e.nativeEvent.layout.x;
                          this.progressRight = this.progressLeft + e.nativeEvent.layout.width;
                          console.log("获取进度条位置：" + this.progressLeft + ", " + this.progressRight);
                          this.setProgress(this.value);
                      }}
                >
                    <View style={[this.styles.innerProgressCompleted,
                        {
                            width: this.state.progressPosition - this.progressLeft,
                            backgroundColor: this.props.progressColor || this.styles.innerProgressCompleted.backgroundColor
                        }
                    ]}/>
                    {/*如果还要加其他进度条，在这儿加*/}
                </View>

                <View style={[this.styles.progressThumb,
                    {
                        left: this.state.progressPosition - this.thumbSize / 2 ,
                        backgroundColor: this.getThumbColor(),
                    }]}
                />
            </View>
        );
    }

    componentWillMount(): void {
        console.log("componentWillMount");
    }

    componentDidMount(): void {
        console.log("componentDidMount, value:" + this.value);
    }

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log("componentDidUpdate");
    }


    getThumbColor() {
        let color = this.defaultProgressColor;
        if (this.state.isPressed) {
            color = this.props.thumbColorPressed || color;
        } else {
            color = this.props.thumbColor || color;
        }
        return color;
    }


    /**
     * 把对外的value值转成界面对应的位置。
     * @param value
     */
    setProgress(value) {
        this.value = value;
        let position = this.getPositionFromValue();
        this.updatePosition(position, false);
    }

    getPositionFromValue() {
        let position = this.progressLeft + (this.progressRight - this.progressLeft) * (this.value - this.min) / (this.max - this.min);
        return position;
    }

    getPositionFromEvent(event) {
        let mX = event.nativeEvent.pageX;   // 相对于父组件位置
        let position = mX - this.containerLeft;  // 计算在组件内的位置
        let position2 = event.nativeEvent.locationX; // 超出范围时会突然变很小，Bug
        console.log("getPositionFromEvent:" + mX + ", " + position + ", " + position2);
        return position;
    }

    updatePosition(position, fromUser = true) {
        console.log("updatePosition: " + position);
        let newValue = 0;
        if (position < this.progressLeft) {
            position = this.progressLeft;
            newValue = this.min;
        } else if (position > this.progressRight) {
            position = this.progressRight;
            newValue = this.max;
        } else {
            newValue = this.min + (this.max - this.min) * position / this.containerWidth;
        }

        if (this.value != newValue) {
            this.value = newValue;

            this.setState(
                {
                    progressPosition: position,
                }
            )

            // 用户手动拖动才触发监听
            if (fromUser && this.props.onProgressChanged !== undefined) {
                this.props.onProgressChanged(this.value)
            }
        }
    }


    onGrant(event) {
        console.log("onGrant");
        let position = this.getPositionFromEvent(event);
        this.updatePosition(position);
        this.setState(
            {
                isPressed: true,
            }
        )

        if (this.props.onStartTouch !== undefined) {
            this.props.onStartTouch(this.value)
        }

    }

    onMoving(event) {
        let position = this.getPositionFromEvent(event);
        this.updatePosition(position);
    }

    onPressEnd(event) {
        console.log("onPressEnd");
        let position = this.getPositionFromEvent(event);
        this.updatePosition(position);
        this.setState(
            {
                isPressed: false,
            }
        )

        if (this.props.onStopTouch !== undefined) {
            this.props.onStopTouch(this.value)
        }
    }

}

