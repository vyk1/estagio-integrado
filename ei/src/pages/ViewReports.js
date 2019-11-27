import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import server from "../config/server";
import Esperador from '../components/Esperador';

export default class ViewReports extends Component {
    static navigationOptions = ({ navigation }) => {
        return {        // title: '',
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
            user: this.props.navigation.state.params.logado.user,
            students: []
        }
    }

    componentDidMount() {
        console.log(this.state.user);
        this.getStudents()
    }

    async getStudents() {

        return fetch(`${server}/internship/user/${this.state.user._id}/students`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('rodou');

                this.setState({ students: responseJson.students })
                this.props.navigation.setParams({ title: `Visualização de estagiários` });

                console.log(responseJson);

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
        const { students } = this.state;
        if (!Object.keys(students).length) {
            return (
                <Esperador />
            )
        } else {

            return (
                <Container>
                    <Content>
                        <List>
                            {students.map((rowData, i) => (
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