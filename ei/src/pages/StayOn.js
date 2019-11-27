import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import { Container, Header, Title, Body, Content } from 'native-base';

export default class StayOn extends Component {
    static navigationOptions = {
        title: 'Fique Ligado!',
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
            GridViewItems: [
                { key: 'Login', page: 'Main' },
                { key: 'Cadastre-se', page: 'RegisterMember' }
            ]
        }
    }
    GetGridViewItem(page, key) {
        this.props.navigation.navigate(page, {
            type: key,
            title: ''
        });
    }

    render() {
        return (
            <Container style={styles.MainContainer}>
                <Content>
                    <Header style={styles.header}>
                        <Body>
                            <Title>Calendário de Estágios campus Panambi</Title>
                            {/* <Subtitle> Mostrar a direção; dirigir, guiar, encaminhar, nortear: orientar alguém na direção certa.</Subtitle> */}
                        </Body>
                    </Header>

                    <Text style={styles.text}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Atenção Estudante: </Text>
                        verifique no Setor de Estágio se a sua documentação está em dia!</Text>
                </Content>
            </Container>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        // marginHorizontal: 12,
        paddingHorizontal: 8
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