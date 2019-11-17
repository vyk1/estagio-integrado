import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Platform } from 'react-native';
import server from "../config/server";
import RNFetchBlob from 'rn-fetch-blob';
import Esperador from '../components/Esperador';

export default class InfoStage extends Component {
    static navigationOptions = {
        title: 'Informações sobre o Estágio',
    };

    constructor(props) {
        super(props);

        this.state = {
            loaded: true,
            GridViewItems: [
                { key: 'Lei de Estágio n° 11788/08', page: 'Law', fileName: 'leiEstagio' },
                { key: 'Passo a Passo para Iniciar o Estágio', page: 'Tutorial', fileName: 'fluxograma' },
                { key: 'Lista dos Locais Conveniados', page: 'List', fileName: 'listaConveniados' },
                { key: 'Documentos', page: 'MoreInfo', link: 'https://docs.google.com/spreadsheets/d/1rqA00R7FE5x3sBmt758UTDH7NsnCNn27yMuuWu60sIw/edit#gid=1870369049' },
                { key: 'Projeto Pedagógico dos Cursos', page: 'MoreInfo', link: 'https://www.iffarroupilha.edu.br/projeto-pedag%C3%B3gico-de-curso/sobre-os-projetos-pedag%C3%B3gicos-de-cursos' }
            ]
        }
    }

    handleDoc(item) {
        const { fileName, key, page, link } = item
        if (link != null) {

            this.GetGridViewItem(page, key, link)
        } else {
            this.setState({ loaded: false })
            RNFetchBlob
                .config({
                    addAndroidDownloads: {
                        useDownloadManager: true, // <-- this is the only thing required
                        // Optional, override notification setting (default to true)
                        notification: true,
                        title: `Download De ${fileName}.pdf Pronto`,
                        // Optional, but recommended since android DownloadManager will fail when
                        // the url does not contains a file extension, by default the mime type will be text/plain
                        mime: 'application/pdf',
                        description: `Arquivo Baixado pelo App EI - ${fileName}.`
                    }
                })
                .fetch('GET', `${server}/files/docs/${fileName}.pdf`)
                .then((resp) => {
                    // the path of downloaded file
                    console.log(resp);
                    resp.path();
                    console.log('====================================');
                    this.setState({ loaded: true })

                }).catch((e) => {
                    console.log('====================================');
                    console.log(e);
                    console.log('====================================');
                    this.setState({ loaded: true })

                })
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
                <Esperador />
            )
        } else {
            return (
                <View style={styles.MainContainer}>
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
