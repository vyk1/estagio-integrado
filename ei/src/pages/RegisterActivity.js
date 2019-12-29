import moment from 'moment';
import React, { Component } from 'react';
import { Image, StyleSheet, TimePickerAndroid, View, Alert } from 'react-native';
import { Container, CardItem, Text, Body, Header, Title } from 'native-base';
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
        this.initialState = { internship: [], acceptedMIMETypes: ["image/png", "image/jpeg", "image/webp"], formSent: false, companyName: '', nameError: 'Verifique seus dados.', date: '', date2: '', file: null, description: 'Teste', inputTime: '', outputTime: '' };

        this.state = this.initialState;
    }

    componentDidMount = async () => {
        await this.getInternshipName()
    }

    getInternshipName = async () => {

        const user = this.props.navigation.state.params.logado;
        const { token } = this.props.navigation.state.params;

        const config = {
            headers: {
                'x-access-token': token
            }
        }
        await fetch(`${server}/internship/user/${user._id}`, config)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({ internship: responseJson, formSent: true })
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

    sendFormWithImage = async () => {

        const { date, inputTime, outputTime, file, description, internship } = this.state;
        const { token } = this.props.navigation.state.params;

        this.setState({ formSent: false })

        const config = {
            method: 'POST',
            body: this.createFormData(file, {
                date: date.toISOString(),
                description,
                inputTime,
                outputTime,
                id_internship: internship.internships[0]._id
            }),
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': token
            }
        }

        try {
            await fetch(`${server}/activity`, config)
                .then(res => res.json())
                .then(res => {

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
                            'Ops...',
                            res.message,
                            [
                                {
                                    text: 'OK', onPress: () => { console.log(res.message) }
                                }
                            ])
                    }
                })
        }
        catch (error) {
            Alert.alert(
                'Erro',
                'Ocorreu um erro... Tente novamente...')
        } finally {
            this.setState({ formSent: true })
        }
    }

    sendFormWithNoImage = async () => {

        const { inputTime, outputTime, date, date2, description, internship } = this.state;
        const { token } = this.props.navigation.state.params;

        this.setState({ date2: this.state.date.toISOString(), formSent: false })
        const config = {
            method: 'POST',
            body: JSON.stringify({
                date,
                date2,
                description,
                inputTime,
                outputTime,
                id_internship: internship.internships[0]._id
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        try {
            await fetch(`${server}/activity/noimg`, config)
                .then(res => res.json())
                .then(res => {

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
                            'Ops...',
                            res.message,
                            [
                                {
                                    text: 'OK', onPress: () => { console.log('res negativa') }
                                }
                            ])
                    }
                })
        }
        catch (error) {
            console.log(error)
            Alert.alert(
                'Erro',
                'Ocorreu um erro... Tente novamente...')
        } finally {
            this.setState({ formSent: true })
        }
    }

    handleSubmit = async () => {

        let checagem = this.checkInputs();

        console.log("checagem");
        console.log(checagem);

        if (!checagem) {
            return false
        } else {

            if (this.state.file == null) {
                Alert.alert(
                    'Carregamento de Foto',
                    'Você ainda não carregou uma foto. Deseja prosseguir mesmo assim?',
                    [
                        { text: 'OK', onPress: () => this.sendFormWithNoImage() },
                        {
                            text: 'Não',
                            onPress: () => { return false },
                            style: 'cancel',
                        },
                    ],
                    { cancelable: true },
                );
                return false
            } else {
                if (!this.state.acceptedMIMETypes.includes(this.state.file.type)) {
                    Alert.alert(
                        'Extensão de arquivo não permitida',
                        'Certifique-se que a extensão do arquivo seja: .jpeg, .jpg ou .png.',
                        [
                            {
                                text: 'Ok',
                                onPress: () => { return false },
                                style: 'cancel',
                            },
                        ],
                        { cancelable: true },
                    );
                    return false
                } else {
                    this.sendFormWithImage()
                }
            }
        }

    }


    render() {
        const { internship, formSent, inputTime, outputTime, file, description } = this.state;
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
                    <Container>
                        <Header style={styles.header}>
                            <Body>
                                <Title>Empresa: {internship.internships[0].company} </Title>
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
                                                // style={{ width: "250",  alignSelf: 'center', marginBottom: 15 }}
                                                style={styles.image}
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
}


const styles = StyleSheet.create({
    header: {
        fontSize: 6,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 8,
        paddingRight: 2,
        alignContent: "space-between"
    },
    image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        resizeMode: 'contain',
        flex: 1,
        margin: 12
    }

})