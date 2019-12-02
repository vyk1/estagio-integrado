import React, { Component } from 'react';
import { Button, Container, Content, Card, CardItem, Text } from "native-base";
import { SafeAreaView, Linking, ScrollView } from 'react-native';
import server from "../config/server";
import Esperador from '../components/Esperador';

export default class Contacts extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Contatos de ${navigation.getParam('logado').name}`
        }
    };
    constructor(props) {
        super(props);

        this.state = {
            contacts: {},
            formSent: false
        }

    }
    async componentDidMount() {
        // console.log(this.props.navigation.state.params.logado);
        await this.getContacts()
    }

    async getContacts() {
        const user = this.props.navigation.state.params.logado;

        await fetch(`${server}/internship/user/${user._id}/contacts/${user.type}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ contacts: responseJson, formSent: true })
                console.log('chegou aqui');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { contacts, formSent } = this.state
        if (!formSent) {
            return (
                <Esperador />
            )
        } else {
            if (contacts.status == 404) {
                return (
                    <CardItem header bordered>
                        <Text>{contacts.message} </Text>
                    </CardItem>
                )
            } else {
                return (
                    <Container>
                        <ScrollView>
                            <Content>
                                <CardItem header bordered>
                                    <Text>Você pode interagir com o e-mail e telefone</Text>
                                </CardItem>
                                {
                                    contacts.contacts.map((rowData, index) => (

                                        <Card key={rowData._id}>

                                            <CardItem header bordered>
                                                <Text>{rowData.name}</Text>
                                            </CardItem>

                                            <CardItem bordered>
                                                <Text onPress={() => {
                                                    Linking.openURL(`tel:${rowData.phone}`)
                                                }}
                                                >{rowData.phone}</Text>
                                            </CardItem>

                                            <CardItem bordered>
                                                <Text onPress={() => {
                                                    Linking.openURL(`mailto:${rowData.email}`)
                                                }}
                                                >{rowData.email}</Text>
                                            </CardItem>
                                        </Card>
                                    ))
                                }
                            </Content>
                        </ScrollView>
                    </Container>
                );
            }
        }
    }
}