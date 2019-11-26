import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Image, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import student from '../assets/student2.png'
import { Container, Header, Content, Accordion } from "native-base";

const dataArray = [
    { title: "O Diabo Veste Prada (2006)", content: "O longa-metragem conta a história de Andrea, uma jornalista que começa a trabalhar como assistente de Miranda Priestly, editora-chefe de uma renomada revista de moda que trata seus funcionários de forma impiedosa. O filme traz reflexões sobre o mundo corporativo, demonstrando a superação da protagonista após receber um feedback de seu colega de trabalho, o autoconhecimento, o profissionalismo dela com as tarefas mesmo em situações adversas, o equilíbrio entre a carreira e a vida pessoal e as questões éticas e morais relacionadas às escolhas no trabalho." },
    { title: "Um Senhor Estagiário (2015)", content: "Jules Ostin é diretora de um site de moda famoso e passa a contar com a ajuda de Ben, um viúvo de 70 anos que assume a vaga de estagiário sênior na empresa. A diretora tem dificuldade de delegar tarefas e quer controlar tudo o que se passa em sua empresa, o que acaba prejudicando sua vida pessoal. Além de falar sobre o respeito às diferenças, o filme mostra a superação de obstáculos, a importância de estar aberto a novos aprendizados e desafios, entre outros temas." },
    { title: "O Sorriso de Monalisa (2003)", content: "O enredo fala sobre uma jovem professora, que foi contratada para lecionar História da Arte em um colégio feminino bastante tradicional. A obra traz reflexões acerca da flexibilidade, sobre fazer coisas além do óbvio e também mostra que é preciso colocar em prática tudo aquilo que se aprende na teoria." },
    { title: "Ritmo total (2002)", content: "Retrata a história de dois vendedores de relógios de grife, Billy e Nick, que tem uma vida de alto padrão, e que ficam desempregados após uma queda nas vendas. Sem rumo, os dois se candidatam ao programa de estágios do Google. Com 40 anos de idade e poucas habilidades técnicas, eles disputam a vaga com jovens, e precisam lidar com a diferença de idade e de conhecimentos entre eles. Além de retratar de maneira cômica a divergência entre as gerações, ele ainda ensina sobre adaptação a diferentes situações, persistência e a arriscar em busca de novas oportunidades." },
    { title: "Os Eestagiários (2013)", content: "O adolescente Devon Miles se forma no ensino médio e parte para Atlanta para estudar numa universidade famosa pela qualidade de suas bandas. Ele acredita que seu talento individual poderá levar seu grupo de músicos à vitória numa competição entre escolas, mas logo percebe que isso não é suficiente. O longa mostra que o individualismo e o “estrelismo” podem ser extremamente nocivos para a carreira do jovem. Além de mais produtivo, o trabalho em equipe costuma gerar resultados melhores e mais sustentáveis a longo prazo." }
];

