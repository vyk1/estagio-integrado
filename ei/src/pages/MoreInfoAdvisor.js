import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Image, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import student from '../assets/student2.png'
import advisor1 from '../assets/advisor1.jpg'
import advisor2 from '../assets/advisor2.jpg'
import { Container, Header, Content, Accordion } from "native-base";

const dataArray = [
    { title: "O Diabo Veste Prada (2006)", content: "O longa-metragem conta a história de Andrea, uma jornalista que começa a trabalhar como assistente de Miranda Priestly, editora-chefe de uma renomada revista de moda que trata seus funcionários de forma impiedosa. O filme traz reflexões sobre o mundo corporativo, demonstrando a superação da protagonista após receber um feedback de seu colega de trabalho, o autoconhecimento, o profissionalismo dela com as tarefas mesmo em situações adversas, o equilíbrio entre a carreira e a vida pessoal e as questões éticas e morais relacionadas às escolhas no trabalho." },
    { title: "Um Senhor Estagiário (2015)", content: "Jules Ostin é diretora de um site de moda famoso e passa a contar com a ajuda de Ben, um viúvo de 70 anos que assume a vaga de estagiário sênior na empresa. A diretora tem dificuldade de delegar tarefas e quer controlar tudo o que se passa em sua empresa, o que acaba prejudicando sua vida pessoal. Além de falar sobre o respeito às diferenças, o filme mostra a superação de obstáculos, a importância de estar aberto a novos aprendizados e desafios, entre outros temas." },
    { title: "O Sorriso de Monalisa (2003)", content: "O enredo fala sobre uma jovem professora, que foi contratada para lecionar História da Arte em um colégio feminino bastante tradicional. A obra traz reflexões acerca da flexibilidade, sobre fazer coisas além do óbvio e também mostra que é preciso colocar em prática tudo aquilo que se aprende na teoria." },
    { title: "Ritmo total (2002)", content: "Retrata a história de dois vendedores de relógios de grife, Billy e Nick, que tem uma vida de alto padrão, e que ficam desempregados após uma queda nas vendas. Sem rumo, os dois se candidatam ao programa de estágios do Google. Com 40 anos de idade e poucas habilidades técnicas, eles disputam a vaga com jovens, e precisam lidar com a diferença de idade e de conhecimentos entre eles. Além de retratar de maneira cômica a divergência entre as gerações, ele ainda ensina sobre adaptação a diferentes situações, persistência e a arriscar em busca de novas oportunidades." },
    { title: "Os Estagiários (2013)", content: "O adolescente Devon Miles se forma no ensino médio e parte para Atlanta para estudar numa universidade famosa pela qualidade de suas bandas. Ele acredita que seu talento individual poderá levar seu grupo de músicos à vitória numa competição entre escolas, mas logo percebe que isso não é suficiente. O longa mostra que o individualismo e o “estrelismo” podem ser extremamente nocivos para a carreira do jovem. Além de mais produtivo, o trabalho em equipe costuma gerar resultados melhores e mais sustentáveis a longo prazo." }
];
const dataArray1 = [
    { title: "O Diabo Veste Prada (2006)", content: "O longa-metragem conta a história de Andrea, uma jornalista que começa a trabalhar como assistente de Miranda Priestly, editora-chefe de uma renomada revista de moda que trata seus funcionários de forma impiedosa. O filme traz reflexões sobre o mundo corporativo, demonstrando a superação da protagonista após receber um feedback de seu colega de trabalho, o autoconhecimento, o profissionalismo dela com as tarefas mesmo em situações adversas, o equilíbrio entre a carreira e a vida pessoal e as questões éticas e morais relacionadas às escolhas no trabalho." },
    { title: "O Sorriso de Monalisa (2003)", content: "O enredo fala sobre uma jovem professora, que foi contratada para lecionar História da Arte em um colégio feminino bastante tradicional. A obra traz reflexões acerca da flexibilidade, sobre fazer coisas além do óbvio e também mostra que é preciso colocar em prática tudo aquilo que se aprende na teoria." },
    { title: "Ritmo total (2002)", content: "Retrata a história de dois vendedores de relógios de grife, Billy e Nick, que tem uma vida de alto padrão, e que ficam desempregados após uma queda nas vendas. Sem rumo, os dois se candidatam ao programa de estágios do Google. Com 40 anos de idade e poucas habilidades técnicas, eles disputam a vaga com jovens, e precisam lidar com a diferença de idade e de conhecimentos entre eles. Além de retratar de maneira cômica a divergência entre as gerações, ele ainda ensina sobre adaptação a diferentes situações, persistência e a arriscar em busca de novas oportunidades." },
];

