import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: "Welcome to JobApp", color: "blue" },
    { text: "This is a cool app", color: "green"  },
    { text: "Set your location, then swipe away", color: "red"  }
];

class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        let token = await AsyncStorage.getItem("fb_token");

        if (token) {
            this.setState({ token: true })
            this.props.navigation.navigate("map");
        } else {
            this.setState({ token: false })
        }
        
    }

    onSlidesComplete() {
        this.props.navigation.navigate("auth");
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading/>
        }

        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)}/>
        );
    }
}

export default WelcomeScreen;