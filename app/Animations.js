import React, {Component} from 'react';
import {Text, View} from 'react-native';
import FadeAnimation from './Components/FadeAnimation'
import Button from './Components/Button';

export default class Animations extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'stretch',}}>

                <Button text='FadeIn' onPress={() => this.refs.fadeAnim.fadeIn()}/>
                <Button text='FadeOut' onPress={() => this.refs.fadeAnim.fadeOut()}/>

                <FadeAnimation ref='fadeAnim' style={{
                    width: 250,
                    height: 120,
                    marginTop: 60,
                    backgroundColor: 'powderblue',
                    alignSelf: 'center'
                }}>
                    <Text style={{fontSize: 28, color: '#e4511e', textAlign: 'center', padding: 20}}>Fading
                        Animation</Text>
                </FadeAnimation>
            </View>
        )
    }
}