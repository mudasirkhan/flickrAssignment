import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';


export default class ImageScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Welcome',
    };
    constructor(props){
        super(props);

    }
    render() {
        return(<View style={{flex: 1}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{height: 64, justifyContent: 'flex-end' }}><View style={{flexDirection: 'row', alignItems:'center', paddingHorizontal: 10}}><Text>{"<"}</Text><Text style={{fontSize: 16, padding: 8}}>Back</Text></View></TouchableOpacity>
            <Image defaultSource={require('../../assets/splash.png') } style={{flex: 1}} source={{uri: this.props.navigation.getParam('uri','')}} resizeMode={'contain'}/>
        </View>)
    }
}