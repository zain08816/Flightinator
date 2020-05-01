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
        group: ""
    });


    function handleSubmit() {

        const seats = fields.group ? fields.group.split(",").length+1 : 1;

        axios.post('api/posts/get_flight', {
            flight_num: fields.flight_num,
            seats: seats
        }).then(res => {
            if (res.data.error) {
                setError(res.data.error.sqlMessage);
                console.log(error_response);
                setConfirm(true);
                return;
            } else {
                console.log(res.data.result[0].price);
                

                axios.post('api/posts/reserve_flight', {
                    fare : res.data.result[0].price*seats,
                    booker: fields.user,
                    flight_num: fields.flight_num,
                    seats: seats,
                    group: fields.group+`,${fields.user}`
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
                    return;
                });


            }
        }).catch (err => {
            if (err) console.log(`API ERROR: ${err}`);
            return;
        })

    
        

        // axios.post('api/posts/reserve_flight', {
        //     fare : fare*seats,
        //     user: fields.user,
        //     flight_num: fields.flight_num,
        //     seats: seats,
        //     group: fields.group
        // }).then( res => {
        //     const error_rep = res.data.error;
        //     if (error_rep) {
        //         setError(error_rep.sqlMessage);
        //         setConfirm(true);
        //     } else {
        //         setConfirm(true);
        //     }
        // }).catch( err => {
        //     if(err) console.log(`API Error: ${err}`);
        // });

        setConfirm(true);

        return;
        
    }

    function validateForm() {
        return fields.flight_num != 0 && fields.flight_num > 0 && fields.group.split(",").length > 0;
    }

    function validateSeats() {
        return fields.group.split(",").length == 1;
    }

    function validateSeatsA() {
        return fields.group == "";
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
                    {/* <FormGroup controlId="seats" bsSize="sm">
                        <ControlLabel>Passenger Ammount</ControlLabel>
                        <FormControl
                            type="number"
                            value={fields.seats}
                            onChange={handFieldChange}
                        />
                    </FormGroup> */}
                    <FormGroup controlId="group" bsSize="sm">
                        <ControlLabel>Booking for more than youself? Put the usernames of the others (seperated by commas)</ControlLabel>
                        <FormControl
                            type="text"
                            value={fields.group}
                            onChange={handFieldChange}
                        />
                    </FormGroup>
                
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="larger"
                        disabled={!validateForm()}
                        >Reserve {validateSeatsA() ? 1 : fields.group.split(",").length+1} { validateSeats()&&validateSeatsA() ? "seat" : "seats"} on Flight Number {fields.flight_num}</LoaderButton>
                        
                </form>

                
            </div>
        );
    }

    function renderConfirm() {
        return(
            <div>
                {error_response ? `Sorry, but we cant process your request right now, please check back another time. ERROR: ${error_response}` : 'Thanks for Reserving a flight with us!' }
            </div>
        );
    }



    return (
        <div>
            {confirm === false ? renderReserve() : renderConfirm()}
        </div>
    );
}

