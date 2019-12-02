import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Item } from 'native-base';
import Esperador from '../components/Esperador';
import { readUser, USER, TOKEN_KEY } from '../config/auth';

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
            GridViewItems: [
                { key: 'Informações Sobre o Estágio', page: 'InfoStage' },
                { key: 'Estagiários', page: 'ViewReports' },
                { key: 'Para Refletir', page: 'ToThink' },
                { key: 'Contatos', page: 'Contacts', icon: 'contacts' },
                { key: 'Ei! Fique Ligado', page: 'StayOn' },
                { key: 'Sobre o App', page: 'About' }
            ]
        }
    }
    async getUser() {

        console.log('on');
        const user = await readUser();
        logado = JSON.parse(user);

        console.log(logado);

        await this.setState({ logado })
        this.changeHeaderColor()
    }
    async changeHeaderColor() {
        if (this.state.logado.type == 2) {
            await this.props.navigation.setParams({ title: `Olá ${this.state.logado.name}`, backgroundColor: '#5fb2d4' });
            await this.setState({ backgroundColor: '#5fb2d4' })

        } else {
            await this.props.navigation.setParams({ title: `Olá ${this.state.logado.name}`, backgroundColor: '#5bd4d4' });
            await this.setState({ backgroundColor: '#5bd4d4' })
        }
    }
    async componentDidMount() {
        await this.getUser()
    }

    GetGridViewItem(page, key) {
        const { logado, backgroundColor } = this.state;

        this.props.navigation.navigate(page, {
            // title: key,
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
                                {item.icon && (<Icon type={"MaterialIcons"} name={item.icon} />)}
                                <Text style={[styles.GridViewInsideTextItemStyle, styles.text]} onPress={this.GetGridViewItem.bind(this, item.page)} > {item.key} </Text>
                            </View>}
                        numColumns={2} />
                    <Footer style={{ color: this.state.backgroundColor, margin: 0 }}>
                        <FooterTab>
                            {/* <Button vertical>
                                <Icon name="apps" />
                                <Text>Apps</Text>
                            </Button>
                            <Button vertical>
                                <Icon name="camera" />
                                <Text>Camera</Text>
                            </Button>
                            <Button vertical active>
                                <Icon name="navigate" />
                                <Text>Navigate</Text>
                            </Button> */}
                            <Button vertical style={{ color: 'white' }}>
                                <Icon name="account-circle" type={"MaterialIcons"} />
                                <Text>Conta</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
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
