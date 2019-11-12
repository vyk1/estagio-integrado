import React, { Component, View } from "react";
import { Container, Header, Content, Textarea, Form } from "native-base";
export default class TextArea extends Component {
  render() {
    const { onChangeText } = this.props;
    return (
      <>
        <Textarea rowSpan={5} onChangeText={onChangeText} bordered placeholder="Descrição..." />
      </>
    );
  }
}