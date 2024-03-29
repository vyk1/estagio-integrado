import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, View, Right } from 'native-base';
import { StyleSheet, Image, Linking, ScrollView, Alert } from 'react-native';
import server from "../config/server";
import Esperador from '../components/Esperador';
import moment from 'moment';
import 'moment/locale/pt-br'

export default class GenReport extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
            headerStyle: {
                backgroundColor: navigation.getParam('backgroundColor'),
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
            formSent: false,
            internship: {},
            horasTotais: '',
            nroDias: '',
            user: null
        }
    }
    async componentDidMount() {
        this.getInternshipByUID()
    }

    async getInternshipByUID() {
        this.setState({ formSent: false })

        const user = await this.props.navigation.state.params.logado;

        this.setState({ user })

        const { token } = await this.props.navigation.state.params;

        const config = {
            headers: {
                'x-access-token': token
            }
        }

        if (user.type == 1) {
            const student_id = user._id;
            await fetch(`${server}/internship/user/${student_id}`, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ internship: responseJson })
                    if (responseJson.status != 404) {
                        this.CALC()
                    }
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    this.setState({ formSent: true })
                    this.props.navigation.setParams({ title: `Relatório de ${user.name}` })
                });

        } else {
            const { student_id, name } = this.props.navigation.state.params;


            await fetch(`${server}/internship/user/${student_id}`, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ internship: responseJson })
                    if (responseJson.status != 404) {
                        this.CALC()
                    }
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    this.setState({ formSent: true })
                    this.props.navigation.setParams({ title: `Relatório de ${name}` })

                });
        }
    }

    CALC() {
        // 1 estagio p/ cada aluno
        const { id_activities } = this.state.internship.internships[0]
        let arrayDatas = []
        let arrayHoras = []

        if (id_activities.length <= 0) {
            return this.setState({ nroDias: "-", horasTotais: "-" })

        }

        id_activities.forEach(el => {
            var { outputTime } = el;
            var { inputTime } = el;
            const aux = new Date(inputTime)
            inputTime = inputTime.split(':');

            //h f - h i
            // subraindo horas das atvs
            // moment HH é 24h format
            // moment hh é 12h format
            var newTime = moment(new Date(outputTime), "HH:mm")
                // .subtract({ 'hours': inputTime[0], 'minutes': inputTime[1] })
                .subtract({ 'hours': aux.getHours(), 'minutes': aux.getMinutes() })
                .format('HH:mm');


            arrayHoras.push(newTime)
            arrayDatas.push(el.date)
        });

        let nroDias = id_activities.length

        let sum = moment(arrayHoras[0], "HH:mm");

        let inicial = moment(arrayHoras[0], "HH:mm");
        for (let i = 0; i < arrayHoras.length; i++) {
            let h = arrayHoras[i].split(":");

            if (h[1]) {
                sum = sum.add(h[1], "minutes")
            }
            if (h[0]) {
                sum = sum.add(h[0], "hours")
            }
        }
        var ms = moment(sum, "DD/MM/YYYY HH:mm:ss").diff(moment(inicial, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
        this.setState({ nroDias, horasTotais: s })
    }
    async remove(id) {
        const { token } = await this.props.navigation.state.params;

        try {
            await fetch(`${server}/activity/${id}`, { method: 'DELETE', headers: { 'x-access-token': token } })
                .then(res => res.json())
                .then(res => {

                    if (res.status == 200) {
                        Alert.alert(
                            'Sucesso',
                            res.message,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.getInternshipByUID()
                                    }
                                }
                            ])
                    } else {
                        Alert.alert(
                            'Ops...',
                            res.message,
                        )
                    }
                })
        }
        catch (error) {
            Alert.alert(
                'Erro',
                'Ocorreu um erro... Tente novamente.')
        } finally {
            this.setState({ formSent: true })
        }

    }

    render() {
        const { internship, nroDias, horasTotais, formSent, user } = this.state;

        if (!formSent) {
            return (
                <Esperador />
            )
        } else {
            if (internship.status == 404) {
                return (
                    <CardItem header bordered>
                        <Text>{internship.message} </Text>
                    </CardItem>
                )
            } else {
                return (
                    <Container style={styles.MainContainer}>
                        <ScrollView>
                            <Content >
                                <Card key={0}>
                                    <CardItem header bordered>
                                        <Text note>Empresa</Text>
                                        <Left>
                                            <Text>{internship.internships[0].company}</Text>
                                        </Left>
                                    </CardItem>
                                    <CardItem >
                                        <Body>
                                            <Text note>Descrição:</Text>
                                            <Text>{internship.internships[0].description}</Text>
                                        </Body>
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

                                    <Card style={{ flex: 0 }} key={i}>
                                        <CardItem>
                                            <Body>
                                                <Text note>Data da Atividade</Text>
                                                <Text>{moment(rowData.date).locale('pt-br').format("DD/MM/YYYY - dddd")}</Text>

                                                <Text note>Hora inicial - Hora final</Text>
                                                <Text>{moment(rowData.inputTime).locale('pt-br').format('HH:mm')} - {moment(rowData.outputTime).locale('pt-br').format('HH:mm')}</Text>

                                                <Text note>Data de Cadastro da Atividade:</Text>
                                                <Text>{moment(rowData.createdAt).locale('pt-br').format("DD/MM/YYYY HH:mm - dddd")}</Text>
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
                                                {
                                                    user.type == 1 && (
                                                        <Right>
                                                            <Button danger onPress={() => {
                                                                Alert.alert(
                                                                    'Exclusão de Atividade',
                                                                    'Esta operação é irreversível. Deseja prosseguir mesmo assim?',
                                                                    [
                                                                        {
                                                                            text: 'OK', onPress: () => this.remove(rowData._id)
                                                                        },
                                                                        {
                                                                            text: 'Não',
                                                                            onPress: () => { return false },
                                                                            style: 'cancel',
                                                                        },
                                                                    ],
                                                                    { cancelable: true },
                                                                );
                                                            }
                                                            }
                                                            >
                                                                <Text>Apagar</Text>
                                                            </Button>
                                                        </Right>
                                                    )
                                                }

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
}
const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        resizeMode: 'contain',
        flex: 1
    },
    MainContainer: {
        fontSize: 18,
        fontFamily: 'monospace',
        fontFamily: 'RobotoMono-Light',
        textAlign: 'justify',
        justifyContent: 'center',
        flex: 1,
        paddingRight: 2
    }
})
