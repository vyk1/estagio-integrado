import React, { Component } from 'react'
import Main from '../template/Main'
import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Footer from '../template/Footer'
import { getToken } from '../auth'
import api from '../../Server'
import InputMask from "react-input-mask"
import '../template/Tables.css'

const headerProps = {
    icon: 'edit',
    title: 'Edição de Membro',
    subtitle: 'Clique no botão de edição para começar.'
}

const initialState = {
    user: { name: '', email: '', phone: '', _id: '' },
    list: [],
}

export default class UserCrud extends Component {

    state = { ...initialState }

    async componentWillMount() {
        this.getUser()
    }

    async getUser() {
        let token = getToken()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        const response = await api.get('/users', config)

        this.setState({
            list: response.data,
            status: response.status,
            loaded: true
        })
    }
    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        let token = getToken()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        const user = this.state.user
        const url = '/user'
        api['put'](url, user, config)
            .then(resp => {
                this.setState({ message: resp.data.message, user: initialState.user })
                this.getUser()
            })
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        if (this.state.user._id) {
            return (
                <div className="form">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control"
                                    name="name"
                                    required
                                    value={this.state.user.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o nome..." />
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group">
                                <label>E-mail</label>
                                <input type="text" className="form-control"
                                    name="email"
                                    required
                                    value={this.state.user.email}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o e-mail..." />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Telefone</label>
                                <InputMask mask="(99) 99999-9999"
                                    className="form-control"
                                    placeholder="Digite o telefone..."
                                    name="phone"
                                    required
                                    value={this.state.user.phone}
                                    onChange={e => this.updateField(e)}
                                />
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary"
                                onClick={e => this.save(e)}>
                                Salvar
                        </button>

                            <button className="btn btn-secondary ml-2"
                                onClick={e => this.clear(e)}>
                                Cancelar
                        </button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    load(user) {
        this.setState({ user, message: "" })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user._id}>
                    <td data-label="Nome">{user.name}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Editar">
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            )
        })
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
                    {this.renderTable()}
                </Main>
                <Footer />
            </div>
        )
    }
}