import React, { PureComponent } from 'react';
import styles from "../styles/styles";
import {Image, TouchableOpacity} from 'react-native';
export default class Post extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const {item, zoom, index, onPress} = this.props;
        return  <TouchableOpacity
            activeOpacity={1}
            onPress={()=>{
                onPress(index)
                // this.props.navigation.navigate('Image',{uri:`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`})
            }}>
            <Image
                defaultSource={require('../../assets/splash.png') }
                source={{uri:`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`,}}
                style={zoom ? styles.listItemLarge :styles.listItemSmall}
                resizeMode={"cover"}/>
        </TouchableOpacity>
    }
}