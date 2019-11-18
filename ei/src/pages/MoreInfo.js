import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import server from "../config/server";
import RNFetchBlob from 'rn-fetch-blob';
import { ScrollView } from 'react-native-gesture-handler';

export default class MoreInfo extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
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
    render() {
        return (
            <View>
                <ScrollView>

                    {/* <Text style={styles.text} onPress={() => this.handleDoc()}>aqui</Text>
                    <Text onPress={() => {
                        Linking.openURL(this.props.navigation.params.link);

                    }}
                    >Mais informações: {this.state.link}</Text> */}
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
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'RobotoMono-Light',
        textAlign: 'justify',
        margin: 17,
    }
})
