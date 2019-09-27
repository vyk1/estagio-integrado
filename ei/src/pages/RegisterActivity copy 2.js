import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    DatePickerAndroid,
    TimePickerAndroid,
} from 'react-native';

import ImagePicker from 'react-native-image-picker'
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends Component {
    constructor(props) {
        super(props);

        // define the initial state, so we can use it later
        // when we'll need to reset the form
        this.initialState = { hourlyRate: '', hoursPerWeek: '' };

        state = {
            photo: null,
        }

        this.state = this.initialState;
    }


    setDateAndroid = async () => {
        try {
            const {
                action, year, month, day,
            } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ androidDate: `${day}/${month + 1}/${year}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

    setTimeAndroid = async () => {
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
                this.setState({ chosenAndroidTime: `${h}:${m}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    };
    /**
* Grab user's input data and do the math.
*/
    handleSubmit = () => {
        // using Javascript object destructuring to
        // get user's input data from the state.
        const { hourlyRate, hoursPerWeek } = this.state;

        // hide the keyboard
        // NOTE: the keyboard seems to show up after being dismissed
        //       when using the Alert react native component.
        //       Not a big deal at the moment (this is fine 😜).
        Keyboard.dismiss();

        // make sure we have some numeric values to work with
        if (!parseFloat(hourlyRate) || !parseFloat(hoursPerWeek)) {
            Alert.alert('Input error', 'Please input some positive numeric values.');
            return;
        }

        // do the Math
        const annualIncome = Math.abs(parseFloat(hourlyRate) * parseFloat(hoursPerWeek) * 52);

        // show results
        Alert.alert(
            'Your input and result',
            `$/hour: ${hourlyRate},\n Hours/week: ${hoursPerWeek}, \n Annual Income: $${annualIncome}`,
        );
    };
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Registro de Atividades - fulano'
            // title: 'Registro de Atividades - ' + navigation.getParam('user').name,
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

    /**
     * Reset the form and hide the keyboard.
     */
    resetForm = () => {
        Keyboard.dismiss();
        this.setState(this.initialState);
    };

    render() {
        const { hourlyRate, hoursPerWeek } = this.state;
        const { photo } = this.state

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TouchableOpacity onPress={() => this.setDateAndroid()}>
                    {/* <View> */}
                    <Text>
                        {this.state.androidDate?this.state.androidDate:"Clique aqui para inserir o dia"}
                    </Text>
                    {/* </View> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setTimeAndroid()}>
                    {/* <View> */}
                    <Text>
                    {this.state.chosenAndroidTime?this.state.chosenAndroidTime:"Clique aqui para inserir a hora de entrada"}
                    </Text>
                    {/* </View> */}
                </TouchableOpacity>

                <Text style={styles.screenTitle}>Salary Calculator</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="$/hour"
                    keyboardType="numeric"
                    returnKeyType="done"
                    blurOnSubmit
                    onChangeText={text => this.setState({ hourlyRate: text })}
                    value={hourlyRate}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Hours/week"
                    keyboardType="numeric"
                    returnKeyType="done"
                    blurOnSubmit
                    onChangeText={text => this.setState({ hoursPerWeek: text })}
                    value={hoursPerWeek}
                />


                <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.resetForm}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ width: 300, height: 300 }}
                    />
                )}
                <TouchableOpacity title="Choose Photo" onPress={this.handleChoosePhoto}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#3F4EA5',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
    textInput: {
        height: 40,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 18,
        color: '#3F4EA5',
    },
    button: {
        backgroundColor: '#FD6592',
        borderRadius: 3,
        height: 40,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
