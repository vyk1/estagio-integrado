import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, View } from 'native-base';
import { StyleSheet, Image, Linking, ScrollView } from 'react-native';
import server from "../config/server";
import Esperador from '../components/Esperador';
import moment from 'moment';
import 'moment/locale/pt-br'

export default class GenReport extends Component {
    static navigationOptions = ({ navigation }) => {
        console.log(navigation.state.params)
        return {
            title: `${navigation.getParam('title')}`,
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
            internship: {},
            horasTotais: '',
            nroDias: '',
        }
    }
    componentDidMount() {
        this.getInternshipByUID()
    }

    async getInternshipByUID() {

        // se estudante logado...
        if (this.props.navigation.state.params.logado.user.type == 1) {
            const student_id = this.props.navigation.state.params.logado.user._id;
            return fetch(`${server}/internship/user/${student_id}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ internship: responseJson })
                    console.log(responseJson);
                    this.CALC()
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            const { student_id } = this.props.navigation.state.params;
            return fetch(`${server}/internship/user/${student_id}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ internship: responseJson })
                    console.log(responseJson);
                    this.CALC()
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    CALC() {
        // 1 estagio p/ cada aluno
        const { id_activities } = this.state.internship.internships[0]
        let arrayDatas = []
        let arrayHoras = []

        id_activities.forEach(el => {
            var { outputTime } = el;
            var { inputTime } = el;
            inputTime = inputTime.split(':');

            //h f - h i
            var newTime = moment(outputTime, "HH:mm")
                .subtract({ 'hours': inputTime[0], 'minutes': inputTime[1] })
                .format('hh:mm');

            arrayHoras.push(newTime)
            arrayDatas.push(el.date)
        });

        let uniqueDates = []
        o = {}
        arrayDatas.forEach(e => {
            o[e] = true
        })
        uniqueDates = Object.keys(o)
        // console.log(uniqueDates);

        let nroDias = uniqueDates.length

        let sum = moment(arrayHoras[0], "HH:mm");
        let inicial = moment(arrayHoras[0], "HH:mm");
        for (let i = 1; i < arrayHoras.length; i++) {
            let h = arrayHoras[i].split(":");

            if (h[1]) {
                sum = sum.add(h[1], "minutes")
            }
            if (h[0]) {
                sum = sum.add(h[0], "hours")
            }
        }
        this.setState({ nroDias, horasTotais: sum.diff(inicial, 'hours') })
        this.props.navigation.setParams({ title: `Relatório de ${this.state.internship.internships[0].id_student.name}` })

    }

    render() {
        const { internship, nroDias, horasTotais } = this.state;
        console.log(internship);

        if (!Object.keys(internship).length) {
            return (
                <Esperador />
            )
        } else {
            return (
                <Container style={styles.teste}>
                    <ScrollView>
                        <Content >
                            <Card key={0}>
                                <CardItem header bordered >
                                    <Text note>Empresa</Text>
                                    <Left>
                                        <Text>{internship.internships[0].company}</Text>
                                    </Left>
                                </CardItem>
                                <CardItem >
                                    <Body>
                                        <Text note>Dias de Estágio:</Text>
                                        <Text>{nroDias}</Text>
                                        <Text note>Horas:</Text>
                                        <Text>{horasTotais}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem bordered footer>
                                    <Text>Responsáveis por este estágio:</Text>
                                </CardItem>
                                <CardItem >
                                    <Body>
                                        <Text note>Supervisor</Text>
                                        <Text>{internship.internships[0].id_supervisor.name}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem >
                                    <Body>
                                        <Text note>Orientador:</Text>
                                        <Text>{internship.internships[0].id_advisor.name}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem >
                                    <Body>
                                        <Text note>Estagiário:</Text>
                                        <Text>{internship.internships[0].id_student.name}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            {/* atividades */}
                            {internship.internships[0].id_activities.map((rowData, i) => (

                                <Card style={{ flex: 0}} key={i}>
                                    <CardItem>
                                        <Body>
                                            <Text note>Data da Atividade:</Text>
                                            {/* <Text>{Date(rowData.createdAt).toString()}</Text> */}
                                            <Text>{moment(rowData.createdAt).locale('pt-br').format("DD/MM/YYYY HH:mm - dddd")
                                            }</Text>
                                            {
                                                rowData.image && (
                                                    <>
                                                        <Text note>Foto da Atividade</Text>
                                                        <Image source={{ uri: server + '/files/' + rowData.image }} style={styles.image}>
                                                        </Image>
                                                    </>
                                                )
                                            }

                                            <Text note>Descrição</Text>
                                            <Text>{rowData.description}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            ))}

                        </Content>
                    </ScrollView>
                </Container >
            );
        }
    }
}
const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        resizeMode: 'contain',
        flex: 1
    },
    teste: {
        fontSize: 18,
        fontFamily: 'monospace',
        fontFamily: 'RobotoMono-Light',
        textAlign: 'justify',
        margin: 2,
    }
})
