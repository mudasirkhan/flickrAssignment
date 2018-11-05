import React from "react";
import {View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../styles/styles";

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: props.value,
        }
    }

    update = () => {
        this.props.updateValue(this.state.search);
    }

    render() {
        const {onPress} = this.props;
        return (
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.heading}>
                            Flickr
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={this.state.search}
                        onChangeText={(search) => {
                            this.setState({search})
                        }}
                        style={styles.textInput}
                        placeholder={"Search Images here"}
                        returnKeyType={"go"}
                        onSubmitEditing={this.update}
                    />
                    {this.state.search !== "" ?
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({search: ""})
                            }}
                            style={styles.button}

                        >
                            <Image
                                source={require("../../assets/close.png")}
                                style={styles.imageSmall}
                            />
                        </TouchableOpacity>
                        : null
                    }
                    <TouchableOpacity
                        onPress={this.update}
                        style={styles.button}

                    >
                        <Image
                            source={require("../../assets/search.png")}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}