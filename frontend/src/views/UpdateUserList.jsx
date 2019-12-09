import React, { Component } from "react";
import {
    Alert,
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl,
    Table,
    Button
} from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import api from "variables/Server.js";
import { getToken } from "components/auth";
import InputMask from "react-input-mask"

class UpdateUserList extends Component {

    state = {
        form: [],
        id: "",
        users: [],
        status: "",
        loaded: false
    }

    async componentDidMount() {
        await this.getUsers()
    }

    async check(e) {
        e.preventDefault();
        // alert('Validar e-mail: regex!')
        let token = await getToken()

        const { name, email, phone, _id } = this.state.form.user

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        const res = await api.put('/user', { name, email, phone, _id }, config)
        console.log(res);

        if (res.status === 200) {

            this.setState({
                warning: res.data.message,
                color: 'info'
            })


        } else {
            this.setState({
                warning: res.data.message,
                color: 'danger'
            })
        }
    }

    async getUsers() {
        let token = await getToken()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        const response = await api.get('/users', config)

        this.setState({
            users: response.data,
            status: response.status,
            loaded: true
        })
    }

    async createForm(e) {
        await e.persist()
        const classid = e.target.attributes[1].value;
        this.setState({ id: classid, loaded: false })
        // const name = e.target.attributes[2].value

        let token = await getToken()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        const response = await api.get(`/user/${classid}`, config)
        this.setState({
            form: response.data,
            status: response.status,
            loaded: true
        })
        // console.log(response);

    }
    render() {
        const { loaded, users, form, id } = this.state

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
            // if (form.length > 0) {
            if (id) {
                // console.log(form);
                return (
                    <div className="content">
                        {
                            this.state.warning && (
                                <Alert bsStyle={this.state.color}>
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
                                        title="Atualizar Membro"
                                        ctAllIcons
                                        content={
                                            <div>
                                                <Col
                                                    lg={2}
                                                    md={3}
                                                    sm={4}
                                                    xs={6}
                                                    className="font-icon-list"
                                                >

                                                    <i className="pe-7s-left-arrow" onClick={() => [this.setState({ id: null }), this.getUsers()]} />
                                                </Col>
                                                <form onSubmit={this.check.bind(this)}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <FormGroup>
                                                                <ControlLabel>Nome</ControlLabel>
                                                                <FormControl
                                                                    classID="name"
                                                                    required={true}
                                                                    rows="1"
                                                                    componentClass="textarea"
                                                                    bsClass="form-control"
                                                                    placeholder="Nome do Usuário"
                                                                    onChange={async (e) => await this.setState({ form: { user: { name: e.target.value } } })}
                                                                    value={this.state.form.user.name}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={12}>
                                                            <FormGroup>
                                                                <ControlLabel>Telefone</ControlLabel>
                                                                <InputMask mask="(99) 99999-9999"
                                                                    style={{ borderColor: 'black' }}
                                                                    value={this.state.form.user.phone}
                                                                    onChange={async (e) => await this.setState({ form: { user: { phone: e.target.value } } })}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={12}>
                                                            <FormGroup>
                                                                <ControlLabel>E-mail</ControlLabel>
                                                                <FormControl
                                                                    classID="email"
                                                                    required={true}
                                                                    rows="1"
                                                                    componentClass="textarea"
                                                                    bsClass="form-control"
                                                                    placeholder="E-mail do Usuário"
                                                                    onChange={async (e) => await this.setState({ form: { user: { email: e.target.value } } })}
                                                                    value={this.state.form.user.email}
                                                                    type="email"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Button bsStyle="info" fill="true" type="submit">
                                                        Enviar
                                                </Button>
                                                    <div className="clearfix" />
                                                </form>
                                            </div>
                                        }
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </div>

                )
                // }
            }
            if (users.length > 0) {
                return (
                    <div className="content">
                        <Grid fluid>
                            <Row>
                                <Col md={12}>
                                    <Card
                                        title="Membros"
                                        category="Aqui estão listados todos os membros"
                                        ctTableFullWidth
                                        ctAllIcons
                                        ctTableResponsive
                                        content={
                                            <Table striped hover>
                                                <thead>
                                                    <tr>
                                                        <th key={1}>Nome</th>
                                                        <th key={2}>Email</th>
                                                        <th key={3}>Editar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.users.map((prop, key) => {
                                                        const { _id, name, email } = prop

                                                        return (
                                                            <tr key={key}>
                                                                <td>{name}</td>
                                                                <td>{email}</td>
                                                                <td>
                                                                    <Col
                                                                        lg={2}
                                                                        md={3}
                                                                        sm={4}
                                                                        xs={6}
                                                                        className="font-icon-list"
                                                                    >

                                                                        <i className="pe-7s-right-arrow" classID={_id} data-info={name} onClick={(e) => this.createForm(e)} />
                                                                    </Col>
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

export default UpdateUserList;
