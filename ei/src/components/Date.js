import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import {
    Container,
    DatePicker,
} from "native-base";

class NHDatePicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: ''
        }
    }

    render() {
        // const { minimumDate, maximumDate } = this.props
        return (
            <DatePicker style={styles.inputWrapper}
                defaultDate={new Date()}
                date={this.state.date}
                // minimumDate={minimumDate}
                // maximumDate={maximumDate}
                locale={"br"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Clique aqui para definir a data da atividade"
                textStyle={{ color: "blue" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={(date) => this.props.onDateChange && this.props.onDateChange(date) && this.setState({ date })}
            />
        );
    }

}

export default NHDatePicker;


const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        marginBottom: 15,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },
})