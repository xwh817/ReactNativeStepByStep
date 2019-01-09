import React, {Component} from 'react';
import {Animated} from 'react-native';

export default class FadeAnimation extends Component {
    /*AnimType = {
        IN: 1,
        OUT: 2,
    };*/
    /**
     * animatedValue 通过一个值的变化，来触发界面的变化，产生动画效果
     * 类似于Android里面的值动画 （ValueAnimator，属性动画）
     */
    state = {
        animatedValue: new Animated.Value(0),  // 初始值设为0
        animType : this.animIn,
    }

    componentDidMount() {
        this.fadeIn();
    }

    fadeIn() {
        this.setState({animType : this.animIn})
        this.startAnim(0, 1, 1000)
    }

    fadeOut() {
        this.setState({animType : this.animOut})
        this.startAnim(1, 0, 1000)
    }

    startAnim(fromValue, toValue, duration) {
        this.state.animatedValue.setValue(fromValue);
        Animated.timing(                  // 随时间变化而执行动画
            this.state.animatedValue,            // 动画中的变量值
            {
                toValue: toValue,                   // 透明度最终变为1，即完全不透明
                duration: duration,              // 让动画持续一段时间
            }
        ).start();
    }

    /**
     * 通过插值器，控制各种out效果
     */
    animIn = this.state.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 200, 100]
    });

    animOut = this.state.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [400, 200, 100]
    });

    render() {
        let animFade = this.state.animatedValue;
        return (
            <Animated.View                 // 使用专门的可动画化的View组件
                style={{
                    ...this.props.style,
                    opacity: animFade,         // 将透明度指定为动画变量值
                    marginTop: this.state.animType,
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}