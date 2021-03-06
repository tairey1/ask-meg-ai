import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './LogInModal.scss';
import fire from '../../../config/Fire';
import Endpoint from '../../../config/Endpoint';

function LogInModal(props) {
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        errormsg = useRef(),
        emailbox = useRef(),
        passwordbox = useRef();

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const validateLogin = () => {
        fire.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                if (!res) {
                    errormsg.current.style.display = 'block';
                    emailbox.current.style.borderColor = 'red';
                    passwordbox.current.style.borderColor = 'red';
                    return false;
                }
                else {
                    res.user.getIdToken(true)
                        .then(idToken => {
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: idToken
                        };
                        fetch(Endpoint + 'user/', requestOptions)
                            .then(res => res.json())
                            .then(user => {
                                user.username = user.blogname;
                                props.setLogin(user);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        })
                }
            })
            .catch(err => {
                errormsg.current.style.display = 'block';
                emailbox.current.style.borderColor = 'red';
                passwordbox.current.style.borderColor = 'red';
                return false;
            });
    }

    const clearErrors = () => {
        errormsg.current.style.display = 'none';
        emailbox.current.style.borderColor = 'grey';
        passwordbox.current.style.borderColor = 'grey';
    }

    return (
        <span id="log-in-modal">
            <button id="log-in" className='link' onClick={props.showLogin}>
                Login
            </button>

            <Modal show={props.loginModal} onHide={props.closeLogin}>
                <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className='error-msg' ref={errormsg}>
                        Username or Password is not correct
                    </span>
                    <span ref={emailbox} className='account-input'>
                        <input value={email} placeholder="Email" onChange={onEmailChange}
                            onFocus={clearErrors}/>
                    </span>
                    <br/>
                    <span ref={passwordbox} className='account-input'>
                        <input value={password} placeholder="Password" type="password" 
                            onChange={onPasswordChange} onFocus={clearErrors}/>
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    Don't Have an Account?
                    <button className='link' onClick={props.handleRegister}>
                        Register
                    </button>
                    <br/>
                    <Button variant="primary" onClick={validateLogin}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
}

export default LogInModal