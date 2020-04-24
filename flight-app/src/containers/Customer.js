import React, { useState } from 'react';
import "./Customer.css";

export default function Costomer(props) {

    const [recieved, setRecieved] = useState(false)


    function renderConfirmation() {

        return (
            <div>
                yes
            </div>
        );
    }

    function renderCustomer() {

        return (
            <div>
                
            </div>
        );

    }




    return (
        <div >
            {recieved === false ? renderCustomer() : renderConfirmation()}
        </div>
    );

}


