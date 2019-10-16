import React, { Component } from 'react';

import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform } from 'react-native';
import server from "../config/server";
import Esperador from '../components/Esperador';

export default class VisorMain extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            user: { id: '5d71649f227ac93c30958221' },
            logado: {},
            GridViewItems: [
                { key: 'Informações Sobre o Estágio', page: 'InfoStage' },
                { key: 'Estagiários', page: 'ViewReports' },
                { key: 'Para Refletir', page: 'ToThink' },
                { key: 'Contatos', page: 'Contacts' },
                { key: 'Ei! Fique Ligado', page: 'StayOn' },
                { key: 'Sobre o App', page: 'About' }
            ]
        }
    }

    async getUser() {

        return fetch(`${server}/user/${this.state.user.id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('rodou');

                this.setState({ logado: responseJson })
                console.log(responseJson);
                this.props.navigation.setParams({ title: `Olá ${this.state.logado.user.name}` })

            })
            .catch((error) => {
                console.error(error);
                return false
            });
    }
    componentDidMount() {
        this.getUser()
    }

    GetGridViewItem(page, key) {
        const { logado } = this.state;
        this.props.navigation.navigate(page, {
            title: key,
            logado

        });
    }
    renderiza() {
        const { logado } = this.state;

        if (!Object.keys(logado).length) {
            return (
                <Esperador />
            )
        } else {
            return (
                <View style={styles.MainContainer}>
                    <FlatList
                        data={this.state.GridViewItems}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.page)} > {item.key} </Text>
                            </View>}
                        numColumns={2}
                    />
                </View>
            );
        }
    }

    render() {
        return (this.renderiza())
    }
}
const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0

    },

    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: '#00BCD4'

    }
    ,

    GridViewInsideTextItemStyle: {

        color: '#fff',
        padding: 18,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',

    },
    Grind2: {
        textAlign: 'center',
        fontSize: 20,
    },

});
