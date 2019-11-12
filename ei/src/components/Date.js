import React, { Component } from "react";
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
            //   <Container>
            <Container padder style={{ backgroundColor: "#fff" }}>
                <DatePicker
                    defaultDate={new Date()}
                    date={this.state.date}
                    // minimumDate={minimumDate}
                    // maximumDate={maximumDate}
                    locale={"br"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Data Da Atividade"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={(date) => this.props.onDateChange && this.props.onDateChange(date) && this.setState({ date })}
                />

            </Container>
        );
    }

}

export default NHDatePicker;
