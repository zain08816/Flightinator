import React, { useState } from 'react';
import "./SalesReport.css"
import axios from 'axios';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DataGrid from 'react-data-grid';

export default function SalesReport(props) {
    const [month, setMonth] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        month: 1
    })

    async function handleSubmit(event) {
        setMonth(fields.month);
        // post request
        axios.post('/api/posts/salesreport', {
            month: fields.month
        })
        .then( res => {
            const error = res.data.error;
            if( error ) return;
        })
        .catch( err => {
            if( err ) console.log(`API Error: ${err}`);
        })

        event.preventDefault();
    }

    function validateForm() {
        return fields.month >= 1 && fields.month <= 12;
    }

    function renderReport() {
        return (
            <div></div>
        );
    }

    function intToMonth(monthCode) {
        if( monthCode == 1 ) return 'January';
        else if( monthCode == 2 ) return 'February';
        else if( monthCode == 3 ) return 'March';
        else if( monthCode == 4 ) return 'April';
        else if( monthCode == 5 ) return 'May';
        else if( monthCode == 6 ) return 'June';
        else if( monthCode == 7 ) return 'July';
        else if( monthCode == 8 ) return 'August';
        else if( monthCode == 9 ) return 'September';
        else if( monthCode == 10 ) return 'October';
        else if( monthCode == 11 ) return 'November';
        else if( monthCode == 12 ) return 'December';
        else return '???'
    }

    function renderReportRequest() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="month" bsSize="large">
                    <ControlLabel>Month</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.month}
                        onChange={handleFieldChange}
                    />
                    <LoaderButton
                        block
                        type="submit" 
                        bsSize="large"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >Get Sales Report for {intToMonth(fields.month)}</LoaderButton>
                </FormGroup>
            </form>
        );
    }

    return (
        <div>
            {
                month ? renderReport() :
                renderReportRequest()
            }
        </div>
    );
}