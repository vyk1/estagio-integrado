import React, { Component } from "react";
import api from "variables/Server.js";
import image from "assets/img/logo1.png";
import { login } from "components/auth";
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        //Set default message
        this.state = {
            message: 'Loading...',
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

        // checar se quem loga é admin
        // console.log(config);

        await api.post('/user/admin/auth', JSON.stringify(this.state), config)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log('passou');
                    // return <Redirect to="/admin" />;
                    login(res.data.token)

                    this.props.history.push('/admin/membros');

                } else {
                    console.log(res)
                    // this.setState({ error: "Erro: " + res.response.data.message })

                    console.log('não passou');
                    return false
                    // throw error;
                }
            })
            .catch(err => {
                console.log(err.response.data.message);
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
                            <span style={{ color: 'red' }}>{this.state.error}</span>
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
                                Esqueceu sua <a href="/forgot">Senha?</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

