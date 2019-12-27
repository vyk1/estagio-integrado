import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import { Container, Header, Title, Body, Content } from 'native-base';
import stayon from '../assets/stayon.png'
import { ScrollView } from 'react-native-gesture-handler';

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
            <Container>
                <View style={styles.MainContainer}>
                    <ScrollView>
                        <Text style={styles.text}>
                            Nenhum estágio pode ser iniciado sem que esteja formalizado, isto é, com o Convênio firmado e o Termo de Compromisso assinado, portanto, verifique junto ao Setor de Estágio se toda a documentação está completa e correta.
                    </Text>
                        <Text style={styles.text}>
                            CALENDÁRIO DE ESTÁGIOS: as datas importantes para a realização dos estágios curriculares encontram-se no Calendário de Estágios, que é divulgado anualmente no  Mural do Setor de Estágios do campus Panambi. Então, fique atento, e não perca os prazos!
                    </Text>
                        <Image source={stayon} style={styles.image}></Image>
                        <Text style={[styles.text, { textAlign: "center" }]}>
                            Em caso de dúvidas sobre os estágios,  procure a coordenação do curso  ou o Setor de Estágio do IFFar campus Panambi.
                        </Text>
                        <Text style={[styles.text, { textAlign: "center", color: "blue" }]} onPress={() => {
                            Linking.openURL(`(55)3376-8828`)
                        }}
                        >(55)3376-8828</Text>
                        <Text style={[styles.text, { textAlign: "center", color: "blue" }]} onPress={() => {
                            Linking.openURL(`estagios.pb@iffarroupilha.edu.br`)
                        }}
                        >estagios.pb@iffarroupilha.edu.br</Text>
                    </ScrollView>
                </View>
            </Container >

        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 6,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        // marginHorizontal: 12,
        paddingHorizontal: 8
    },
    image: {
        alignSelf: 'center',
        width: 250,
        height: 250,
        resizeMode: 'stretch'
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'RobotoMono-Light',
        textAlign: 'justify',
        margin: 12,
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