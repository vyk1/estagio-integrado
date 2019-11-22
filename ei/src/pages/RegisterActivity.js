import moment from 'moment';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TimePickerAndroid, View, Alert } from 'react-native';
import { Body, Container, Header, Title } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import BlueButton from '../components/BlueButton';
import Date from '../components/Date';
import FormTextInput from '../components/FormTextInput';
import HourInput from '../components/HourInput';
import server from "../config/server";
import Esperador from '../components/Esperador';

export default class App extends Component {

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
        this.initialState = { formSent: true, companyName: '', nameError: '', date: '', date2: '', file: null, id_internship: '5d7260bdcc169444900b2403', studentId: '5d72603dcc169444900b2402', description: 'teste', inputTime: '', outputTime: '' };

        this.state = this.initialState;
    }

    componentDidMount = () => {
        this.getInternshipName()
    }

    getInternshipName = async () => {

        return fetch(`${server}/internship/${this.state.id_internship}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('rodou');
                console.log(responseJson);
                console.log(responseJson.internship.company);

                this.setState({ companyName: responseJson.internship.company })
                this.props.navigation.setParams({ title: `Registro de Atividade` })

            })
            .catch((error) => {
                console.error(error);
                return false
            });
    }


    showAlert = () => {
        const { nameError } = this.state
        Alert.alert(
            'Erro de Validação',
            nameError,
            [{ text: 'OK' }])

    }
    checkInputs = () => {
        if (this.state.inputTime.trim() === "" || this.state.inputTime === "") {
            this.setState({ nameError: "Hora de Entrada Necessária." });
            this.showAlert();
            return false
        } else {
            if (this.state.outputTime.trim() === "" || this.state.outputTime === "") {
                this.setState({ nameError: "Hora de Saída Necessária." });
                this.showAlert();
                return false
            } else {
                var startTime = moment(this.state.inputTime, "HH:mm");
                var endTime = moment(this.state.outputTime, "HH:mm");
                var duration = moment.duration(endTime.diff(startTime));
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) - hours * 60;

                if ((hours === 0 && minutes > 0) || (hours > 0 && minutes >= 0)) {
                    if (this.state.date === "" || null) {
                        this.setState({ nameError: "Data da Atividade Necessária." });
                        this.showAlert();
                        return false
                    } else {
                        if (this.state.description.trim() === "") {
                            this.setState({ nameError: "Descrição Necessária." });
                            this.showAlert();
                            return false
                        } else {
                            this.setState({ nameError: "" });
                            return true
                        }
                    }
                } else {
                    this.setState({ nameError: "Hora de Saída Menor ou Igual a de Entrada." });
                    this.showAlert();
                    return false
                }

            }
        }
    }

    handleChooseFile = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ file: response })
            }
        })
    }


    setinputTime = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 8,
                minute: 0,
                is24Hour: true, // Will display '14h'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                const m = (minute < 10) ? `0${minute}` : minute;
                const h = (hour < 10) ? `0${hour}` : hour;
                console.log(`time: ${hour}:${minute}`);
                this.setState({ inputTime: `${h}:${m}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    setoutputTime = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 12,
                minute: 0,
                is24Hour: true, // Will display '14h'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                const m = (minute < 10) ? `0${minute}` : minute;
                const h = (hour < 10) ? `0${hour}` : hour;
                console.log(`time: ${hour}:${minute}`);
                this.setState({ outputTime: `${h}:${m}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    createFormData = (photo, body) => {
        const data = new FormData();

        if (!photo) {
            Object.keys(body).forEach(key => {
                data.append(key, body[key]);
            });
            console.log(data)
            return data;
        } else {
            data.append("image", {
                name: photo.fileName,
                type: photo.type,
                uri:
                    Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
            });
            Object.keys(body).forEach(key => {
                data.append(key, body[key]);
            });
            return data;
        }

    };

    sendForm = async () => {
        const { file } = this.state
        console.log('submeteu');

        this.setState({ formSent: false })

        if (!file) {
            console.log('no file');

            const config = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            await fetch(`${server}/activity/noimg`, config)
                .then(res => res.json())
                .then(res => {
                    this.setState({ formSent: true })
                    console.log(res);
                    if (res.status == 201) {
                        Alert.alert(
                            'Sucesso',
                            res.message,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.navigation.navigate('StudentMain');
                                    }
                                }
                            ])
                    } else {
                        Alert.alert(
                            'Resposta',
                            res.message,
                            [
                                {
                                    text: 'OK', onPress: () => { console.log('res negativa') }
                                }
                            ])
                        this.setState({ formSent: true })

                    }

                }).catch(e => {
                    // 
                    console.log(e);
                    Alert.alert(
                        'Erro',
                        e.toString(),
                        [
                            { text: 'OK', onPress: () => { console.log('ok né :/') } }
                        ])
                    this.setState({ formSent: true })
                })
        } else {
            await
                this.setState({ date2: this.state.date.toISOString() })
            console.log(this.state);

            const config = {
                method: 'POST',
                body: this.createFormData(this.state.file, this.state),
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }

            fetch(`${server}/activity`, config)
                .then(res => res.json())
                .then(res => {
                    this.setState({ formSent: true })
                    console.log(res);
                    if (res.status == 201) {
                        Alert.alert(
                            'Sucesso',
                            res.message,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.navigation.navigate('StudentMain');
                                    }
                                }
                            ])
                    } else {
                        Alert.alert(
                            'Resposta',
                            res.message,
                            [
                                {
                                    text: 'OK', onPress: () => { console.log('res negativa') }
                                }
                            ])
                        this.setState({ formSent: true })

                    }
                }).catch(e => {
                    console.log('deu ruim', e);
                    Alert.alert(
                        'Erro',
                        e.toString(),
                        [
                            { text: 'OK', onPress: () => { console.log('ok né :/') } }
                        ])
                    this.setState({ formSent: true })
                })
        }

        // return false

    }
    handleSubmit = async () => {

        let checagem = this.checkInputs();
        // console.log(checagem);
        if (!checagem) {
            return false
        } else {
            if (this.state.file == null) {
                Alert.alert(
                    'Carregamento de Foto',
                    'Você ainda não carregou uma foto. Deseja prosseguir mesmo assim?',
                    [
                        { text: 'OK', onPress: () => this.sendForm() },
                        {
                            text: 'Não',
                            onPress: () => { return false },
                            style: 'cancel',
                        },
                    ],
                    { cancelable: true },
                );
            } else {
                this.sendForm()
            }
        }

    }


    render() {
        const { formSent, companyName, inputTime, outputTime, file, description } = this.state;
        if (companyName === "" || formSent == false) {
            return (
                <Esperador />
            )
        } else {
            return (
                <Container>
                    <Header style={styles.header}>
                        <Body>
                            <Title>Empresa: {companyName} </Title>
                        </Body>
                    </Header>
                    <View style={styles.MainContainer}>

                        <ScrollView>
                            <Date onDateChange={(date) => this.setState({ date })}></Date>

                            <HourInput
                                onPress={() => this.setinputTime()}
                                value={inputTime}
                                labelText="Hora de entrada" />

                            <HourInput
                                onPress={() => this.setoutputTime()}
                                value={outputTime}
                                labelText="Hora de saída" />

                            <FormTextInput
                                numberOfLines={5}
                                onChangeText={(description) => this.setState({ description })}
                                value={description}
                                placeholder="Descrição"
                                multiline={true}
                            />

                            {
                                file && (
                                    <View>
                                        <Text>Foto Carregada:</Text>
                                        <Image
                                            source={{ uri: file.uri }}
                                            style={{ width: 300, height: 300, alignSelf: 'center', marginBottom: 15 }}
                                        />
                                        <BlueButton onPress={() => this.setState({ file: null })}>
                                            Apagar foto
                                        </BlueButton>
                                    </View>
                                )
                            }
                            <BlueButton onPress={this.handleChooseFile}>
                                Carregar Foto
                            </BlueButton>
                            <BlueButton onPress={this.handleSubmit}>
                                Registrar Atividade
                            </BlueButton>
                        </ScrollView>
                    </View>
                </Container>

            )
        }
    }
}


const styles = StyleSheet.create({
    header: {
        fontSize: 6,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
        alignContent: "space-between"
    }
})