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
        // this.initialState = { nameError: '', date: '', file: null, id_internship: '5dd9a11814be6d0dd8df570c', studentId: '5d72603dcc169444900b2402', description: 'tst123', inputTime: '', outputTime: '' };
        this.initialState = { acceptedMIMETypes: ["image/png", "image/jpeg", "image/webp"], formSent: true, companyName: '', nameError: '', date: '', date2: '', file: null, id_internship: '5dd9a11814be6d0dd8df570c', studentId: '5d72603dcc169444900b2402', description: 'teste', inputTime: '', outputTime: '' };

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

    checkInputs = async () => {
        if (this.state.inputTime.trim() === "" || this.state.inputTime === "") {
            this.setState({ nameError: "Hora de Entrada Necessária." });
            return false
        } else {
            if (this.state.outputTime.trim() === "") {
                this.setState({ nameError: "Hora de Saída Necessária." });
                return false
            } else {
                var startTime = moment(this.state.inputTime, "HH:mm");
                var endTime = moment(this.state.outputTime, "HH:mm");
                var duration = moment.duration(endTime.diff(startTime));
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) - hours * 60;

                if (hours > 0 && minutes > 0) {
                    if (this.state.date === "" || null) {
                        this.setState({ nameError: "Data da Atividade Necessária." });
                        return false
                    } else {
                        if (this.state.description.trim() === "") {
                            this.setState({ nameError: "Descrição Necessária." });
                            return false
                        } else {
                            this.setState({ nameError: "" });
                            return true
                        }
                    }
                } else {
                    this.setState({ nameError: "Hora de Saída Menor ou Igual a de Entrada." });
                    return false
                }

            }
        }
    }

    handleChoosenFile = () => {
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

    handleSubmit = async () => {
        await this.setState({ date2: this.state.date.toISOString() })
        const { id_internship, inputTime, outputTime, date2, file, description } = this.state;

        const config = await {
            method: 'POST',
            body: this.createFormData(file, {
                date2,
                description,
                inputTime,
                outputTime,
                id_internship
            }),
            headers: {
                'Content-Type': 'multipart/form-data',
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
                'Ocorreu um erro...')
        } finally {
            this.setState({ formSent: true })

        }

    }

    render() {
        const { formSent, companyName, inputTime, outputTime, date, file, description, nameError } = this.state;
        if (companyName === "" || formSent == false) {
            return (
                <Esperador />
            )
        } else {
            return (
                <Container style={styles.MainContainer}>
                    <Header style={styles.header}>
                        <Body>
                            <Title>Empresa: {companyName} </Title>
                        </Body>
                    </Header>
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

                        {!!nameError && (
                            <Text style={{ color: 'red' }}>{nameError}</Text>
                        )}

                        <BlueButton onPress={this.handleChoosenFile}>
                            Carregar Foto
                    </BlueButton>
                        <BlueButton onPress={this.handleSubmit}>
                            Registrar Atividade
                    </BlueButton>
                        {/* </KeyboardAvoidingView> */}
                    </ScrollView>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 6
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
        alignContent: "space-between"
    }
})