import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import BlueButton from '../components/BlueButton';

import logo from '../assets/logo_transp2.png';
import { Container, Header, Button, Content } from 'native-base';

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
            GridViewItems: [
                { key: 'Login', page: 'Login' },
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
                    <Image source={logo} style={styles.image}></Image>
                    <Text style={styles.text}>
                        Estágio é a prática profissional em situação real
                        de trabalho. É um momento de formação orientada e
                        supervisionada, que articula a formação escolar e o mundo do trabalho.</Text>
                    <Text style={styles.text}>
                        Este trabalho visa tornar a comunicação entre estagiário, supervisor e orientador
                        mais acessível, fornecendo a ponte necessária para a melhor experiência de estágio
                        </Text>
                    <Text style={styles.text} onPress={() => {
                        this.props.navigation.navigate('About')
                    }}>Quer saber mais? Clique 'aqui'</Text>

                    <FlatList
                        data={this.state.GridViewItems}
                        renderItem={({ item }) =>
                            <BlueButton onPress={this.GetGridViewItem.bind(this, item.page, item.key)}>
                                {item.key}
                            </BlueButton>
                        }
                    />

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