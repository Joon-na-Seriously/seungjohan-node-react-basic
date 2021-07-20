import React, { useEffect } from 'react';
import Axios from 'axios';
//import {response} from "express";
import { withRouter } from "react-router-dom";

function LandingPage(props) {

    useEffect(() => {
        Axios.get('/api/hello')
            .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        Axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed at logout")
                }
                //console.log(response.data)
         })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>LandingPage</h2>

            <button onClick={onClickHandler}>
                LogOut
            </button>
        </div>
    )
}

export default withRouter(LandingPage);