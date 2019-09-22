import React from 'react'
import { View, Text, Image, Button, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import t from 'tcomb-form-native';
import { ScrollView } from 'react-native-gesture-handler';
const Form = t.form.Form;

const Activity = t.struct({
    description: t.String,
    date: t.Date,
    inputTime: t.Date,
    outputTime: t.Date,
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: 'blue',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

const options = {
    // auto: 'placeholders',
    fields: {
        description: {
            label: "Descrição",
            help: 'Você pode colocar aqui o que realizou neste dia',
            error: 'Descrição vazia! Por favor, preencher.',
            multiline: true,
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 200,
                        textAlignVertical: 'top',
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 200,
                    },
                },
            },
        },
        date: {
            label: "Dia da Atividade",
            error: 'Data vazia! Por favor, preencher.',
            mode: 'date',
        },
        inputTime: {
            label: "Hora de Entrada",
            help: 'Pode ser um valor estimado',
            mode: 'time',
            error: 'Hora de entrada vazia! Por favor, preencher.',
        },
        outputTime: {
            label: "Hora de Saída",
            help: 'Pode ser um valor estimado',
            mode: 'time',
            defaultValueText: "ACOHO sassaas",
            error: 'Hora de saída vazia! Por favor, preencher.',
        },
    },
    stylesheet: formStyles,
};

export default class RegisterActivity extends React.Component {
    handleSubmit = () => {
        const value = this.form.getValue();
        console.log('value: ', value);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Registro de Atividades - fulano'
            // title: 'Registro de Atividades - ' + navigation.getParam('user').name,
        }
    };

    state = {
        photo: null,
    }

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

    render() {
        const { photo } = this.state
        return (
            <ScrollView>
                <View style={styles.container}>
                    {/* display */}
                    <Form
                        ref="form"
                        type={Activity}
                        options={options}
                    />
                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 300, height: 300 }}
                        />
                    )}
                    <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                    <Button
                        title="Sign Up!"
                        onPress={this.handleSubmit}
                    />
                </View>

            </ScrollView>

        )
    }
}
var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 25,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});