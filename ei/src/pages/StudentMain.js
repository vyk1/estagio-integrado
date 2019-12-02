import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Platform } from 'react-native';
import server from "../config/server";
import Esperador from '../components/Esperador';
import { readUser, onLogout } from "../config/auth";
import { NavigationActions, StackActions } from 'react-navigation';

export default class StudentMain extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
            headerStyle: {
                backgroundColor: '#5f98e3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'RobotoMono-Bold',
                fontSize: 15
            },
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            logado: {},
            backgroundColor: null,
            GridViewItems: [
                { key: 'Informações Sobre o Estágio', page: 'InfoStage' },
                { key: 'Registrar Atividade', page: 'RegisterActivity' },
                // { key: 'Registrar Atividade', page: 'ImageTest' },
                { key: 'Relatório Geral', page: 'GenReport' },
                { key: 'Contatos', page: 'Contacts' },
                { key: 'Ei! Fique Ligado', page: 'StayOn' },
                { key: 'Para Refletir', page: 'ToThink' },
                { key: "Sobre o App", page: "About" },
                { key: 'Logout', page: 'logout' }
            ],
        }
    }

    async getUser() {

        const user = await readUser();
        logado = JSON.parse(user);

        console.log(logado);

        await this.setState({ logado })

        await this.props.navigation.setParams({ title: `Olá ${this.state.logado.name}` })
        await this.setState({ backgroundColor: '#5f98e3' })

    }
    async componentDidMount() {
        this.getUser()
    }

    async GetGridViewItem(page, key) {
        const { logado, backgroundColor } = this.state;

        if (page == 'logout') {
            this.setState({ formSent: false })

            loggedOut = await onLogout()

            if (loggedOut) {
                console.log('delogo');
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Inicial' })],
                });
                this.props.navigation.dispatch(resetAction);

            }
        } else {
            this.props.navigation.navigate(page, {
                logado,
                title: 'Carregando',
                backgroundColor
            });
        }
    }
    renderiza() {
        const { logado, backgroundColor } = this.state;

        if (!Object.keys(logado).length || backgroundColor == null) {
            return (
                <Esperador />
            )
        } else {
            return (
                <View style={styles.MainContainer}>
                    <FlatList
                        data={this.state.GridViewItems}
                        renderItem={({ item }) =>
                            <View style={[styles.GridViewBlockStyle, { backgroundColor: `${backgroundColor}` }]}>
                                <Text style={[styles.GridViewInsideTextItemStyle, styles.text]} onPress={this.GetGridViewItem.bind(this, item.page)} > {item.key} </Text>
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
    text: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'RobotoMono-Light',
        textAlign: 'center',
        fontWeight: 'bold'
    },
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
