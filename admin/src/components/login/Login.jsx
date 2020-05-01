import React, { Component } from "react";
import api from "../../Server.js";
import { login } from "../auth";
import image from '../../assets/imgs/logo.png'
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            message: '',
            email: '',
            password: '',
        }
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = async (event) => {
        const { email, password } = this.state
        this.setState({ disabled: true, message: "Verificando..." })
        event.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await api.post('/user/admin/auth', JSON.stringify({ email, password }), config)
            .then(res => {

                if (res.status === 200) {
                    login(res.data.token)
                    this.props.history.push('/admin');
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.setState({ message: err.response.data.message })
                } else {
                    this.setState({ message: "Ocorreu um Erro. Tente novamente." })
                }
                console.log(err);
                return false
            }).finally(() => {
                this.setState({ disabled: false })
            });
    }

    render() {
        return (
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <a href="http://estagiointegrado.kinghost.net">
                            <i className="fa fa-arrow-left"></i>
                            Voltar
                        </a>
                        {this.state.message}
                        <form onSubmit={this.onSubmit}>
                            <h3>Login <img src={image} alt="logoEI" height="60px" /></h3>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Insira email" name="email" value={this.state.email} required onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Senha</label>
                                <input type="password" className="form-control" placeholder="Insira senha" name="password" value={this.state.password} required onChange={this.handleInputChange} />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block" disabled={this.state.disabled}>Enviar</button>
                            {/* <p className="forgot-password text-right"></p> */}
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

