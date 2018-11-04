import styles from "../styles/styles";
import React from "react";
import {View, Text, TextInput, TouchableOpacity, Image, Dimensions } from "react-native";

const {height, width} = Dimensions.get('window');

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: props.value,
        }
    }
    render() {
        return (
        <View style={{height: 66, width: width, flexDirection: 'row', alignItems: 'flex-end'}}>
            <View style={styles.header}>
                <TextInput underlineColorAndroid={'transparent'} value={this.state.search} onChangeText={(search) => {
                    this.setState({search})
                }} style={{flex: 1, alignSelf: 'flex-end', marginBottom: 0, paddingHorizontal: 4}}
                           placeholder={"Search"}/>
                <TouchableOpacity onPress={() => {
                    this.props.updateValue(this.state.search)
                }}>
                    <Image source={require("../../assets/search.jpg")} style={styles.image}/>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}