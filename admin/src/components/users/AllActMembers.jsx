import React, { Component } from 'react'
import Main from '../template/Main'
import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Footer from '../template/Footer'
import { getToken } from '../auth'
import api from '../../Server'
import '../template/Tables.css'

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
            <div>
                <p><strong>{this.state.message}</strong></p>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Fone</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">E-Confirmado</th>
                            <th scope="col">Verificado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
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
                    <td data-label="Nome">{user.name}</td>
                    <td data-label="E-mail">{user.email}</td>
                    <td data-label="Fone">{user.phone}</td>
                    <td data-label="Tipo">{this.getType(user.type)}</td>
                    <td data-label="E-Confirmado">{user.emailConfirmed ? "Sim" : "Não"}</td>
                    <td data-label="Verificado">{user.verified ? "Sim" : "Ainda Não"}</td>
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