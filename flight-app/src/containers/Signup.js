import React, { useState } from "react";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";
import axios from 'axios';
const { inspect } = require('util')

export default function Signup(props) {
    const [fields, handleFieldChange] = useFormFields({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [newUser, setNewUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmation, setConfirmation] = useState('Thanks for signing up!');

    function validateForm() {
        return (
            fields.username.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }


    async function handleSubmit(event) {

        // SQL stuff here
        axios.post('/api/posts/signup', {
            username: fields.username,
            password: fields.password
        })
        .then( res => {
            const error = res.data.error;
            setConfirmation( error
                ? `Couldn't make account! Error: ${error.code.startsWith('ER_DUP_ENTRY') ? 'Username taken.' : error.sqlMessage}` 
                : `Thanks for signing up! Your username is ${fields.username}.` );
        }).catch( err => {
            if( err ) console.log(`API Error: ${err}`);
        });

        event.preventDefault();

        setIsLoading(true);

        setNewUser("test");

        setIsLoading(false);
    }


    function renderConfirmationForm() {
        return (
            <div>
                {confirmation}
            </div>
        );
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
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
        </LoaderButton>
            </form>
        );
    }

    return (
        <div className="Signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}