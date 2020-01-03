import React, { Component } from "react";
import api from "../../Server.js";
import { login } from "../auth";
import image from '../../assets/imgs/logo.png'
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        //Set default message 
        this.state = {
            disabled: false,
            message: 'Carregando...',
            email: '',
            password: '',
            msg: '',
        }
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = async (event) => {
        console.log('enviou');

        this.setState({ disabled: true, msg: "Carregando..." })
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
                this.setState({ msg: "Ocorreu um Erro. Tente novamente." })
                console.log(err);

                // this.setState({ msg: "Ocorreu um Erro. Tente novamente." + err.response.data })
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
                        <form onSubmit={this.onSubmit}>
                            {/* {
                                this.state.msg && (
                                    <Alert bsStyle="warning">
                                        <span>
                                            <b> {this.state.msg} </b>
                                        </span>
                                    </Alert>
                                )
                            } */}
                            <h3>Login <img src={image} alt="logoEI" height="60px" /></h3>
                            {/* <h3>Login <Logo/></h3> */}

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Insira email" name="email" value={this.state.email} required onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Senha</label>
                                <input type="password" className="form-control" placeholder="Insira senha" name="password" value={this.state.password} required onChange={this.handleInputChange} />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block" disabled={this.state.disabled}>Enviar</button>
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

