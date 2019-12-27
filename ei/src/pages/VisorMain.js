import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Item } from 'native-base';
import Esperador from '../components/Esperador';
import { readUser, onLogout, readToken } from "../config/auth";
import { NavigationActions, StackActions } from 'react-navigation';

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
            logado: {},
            backgroundColor: null,
            GridViewItems: [
                { key: 'Informações Sobre o Estágio', page: 'InfoStage' },
                { key: 'Estagiários', page: 'ViewReports' },
                { key: 'Para Refletir', page: 'ToThink' },
                { key: 'Contatos', page: 'Contacts', icon: 'contacts' },
                { key: 'Fique Ligado!', page: 'StayOn' },
                { key: 'Sobre o App', page: 'About' },
                { key: 'Logout', page: 'logout' }
            ]
        }
    }
    async getUser() {

        const user = await readUser();
        logado = JSON.parse(user);

        const token = await readToken()

        await this.setState({ logado, token })

        this.changeHeaderColor()
    }
    async changeHeaderColor() {
        if (this.state.logado.type == 2) {
            await this.props.navigation.setParams({ title: `Olá ${this.state.logado.name}`, backgroundColor: '#007fc4' });
            await this.setState({ backgroundColor: '#007fc4' })

        } else {
            await this.props.navigation.setParams({ title: `Olá ${this.state.logado.name}`, backgroundColor: '#004cc4' });
            await this.setState({ backgroundColor: '#004cc4' })
        }
    }
    async componentDidMount() {
        await this.getUser()
    }

    async GetGridViewItem(page, key) {
        const { logado, backgroundColor, token } = this.state;

        if (page == 'logout') {
            this.setState({ formSent: false })

            loggedOut = await onLogout()

            if (loggedOut) {
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
                backgroundColor,
                token
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
    text: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'RobotoMono-Light',
        textAlign: 'center',
        fontWeight: '700'
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
