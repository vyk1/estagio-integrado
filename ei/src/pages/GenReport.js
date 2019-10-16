import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { StyleSheet, Image, Linking, ScrollView } from 'react-native';
import server from "../config/server";
import moment from "moment";
import Esperador from '../components/Esperador';

export default class GenReport extends Component {
    static navigationOptions = ({ navigation }) => {
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
        this.getContacts()
    }

    async getContacts() {
        const { student_id } = this.props.navigation.state.params;
        console.log(student_id);

        return fetch(`${server}/internship/user/${student_id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ internship: responseJson })
                console.log(responseJson);
                console.log('chegou aqui');
                this.CALC()
            })
            .catch((error) => {
                console.error(error);
            });
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
        console.log(arrayDatas);


        let uniqueDates = []
        o = {}
        arrayDatas.forEach(e => {
            o[e] = true
        })
        uniqueDates = Object.keys(o)
        console.log(uniqueDates);

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
                            <Card style={{ flex: 0 }} key={1}>
                                {internship.internships[0].id_activities.map((rowData, i) => (

                                    <CardItem key={i}>
                                        <Body>
                                            <Text note>Foto da Atividade</Text>
                                            <Image source={{ uri: server + '/files/' + rowData.image }} style={styles.image}>
                                            </Image>
                                            <Text note>Descrição</Text>
                                            <Text>{rowData.description}</Text>
                                        </Body>
                                    </CardItem>
                                ))}
                            </Card>

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
        width: 200,
        height: 200,
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
