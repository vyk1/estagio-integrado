import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Esperador = (props) => {

    return (
        <View style={[styles.MainContainer,styles.waiterCont, styles.waiterHorizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0

    },
    waiterCont: {
        flex: 1,
        justifyContent: 'center'
    },
    waiterHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

export default Esperador;