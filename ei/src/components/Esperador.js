import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';


const Esperador = (props) => {

    return (
        <View style={styles.MainContainer}>
            {props.critical && (<Text>Esta ação pode demorar um pouco...</Text>)}
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

Esperador.propTypes = {
    critical: PropTypes.bool,
}
Esperador.defaultProps = {
    critical: false
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        alignItems: 'center'
    },

})

export default Esperador;