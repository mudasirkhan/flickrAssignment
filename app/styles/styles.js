import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create( {
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 16,
        width: 16
    },
    header: {
        flex: 1,
        borderBottomColor: 'green',
        borderBottomWidth: 1,
        marginHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemSmall: {
        height: width/(3+.7),
        width: width/(3+.7),
        marginRight: 8},
    listItemLarge: {
        width: width,
        height: width
    }
})