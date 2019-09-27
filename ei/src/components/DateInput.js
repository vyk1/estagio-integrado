import React from 'react';
import PropTypes from 'prop-types';
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import FormTextInput from './FormTextInput';

/**
 * A component which renders a TextInput with a label above it.
 * Note: This component can easily be written as a stateless function
 *      since it only includes the `render()` function and nothing else
 *      (see FormButton component as an example).
 */
class DateInput extends React.Component {
    render() {
        const { labelText, dataDaAtividade, onPress, value, ...inputProps } = this.props;

        return (
            <View style={styles.inputWrapper}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.label}>
                        {labelText}
                    </Text>
                    <FormTextInput
                        placeholder="Toque no texto acima para inserir a data"
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

DateInput.propTypes = {
    labelText: PropTypes.string,
};

DateInput.defaultProps = {
    labelText: null,
};

const styles = StyleSheet.create({
    inputWrapper: {
        // marginBottom: 15,
        flexDirection: 'row',
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
        color: '#000',
        marginBottom: 5,
    },
});

export default DateInput;