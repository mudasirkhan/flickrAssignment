import React from 'react';
import {View, Text} from 'react-native';
import styles from "../styles/styles";

export default class Intro extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount () {
        setTimeout(()=>{this.props.navigation.replace('Dashboard')}, 3000);
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={[ styles.heading ]}>
                    Welcome To Flickr
                </Text>
            </View>
        )
    }

}