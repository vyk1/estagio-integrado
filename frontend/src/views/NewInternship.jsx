import React, { Component } from "react";
import {
  Alert,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from "variables/Server.js";
import SpinnerBS from "components/SpinnerBS";

class NewInternship extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      students: [],
      supervisors: [],
      advisors: [],
      warning: "",
    }
  }

  async componentDidMount() {
    console.log('montou');
    await this.getData()

  }
  async getData() {
    let response = await api.get('/users/1')
    var arrTen = [];
    if (response.data.length === 0) {
      arrTen.push(<option disabled key={null}>Não há Estudantes a Serem Associados à Estágios</option>)
      this.setState({
        warning: "Não há Estudantes a Serem Associados à Estágios",
        disabled: true,
        color: "danger"
      });

    } else {
      this.setState({ id_student: response.data[0]._id })
      for (let k = 0; k < response.data.length; k++) {
        arrTen.push(<option key={response.data[k]._id} value={response.data[k]._id}> {response.data[k].name} </option>);
      }
    }
    this.setState({
      students: arrTen,
    });

    response = await api.get('/users/2')
    arrTen = [];
    this.setState({ id_advisor: response.data[0]._id })
    for (let k = 0; k < response.data.length; k++) {
      arrTen.push(<option key={response.data[k]._id} value={response.data[k]._id}> {response.data[k].name} </option>);
    }
    this.setState({
      advisors: arrTen
    });
    response = await api.get('/users/3')
    arrTen = [];
    this.setState({ id_supervisor: response.data[0]._id })
    for (let k = 0; k < response.data.length; k++) {
      arrTen.push(<option key={response.data[k]._id} value={response.data[k]._id}> {response.data[k].name} </option>);
    }
    this.setState({
      supervisors: arrTen,
      loaded: true
    });
  }

  async handleChange(event) {
    const { value } = event.target;
    const classid = event.target.attributes[1].value;

    console.log(classid);
    console.log(value);

    await this.setState({
      [classid]: value
    });
  }
  async handleChangeTextInput(event) {
    await event.persist()

    const { value } = event.target;
    const classid = event.target.attributes[1].value;
    console.log(classid);
    console.log(value);
    await this.setState({
      [classid]: value
    });
  }

  async check(e) {
    e.preventDefault();
    console.log('====================================');
    await console.log(this.state);
    const { company, id_student, id_supervisor, id_advisor, description } = this.state
    const res = await api.post('/internship', { company, id_student, id_supervisor, id_advisor, description })
    if (res.status === 201) {
      console.log('====================================');
      console.log(res);
      // console.log('====================================');

      this.setState({
        warning: res.data.message,
        company: "",
        description: ""
      })
      this.getData();

    } else {
      this.setState({ warning: res.data.message })
    }
  }


  render() {

    if (!this.state.loaded) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <SpinnerBS />
              </Col>
            </Row>
          </Grid>
        </div>
      )
    } else {

      return (
        <div className="content">
          {
            this.state.warning && (
              <Alert bsStyle={this.state.color}>
                <button type="button" aria-hidden="true" className="close">
                  &#x2715;
                    </button>
                <span>
                  <b> {this.state.warning} </b>
                </span>
              </Alert>
            )
          }
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Cadastrar Novo Estágio"
                  content={
                    <form onSubmit={this.check.bind(this)}>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <ControlLabel>Nome da Empresa</ControlLabel>
                            <FormControl
                              classID="company"
                              required={true}
                              rows="1"
                              componentClass="textarea"
                              bsClass="form-control"
                              placeholder="Insira aqui o nome da Empresa"
                              onChange={async (e) => await this.setState({ company: e.target.value })}
                              value={this.state.company}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Estudante</ControlLabel>
                        <FormControl componentClass="select" placeholder="Estudante" classID="id_student" value={this.state.id_student} onChange={this.handleChange.bind(this)}>
                          {this.state.students}
                        </FormControl>
                      </FormGroup>

                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Orientador</ControlLabel>
                        <FormControl componentClass="select" placeholder="Orientador" classID="id_advisor" value={this.state.id_advisor} onChange={this.handleChange.bind(this)}>
                          {this.state.advisors}
                        </FormControl>

                      </FormGroup>
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Supervisor</ControlLabel>
                        <FormControl componentClass="select" placeholder="Supervisor" classID="id_supervisor" value={this.state.id_supervisor} onChange={this.handleChange.bind(this)}>
                          {this.state.supervisors}
                        </FormControl>
                      </FormGroup>

                      <Row>
                        <Col md={12}>
                          <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Descrição</ControlLabel>
                            <FormControl
                              classID="description"
                              required={true}
                              rows="4"
                              componentClass="textarea"
                              bsClass="form-control"
                              placeholder="Insira aqui uma breve descrição do estágio"
                              onChange={async (e) => await this.setState({ description: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button bsStyle="info" pullRight fill type="submit" disabled={this.state.disabled}>
                        Enviar
                    </Button>
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default NewInternship;
