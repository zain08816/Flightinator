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
        max_price: null,
        min_price: null,
        departure: "",
        arrival: "",
        trip_type: ""
    });
    const [recieved, setRecieved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        setRecieved(true);

        setIsLoading(false);
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
            <Form onSubmit={handleSubmit} className="Control">
                <h2 className="title">
                    Search Flights Here
                </h2>
                <Form inline>
                    <FormGroup controlId="number" bsSize="sm">
                        <FormControl
                            autoFocus
                            type="decimal"
                            placeholder="Max Price"
                            value={fields.max_price}
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="number" bsSize="sm">
                        <FormControl
                            type="decimal"
                            placeholder="Min Price"
                            value={fields.min_price}
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Departure</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            value={fields.departure}
                            onChange={handleFieldChange}>
                            <option value="A1">Airport1</option>
                            <option value="A2">Airport2</option>
                            <option value="A3">Airport3</option>
                            <option value="A4">Airport4</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Arrival</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            value={fields.arrival}
                            onChange={handleFieldChange}>
                            <option value="A1">Airport1</option>
                            <option value="A2">Airport2</option>
                            <option value="A3">Airport3</option>
                            <option value="A4">Airport4</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Trip Type</ControlLabel>
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
                        isLoading={isLoading}
                    >
                        Search
                    </LoaderButton>
                </Form>

            </Form>
        );

        // return (
        //     <div className="Control">
        //         <div className="flight-table">
        //             <h1>Search</h1>
        //             <p>Book a flight here</p>

        //             <table>
        //                 <tr>
        //                     <td>Max price</td><td><input type="text" name="maxprice"></input></td>
        //                 </tr>
        //                 <tr>
        //                     <td>Departure Airport</td><td><input type="text" name="depart"></input></td>
        //                     <td>Arrival Airport</td><td><input type="text" name="arrival"></input></td>
        //                 </tr>
        //                 <tr>
        //                     <td>Round trip<input type="radio" name="roundtrip" value="yes"></input></td>
        //                     <td>One Way?<input type="radio" name="roundtrip" value="no"></input></td>
        //                     <td>All<input type="radio" name="roundtrip" value="both"></input></td>
        //                 </tr>
        //                 <tr>
        //                     <td>Departure</td><td><input type="datetime-local" name="earlydate"></input></td>
        //                     <td>Arrival</td><td><input type="datetime-local" name="latedate"></input></td>
        //                 </tr>
        //                 <tr>
        //                     <td>Airline</td><td><input type="text" name="aid"></input></td>
        //                 </tr>
        //                 <tr>
        //                     <td>Sort by: </td><td><select name="sorter">
        //                         <option value="price">Price</option>
        //                         <option value="depart">Departure</option>
        //                         <option value="arrive">Arrival</option>
        //                     </select></td>
        //                 </tr>
        //             </table>
        //             <input type="submit" value="Search"></input>

        //         </div>
        //     </div>
        // );

    }

    return (
        <div className="Search">
            {recieved === false ? renderSearch() : renderResults()}
        </div>
    );


}