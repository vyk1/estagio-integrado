import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInputMask, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class TelMask extends Component {
    render() {
        const { label, onChangeText, value, secureTextEntry, tel, ...inputProps } = this.props;
        return (
            <View>
                <Item inlineLabel>
                    <Label>{label}</Label>
                    <TextInputMask
                        // refInput={ref => { this.input = ref }}
                        mask={"+1 ([000]) [000] [00] [00]"}
                    />
                </Item>
            </View>
        );
    }
}