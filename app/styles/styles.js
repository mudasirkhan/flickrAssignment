import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Colors from './Colors'

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
    imageSmall: {
        height: 12,
        width: 12
    },
    headerContainer: {
        height: 66,
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.pink,
        paddingHorizontal: 16
    },
    header: {
        flex: 1,
        borderBottomColor: Colors.pink,
        borderBottomWidth: 4,
        marginHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: Colors.white
    },
    activityIndicator: {
        top: 4
    },
    listStyles: {
        justifyContent: 'center',
        top:10,
        alignItems: 'center'
    },
    listItemSmall: {
        height: width/(3+.7),
        width: width/(3+.7),
        marginHorizontal: 8,
        marginVertical: 8
    },
    listItemLarge: {
        width: width,
        height: width
    },
    button: {
        paddingHorizontal: 16,
    },
    textInput: {flex: 1,
        alignSelf: 'flex-end',
        marginBottom: 0,
        paddingHorizontal: 4
    }
})