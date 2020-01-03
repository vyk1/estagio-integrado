import React, { Component } from 'react'
import Main from '../template/Main'
import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Footer from '../template/Footer'
import { getToken } from '../auth'
import api from '../../Server'
// import InputMask from "react-input-mask"

const headerProps = {
    icon: 'users',
    title: 'Todos os Membros',
    subtitle: 'Aqui estão listados todos os membros.'
}

const initialState = {
    list: [],
    message: 'Carregando'
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
            message: ""
        })
    }

    renderTable() {
        return (
            // <div >
            <div className="col-12">
                <p> <strong>{this.state.message}</strong></p>
                <table className="table-striped table mt-4" >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Fone</th>
                            <th>Tipo</th>
                            <th>Email Confirmado</th>
                            <th>Verificado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table >
            </div>
        )
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

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{this.getType(user.type)}</td>
                    <td>{user.emailConfirmed ? "Sim" : "Não"}</td>
                    <td>{user.verified ? "Sim" : "Ainda Não"}</td>
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
                    {this.renderTable()}
                </Main>
                <Footer />
            </div>
        )
    }
}