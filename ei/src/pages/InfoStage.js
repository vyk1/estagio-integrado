import React, { Component } from 'react';

import { StyleSheet, FlatList, View, Platform, Linking, PermissionsAndroid } from 'react-native';
import { CardItem, Text } from 'native-base'
import server from "../config/server";
import RNFetchBlob from 'rn-fetch-blob';
import Esperador from '../components/Esperador';

export default class InfoStage extends Component {
    static navigationOptions = ({ navigation }) => {
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
        const { fileName, key, page, link } = item
        if (link != null) {
            Linking.openURL(link);
        } else {
            this.setState({ loaded: false })

            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    const { config, fs } = RNFetchBlob

                    const DownloadDir = fs.dirs.DownloadDir // this is the Downloads directory.

                    const path = DownloadDir + "/" + fileName + '.' + "pdf"
                    console.log(path);

                    if (fs.exists(path)) {
                        fs.unlink(path)
                    }

                    let options = {
                        fileCache: true,
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            title: `Download De ${fileName}.pdf Pronto`,
                            description: `Arquivo Baixado pelo App EI`,
                            path: path,
                        }
                    }
                    await config(options)
                        .fetch('GET', `${server}/files/docs/${fileName}.pdf`)
                        .then((res) => {
                            this.setState({ msgDownload: `Arquivo Baixado: ${fileName}.pdf` })
                        })
                        .catch((err) => {
                            console.log(err);
                            this.setState({ msgDownload: `Ocorreu um erro ao baixar o arquivo ${fileName}.pdf` })
                        })
                } else {
                    this.setState({ msgDownload: 'Permissão Negada! É necessário que você conceda acesso ao aplicativo para fazer download do arquivo.' })
                }
            } catch (err) {
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
                <Esperador />
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
                                <Text>{this.state.msgDownload}</Text>
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
