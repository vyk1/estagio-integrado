import React, { Component } from "react";
import { Alert } from "react-bootstrap";

import { logout } from "../components/auth.jsx";

class Logout extends Component {
  async componentDidMount() {

    if (await logout()) {
      window.location.href = "/admin"
    }
  }
  render() {
    return (
      <div className="content">
        <Alert bsStyle="success">
          <span>
            <b> Saindo... </b>
          </span>
        </Alert>
      </div>
    );
  }
}

export default Logout;
