import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    Keyboard,
    View,
    TouchableOpacity,
    Alert,
    Image,
    DatePickerAndroid,
    TimePickerAndroid,
} from 'react-native';

import ImagePicker from 'react-native-image-picker'
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import server from '../config/server'
import FormButton from '../components/FormButton';
import FormTextInput from '../components/FormTextInput';
import DateInput from '../components/DateInput';
import HourInput from '../components/HourInput';

export default class App extends Component {

    constructor(props) {
        super(props);

        // define the initial state, so we can use it later
        // when we'll need to reset the form
        this.initialState = { date: '', file: null, id_internship: '5d7260bdcc169444900b2403', studentId: '5d72603dcc169444900b2402', description: 'descrição', inputTime: '', outputTime: '' };

        this.state = this.initialState;
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
    setDataAtividade = async () => {
        try {
            const {
                action, year, month, day,
            } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ date: `${day}-${month + 1}-${year}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

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

        console.log(config.body);

        // adicionar waiter
        alert('Espere um pouco...')
        // return false
        fetch(`${server}/activity`, config)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                alert(res.message)
                // this.setState({this.initialState})
            }).catch(e => {
                console.log('deu ruim', e);
                alert('algoderrado :(')
            })
    }

    render() {
        const { inputTime, outputTime, date, file, description } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView>
                    <DateInput
                        onPress={() => this.setDataAtividade()}
                        labelText="Data da Atividade"
                        value={date}
                    />
                    <HourInput
                        onPress={() => this.setinputTime()}
                        value={inputTime}
                        labelText="Hora de entrada" />

                    <HourInput
                        onPress={() => this.setoutputTime()}
                        value={outputTime}
                        labelText="Hora de saída" />
                    <FormTextInput
                        placeholder="..."
                        onChangeText={() => this.setState({ description })}
                        value={description}
                        labelText="Descrição"
                        multiline={true}
                    />

                    {file && (
                        <View>
                            <Text>Foto Carregada:</Text>
                            <Image
                                source={{ uri: file.uri }}
                                style={{ width: 300, height: 300 }}
                            />
                        </View>
                    )}
                    <FormButton onPress={this.handleChooseFile}>
                        Carregar Foto
                    </FormButton>
                    <FormButton onPress={this.handleSubmit}>
                        Registrar Atividade
                </FormButton>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#ebebeb',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
});