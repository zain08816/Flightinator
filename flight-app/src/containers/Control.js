import React, { useState } from "react";
import "./Control.css";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel,
    Form,
    Button,
    Radio
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";

export default function Search(props) {


    const [fields, handleFieldChange] = useFormFields({
        departure: "",
        arrival: "",
        trip_type: ""
    });
    const [recieved, setRecieved] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault()
    
        setRecieved(true);
    }

    function renderResults() {
        return (
            <div>
                Render Search here
            </div>
        );
    }


    function renderSearch() {

        return (
            <div className="fs-container">
                <Form onSubmit={handleSubmit} className="Control">
                <h2 className="title">
                    Search Flights Here {props.user}
                </h2>
                <Form inline>
                    <FormGroup controlId="formControlsSelect">
                        {/* <ControlLabel>Departure</ControlLabel> */}
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="Origin"
                            value={fields.departure}
                            onChange={handleFieldChange}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        {/* <ControlLabel>Arrival</ControlLabel> */}
                        <FormControl
                            type="text"
                            placeholder="Destination"
                            value={fields.arrival}
                            onChange={handleFieldChange}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        {/* <ControlLabel>Trip Type</ControlLabel> */}
                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            value={fields.arrival}
                            onChange={handleFieldChange}>
                            <option value="one">One Way</option>
                            <option value="round">Round Trip</option>
                            <option value="both">All</option>
                        </FormControl>
                    </FormGroup>
                        

                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        isLoading={false}
                    >
                        Search
                    </LoaderButton>
                </Form>

            </Form>

            </div>
            
        );

    }

    return (
        <div className="Search">
            {recieved === false ? renderSearch() : renderResults()}
        </div>
    );


}