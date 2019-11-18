import React from 'react';
import {
    View, TextInput, Text, StyleSheet,
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class PhoneInput extends React.Component {
    render() {
        const { label, onChangeText, value, ...inputProps } = this.props;

        return (
            <View>
                <Item inlineLabel>
                    <Label>{label}</Label>
                    <Input keyboardType={'numeric'}
                        onChangeText={onChangeText}
                        maxLength={11}
                        value={value} />
                </Item>
            </View>
        )
    }
}
