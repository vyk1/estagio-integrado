import moment from 'moment';
import React, { Component } from 'react';
import { Image, StyleSheet, View, Button, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container, CardItem, Text, Body, Header, Title, DatePicker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import BlueButton from '../components/BlueButton';
import DateInput from '../components/Date';
import FormTextInput from '../components/FormTextInput';
import HourInput from '../components/HourInput';
import server from "../config/server";
import Esperador from '../components/Esperador';

const options = {
    hour: '2-digit',
    minute: '2-digit',
}

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
            },
        }
    };

    constructor(props) {
        super(props);
        this.initialState = {
            internship: [],
            acceptedMIMETypes: ["image/png", "image/jpeg", "image/webp"],
            formSent: false, companyName: '', nameError: 'Verifique seus dados.',
            date: '', date2: '', file: null, description: '',
            inputTime: new Date(), outputTime: new Date(),
            setShowIT: false, setShowOT: false
        }

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

    handleChooseFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({ file: result })
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
                name: photo.uri.split('/').pop(),
                type: 'image/jpg',
                uri: photo.uri
                // Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
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
                inputTime: inputTime.toISOString(),
                outputTime: outputTime.toISOString(),
                id_internship: internship.internships[0]._id
            }),
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': token
            }
        }

        try {
            console.log(config)
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
            console.log('ah la')
            console.log(error.data)
            console.log(error.response)
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
                                    text: 'OK', onPress: () => { console.log('ops...') }
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
                if (this.state.file.type != 'image') {
                    // if (false) {
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

    setShowIT = async () => {
        this.setState({ showIT: true })
    }

    onChangeIT = (e, val) => {
        if (!val) {
            return this.setState({ showIT: false })
        }
        const inputTime = val
        return this.setState({ showIT: false, inputTime })
    }

    setShowOT = async () => {
        this.setState({ showOT: true })
    }

    onChangeOT = (e, val) => {
        if (!val) {
            return this.setState({ showOT: false })
        }
        const outputTime = val
        return this.setState({ showOT: false, outputTime })
    }
    render() {
        const { internship, formSent, inputTime, outputTime, file, description } = this.state;
        if (!formSent) {
            return (
                <Esperador critical={file} />
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
                            {
                                this.state.showIT && (
                                    <DateTimePicker
                                        value={inputTime}
                                        mode={"time"}
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChangeIT}
                                    />
                                )
                            }
                            {
                                this.state.showOT && (
                                    <DateTimePicker
                                        value={outputTime}
                                        mode='time'
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChangeOT}
                                    />
                                )
                            }

                            <ScrollView>
                                <DateInput onDateChange={(date) => this.setState({ date })} />

                                <HourInput
                                    onPress={this.setShowIT}
                                    value={inputTime.toLocaleTimeString("pt-bt", options)}
                                    labelText="Hora de entrada" />

                                <HourInput
                                    onPress={this.setShowOT}
                                    value={outputTime.toLocaleTimeString("pt-bt", options)}
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