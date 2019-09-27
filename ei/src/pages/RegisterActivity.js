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

import FormButton from '../components/FormButton';
import FormTextInput from '../components/FormTextInput';
import DateInput from '../components/DateInput';
import HourInput from '../components/HourInput';

export default class App extends Component {

    constructor(props) {
        super(props);

        // define the initial state, so we can use it later
        // when we'll need to reset the form
        this.initialState = { dataDaAtividade: '', photo: null, studentId: 'stringIDEstudante', descricao: '', horaE: '', horaS: '' };

        this.state = this.initialState;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Registro de Atividades'
        }
    };

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
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
                this.setState({ dataDaAtividade: `${day}/${month + 1}/${year}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

    setHoraE = async () => {
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
                this.setState({ horaE: `${h}:${m}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    };
    setHoraS = async () => {
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
                this.setState({ horaS: `${h}:${m}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    };
    render() {
        const { horaE, horaS, dataDaAtividade, photo, descricao } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView>
                    <DateInput
                        onPress={() => this.setDataAtividade()}
                        labelText="Data da Atividade"
                        value={dataDaAtividade}
                    />

                    <HourInput
                        onPress={() => this.setHoraE()}
                        value={horaE}
                        labelText="Hora de entrada" />

                    <HourInput
                        onPress={() => this.setHoraS()}
                        value={horaS}
                        labelText="Hora de saída" />

{/* aqui entra a descricao:
 */}

                    {photo && (
                        <View>
                            <Text>Foto Carregada:</Text>
                            <Image
                                source={{ uri: photo.uri }}
                                style={{ width: 300, height: 300 }}
                            />
                        </View>
                    )}
                    <FormButton onPress={this.handleChoosePhoto}>
                        Carregar Foto
                    </FormButton>
                    <FormButton onPress={() => { console.log('Button pressed!'); }}>
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
        backgroundColor: '#51a9b0',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
});