import React, { Component } from 'react';
import { Container, CardItem, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import server from "../config/server";
import Esperador from '../components/Esperador';

export default class ViewReports extends Component {
    static navigationOptions = ({ navigation }) => {
        return {        
            title: `${navigation.getParam('title')}`,
            headerStyle: {
                backgroundColor: navigation.getParam('backgroundColor'),
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
        this.state = {
            students: [],
            formSent: false

        }
    }

    async componentDidMount() {
        await this.getStudents()
    }

    async getStudents() {
        const user = this.props.navigation.state.params.logado;

        await fetch(`${server}/internship/user/${user._id}/students`)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({ students: responseJson, formSent: true })
                this.props.navigation.setParams({ title: `Visualização de estagiários` });
            })
            .catch((error) => {
                console.error(error);
                return false
            });
    }
    async goToStudent(key) {
        this.props.navigation.navigate('GenReport', {
            student_id: key,
            title: 'Carregando'
        });
        console.log(key);

    }
    render() {
        const { students, formSent } = this.state;
        if (!formSent) {
            return (
                <Esperador />
            )
        } else {
            if (students.status == 404) {
                return (
                    <CardItem header bordered>
                        <Text>{students.message} </Text>
                    </CardItem>
                )
            } else {
                return (
                    <Container>
                        <Content>
                            <List>
                                {students.students.map((rowData, i) => (
                                    <ListItem onPress={() => this.goToStudent(rowData._id)} key={i}>
                                        <Left>
                                            <Text>{rowData.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>=></Text>
                                        </Right>
                                    </ListItem>
                                ))}
                            </List>
                        </Content>
                    </Container>
                );
            }
        }
    }
}