import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Platform, Image } from 'react-native';
import { CardItem, Header, Left, Right, Body, Title, Subtitle } from 'native-base'
import student from '../assets/image3.jpg'
import { ScrollView } from 'react-native-gesture-handler';

export default class ToThink extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Para Refletir',
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
            GridViewItems1: [
                { key: 'Postura Profissional do Estagiário', page: 'ppe' },
                { key: 'Rotina do Estagiário', page: 're' },
                { key: 'Em Busca de Felicidade', page: 'ebf' },
                { key: 'Dica de Filmes', page: 'df' },
            ],
            GridViewItems2: [
                { key: 'Funções do Professor Orientador', page: 'fpo' },
                { key: 'Tipos de Orientadores', page: 'to' },
                { key: 'Sugestões de Leitura', page: 'sl' },
                { key: 'Dica de Filmes', page: 'dfO' },
            ],
            GridViewItems3: [
                { key: 'Funções do Supervisor', page: 'fs' },
                { key: 'Valorização do Estagiário', page: 've' },
                { key: 'Dica de Filmes', page: 'dfS' },
            ],
        }
    }

    GetGridViewItem1(page, key) {
        this.props.navigation.navigate("MoreInfoStudent", {
            title: key,
            info: page
        });
    }
    GetGridViewItem2(page, key) {
        this.props.navigation.navigate("MoreInfoAdvisor", {
            title: key,
            info: page
        });
    }
    GetGridViewItem3(page, key) {
        this.props.navigation.navigate("MoreInfoSupervisor", {
            title: key,
            info: page
        });
    }

    render() {

        // estudante
        if (this.props.navigation.state.params.logado.user.type == 1) {
            return (
                <ScrollView>

                    <View style={styles.MainContainer}>
                        <Image source={student} style={styles.image}></Image>
                        <CardItem header bordered>
                            <Text style={styles.text}>O estágio é uma atividade que pode trazer imensos benefícios para a sua formação profissional e cidadã.
                                Para tornar este momento significativo, você deve demonstrar o seu conhecimento e realizar as atividades com responsabilidade e ética.
                            </Text>
                        </CardItem>

                        <CardItem>
                            <Text style={styles.text}>Para refletir mais sobre estas questões acesse os links abaixo</Text>
                        </CardItem>
                        <FlatList
                            data={this.state.GridViewItems1}
                            renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
                                <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem1.bind(this, item.page, item.key)}> {item.key} </Text>
                            </View>}
                            numColumns={1}
                        />
                    </View>
                </ScrollView>
            );
        }
        // orientador
        if (this.props.navigation.state.params.logado.user.type == 2) {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <Header style={styles.header}>
                            <Body>
                                <Title>Orientar</Title>
                                <Subtitle> Mostrar a direção; dirigir, guiar, encaminhar, nortear: orientar alguém na direção certa.</Subtitle>
                            </Body>
                        </Header>

                        <CardItem header bordered>
                        <Text style={styles.text}>O estagiário é um profissional em formação, e que precisa de orientação para desenvolver melhor as suas atividades, bem como articular, de maneira proativa, a teoria e a prática. Nesse sentido, o professor orientador tem papel fundamental no desenvolvimento pessoal e profissional do estudante durante a realização do estágio.</Text>
                        </CardItem>

                        <CardItem>
                             <Text style={styles.text}>Para refletir mais sobre estas questões acesse os links abaixo</Text>
                        </CardItem>
                        <FlatList
                            data={this.state.GridViewItems2}
                            renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
                                <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem2.bind(this, item.page, item.key)}> {item.key} </Text>
                            </View>}
                            numColumns={1}
                        />
                    </View>
                </ScrollView>

            )
        }
        // supervisor
        if (this.props.navigation.state.params.logado.user.type == 3) {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <Header style={styles.header}>
                            <Body>
                                <Title>Supervisionar</Title>
                                <Subtitle> Dirigir ou inspecionar um trabalho; revisar.</Subtitle>
                            </Body>
                        </Header>

                        <CardItem header bordered>
                             <Text style={styles.text}>O estagiário é um profissional em formação, e que precisa de orientação para desenvolver melhor as suas atividades, bem como articular, de maneira proativa, a teoria e a prática. Nesse sentido, o supervisor tem papel fundamental no desenvolvimento pessoal e profissional do estudante durante a realização do estágio.</Text>
                        </CardItem>

                        <CardItem>
                             <Text style={styles.text}>Para refletir mais sobre estas questões acesse os links abaixo</Text>
                        </CardItem>
                        <FlatList
                            data={this.state.GridViewItems3}
                            renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
                                <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem3.bind(this, item.page, item.key)}> {item.key} </Text>
                            </View>}
                            numColumns={1}
                        />
                    </View>
                </ScrollView>

            )
        }
    }
}
const styles = StyleSheet.create({
    header: {
        alignSelf: 'stretch',
        // width: 150,
        height: 100,
        resizeMode: 'stretch'
    },
    image: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        resizeMode: 'stretch'
    },
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
        height: 70,
        margin: 5,
        backgroundColor: '#1460db'

    },
    GridViewInsideTextItemStyle: {
        color: '#fff',
        padding: 18,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'RobotoMono-Light',
        textAlign: 'justify',
    },

});
