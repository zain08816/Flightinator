import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';

export default function Login(props) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [allUsers, setAllUsers] = useState("")

    function validateForm() {
        return user.length > 2 && password.length > 2;
    }

    function handleSubmit(event) {
        event.preventDefault();

        useEffect(() => {
            axios.get('/api/hello')
                .then(res => setAllUsers(res.data))
        }, [])

        props.userHasAuthenticated(true);

    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
        </Button>
            </form>
        </div>
    );
}