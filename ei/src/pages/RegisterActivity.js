import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Platform } from 'react-native';


export default class RegisterActivity extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Registro de Atividades - ' + navigation.getParam('user').name,
        }
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
            type: key
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
