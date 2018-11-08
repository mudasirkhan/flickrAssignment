import React, { PureComponent } from 'react';
import styles from "../styles/styles";
import {Image, TouchableOpacity, View, Text} from 'react-native';
export default class Post extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const {item, zoom, index, onPress} = this.props;
        return  <TouchableOpacity
            activeOpacity={1}
            key={item.id}
            onPress={()=>{
                onPress(index)
                // this.props.navigation.navigate('Image',{uri:`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`})
            }}>
            <View>
                {
                    zoom ?
                        <View style={styles.tapToClose}>
                            <Text style={{ color: 'white' }}>
                                Tap to close
                            </Text>
                        </View>
                        : null
                }
                <Image
                    defaultSource={require('../../assets/splash.png') }
                    source={{uri:`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`,}}
                    style={zoom ? styles.listItemLarge :styles.listItemSmall}
                    resizeMode={"cover"}/>
                {zoom ?
                    <View style={[styles.padding]}>
                        <Text style={styles.text}>Title: {item.title}</Text>
                        <Text>Farm: {item.farm}</Text>

                    </View>
                    : null}
            </View>
        </TouchableOpacity>
    }
}