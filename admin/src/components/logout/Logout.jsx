import React, { Component } from "react";

import { logout } from "../auth";

export default class Logout extends Component {
    async componentDidMount() {

        if (logout()) {
            window.location.href = "/sign-in"
        }
    }
    render() {
        return (
            <span>
                <b> Saindo... </b>
            </span>
        );
    }
}