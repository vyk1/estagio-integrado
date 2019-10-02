import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Platform } from 'react-native';
import server from "../config/server";

export default class Contacts extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Contatos de ${navigation.getParam('logado').user.name}`
        }
    };
    constructor(props) {
        super(props);

        this.state = {
            logado: {}
        }

    }
    componentDidMount() {
        console.log(this.props.navigation.state.params.logado.user);
        this.getContacts()
    }

    getContacts() {
        const { user } = this.props.navigation.state.params.logado;

        fetch(`${server}/internship/user/${user._id}/contacts/${user.type}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ logado: responseJson })
                console.log('chegou aqui');
                // this.props.navigation.setParams({ title: `Contatos de ${user.name}` })

            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View>
                <Text>Ali</Text>
            </View>
        );
    }
}
