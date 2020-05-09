import React, { useState, useEffect } from 'react';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Cookies from 'universal-cookie';


const { inspect } = require("util");


export default function Profile(props){

    const cookies = new Cookies();


    const [fields, handleFieldChange] = useFormFields({
        account_no: 1,
        name: "",
        email: "",
        phone_no: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        seat_preference: 0,
        meal_preference: ""
    })
    const [done, setDone] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [username, setUsername] = useState(cookies.get('username'));

    useEffect(() => {
        changeFormValues()
    }, []);




    async function changeFormValues() {
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


    async function handleSubmit(event) {
        // const sendingUsername = fields.username && fields.username.length > 0 ? fields.username : username
        axios.post('/api/posts/customer_info', {
            action: "edit",
            account_no: fields.account_no,
            username: username,
            name: fields.name,
            email: fields.email,
            phone_no: fields.phone_no,
            address: fields.address,
            city: fields.city,
            state: fields.state,
            zip_code: fields.zip_code,
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
        setConfirm(true);
    }

    function renderConfirm () {
        return (
            <div>
                { done }
            </div>
        )
    }


    async function usernameFieldChange(val) {
        const value = val.target.value;
        setUsername(value);
        // handle the field change
        handleFieldChange(val);
        // change the form values
        changeFormValues(username);
    }




    function renderEdit() {

        return (
            <form onSubmit={handleSubmit}>
                {/* <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Username to Edit</ControlLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={fields.username}
                        onChange={usernameFieldChange}
                    />
                </FormGroup> */}
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
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                >Edit</LoaderButton>
            </form>
        )
    }


    return (
        <div>
            {
                confirm ? renderConfirm() : renderEdit() 
            }
        </div>

    )



}