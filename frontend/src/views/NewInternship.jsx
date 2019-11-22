import React, { Component } from "react";
import {
  Alert,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from "variables/Server.js";

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
      arrTen.push(<option disabled>Não há Estudantes a Serem Associados à Estágios</option>)
    } else {
      this.setState({ student_id: response.data[0]._id })
      for (let k = 0; k < response.data.length; k++) {
        arrTen.push(<option key={response.data[k]._id} value={response.data[k]._id}> {response.data[k].name} </option>);
      }
    }
    this.setState({
      students: arrTen
    });

    response = await api.get('/users/2')
    arrTen = [];
    this.setState({ advisor_id: response.data[0]._id })
    for (let k = 0; k < response.data.length; k++) {
      arrTen.push(<option key={response.data[k]._id} value={response.data[k]._id}> {response.data[k].name} </option>);
    }
    this.setState({
      advisors: arrTen
    });
    response = await api.get('/users/3')
    arrTen = [];
    this.setState({ supervisor_id: response.data[0]._id })
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
    const { company, student_id, supervisor_id, advisor_id, description } = this.state
    const res = await api.post('/internship', { company, student_id, supervisor_id, advisor_id, description })
    if (res.status === 201) {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      this.setState({
        warning: res.data.message, 
        company: "",
        student_id: "",
        advisor_id: "",
        supervisor_id: "",
        description: ""
      })
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
                <Card content="Carregando..."></Card>
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
              <Alert bsStyle="info">
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
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Estudante</ControlLabel>
                        <FormControl componentClass="select" placeholder="Estudante" classID="student_id" onChange={this.handleChange.bind(this)}>
                          {this.state.students}
                        </FormControl>
                      </FormGroup>

                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Orientador</ControlLabel>
                        <FormControl componentClass="select" placeholder="Orientador" classID="advisor_id" onChange={this.handleChange.bind(this)}>
                          {this.state.advisors}
                        </FormControl>

                      </FormGroup>
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Supervisor</ControlLabel>
                        <FormControl componentClass="select" placeholder="Supervisor" classID="supervisor_id" onChange={this.handleChange.bind(this)}>
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
                      <Button bsStyle="info" pullRight fill type="submit">
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
