import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform } from 'react-native';
import server from "../config/server";
import Esperador from '../components/Esperador';

export default class VisorMain extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
            headerStyle: {
                backgroundColor: navigation.getParam('backgroundColor', '#2979FF'),
            },
            headerTintColor: navigation.getParam('headerTintColor', '#fff'),
            headerTitleStyle: {
                fontFamily: 'RobotoMono-Bold',
                fontSize: 15
            },
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
                if (this.state.logado != null) {
                    this.changeHeaderColor();
                }
            })
            .catch((error) => {
                console.error(error);
                return false
            });

    }
    changeHeaderColor() {
        if (this.state.logado.user.type == 2) {
            // this.props.navigation.setParams({ title: , headerStyle: { backgroundColor: '#d60f16' } })
            this.props.navigation.setParams({ title: `Olá ${this.state.logado.user.name}`, backgroundColor: '#5bd4d4' });
            this.setState({ backgroundColor: this.props.navigation.getParam('backgroundColor') })
            console.log('====================================');
            console.log(this.state.backgroundColor);
            console.log('====================================');

        } else {
            // this.props.navigation.setParams({ title: `Olá ${this.state.logado.user.name}`, headerStyle: { backgroundColor: '#555' } })
            this.props.navigation.setParams({ title: 'RENDERIZAR PARA SUPERVISOR!', backgroundColor: '#1B5E20' });

        }
        return
    }
    componentDidMount() {
        this.getUser()
    }

    GetGridViewItem(page, key) {
        const { logado, backgroundColor } = this.state;

        this.props.navigation.navigate(page, {
            title: key,
            logado,
            title: 'Carregando',
            backgroundColor
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
                    {/* <Text>SSSSSS</Text> */}
                    <FlatList
                        data={this.state.GridViewItems}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.page)} > {item.key} </Text>
                            </View>}
                        numColumns={2} />
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
        paddingTop: 0,
    },

    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: '#5fbbe3'
    },

    GridViewInsideTextItemStyle: {
        color: '#fff',
        padding: 18,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',
    }
});