export default class MoreInfoAdvisor extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
            headerStyle: {
                backgroundColor: '#1B5E20',

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'RobotoMono-Bold',
                fontSize: 15
            },
        }
    };

    render() {

        if (this.props.navigation.state.params.info == 'fpo') {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <Text style={styles.text}>- Orientar o estudante durante todas as etapas de desenvolvimento do estágio.</Text>
                        <Text style={styles.text}>- Incentivar o estagiário a ir atrás do conhecimento.</Text>
                        <Text style={styles.text}>- Promover a reflexão crítica do estagiário, zelando pela qualidade das atividades.</Text>
                        <Text style={styles.text}>- Manter contato com o Supervisor, sempre que possível.</Text>
                        <Text style={styles.text}>- Contribuir para o aprendizado, visando a formação integral do estudante.</Text>

                        <Image source={advisor1} style={styles.image}></Image>
                        <Text style={styles.text}>Você concorda com as funções apresentadas? Que outras funções você acrescentaria a estas?</Text>
                    </View>
                </ScrollView>

            );
        }

        if (this.props.navigation.state.params.info == 'to') {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <Text style={styles.text}>Que tipo de orientador você é?</Text>
                        <Text style={styles.text}>Para refletir sobre isto, e descontrair um pouco, observe a figura abaixo:</Text>
                        <Image source={advisor2} style={[styles.image, { height: 672, width: 420 }]}></Image>
                        <Text style={styles.text}>O orientador ideal é aquele que desenvolve um trabalho pedagógico integrado, que promove a discussão teórica da prática, conduzindo o estágio para um fazer refletido, pensado, um fazer transformador e significativo para os estudantes.</Text>
                        <Text style={styles.text}>E então, é este tipo de orientador que você é?</Text>

                    </View>
                </ScrollView>
            )
        }
        if (this.props.navigation.state.params.info == 'sl') {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <Text style={styles.text}>Confira a lista que preparamos abaixo:</Text>

                        <Text style={styles.text}>
                            <Text style={[styles.text, { textDecorationLine: "underline" }]}>- Livro: </Text>
                            <Text style={[styles.text, { fontWeight: "bold" }]}>A prática de Ensino e o Estágio Supervisionado.</Text>
                            Coordenadora: Stela C. Berhtolo Piconez. Editora: Papirus.
                        </Text>

                        <Text style={styles.text}>
                            <Text style={[styles.text, { textDecorationLine: "underline" }]}>- Artigo: </Text>
                            <Text style={[styles.text, { fontWeight: "bold" }]}>Competência como práxis: Os dilemas da relação entre teoria e prática na educação dos trabalhadores</Text>
                            , de Acacia Zeneida Kuenzer. Disponível em:
                            <Text style={{ color: 'blue' }} onPress={() => {
                                Linking.openURL(`http://www.bts.senac.br/index.php/bts/article/view/501`)
                            }}
                            >http://www.bts.senac.br/index.php/bts/article/view/501</Text>
                        </Text>

                        <Text style={styles.text}>
                            <Text style={[styles.text, { textDecorationLine: "underline" }]}>- Dissertação: </Text>
                            <Text style={[styles.text, { fontWeight: "bold" }]}>Ensino Médio Integrado: o estágio como um dos elementos articuladores da formação geral e profissional</Text>
                            , de Silvia Fernanda Martins Dias Ribeiro, UFMA. 2011. Disponível em:
                            <Text style={{ color: 'blue' }} onPress={() => {
                                Linking.openURL(`https://tedebc.ufma.br/jspui/handle/tede/199`)
                            }}
                            >https://tedebc.ufma.br/jspui/handle/tede/199</Text>
                        </Text>

                        <Text style={styles.text}>
                            <Text style={[styles.text, { textDecorationLine: "underline" }]}>- Dissertação: </Text>
                            <Text style={[styles.text, { fontWeight: "bold" }]}>Estágio Curricular Supervisionado: a contribuição para a formação profissional do técnico agrícola no Instituto Federal de Minas Gerais - Campus de Bambuí</Text>
                            , de Cláudio Miguel Alves de Faria, UFRRJ, 2009. Disponível em:
                            <Text style={{ color: 'blue' }} onPress={() => {
                                Linking.openURL(`http://cursos.ufrrj.br/posgraduacao/ppgea/files/2015/07/Claudio-Miguel-Alves-de-Faria.pdf`)
                            }}
                            >http://cursos.ufrrj.br/posgraduacao/ppgea/files/2015/07/Claudio-Miguel-Alves-de-Faria.pdf</Text>
                        </Text>

                    </View>
                </ScrollView>

            );
        }
        if (this.props.navigation.state.params.info == 'dfO') {
            return (
                <ScrollView>

                    <View style={styles.MainContainer}>
                        <Text style={styles.text}>
                            Além de serem ótimas opções de entretenimento, muitos filmes carregam mensagens inspiradoras que podem te incentivar a encarar os desafios do mundo do trabalho!</Text>
                        <Text style={styles.text}>
                            Confira a lista que preparamos abaixo e aperte o play!</Text>

                        <Accordion
                            headerStyle={{ backgroundColor: "#8abfde" }}
                            contentStyle={{ backgroundColor: "#A9DAD6", textAlign: 'justify' }}
                            dataArray={dataArray1} />
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
