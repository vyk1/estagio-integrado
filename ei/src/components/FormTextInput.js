import React from 'react';
import PropTypes from 'prop-types';
import {
    View, TextInput, Text, StyleSheet,
} from 'react-native';

class FormTextInput extends React.Component {
    render() {
        const { labelText, multiline, onChangeText,...inputProps } = this.props;

        return (
            <View style={styles.inputWrapper}>
                {labelText && <Text style={styles.label}>{labelText}</Text>}

                <TextInput
                    style={[styles.textInput, multiline && styles.textarea]}
                    blurOnSubmit
                    multiline={multiline}
                    onChangeText={onChangeText}
                    {...inputProps}
                />
            </View>
        );
    }
}

FormTextInput.propTypes = {
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
};

FormTextInput.defaultProps = {
    labelText: null,
    multiline: false,
};

const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        marginBottom: 15,
    },
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
        color: '#FFF',
        marginBottom: 5,
    },
    textarea: {
        height: 80,
    },
});

export default FormTextInput;