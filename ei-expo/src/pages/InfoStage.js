import React, { Component } from 'react';

import { StyleSheet, FlatList, View, Platform, Linking, Alert } from 'react-native';
import { CardItem, Text } from 'native-base'
// import RNFetchBlob from 'rn-fetch-blob';
import Esperador from '../components/Esperador';
import server from '../config/server';

export default class InfoStage extends Component {
    static navigationOptions = ({ }) => {
        return {
            title: 'Informações sobre o Estágio',
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

        this.state = {
            loaded: true,
            GridViewItems: [
                { key: 'Lei de Estágio n° 11788/08', fileName: 'leiEstagio' },
                { key: 'Passo a Passo para Iniciar o Estágio', fileName: 'fluxograma' },
                { key: 'Lista dos Locais Conveniados', link: 'https://docs.google.com/spreadsheets/d/1rqA00R7FE5x3sBmt758UTDH7NsnCNn27yMuuWu60sIw' },
                { key: 'Documentos', link: 'https://www.iffarroupilha.edu.br/conveniosinstitucionais/item/439-formularios-estagios' },
                { key: 'Projeto Pedagógico dos Cursos', link: 'https://www.iffarroupilha.edu.br/projeto-pedag%C3%B3gico-de-curso/sobre-os-projetos-pedag%C3%B3gicos-de-cursos' }
            ]
        }
    }

    async handleDoc(item) {
        const { link, fileName } = item

        if (link != null) {
            return Linking.openURL(link);
        } else {
            this.setState({ loaded: false })

            try {
                const uri = `${server}/files/docs/${fileName}.pdf`
                console.log(uri)
                return Linking.openURL(uri);

            } catch (err) {
                Alert.alert("Ops", "Ocorreu um erro")
                console.warn(err);
            } finally {
                this.setState({ loaded: true })

            }
        }

    }

    GetGridViewItem(page, key, link) {
        this.props.navigation.navigate(page, {
            title: key,
            link
        });
    }
    render() {
        if (this.state.loaded == false) {
            return (
                <Esperador critical={true} />
            )
        } else {
            return (
                <View style={styles.MainContainer}>
                    <CardItem header bordered>
                        <Text>Toque na opção desejada para fazer download ou acessar documentos</Text>
                    </CardItem>
                    {
                        this.state.msgDownload && (
                            <CardItem>
                                <Text style={styles.msgDownload}>{this.state.msgDownload}</Text>
                            </CardItem>
                        )
                    }
                    <FlatList
                        data={this.state.GridViewItems}
                        renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
                            <Text style={styles.GridViewInsideTextItemStyle} onPress={this.handleDoc.bind(this, item)} > {item.key} </Text>
                        </View>}
                        numColumns={1}
                    />
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    msgDownload: {
        color: '#000',
        fontSize: 11
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        marginBottom: 0
    },

    GridViewBlockStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 70,
        margin: 5,
        backgroundColor: '#1460db'

    },
    GridViewInsideTextItemStyle: {

        color: '#fff',
        padding: 18,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',

    }

});
