import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "../plugins/fontawesome-free/css/all.min.css"
import "../plugins/icheck-bootstrap/icheck-bootstrap.min.css"

const authURL = `api/v1/auth/authenticate`

export function Login() {
    const [token, setToken] = useState(null)
    const [isInvalidCredentials, setInvalidCredentials] = useState(false)
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    function InvalidInputText() {
        return (
            <div className="invalid-feedback">
                <p>
                    Username and/or password didn't match
                </p>
            </div>
        );
    }

    const doLogin = ({userName, password}) => {
        axios
            .post(authURL, {
                email: userName,
                password: password
            })
            .then((response) => {
                setToken(response.data.token)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                setInvalidCredentials(true)
            })

    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('login clicked');
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        doLogin({userName, password});
    }

    return (
        <div className="hold-transition login-page">
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>AdminLTE 3 | Log in</title>
            {/* Google Font: Source Sans Pro */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
            />
            <div className="login-box">
                <div className="login-logo">
                    <a>
                        <b>Survey</b>King
                    </a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    ref={userNameRef}
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"/>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"/>
                                    </div>
                                </div>
                            </div>
                            {
                                isInvalidCredentials ? <InvalidInputText/> : null
                            }
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember"/>
                                        <label htmlFor="remember">Remember Me</label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Sign In
                                    </button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        {/* <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                            </a>
                        </div>*/}
                        {/* /.social-auth-links */}
                        {/*<p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>*/}
                        <p className="mb-0">
                            <a href="/register" className="text-center">
                                Register a new membership
                            </a>
                        </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>

    )
}