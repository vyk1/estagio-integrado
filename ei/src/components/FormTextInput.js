import React from 'react';
import PropTypes from 'prop-types';
import {
    View, TextInput, Text, StyleSheet,
} from 'react-native';

class FormTextInput extends React.Component {
    render() {
        const { placeholder, labelText, multiline, onChangeText, numberOfLines, ...inputProps } = this.props;

        return (
            <View style={styles.inputWrapper}>
                {/* {labelText && <Text style={styles.label}>{labelText}</Text>} */}

                <TextInput
                    style={[styles.textInput, multiline && styles.textarea]}
                    blurOnSubmit
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    onChangeText={onChangeText}
                    {...inputProps}
                    placeholder={placeholder}
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
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },
    // textInput: {dsadsada
    //     height: 40,
    //     borderColor: '#FFF',
    //     borderWidth: 1,
    //     borderRadius: 3,
    //     backgroundColor: '#FFF',
    //     paddingHorizontal: 10,
    //     fontSize: 18,
    //     color: '#0f1226',
    // },
    textarea: {
        height: 150,
        justifyContent: "flex-start"
    },
});

export default FormTextInput;