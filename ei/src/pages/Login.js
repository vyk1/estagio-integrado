import server from "../config/server";
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Picker } from 'native-base';
import InlineLabel from '../components/InlineLabel';
import BlueButton from '../components/BlueButton';
import Esperador from '../components/Esperador';
import { onSignIn, onLogin } from "../config/auth";

export default class PickerInputExample extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Login',
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
        // this.initialState = { email: 'victoriabotelho14@gmail.com', password: '12345678', nameError: 'Por favor, preencha todos os campos', formSent: true };
        // this.initialState = { email: 'victoria.martins@aluno.iffar.edu.br', password: '12345678', nameError: 'Por favor, preencha todos os campos', formSent: true };
        this.initialState = { email: 'v3-14@hotmail.com', password: '12345678', nameError: 'Por favor, preencha todos os campos', formSent: true };
        this.state = this.initialState;
    }
    showAlert = () => {
        const { nameError } = this.state
        Alert.alert(
            'Erro de Validação',
            nameError,
            [{ text: 'OK' }])

    }
    checkInputs = async () => {


        if (!await this.checkEmail() || this.state.email === "") {
            await this.setState({ nameError: "E-mail inválido" });
            this.showAlert();
            return false
        } else {
            if (this.state.password.length < 8) {
                await this.setState({ nameError: "A senha necessita de ao menos 8 caracteres." });
                this.showAlert();
                return false

            } else {
                return true
            }
        }
    }

    checkEmail = () => {
        const { email } = this.state
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            console.log("Email is Not Correct");
            return false;
        }
        else {
            console.log("Email is Correct");
            return true
        }
    }

    onChangeType(value) {
        this.setState({
            type: value
        });
    }
    handleSubmit = async () => {

        let checagem = await this.checkInputs();

        if (!checagem) {
            return false
        } else {

            this.setState({ formSent: false })
            const config = await {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            try {
                await fetch(`${server}/user/auth`, config)
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);

                        if (res.status == 200) {
                            onLogin(res.token, res.user);

                            if (res.user.type == 1) {
                                return this.props.navigation.navigate('StudentMain', {
                                    logado: res.user,
                                    title: 'Carregando'
                                })
                            }
                            if (res.user.type == 2 || 3) {
                                return this.props.navigation.navigate('VisorMain', {
                                    logado: res.user,
                                    title: 'Carregando'
                                });
                            }
                        } else {
                            Alert.alert(
                                'Ops...',
                                res.message,
                            )
                        }
                    })
            }
            catch (error) {
                console.log(error)
                Alert.alert(
                    'Erro',
                    'Ocorreu um erro... Tente novamente.')
            } finally {
                this.setState({ formSent: true })
            }
        }
    }

    render() {
        const { formSent, email, password } = this.state;
        if (formSent == false) {
            return (
                <Esperador />
            )
        } else {
            return (
                <View style={styles.MainContainer}>
                    <Container>

                        <InlineLabel label="E-mail:"
                            onChangeText={(email) => this.setState({ email })}
                            value={email} />

                        <InlineLabel label="Senha:"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                            value={password} />
                    </Container>
                    <BlueButton onPress={this.handleSubmit}>
                        Login
                    </BlueButton>
                </View>

            );
        }
    }
}
const styles = StyleSheet.create({

    header: {
        fontSize: 6,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 2,
        marginHorizontal: 10,
        alignContent: "space-between"
    }
})