export default class MoreInfoStudent extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
            headerStyle: {
                // backgroundColor: `${navigation.getParam('backgroundColor')}`,
                backgroundColor: '#5f98e3',

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'RobotoMono-Bold',
                fontSize: 15
            },
        }
    };

    render() {

        if (this.props.navigation.state.params.info == 'ppe') {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>
                        <Text style={styles.text}>
                            <Text>Dominar determinada área técnica ou o conhecimento não é mais o único fator relevante para o sucesso profissional. Para refletir sobre postura profissional no estágio e descontrair um pouco, que tal assistir o vídeo</Text>
                            <Text style={{ color: 'blue' }} onPress={() => {
                                Linking.openURL(`https://www.youtube.com/watch?time_continue=16&v=VdIhejX6imc`)
                            }}
                            > “Entrevista com o estagiário”</Text>
                            <Text>, onde o comediante Murilo Gun interpreta um estagiário politicamente incorreto.</Text>
                            <Text>
                            </Text>
                            Após assistir ao vídeo, reflita:
                        </Text>
                        <Text style={styles.text}>1.Quais os comportamentos e atitudes adequadas no ambiente de estágio?</Text>
                        <Text style={styles.text}>2.Quais as características importantes durante a realização do estágio e no mundo do trabalho?</Text>
                        <Text style={styles.text}>
                            Atitudes a serem observadas: apresentação pessoal, habilidade de comunicação; ética, responsabilidade, integridade, iniciativa, interesse e proatividade, disciplina e organização, humildade, assiduidade e pontualidade.
                            E não esqueça, uma boa conduta gera reconhecimento e admiração!
                    </Text>
                    </View>
                </ScrollView>

            );
        }

        if (this.props.navigation.state.params.info == 're') {
            return (
                <ScrollView>

                    <View style={styles.MainContainer}>
                        <Image source={student} style={styles.image}></Image>

                        <Text style={styles.text}>
                            Você se identifica? Como está a sua rotina durante a realização do estágio?
                        </Text>
                        <Text style={styles.text}>
                            Sabemos que esta fase nem sempre é fácil, mas tente vê-la como uma etapa importante para o seu crescimento pessoal e profissional.
                    </Text>
                        <Text style={styles.text}>
                            Você compreende o estágio como importante para a sua formação?
                            Você percebe contribuições do estágio para o seu desenvolvimento pessoal e profissional? Quais?
                        </Text>
                        <Text style={styles.text}>
                            Conhecimentos técnicos, responsabilidade, trabalho em equipe e relacionamento interpessoal certamente são algumas dessas contribuições, certo?!
                        </Text>

                    </View>
                </ScrollView>
            )
        }
        if (this.props.navigation.state.params.info == 'ebf') {
            return (
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <Text style={styles.text}>Assista o vídeo
                            <Text style={{ color: 'blue' }} onPress={() => {
                                Linking.openURL(`https://www.youtube.com/watch?v=Qs1IQAdp-60`)
                            }}
                            >  The Wall do Alok e Sevenn”</Text>
                            reflita:
                            </Text>
                        <Text style={styles.text}>
                            - Passamos a vida correndo atrás da felicidade, mas onde buscamos esta felicidade?</Text>
                        <Text style={styles.text}>
                            - Estamos correndo para o lugar certo?</Text>
                        <Text style={styles.text}>
                            - É possível mudar essa realidade? Como?</Text>
                        <Text style={styles.text}>
                            - O que pode nos levar para um caminho realmente feliz?</Text>


                        <Text style={styles.text}>Acreditamos que transformações na sociedade são possíveis, especialmente por meio de processos educativos que visem a formação humana integral
                                                    Assim, poderemos construir juntos uma nova realidade social, ética, justa, com igualdade de condições e oportunidades para todos.
                                                    Após assistir ao vídeo, reflita:
                        </Text>
                        <Text style={styles.text}>1.Quais os comportamentos e atitudes adequadas no ambiente de estágio?</Text>
                        <Text style={styles.text}>2.Quais as características importantes durante a realização do estágio e no mundo do trabalho?</Text>
                        <Text style={styles.text}>
                            Atitudes a serem observadas: apresentação pessoal, habilidade de comunicação; ética, responsabilidade, integridade, iniciativa, interesse e proatividade, disciplina e organização, humildade, assiduidade e pontualidade.
                            E não esqueça, uma boa conduta gera reconhecimento e admiração!
                    </Text>
                    </View>
                </ScrollView>

            );
        }
        if (this.props.navigation.state.params.info == 'df') {
            return (
                <ScrollView>

                    <View style={styles.MainContainer}>
                        <Text style={styles.text}>
                            Além de serem ótimas opções de entretenimento, muitos filmes carregam mensagens inspiradoras que podem te incentivar a encarar os desafios do mundo do trabalho!</Text>
                        <Text style={styles.text}>
                            Confira a lista que preparamos abaixo e aperte o play!</Text>

                        <Accordion
                            headerStyle={{ backgroundColor: "#8abfde" }}
                            contentStyle={{ backgroundColor: "#A9DAD6", textAlign: 'justify'}}
                            dataArray={dataArray}/>
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
