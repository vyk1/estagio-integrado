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



export default class App extends Component {

    constructor(props) {
        super(props);
        this.initialState = { nameError: '', date: '', file: null, id_internship: '5d7260bdcc169444900b2403', studentId: '5d72603dcc169444900b2402', description: '', inputTime: '', outputTime: '' };

        this.state = this.initialState;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Registro de Atividades'
        }
    };
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

        if (!this.checkInputs()) {
            // console.log(this.state);
            return false
        } else {
            if (!this.state.file) {
                Alert.alert(
                    'Carregamento de Foto',
                    'Você ainda não carregou uma foto. Deseja prosseguir mesmo assim?',
                    [
                        { text: 'OK', onPress: () => console.log('OK pressed') },
                        {
                            text: 'Não',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                    ],
                    { cancelable: true },
                );
            }
        }
        // const config = {
        //     method: 'POST',
        //     body: this.createFormData(this.state.file, this.state)
        // }

        // this.setState({ date: this.state.chosenDate.state.chosenDate })

        // VERIFICAR SE JÁ NÃO HÁ UMA ATIVIDADE CADASTRADA PARA ESTA HORA!
        // 
        // adicionar waiter
        // alert('Espere um pouco...')
        // // return false
        // fetch(`${server}/activity`, config)
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res);
        //         alert(res.message)
        //     }).catch(e => {
        //         console.log('deu ruim', e);
        //         alert('algoderrado :(')
        //     })
    }

    render() {
        const { inputTime, outputTime, date, file, description, nameError } = this.state;
        return (
            <Container style={styles.MainContainer}>
                <Header style={styles.header}>
                    <Body>
                        <Title>Empresa: `nome da empresa` </Title>
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
                            </View>
                        )
                    }
                    {!!nameError && (
                        <Text style={{ color: 'red' }}>{nameError}</Text>
                    )}

                    <BlueButton onPress={this.handleChooseFile}>
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