import React, {Component} from 'react';
import {View, Text} from 'react-native';

import SeekBar from './Components/SeekBar'

export default class MyComponents extends Component {

    state = {
        value: 50,
    }

    render() {
        return (
            <View>
                <Text style={{
                    textAlign: 'center',
                    color: '#88cc33',
                    margin: 20,
                    fontSize: 24,
                    fontWeight: 'bold',
                }}>{this.state.value}</Text>

                <SeekBar style={{margin: 20, padding: 40, backgroundColor:'red'}}
                         onProgressChanged={(progress) => this.onProgressChanged(progress)}
                         max={200}
                         progress={this.state.value}
                />

                <SeekBar style={{margin: 20, backgroundColor:'red'}}
                         progressBackgroundColor='#ff6633'
                         progressColor='#88cc33'
                         progressHeight={4}
                         thumbSize={20}
                         thumbColor='#88cc33'
                         thumbColorPressed='#ff9933'
                         onProgressChanged={(progress) => this.onProgressChanged(progress)}
                />

                <SeekBar style={{margin: 20, padding: 40, backgroundColor:'red'}}
                         progressBackgroundColor='#ff6633'
                         progressColor='#88cc33'
                         progressHeight={4}
                         thumbSize={40}
                         thumbColor='#88cc33'
                         thumbColorPressed='#ff9933'
                         onProgressChanged={(progress) => this.onProgressChanged(progress)}
                />

            </View>
        );
    }

    onProgressChanged(progress) {
        this.setState(
            {
                value: Math.round(progress),
            }
        )
    }
}
