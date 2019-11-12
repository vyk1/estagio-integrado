import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    View,
    Image,
    TimePickerAndroid,
} from 'react-native';

import { DatePicker, Content, Container } from 'native-base';
import ImagePicker from 'react-native-image-picker'

import server from '../config/server'
import BlueButton from '../components/BlueButton';
import HourInput from '../components/HourInput';
import TextArea from '../components/TextArea';
import Date from '../components/Date';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.initialState = { date: '', file: null, id_internship: '5d7260bdcc169444900b2403', studentId: '5d72603dcc169444900b2402', description: '', inputTime: '', outputTime: '', chosenDate: new Date() };

        this.state = this.initialState;
    }

    toStr = (e) => {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        // this.setState({ date: e })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Registro de Atividades'
        }
    };

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
    };

    handleSubmit = async () => {
        const config = {
            method: 'POST',
            body: this.createFormData(this.state.file, this.state)
        }

        // this.setState({ date: this.state.chosenDate.state.chosenDate })
        console.log(this.state);

        // VERIFICAR SE JÁ NÃO HÁ UMA ATIVIDADE CADASTRADA PARA ESTA HORA!
        // CHECAR SE HE>HS
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
        const { inputTime, outputTime, date, file, description } = this.state;
        return (
            <Container>
                {/* <KeyboardAvoidingView behavior="padding" enabled> */}
                {/* <Date minimumDate={new Date(2018, 1, 1)} onDateChange={(date) => this.setState({ date })}></Date> */}
                <Date onDateChange={(date) => this.setState({ date })}></Date>

                <HourInput
                    onPress={() => this.setinputTime()}
                    value={inputTime}
                    labelText="Hora de entrada" />

                <HourInput
                    onPress={() => this.setoutputTime()}
                    value={outputTime}
                    labelText="Hora de saída" />

                <TextArea
                    onChangeText={() => this.setState({ description })}
                    value={description}
                ></TextArea>

                {
                    file && (
                        <View>
                            <Text>Foto Carregada:</Text>
                            <Image
                                source={{ uri: file.uri }}
                            // style={{ width: 300, height: 300 }}
                            />
                        </View>
                    )
                }
                <BlueButton onPress={this.handleChooseFile}>
                    Carregar Foto
                    </BlueButton>
                <BlueButton onPress={this.handleSubmit}>
                    Registrar Atividade
                </BlueButton>
                {/* </KeyboardAvoidingView> */}
            </Container >
        )
    }
}