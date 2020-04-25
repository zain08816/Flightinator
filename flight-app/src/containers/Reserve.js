import React, { useState } from 'react';
import LoaderButton from "../components/LoaderButton";
import "./Reserve.css";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Reserve(props) {


    const cookies = new Cookies();

    const [confirm, setConfirm] = useState(false);
    const [error_response, setError] = useState("");
    const [fields, handFieldChange] = useFormFields({
        user: cookies.get('username'),
        flight_num: 0,
        seats: 1
    });


    function handleSubmit() {

        axios.post('api/posts/reserve_flight', {
            user: fields.user,
            flight_num: fields.flight_num,
            seats: fields.seats
        }).then( res => {
            const error_rep = res.data.error;
            if (error_rep) {
                setError(error_rep.sqlMessage);
                setConfirm(true);
            } else {
                setConfirm(true);
            }
        }).catch( err => {
            if(err) console.log(`API Error: ${err}`);
        });

        setConfirm(true);
        
    }

    function validateForm() {
        return fields.flight_num != 0 && fields.flight_num > 0 && fields.seats > 0;
    }

    function validateSeats() {
        return fields.seats == 1;
    }

    
    

    function renderReserve() {
        

        return(
            <div className="Reserve">
                <h2 className="title">
                    Hey {fields.user}! You can reserve a flight here.
                </h2>
                <form onSubmit={handleSubmit}>
                    
                    <FormGroup controlId="flight_num" bsSize="sm">
                        <ControlLabel>Flight Number</ControlLabel>
                        <FormControl
                            type="number"
                            value={fields.flight_num}
                            onChange={handFieldChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="seats" bsSize="sm">
                        <ControlLabel>Seats to Book</ControlLabel>
                        <FormControl
                            type="number"
                            value={fields.seats}
                            onChange={handFieldChange}
                        />
                    </FormGroup>
                
                    <LoaderButton
                        block
                        type
                        bsSize="larger"
                        disabled={!validateForm()}
                        >Reserve {fields.seats} { validateSeats() ? "seat" : "seats"} on Flight Number {fields.flight_num}</LoaderButton>
                        
                </form>

                
            </div>
        );
    }

    function renderConfirm() {
        return(
            <div>
                {error_response ? `Sorry, but we cant process your request right now, please check back another time. ERROR:${error_response}` : 'Thanks for Reserving a flight with us!' }
            </div>
        );
    }



    return (
        <div>
            {confirm === false ? renderReserve() : renderConfirm()}
        </div>
    );
}

