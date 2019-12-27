import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Linking
} from 'react-native';

import logo from '../assets/logo_transp2.png';
import { Container, Content, Button } from 'native-base';
import { isLoggedIn } from '../config/auth';

export default class About extends Component {
  static navigationOptions = {
    title: 'Sobre o App ESTÁGIO INTEGRADO',
    headerStyle: {
      backgroundColor: '#5f98e3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'RobotoMono-Bold',
      fontSize: 15
    },
  };

  state = {
    logado: false
  }

  async componentDidMount() {
    this.setState({ logado: await isLoggedIn() })
  }

  render() {

    return (
      <Container style={styles.MainContainer}>
        <Content>
          <Image source={logo} style={styles.image}></Image>
          <Text style={styles.text}>
            Este aplicativo é um produto educacional desenvolvido no decorrer da pesquisa de pós-graduação da mestranda Josiana Rita Bazana, aluna do Curso de Mestrado Profissional em Educação Profissional e Tecnológica – ProfEPT / IFFar, sob a orientação da Profª. Drª. Sandra Elisabet Bazana Nonenmacher e colaboração da estudante em Sistemas Para Internet Victoria Botelho Martins.
            </Text>
          <Text style={styles.text}>
            Os objetivos deste aplicativo são: contribuir para a organização e o desenvolvimento do estágio curricular supervisionado obrigatório,  incentivar reflexões acerca do estágio e promover a comunicação entre os sujeitos envolvidos, contribuindo assim com os processos de ensino e de aprendizagem proporcionados pelo estágio curricular.
        </Text>
          <Text style={styles.text}>
            Esperamos que este aplicativo seja útil para você. Use e aproveite todas as ferramentas disponíveis.
        </Text>
          {
            this.state.logado &&
            (
              <>
                <Text style={styles.text}>
                  Além disso, gostaríamos de conhecer a sua opinião sobre este aplicativo. Por favor, responda ao formulário do link abaixo. Você levará menos de 1 minuto.
                </Text>
                <Button block primary onPress={() => {
                  Linking.openURL(`https://docs.google.com/forms/d/1r9CITN_8QIGXI5uacS8ZMsT3KCC1gkm-Q6vsHfcN3ng/viewform?edit_requested=true`)
                }}>
                  <Text style={[styles.text, { color: 'white' }]}>Deixe sua Opinião</Text>
                </Button>
                <Text style={[styles.text, { textAlign: "right" }]}>Josiana</Text>
                <Text style={[styles.text, { textAlign: "center", marginBottom: 0 }]}>
                  Caso tenha alguma dificuldade ao utilizar o aplicativo nos contate através do e-mail
                </Text>
                <Text style={[styles.text, { textAlign: "center", color: "blue", marginTop: 0 }]} onPress={() => {
                  Linking.openURL(`estagio.integrado.ei@gmail.com`)
                }}
                >estagio.integrado.ei@gmail.com</Text>
              </>
            )
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 8,
    paddingRight: 2
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'stretch'
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'RobotoMono-Light',
    textAlign: 'justify',
    margin: 17,
  },
})