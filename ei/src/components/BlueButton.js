import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * A stateless function component which renders a button.
 *
 * @param {obj} props
 */
const BlueButton = (props) => {
    const { children, onPress } = props;

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    );
};

BlueButton.propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.string.isRequired,
};

BlueButton.defaultProps = {
    onPress: f => f,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4766ff',
        borderRadius: 3,
        height: 40,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default BlueButton;
