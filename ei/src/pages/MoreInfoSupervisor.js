import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Image, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import supervisor1 from '../assets/supervisor1.png'
import { Container, Header, Content, Accordion } from "native-base";

const dataArray2 = [
    { title: "O Diabo Veste Prada (2006)", content: "O longa-metragem conta a história de Andrea, uma jornalista que começa a trabalhar como assistente de Miranda Priestly, editora-chefe de uma renomada revista de moda que trata seus funcionários de forma impiedosa. O filme traz reflexões sobre o mundo corporativo, demonstrando a superação da protagonista após receber um feedback de seu colega de trabalho, o autoconhecimento, o profissionalismo dela com as tarefas mesmo em situações adversas, o equilíbrio entre a carreira e a vida pessoal e as questões éticas e morais relacionadas às escolhas no trabalho." },
    { title: "Um Senhor Estagiário (2015)", content: "Jules Ostin é diretora de um site de moda famoso e passa a contar com a ajuda de Ben, um viúvo de 70 anos que assume a vaga de estagiário sênior na empresa. A diretora tem dificuldade de delegar tarefas e quer controlar tudo o que se passa em sua empresa, o que acaba prejudicando sua vida pessoal. Além de falar sobre o respeito às diferenças, o filme mostra a superação de obstáculos, a importância de estar aberto a novos aprendizados e desafios, entre outros temas." },
];

export default class MoreInfoAdvisor extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
            headerStyle: {
                backgroundColor: `${navigation.getParam('backgroundColor')}`,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'RobotoMono-Bold',
                fontSize: 15
            },
        }
    };

    render() {

        if (this.props.navigation.state.params.info == 'fs') {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <Text style={styles.text}>- Instruir, auxiliar e incentivar o estagiário a desempenhar as suas atividades.</Text>
                        <Text style={styles.text}>- Observar o desempenho e fornecer feedbacks que levem à resolução colaborativa de problemas.</Text>
                        <Text style={styles.text}>- Manter contato com o Professor Orientador, sempre que possível.</Text>
                        <Text style={styles.text}>- Contribuir para o aprendizado, visando a formação integral do estudante.</Text>

                        <Text style={styles.text}>
                            <Text style={[styles.text, { fontWeight: "bold" }]}>Requisitos: </Text>
                            ter boas competências técnicas e observacionais, mas também boas capacidades interpessoais, capacidade para criar confiança e uma atitude positiva e colaborativa.
                        </Text>

                        <Image source={supervisor1} style={[styles.image, { height: 400, width: 425 }]}></Image>

                        <Text style={styles.text}>Você concorda com as funções e requisitos apresentados?</Text>
                        <Text style={styles.text}>Que outras funções e requisitos você acrescentaria?</Text>

                    </View>
                </ScrollView>

            );
        }

        if (this.props.navigation.state.params.info == 've') {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <Text style={styles.text}>
                            Para abordar este assunto, assista a
                            <Text style={{ color: 'blue' }} onPress={() => {
                                Linking.openURL(`https://www.youtube.com/watch?v=Rk9vPilgQcY`)
                            }}
                            > campanha publicitária de uma empresa de automóveis
                            </Text>
                            , que em 2012 foi proibida pelo Conselho Nacional de Autorregulamentação Publicitária – Conar, por desrespeitar à figura humana.

                        </Text>
                        <Text style={styles.text}>Após assistir ao vídeo, reflita sobre os seguintes aspectos:</Text>

                        <Text style={styles.text}>- A não valorização da inteligência e competência dos estagiários.</Text>
                        <Text style={styles.text}>- Relações de superioridade entre funcionários e estagiários: relacionamento interpessoal.</Text>
                        <Text style={styles.text}>- Respeito com colegas e chefia.</Text>
                        <Text style={styles.text}>- Valorização do estagiário como um profissional em formação, que possui conhecimentos técnicos e vontade de aprender mais, e que pode trazer contribuições interessantes para o local de estágio.</Text>

                    </View>
                </ScrollView>
            )
        }

        if (this.props.navigation.state.params.info == 'dfS') {
            return (
                <ScrollView>

                    <View style={styles.MainContainer}>
                        <Text style={styles.text}>
                            Além de serem ótimas opções de entretenimento, muitos filmes carregam mensagens inspiradoras que podem te incentivar a encarar os desafios do mundo do trabalho!</Text>
                        <Text style={styles.text}>
                            Confira a lista que preparamos abaixo e aperte o play!</Text>

                        <Accordion
                            headerStyle={{ backgroundColor: "#5bd4d4" }}
                            contentStyle={{ backgroundColor: "#A9DAD6", textAlign: 'justify' }}
                            dataArray={dataArray2} />
                        <Text style={{ textAlign: "center" }}>E aí, gostou? Então, não deixe de assistir esses filmes interessantes e inspiradores.</Text>

                    </View>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 8
    },
    image: {
        alignSelf: 'center',
        height: 250,
        width: 375,
        resizeMode: 'stretch',
        paddingHorizontal: 0

    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'RobotoMono-Light',
        textAlign: 'justify',
        margin: 17,
    },
})
