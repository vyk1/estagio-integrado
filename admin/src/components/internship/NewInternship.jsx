import React, { Component } from 'react'
import Main from '../template/Main'
import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Footer from '../template/Footer'
import { getToken } from '../auth'
import api from '../../Server'

const headerProps = {
    icon: 'plus-circle',
    title: 'Novo Estágio',
    subtitle: 'Preencha o formulário para completar a operação.'
}

const initialState = {
    company: "", description: ""
}

export default class NewInternship extends Component {

    state = { ...initialState }

    async componentDidMount() {
        await this.getData()
    }

    async getData() {
        let token = getToken()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        let response = await api.get('/users/1', config)
        var arrTen = [];
        if (response.data.length === 0) {
            arrTen.push(<option disabled key={null}>Não há Estudantes a Serem Associados à Estágios</option>)
            this.setState({
                message: "Não há Estudantes a Serem Associados à Estágios",
                disabled: true,
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

        response = await api.get('/users/2', config)
        arrTen = [];
        if (response.data.length === 0) {
            arrTen.push(<option disabled key={null}>Não há Orientadores a Serem Associados à Estágios</option>)
            this.setState({
                message: "Não há Orientadores a Serem Associados à Estágios",
                disabled: true,
            });
        } else {
            this.setState({ id_advisor: response.data[0]._id })
            for (let k = 0; k < response.data.length; k++) {
                arrTen.push(<option key={response.data[k]._id} value={response.data[k]._id}> {response.data[k].name} </option>);
            }
        }
        this.setState({
            advisors: arrTen
        });

        response = await api.get('/users/3', config)
        arrTen = [];
        if (response.data.length === 0) {
            arrTen.push(<option disabled key={null}>Não há Supervisores a Serem Associados à Estágios</option>)
            this.setState({
                message: "Não há Supervisores a Serem Associados à Estágios",
                disabled: true,
            });
        } else {
            this.setState({ id_supervisor: response.data[0]._id })
            for (let k = 0; k < response.data.length; k++) {
                arrTen.push(<option key={response.data[k]._id} value={response.data[k]._id}> {response.data[k].name} </option>);
            }
        }
        this.setState({
            supervisors: arrTen,
            loaded: true
        })
    }

    async handleChange(event) {
        const { value } = event.target;
        const classid = event.target.attributes[1].value;

        this.setState({
            [classid]: value
        });
    }

    clear() {
        this.setState(initialState)
    }

    async save() {
        const { company, id_student, id_supervisor, id_advisor, description } = this.state

        let token = getToken()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }
        const res = await api.post('/internship', { company, id_student, id_supervisor, id_advisor, description }, config)
        if (res.status === 201) {

            this.setState({
                message: res.data.message,
                company: "",
                description: "",
            })
            this.getData();

        } else {
            this.setState({
                message: res.data.message,
            })
        }
    }

    async check(e) {
        e.preventDefault();

        const { company, id_student, description } = this.state
        if (!(company || description || id_student)) {
            this.setState({ message: "Por favor, preencha o completamente formulário." })
            return false
        }
        this.save()



    }

    renderForm() {
        if (this.state.loaded) {
            return (
                <div className="form">
                    <form onSubmit={this.check.bind(this)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Nome da Empresa</label>
                                    <input type="text" className="form-control"
                                        name="company"
                                        id="company"
                                        required
                                        value={this.state.company}
                                        onChange={e => this.setState({ company: e.target.value })}
                                        placeholder="Digite o nome da empresa..." />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <label>Estudante</label>
                                    <select id="id_student" className="form-control" onChange={this.handleChange.bind(this)}>
                                        {this.state.students}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Orientador</label>
                                    <select id="id_supervisor" className="form-control" onChange={this.handleChange.bind(this)}>
                                        {this.state.supervisors}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Supervisor</label>
                                    <select id="id_advisor" className="form-control" onChange={this.handleChange.bind(this)}>
                                        {this.state.advisors}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Descrição</label>
                                    <textarea placeholder="Uma breve descrição..." required name="description" id="description" cols="30" rows="10" className="form-control" onChange={e => this.setState({ description: e.target.value })} value={this.state.description}></textarea>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 d-flex justify-content-end">
                                    <button className="btn btn-primary" disabled={this.state.disabled}>
                                        Salvar
                                    </button>

                                    <button className="btn btn-secondary ml-2"
                                        onClick={e => this.clear(e)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <p>Carregando...</p>
            )
        }
    }


    load(user) {
        this.setState({ user, message: "" })
    }

    render() {
        return (
            <div className="app">
                <Logo />
                <Nav />
                <Main {...headerProps}>
                    {this.state.message ? (
                        <p> <strong>{this.state.message}</strong></p>
                    ) : ""}
                    {this.renderForm()}
                </Main>
                <Footer />
            </div>
        )
    }
}