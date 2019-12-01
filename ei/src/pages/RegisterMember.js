import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    this.initialState = { name: '', email: '', password: '', phone: '', type: null, nameError: 'Por favor, preencha todos os campos', formSent: true };
    this.state = this.initialState;
  }
  showAlert = () => {
    const { nameError } = this.state
    Alert.alert(
      'Erro de Validação',
      nameError,
      [{ text: 'OK' }])

  }
  checkInputs = () => {

    if (this.state.name.length < 4) {
      this.setState({ nameError: "O nome necessita de ao menos 3 caracteres." });
      this.showAlert();
      return false
    } else {
      if (!this.checkEmail() || this.state.email === "") {
        this.setState({ nameError: "E-mail inválido" });
        this.showAlert();
        return false
      } else {
        if (this.state.password.length < 8) {
          this.setState({ nameError: "A senha necessita de ao menos 8 caracteres." });
          this.showAlert();
          return false
        } else {
          if (this.state.phone === "") {
            this.setState({ nameError: "O telefone necessita de ao menos 8 caracteres." });
            this.showAlert();
            return false
          } else {
            if (this.state.type === "" || null) {
              this.setState({ nameError: "O tipo do usuário necessita ser preenchido." });
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

  checkEmail() {
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

    let checagem = this.checkInputs();

    if (!checagem) {
      console.log(false);
      return false
    } else {
      console.log(true);
      console.log(this.state);

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