import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation'
import { Provider } from 'react-redux';
import store from './app/reducers';
import Home from './app/screens';
import ImageScreen from './app/screens/Image';

import thunk from 'redux-thunk';




const Router = createStackNavigator({
        Home: {screen: Home},
        Image: {screen: ImageScreen}
    }
    ,{
        headerMode: 'screen'
    }
);
export default class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <Router/>
            </Provider>)
    }
}

const styles = StyleSheet.create({

});
