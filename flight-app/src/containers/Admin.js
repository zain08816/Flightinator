import React, { useState } from "react";
import "./Control.css";
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Form
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import Cookies from 'universal-cookie'
import axios from "axios";
import Routes from "../Routes"
import { LinkContainer } from "react-router-bootstrap";




export default function Admin(props) {



    function renderAdmin() {

        return(
            <div>
                Admin Controls
            </div>
        );
    }




   return(
       <div>
           { renderAdmin() }
       </div>
   );
}