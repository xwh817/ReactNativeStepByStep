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
                    marginTop: 20,
                    fontSize: 24,
                    fontWeight: 'bold',
                }}>{this.state.value}</Text>

                <SeekBar ref='seekBar1'
                    onProgressChanged={(progress) => this.onProgressChanged(progress)}
                    progress={this.state.value}
                />

                <SeekBar style={{margin: 20, padding: 20, backgroundColor: 'black'}}
                         min={0}
                         max={100}
                         progress={this.state.value}
                         progressHeight={4}
                         thumbSize={40}
                         progressBackgroundColor='#663300'
                         progressColor='#88cc33'
                         thumbColor='#88cc33'
                         thumbColorPressed='#ff6633'
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

        //this.refs.seekBar1.setProgress(progress);
    }
}
