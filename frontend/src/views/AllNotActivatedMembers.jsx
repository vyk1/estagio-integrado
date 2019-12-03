import React, { Component } from "react";
import { Grid, Row, Col, Table, Alert } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray2 } from "variables/Variables.jsx";
import api from "variables/Server.js";
import SpinnerBS from "components/SpinnerBS";
import { getToken } from "components/auth";

class AllNotActivatedMembers extends Component {

  state = {
    users: [],
    status: "",
    loaded: false
  }

  async componentDidMount() {

    await this.getNotVerified()
  }

  async getNotVerified() {
    let token = await getToken()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }

    const response = await api.get('/users/notVerified', config)

    this.setState({
      users: response.data,
      status: response.status,
      loaded: true
    })
  }

  getType(tipo) {
    switch (tipo) {
      case 1:
        return 'Estudante'
      case 2:
        return 'Orientador'
      case 3:
        return 'Supervisor'
      default:
        return '-'
    }
  }

  async decline(e) {
    await e.persist()


    const classid = e.target.attributes[1].value;
    const name = e.target.attributes[2].value

    if (window.confirm(`Você tem certeza que deseja apagar o usuário ${name}?`)) {

      this.setState({
        loaded: false
      })

      const body = {
        id: classid
      }
      let token = await getToken()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      }


      // const res = await api.post('/user/accept', body, config)

      const res = await api.post('/user/decline', body, config)
      if (res.status === 200) {

        this.setState({
          warning: res.data.message,
          color: "success",
          loaded: true,
          users: "",
          status: "",

        })
        this.getNotVerified()

      } else {
        this.setState({
          warning: res.data.message,
          color: 'warning',
          loaded: true,
          users: "",
          status: "",
        })
      }
    } else {
      return false
    }

  }

  async accept(e) {
    await e.persist()

    const classid = e.target.attributes[1].value;
    const name = e.target.attributes[2].value

    if (window.confirm(`Você tem certeza que deseja aceitar o usuário ${name}?`)) {

      this.setState({
        loaded: false
      })

      const body = {
        id: classid
      }
      let token = await getToken()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      }


      const res = await api.post('/user/accept', body, config)
      if (res.status === 200) {

        this.setState({
          warning: res.data.message,
          color: "success",
          loaded: true
        })
        this.getNotVerified()

      } else {
        this.setState({ warning: res.data.message, color: 'warning' })
      }
    } else {
      return false
    }
  }

  setWarning() {
    const { warning } = this.state

    if (warning) {
      return (
        <div className="content">
          {warning && (
            <Alert bsStyle={this.state.color}>
              {/* <button type="button" aria-hidden="true" className="close"> 
                &#x2715;
                    </button>
                  */}
              <span>
                <b> {warning} </b>
              </span>
            </Alert>
          )}
        </div>
      )
    }
  }

  render() {
    const { loaded, users } = this.state
    if (!loaded) {
      return (
        <Grid fluid>
          <Row>
            {this.setWarning()}
            <Col md={12}>
              <SpinnerBS></SpinnerBS>
            </Col>
          </Row>
        </Grid>
      )
    } else {
      if (users.length > 0) {
        return (

          < div className="content" >
            {this.setWarning()}
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    title="Membros"
                    ctAllIcons
                    category="Aqui estão listados todos os membros não verificados"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                      <Table striped hover>
                        <thead>
                          <tr>
                            {thArray2.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.users.map((prop, key) => {
                            const { _id, name, email, phone, type } = prop
                            return (
                              <tr key={key}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{this.getType(type)}</td>
                                <td>
                                  <Row
                                    lg={2}
                                    md={3}
                                    sm={4}
                                    xs={6}
                                    className="font-icon-list"
                                  >
                                    <i className="pe-7s-close-circle" classID={_id} data-info={name} onClick={(e) => this.decline(e)} />
                                    <i className="pe-7s-add-user" classID={_id} data-info={name} onClick={(e) => this.accept(e)} />
                                  </Row>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div >
        )
      } else {
        return (
          <div className="content">
            <Grid fluid>
              {this.setWarning()}
              <Row>
                <Col md={12}>
                  <Alert bsStyle="info">
                    <span>Não há membros... </span>
                  </Alert>
                </Col>
              </Row>
            </Grid>
          </div>
        )
      }
    }
  }
}

export default AllNotActivatedMembers;
