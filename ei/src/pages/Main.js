import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Platform } from 'react-native';


export default class Main extends Component {
    static navigationOptions = {
        title: 'Tela de Seleção',
    };

    constructor(props) {
        super(props);

        this.state = {
            GridViewItems: [
                { key: 'Aluno', page: 'StudentMain' },
                { key: 'Orientador', page: 'VisorMain' },
                { key: 'Supervisor', page: 'VisorMain' }
            ]
        }
    }

    GetGridViewItem(page, key) {
        this.props.navigation.navigate(page, {
            type: key,
            title:''
        });

    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.GridViewItems}
                    renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
                        <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.page, item.key)} > {item.key} </Text>
                    </View>}
                    numColumns={1}
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

    },
    GridViewInsideTextItemStyle: {

        color: '#fff',
        padding: 18,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',

    },
    Grind2: {
        textAlign: 'center',
        fontSize: 20,
    }

});
