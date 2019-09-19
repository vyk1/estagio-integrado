import React, { Component } from 'react';

import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform } from 'react-native';


export default class VisorMain extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Olá ${navigation.getParam('type')}`,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            GridViewItems: [
                { key: 'Informações Sobre o Estágio', page: 'InfoStage' },
                { key: 'Ver relatório dos estagiários', page: 'ViewReports' },
                { key: 'Para Refletir', page: 'ToThink' },
                { key: 'Contatos', page: 'Contacts' },
                { key: 'Ei! Fique Ligado', page: 'StayOn' },
                { key: 'Sobre o App', page: 'About' }
            ]
        }
    }

    GetGridViewItem(page, key) {
        // this.props.navigation.push('About');
        this.props.navigation.navigate(page, {
            title: key,
            // pegar info do user logado
            user: { name: 'Orientador', type: 1, id: 'stringloucona' }
            // user : { name: 'Supervisor', type: 2, id: 'stringloucona' }
        });
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.GridViewItems}
                    renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
                        {/* <Text style={styles.Grind2} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text> */}
                        {/* <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.page)} > {item.key} </Text> */}
                        <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.page, item.key)} > {item.key} </Text>
                    </View>}
                    numColumns={2}
                />
                {/* <Text>Você está logado como 'Nome da Pessoa da Silva'</Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0

    },

    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: '#00BCD4'

    }
    ,

    GridViewInsideTextItemStyle: {

        color: '#fff',
        padding: 18,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',

    },
    Grind2: {
        // flex: 1,
        // margin: 20,
        // backgroundColor: 'orange',
        // margin: 10,
        textAlign: 'center',
        fontSize: 20,
        //paddingTop: 70,
    }

});
