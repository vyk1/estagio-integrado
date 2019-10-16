import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

import logo from '../assets/logo_transp2.png';
import { ScrollView } from 'react-native-gesture-handler';

export default class About extends Component {
    static navigationOptions = {
        title: 'Bem-vind@ ao App Estágio Integrado',
        headerStyle: {
            backgroundColor: '#8998e3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'RobotoMono-Bold',
            fontSize: 15
        },
    };
    render() {
        return (
            <View>
                <ScrollView>
                    <Image source={logo} style={styles.image}></Image>
                    <Text style={styles.text}>
                        Estágio é a prática profissional em situação real
                        de trabalho. É um momento de formação orientada e
                        supervisionada, que articula a formação escolar e o mundo do trabalho.</Text>
                    <Text style={styles.text} onPress={() => {
                        this.props.navigation.navigate('About')
                    }}>Quer saber mais? Clique aqui</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        resizeMode: 'stretch'
        // borderWi: 1
    },
    text: {
        color: 'black',
        fontSize: 18,
        // fontFamily: 'monospace',
        fontFamily: 'RobotoMono-Light',
        // textalign justify apenas para ios
        textAlign: 'justify',
        margin: 17,
    }
})