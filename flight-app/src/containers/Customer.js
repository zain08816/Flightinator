import React, { useState } from 'react';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
const { inspect } = require("util");

export default function Customer(props) {
    const [username, setUsername] = useState("");
    const [action, setAction] = useState("");
    const [fields, handleFieldChange] = useFormFields({
        account_no: 1,
        username: "",
        password: "",
        name: "",
        email: "",
        phone_no: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        seat_preference: 0,
        meal_preference: "",
        total_revenue: 0
    })
    const [done, setDone] = useState("");

    function handleAdd(event) { 
        setAction("add"); 
    }
    function handleEdit(event) { 
        setAction("edit"); 
        changeFormValues(fields.account_no);
    }
    function handleDelete(event) { 
        setAction("delete"); 
    }
    function renderAction(action) {
        return (
            <div>
                <a href="/customer">&larr; Back</a>
                {
                    action === "add" ? renderAdd() :
                    action === "edit" ? renderEdit() :
                    action === "delete" ? renderDelete() :
                    renderNothing()
                }
            </div>
        )
    }

    async function handleSubmit(event) {
        const sendingUsername = fields.username && fields.username.length > 0 ? fields.username : username
        axios.post('/api/posts/customer_info', {
            action: action,
            account_no: fields.account_no,
            username: sendingUsername,
            name: fields.name,
            email: fields.email,
            phone_no: fields.phone_no,
            address: fields.address,
            city: fields.city,
            state: fields.state,
            zip_code: fields.zip_code,
            seat_preference: fields.seat_preference,
            meal_preference: fields.meal_preference,
            total_revenue: fields.total_revenue,
            username: fields.username,
            password: fields.password
        })
        .then( res => {
            const error = res.data.error;
            if( error ) setDone(`Error encountered: ${inspect(error)}`);
            else setDone('Information successfully updated!');
        })
        .catch( err => {
            if( err ) console.log(`API Error: ${err}`);
        })

        event.preventDefault();
    }

    function renderAdd() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="account_no" bsSize="large">
                    <ControlLabel>Account Number</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.account_no}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        
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
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        
                        type="name"
                        value={fields.name}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="phone_no" bsSize="large">
                    <ControlLabel>Phone Number</ControlLabel>
                    <FormControl
                        type="phone_no"
                        value={fields.phone_no}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="address" bsSize="large">
                    <ControlLabel>Address</ControlLabel>
                    <FormControl
                        type="address"
                        value={fields.address}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="city" bsSize="large">
                    <ControlLabel>City</ControlLabel>
                    <FormControl
                        type="city"
                        value={fields.city}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="state" bsSize="large">
                    <ControlLabel>State</ControlLabel>
                    <FormControl
                        type="state"
                        value={fields.state}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="zip_code" bsSize="large">
                    <ControlLabel>ZIP Code</ControlLabel>
                    <FormControl
                        type="zip"
                        value={fields.zip_code}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="seat_preference" bsSize="large">
                    <ControlLabel>Seat Preference</ControlLabel>
                    <FormControl
                        type="number"
                        value={fields.seat_preference}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="meal_preference" bsSize="large">
                    <ControlLabel>Meal Preference</ControlLabel>
                    <FormControl
                        type="meal_preference"
                        value={fields.meal_preference}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="total_revenue" bsSize="large">
                    <ControlLabel>Total Revenue</ControlLabel>
                    <FormControl
                        
                        type="number"
                        value={fields.total_revenue}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                >Add</LoaderButton>
            </form>
        )
    }

    async function usernameFieldChange(val) {
        const value = val.target.value;
        setUsername(value);
        // handle the field change
        handleFieldChange(val);
        // change the form values
        changeFormValues(value);
    }

    async function changeFormValues(username) {
        // get information for that user and fill the fields
        const res = await axios.post('/api/posts/customer_info', {
            action: 'get',
            username: username
        });
        if( res.data.error || res.data.result.length == 0 ) return;
        const result = res.data.result[0];
        for( const key in result ) {
            handleFieldChange({
                noReset: true,
                target: {
                    id: key,
                    value: result[key]
                }
            })
        }
    }

    function renderEdit() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Username to Edit</ControlLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={fields.username}
                        onChange={usernameFieldChange}
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
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        
                        type="name"
                        value={fields.name}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="phone_no" bsSize="large">
                    <ControlLabel>Phone Number</ControlLabel>
                    <FormControl
                        type="phone_no"
                        value={fields.phone_no}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="address" bsSize="large">
                    <ControlLabel>Address</ControlLabel>
                    <FormControl
                        type="address"
                        value={fields.address}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="city" bsSize="large">
                    <ControlLabel>City</ControlLabel>
                    <FormControl
                        type="city"
                        value={fields.city}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="state" bsSize="large">
                    <ControlLabel>State</ControlLabel>
                    <FormControl
                        type="state"
                        value={fields.state}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="zip_code" bsSize="large">
                    <ControlLabel>ZIP Code</ControlLabel>
                    <FormControl
                        type="zip"
                        value={fields.zip_code}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="seat_preference" bsSize="large">
                    <ControlLabel>Seat Preference</ControlLabel>
                    <FormControl
                        type="number"
                        value={fields.seat_preference}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="meal_preference" bsSize="large">
                    <ControlLabel>Meal Preference</ControlLabel>
                    <FormControl
                        type="meal_preference"
                        value={fields.meal_preference}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="total_revenue" bsSize="large">
                    <ControlLabel>Total Revenue</ControlLabel>
                    <FormControl
                        
                        type="number"
                        value={fields.total_revenue}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                >Edit</LoaderButton>
            </form>
        )
    }

    function renderDelete() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Username to Delete</ControlLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={fields.username}
                        onChange={handleFieldChange}
                    />
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                    >Delete</LoaderButton>
                </FormGroup>
            </form>
        )
    }

    function renderNothing() {return (<div></div>)}

    function renderCustomer() {
        return (
            <div>
                <br></br>
                <h3 align="center">What would you like to do with customer information?</h3>
                <form onSubmit={handleAdd}>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                    >Add</LoaderButton>
                </form>
                <form onSubmit={handleEdit}>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                    >Edit</LoaderButton>
                </form>
                <form onSubmit={handleDelete}>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                    >Delete</LoaderButton>
                </form>
            </div>
        );
    }

    return (
        <div>
            {
                action ? renderAction(action) : 
                renderCustomer()
            }
        </div>
    );

}