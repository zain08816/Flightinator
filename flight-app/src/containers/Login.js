import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";
import axios from 'axios';
import Cookies from 'universal-cookie'
const { inspect } = require('util');

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        username: "",
        password: ""
    });
    const [isDone, setDone] = useState('');
    const cookies = new Cookies();

    function validateForm() {
        return fields.username.length > 0 && fields.password.length > 0;
    }

    function renderErrorForm() {
        return (
            <div>
                Login record not found.
            </div>
        );
    }

    async function handleSubmit(event) {
        setIsLoading(true);
        axios.post('/api/posts/login', {
            username: fields.username,
            password: fields.password
        })
        .then( res => {
            const error = res.data.error;
            if( error )
                setDone(`Error encountered: ${inspect(error)}`);
            else if( res.data.result < 1 )
                setDone('Login record not found.');
            else {
                try {
                    // await Auth.signIn(fields.email, fields.password);
                    cookies.set('username', fields.username, { path: '/'})
                    props.setUser(fields.username);
                    if(fields.username == 'admin') props.setAdmin(true);
                    props.userHasAuthenticated(true);
                    props.history.push("/");
                } catch (e) {
                    alert(e.message);
                }
            }
            setIsLoading(false);
        })
        .catch( err => {
            if( err ) console.log(`API Error: ${err}`);
        })

        event.preventDefault();

        // setIsLoading(true);

        // try {
        //     // await Auth.signIn(fields.email, fields.password);
        //     props.userHasAuthenticated(true);
        //     props.history.push("/");
        // } catch (e) {
        //     alert(e.message);
        //     setIsLoading(false);
        // }
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={fields.username}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
            </form>
        );
    }

    return (
        <div className="Login">
            {!isDone ? renderForm() : renderErrorForm()}
        </div>
    );
}