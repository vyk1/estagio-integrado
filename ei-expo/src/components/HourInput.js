import React from 'react';
import PropTypes from 'prop-types';
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import FormTextInput from './FormTextInput';
import { Container } from 'native-base';


class HourInput extends React.Component {
    render() {
        const { labelText, dataDaAtividade, onPress, value, ...inputProps } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.label}>
                        {labelText}
                    </Text>
                    <FormTextInput
                        placeholder="Clique aqui p/ inserir a hora"
                        editable={false}
                        blurOnSubmit
                        onPress={onPress}
                        value={value}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

HourInput.propTypes = {
    labelText: PropTypes.string,
};

HourInput.defaultProps = {
    labelText: null,
};

const styles = StyleSheet.create({
    // inputWrapper: {
    //     marginBottom: 15,
    // },
    textInput: {
        height: 40,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#3F4EA5',
    },
    label: {
        color: '#000',
        marginBottom: 5,
    },
});

export default HourInput;