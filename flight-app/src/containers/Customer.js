import React, { useState } from 'react';
import LoaderButton from "../components/LoaderButton";
import "./Customer.css";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
const { inspect } = require("util");

export default function Customer(props) {

    const [received, setReceived] = useState(false)
    const [action, setAction] = useState("");
    const [fields, handleFieldChange] = useFormFields({
        account_no: 0,
        name: "",
        email: "",
        phone_no: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        seat_preference: 0,
        meal_preference: ""
    })
    const [done, setDone] = useState("");

    function handleAdd(event) { setAction("add"); }
    function handleEdit(event) { setAction("edit"); }
    function handleDelete(event) { setAction("delete"); }
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
        axios.post('api/posts/customer_info', {
            action: action,
            account_no: fields.account_no,
            name: fields.name,
            email: fields.email,
            phone_no: fields.phone_no,
            address: fields.address,
            city: fields.city,
            state: fields.state,
            zip: fields.zip,
            seat_preference: fields.seat_preference,
            meal_preference: fields.meal_preference
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
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        autoFocus
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
                <FormGroup controlId="zip" bsSize="large">
                    <ControlLabel>ZIP Code</ControlLabel>
                    <FormControl
                        type="zip"
                        value={fields.zip}
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
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                >Add</LoaderButton>
            </form>
        )
    }

    function renderEdit() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="account_no" bsSize="large">
                    <ControlLabel>Account Number to Edit</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.account_no}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        autoFocus
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
                <FormGroup controlId="zip" bsSize="large">
                    <ControlLabel>ZIP Code</ControlLabel>
                    <FormControl
                        type="zip"
                        value={fields.zip}
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
                <FormGroup controlId="account_no" bsSize="large">
                    <ControlLabel>Account Number to Delete</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.account_no}
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

    function renderConfirmation() {
        return (
            <div>
                yes
            </div>
        );
    }

    return (
        <div>
            {
                received ? renderConfirmation() : 
                action ? renderAction(action) : 
                renderCustomer()
            }
        </div>
    );

}