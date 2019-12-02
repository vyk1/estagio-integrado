import server from "../config/server";
import { TextInputMask } from 'react-native-masked-text';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Picker } from 'native-base';
import InlineLabel from '../components/InlineLabel';
import BlueButton from '../components/BlueButton';
import Esperador from '../components/Esperador';

export default class PickerInputExample extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Cadastro de Usuário',
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
    this.initialState = { type: "0", name: 'Luísa Castro', email: 'v3-14@hotmail.com', password: '12345678', phone: '88285522522', nameError: 'Por favor, preencha todos os campos', formSent: true };
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

    if (this.state.name.length < 4) {
      await this.setState({ nameError: "O nome necessita de ao menos 3 caracteres." });
      this.showAlert();
      return false
    } else {
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
          if (this.state.phone === "") {
            await this.setState({ nameError: "O telefone necessita de ao menos 8 caracteres." });
            this.showAlert();
            return false
          } else {
            if (this.state.type === "0" || null) {
              await this.setState({ nameError: "O tipo do usuário necessita ser preenchido." });
              this.showAlert();
              return false
            } else {
              return true
            }
          }
        }
      }
    }
  }

  checkEmail = () => {
    const { email } = this.state
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      return false;
    }
    else {
      return true
    }
  }

  onChangeType(value) {
    if (value !== 0) {
      this.setState({
        type: value
      });
    }
  }
  handleSubmit = async () => {

    console.log(this.state);

    let checagem = await this.checkInputs();

    if (!checagem) {
      return false
    } else {

      await this.setState({ formSent: false })
      const config = await {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      try {
        await fetch(`${server}/user/register`, config)
          .then(res => res.json())
          .then(res => {
            console.log(res);

            if (res.status == 201) {
              Alert.alert(
                'Sucesso',
                res.message,
                [
                  {
                    text: 'OK', onPress: () => {
                      this.setState(this.initialState)
                      this.props.navigation.navigate('Inicial');
                    }
                  }
                ])
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
    const { formSent, email, name, phone, password } = this.state;
    if (formSent == false) {
      return (
        <Esperador />
      )
    } else {
      return (
        <View style={styles.MainContainer}>
          <Container>
            <InlineLabel label="Nome:"
              onChangeText={(name) => this.setState({ name })}
              value={name} />

            <InlineLabel label="E-mail:"
              onChangeText={(email) => this.setState({ email })}
              value={email} />

            <InlineLabel label="Senha:"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              value={password} />

            <Text>Insira seu número de telefone (com DDD)</Text>
            <TextInputMask
              onChangeText={phone => {
                this.setState({
                  phone
                })
              }}
              value={phone}
              placeholder="(55) 99999-9999"
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
              }}
            />

            <Text>Selecione o tipo de usuário desejado</Text>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Selecione o tipo de usuário"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.type}
                onValueChange={this.onChangeType.bind(this)}
              >
                <Picker.Item label="Selecionar... " value="0" />
                <Picker.Item label="Estudante" value="1" />
                <Picker.Item label="Orientador" value="2" />
                <Picker.Item label="Supervisor" value="3" />
              </Picker>
            </Item>
          </Container>
          <BlueButton onPress={this.handleSubmit}>
            Cadastrar-se
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