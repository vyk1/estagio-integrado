import React, { Component } from "react";
import api from "variables/Server.js";
import image from "assets/img/logo1.png";
import { login } from "components/auth";
import './Login.css';
import {
    Alert
} from "react-bootstrap"
export default class Login extends Component {
    constructor(props) {
        super(props);
        //Set default message
        this.state = {
            message: 'Carregando...',
            email: 'checagem.sistemas@gmail.com',
            password: '12345678',
            error: '',
        }
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await api.post('/user/admin/auth', JSON.stringify(this.state), config)
            .then(res => {
                if (res.status === 200) {
                    login(res.data.token)

                    this.props.history.push('/admin/membros');

                } else {

                    return false
                }
            })
            .catch(err => {
                this.setState({ error: "Erro: " + err.response.data.message })
                return false
            });
    }

    render() {
        return (
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.onSubmit}>
                            {
                                this.state.error && (
                                    <Alert bsStyle="warning">
                                        <span>
                                            <b> {this.state.error} </b>
                                        </span>
                                    </Alert>
                                )
                            }
                            <h3>Login <img src={image} alt="logoEI" height="60px" /></h3>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Insira email" name="email" value={this.state.email} required onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Senha</label>
                                <input type="password" className="form-control" placeholder="Insira senha" name="password" value={this.state.password} required onChange={this.handleInputChange} />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Enviar</button>
                            <p className="forgot-password text-right">
                                {/* Esqueceu sua <a href="/forgot">Senha?</a> */}
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

