import { Component } from "react";
import { ReactSession } from 'react-client-session';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import "./../assets/css/login.css"


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            status: null,
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.eventoSubmit = this.eventoSubmit.bind(this);
    }

    changeEmail(e) {
        this.setState({ email: e.target.value, status: null });
    }

    changePassword(e) {
        this.setState({ password: e.target.value, status: null });
    }

    eventoSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:4100/api/login/auth", { log_correo: this.state.email, log_contra: this.state.password, })
            .then(res => {
                let datos = res.data;
                if (datos.length > 0) {
                    this.setState({ status: true });
                    ReactSession.set("user", JSON.stringify(datos));
                } else {
                    this.setState({ status: false });
                }
            });
    }

    render() {
        if (this.state.status === true || ReactSession.get("user") !== "null") {
            return <Navigate to="/home" />;
        }
        return (
            <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img src="https://firebasestorage.googleapis.com/v0/b/opticaab-34b8f.appspot.com/o/tesis%2FOPTICA.png?alt=media&token=a4640a57-7bd3-48ea-895f-ca2d909b155d" style={{ width: "185px" }} alt="Logo" />
                                                <h4 className="mt-1 mb-5 pb-1">Optica</h4>
                                            </div>
                                            <form onSubmit={this.eventoSubmit}>
                                                <p>Por favor, ingrese su cuenta</p>
                                                <div className="form-outline mb-4">
                                                    <input type="email" value={this.state.email} onChange={this.changeEmail} className="form-control" placeholder="Correo electrónico" />
                                                    <label className="form-label" htmlFor="form2Example11">Correo</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="password" value={this.state.password} onChange={this.changePassword} className="form-control" />
                                                    <label className="form-label" htmlFor="form2Example22">Contraseña</label>
                                                </div>
                                                {
                                                    this.state.status === false &&
                                                    <div className="alert alert-danger text-center" role="alert">
                                                        <strong>USUARIO O CONTRASEÑA INCORRECTO</strong>
                                                    </div>
                                                }
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button className="btn btn-primary btn-block fa-lg mb-3" type="submit">Iniciar Sesión</button>
                                                    <br />

                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">Bienvenido al sistema de la Optica "AB"</h4>
                                            <p className="small mb-0">Ingrese sus credenciales brindadas por el administrador para entrar al sistema.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;