import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class InlineLabel extends Component {
  render() {
    const { label, onChangeText, value, secureTextEntry, tel, ...inputProps } = this.props;
    return (
      <View>
        <Item inlineLabel>
          <Label>{label}</Label>
          <Input onChangeText={onChangeText} value={value} secureTextEntry={secureTextEntry} {...inputProps} />
        </Item>
      </View>
    );
  }
}