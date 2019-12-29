import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import BlueButton from '../components/BlueButton';
import Esperador from '../components/Esperador';
import logo from '../assets/logo_transp2.png';
import { Container, Header, Button, Content } from 'native-base';
import { isLoggedIn, readUser, onLogout, readToken, teste } from "../config/auth";

export default class About extends Component {
    static navigationOptions = {
        title: 'Bem-vind@ ao App Estágio Integrado',
        headerStyle: {
            backgroundColor: '#8998e3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'RobotoMono-Bold',
            fontSize: 15
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            formSent: false,
            GridViewItems: [
                { key: 'Login', page: 'Login' },
                { key: 'Cadastre-se', page: 'RegisterMember' }
            ]
        }
    }
    GetGridViewItem(page, key) {
        this.props.navigation.navigate(page, {
            key,
            title: 'Carregando'
        });
    }
    async componentDidMount() {

        this.setState({ formSent: false })
        const on = await isLoggedIn();

        if (on == true) {
            const user = await readUser();
            json = JSON.parse(user);

            if (json.type == 1) {
                this.setState({ formSent: true })
                return this.setState({ Continue: { page: 'StudentMain', key: "Continuar Seção" } })
            }
            if (json.type == 2 || 3) {
                this.setState({ formSent: true })
                return this.setState({ Continue: { page: 'VisorMain', key: "Continuar Seção" } })
            }
        } else {
            this.setState({ formSent: true })
        }
    }

    render() {
        if (!this.state.formSent) {
            return (
                <Esperador />
            )
        } else {
            return (
                <Container style={styles.MainContainer}>
                    <Content>
                        <Image source={logo} style={styles.image}></Image>
                        <Text style={[styles.text, { marginTop: 0 }]}>
                            Estágio é a prática profissional em situação real
                            de trabalho. É um momento de formação orientada e
                            supervisionada, que articula a formação escolar e o mundo do trabalho. </Text>
                        <Text style={[styles.text, { marginTop: 0 }]}>
                            Este produto visa promover a interação entre o estagiário, o professor orientador e o supervisor da parte concedente, fornecendo a ponte necessária para que ela ocorra de forma prática e eficiente.
                                </Text>
                        <Text style={[styles.text, { marginTop: 0 }]}>
                            Quer saber mais? <Text style={[styles.text, { color: 'blue' }]} onPress={() => {
                                this.props.navigation.navigate('About')
                            }}>Clique aqui</Text>
                        </Text>
                        {
                            this.state.Continue ? (
                                <View>
                                    <BlueButton onPress={this.GetGridViewItem.bind(this, this.state.Continue.page, this.state.Continue.key)}>
                                        {this.state.Continue.key}
                                    </BlueButton>
                                </View>

                            ) : (
                                    <FlatList
                                        data={this.state.GridViewItems}
                                        renderItem={({ item }) =>
                                            <BlueButton onPress={this.GetGridViewItem.bind(this, item.page, item.key)}>
                                                {item.key}
                                            </BlueButton>

                                        }
                                    />

                                )
                        }

                    </Content >
                </Container >

            );
        }
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 8,
        paddingRight: 2
    },
    image: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        resizeMode: 'stretch'
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'RobotoMono-Light',
        textAlign: 'justify',
        margin: 17,
    },
    GridViewBlockStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: '#00BCD4'

    },
    GridViewInsideTextItemStyle: {
        color: '#fff',
        padding: 18,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',

    },
})