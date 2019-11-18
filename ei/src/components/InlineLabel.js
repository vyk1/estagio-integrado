import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class InlineLabel extends Component {
  render() {
    const { label, onChangeText, value, ...inputProps } = this.props;
    return (
      <View>
        {/* <Item floatingLabel onChangeText={onChangeText} error={error} success={}> */}
        <Item inlineLabel>
          <Label>{label}</Label>
          <Input onChangeText={onChangeText} value={value} />
        </Item>
      </View>
    );
  }
}