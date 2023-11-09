/*
import "../plugins/fontawesome-free/css/all.min.css"
import "../plugins/icheck-bootstrap/icheck-bootstrap.min.css"
import React, {useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const registerURL = `api/v1/auth/register`

export function Register() {
    const fullNameRef = useRef(null);
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const retypePasswordRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const navigate = useNavigate();

    function InvalidInputText() {
        return (
            <div className="invalid-feedback">
                <p>
                    {errorMessage}
                </p>
            </div>
        );
    }

    const doRegister = ({fullName, userName, password}) => {
        axios
            .post(registerURL, {
                name: fullName,
                email: userName,
                password: password
            })
            .then((response) => {
                if (response.data) {
                    navigate('/login');
                } else {
                    setErrorMessage("Registration failed,please give valid information");
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const isValidInput = ({fullName, userName, password, retypePassword}) => {
        if (fullName === "" || userName === "" || password === "" || retypePassword === "") {
            setErrorMessage("Please enter valid information")
            return false;
        } else if (password !== retypePassword) {
            setErrorMessage("Passwords don't match, please re enter password")
            return false;
        } else if (termsAgreed === false) {
            setErrorMessage("Agree terms to continue")
            return false;
        } else {
            return true;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('register clicked');
        const fullName = fullNameRef.current.value;
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        const retypePassword = retypePasswordRef.current.value;
        if (isValidInput({fullName, userName, password, retypePassword})) {
            doRegister({fullName, userName, password});
        }
    }

    const onClick = (e) => {
        e.preventDefault();
        console.log('Terms agreed clicked');
        setTermsAgreed(!termsAgreed);
    }

    return (
        <div className="hold-transition register-page">
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>AdminLTE 3 | Registration Page</title>
            {/!* Google Font: Source Sans Pro *!/}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
            />

            <div className="register-box">
                <div className="register-logo">
                    <a>
                        <b>Admin</b>LTE
                    </a>
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Register a new membership</p>
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    ref={fullNameRef}
                                    type="text"
                                    className="form-control"
                                    placeholder="Full name"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"/>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    ref={userNameRef}
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"/>
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
                            <div className="input-group mb-3">
                                <input
                                    ref={retypePasswordRef}
                                    type="password"
                                    className="form-control"
                                    placeholder="Retype password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"/>
                                    </div>
                                </div>
                            </div>
                            {
                                errorMessage ? <InvalidInputText/> : null
                            }
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input
                                            type="checkbox"
                                            id="agreeTerms"
                                            name="terms"
                                            defaultValue="agree"
                                            onInput={onClick}
                                        />
                                        <label htmlFor="agreeTerms">
                                            I agree to the <a href="#">terms</a>
                                        </label>
                                    </div>
                                </div>
                                {/!* /.col *!/}
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Register
                                    </button>
                                </div>
                                {/!* /.col *!/}
                            </div>
                        </form>
                        {/!*<div className="social-auth-links text-center">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2" />
                                Sign up using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2" />
                                Sign up using Google+
                            </a>
                        </div>*!/}
                        <a href="/login" className="text-center">
                            I already have a membership
                        </a>
                    </div>
                    {/!* /.form-box *!/}
                </div>
                {/!* /.card *!/}
            </div>
        </div>
    )
}*/
