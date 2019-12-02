import React, { Component } from "react";
import { Grid, Row, Col, Table, Alert } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray } from "variables/Variables.jsx";
import api from "variables/Server.js";
import { getToken } from "components/auth";

class AllActivatedMembers extends Component {

  state = {
    users: [],
    status: "",
    loaded: false
  }

  async componentDidMount() {
    console.log('montou');

    let token = await getToken()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }

    const response = await api.get('/users', config)
    console.log(response);

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

  separaDate(ISODate) {
    let date = ISODate.split("T")[0]
    let time = ISODate.split("T")[1]

    return `${date}-${time.slice(0, 8)}`

    // return moment(ISODate).format("DD-MM-YYYY hh:mm:ss")
  }
  render() {
    const { loaded, users } = this.state

    if (!loaded) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card content="Carregando..." legend="Espere..."></Card>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    } else {
      if (users.length > 0) {
        return (
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    title="Membros"
                    category="Aqui estão listados todos os membros pendentes ou não"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                      <Table striped hover>
                        <thead>
                          <tr>
                            {thArray.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.users.map((prop, key) => {
                            return (
                              <tr key={key}>
                                <td>{prop.name}</td>
                                <td>{prop.email}</td>
                                <td>{prop.phone}</td>
                                <td>{this.getType(prop.type)}</td>
                                <td>{prop.emailConfirmed ? "Sim" : "Não"}</td>
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
          </div>
        );
      } else {
        return (
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Alert bsStyle="info">
                    <span>Ainda não há membros... </span>
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

export default AllActivatedMembers;
